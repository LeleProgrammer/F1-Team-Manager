// ===== 文件: js/core/rnd.js =====
import {
  PARTS, FACILITIES
}
from '../data/parts.js';
import {
  DIFFICULTIES
}
from '../data/i18n.js';
import {
  chance
}
from './rng.js';
import {
  uid, clamp, news, teamOf, requireCondition, mutable
}
from './helpers.js';
import {
  spend, income
}
from './finance.js';
import {
  staffAbility
}
from './staff.js';
export function projectQuote(s,t,part,kind='development',copies=2) {
  const p=PARTS.find(x=>x.id===part);
  requireCondition(p,'研发部件不存在');
  const level=Math.max(...s.parts[t.id].cars.map(c=>c[part].level),...t.projects.filter(x=>x.part===part).map(x=>x.level),1)+1;
  const aero=p.department==='aero';
  const feedback=t.drivers.reduce((a,id)=>a+s.drivers.find(d=>d.id===id).attributes.feedback,0)/200;
  const aggressive=s.staff.some(x=>x.teamId===t.id&&x.trait==='aggressive');
  const efficiency=(.65+(staffAbility(s,t.id,'technical')*.55+staffAbility(s,t.id,'aero')*.25+staffAbility(s,t.id,'performance')*.2)/180)*(1+t.departments[p.department].level*.07)*(aero?1+(t.facilities.wind.level+t.facilities.cfd.level)*.025:1)*(1+feedback*.12)*(aggressive?1.1:1);
  return {
    level,cost:p.cost*(1+level*.12)*(kind==='research'?1.1:1),days:Math.ceil(p.days*(1+level*.05)/efficiency),gain:2.2/(1+level*.08),wind:aero?18+level*2:0,cfd:aero?24+level*2:0,risk:clamp(.04+level*.008+(aggressive?.05:0)-(staffAbility(s,t.id,'reliability')-60)*.001,.015,.25),manufacturing:p.cost*.22*copies
  };
}
export function startProject(s,part,kind='development',copies=2,teamId=s.player.teamId) {
  mutable(s);
  const t=teamOf(s,teamId),p=PARTS.find(x=>x.id===part);
  requireCondition(p,'研发部件不存在');
  requireCondition(['development','research'].includes(kind)&&[1,2].includes(copies),'研发参数无效');
  requireCondition(!(t.type==='customer'&&p.department==='power'),'客户车队不能自主改进动力单元，请依靠供应商');
  requireCondition(!(s.season.year>=2026&&part==='mguh'),'新规赛季不再允许 MGU-H 研发');
  requireCondition(kind!=='research'||s.calendar.round>=Math.floor(s.calendar.events.length*.55),'下赛季研究在赛季过半后开放');
  requireCondition(t.projects.filter(p=>p.status==='researching').length<2+Math.floor(t.facilities.cfd.level/3),'研发槽位已满');
  requireCondition(!t.projects.some(x=>x.part===part&&x.kind===kind&&x.status==='researching'),'相同项目已在进行');
  const q=projectQuote(s,t,part,kind,copies);
  requireCondition(t.wind.used+q.wind<=t.wind.limit&&t.cfd.used+q.cfd<=t.cfd.limit,'风洞或 CFD 额度不足');
  spend(s,t,q.cost+q.manufacturing,`${p.name} ${kind==='research'?'下季研究':'研发与制造预付'}`,true);
  t.wind.used+=q.wind;
  t.cfd.used+=q.cfd;
  const item={
    id:uid(s,'project'),part,kind,copies,...q,remaining:q.days,progress:0,status:'researching',boosted:false,safer:false
  };
  t.projects.push(item);
  news(s,`${t.name} 启动${p.name}${kind==='research'?'下季研究':'升级'}，预计 ${q.days} 天`);
  return '研发项目已立项';
}
export function changeProject(s,id,operation) {
  mutable(s);
  const t=teamOf(s),p=t.projects.find(x=>x.id===id&&x.status==='researching');
  requireCondition(p,'项目不在研发阶段');
  if(operation==='cancel') {
    p.status='cancelled';
    income(s,t,p.manufacturing,'取消项目退还制造预付');
    return '项目已叫停，研发成本不退，制造预付已退回';
  }
  if(operation==='boost') {
    requireCondition(!p.boosted,'已追加过投入');
    spend(s,t,p.cost*.3,'研发追加投入',true);
    p.remaining*=.7;
    p.risk=clamp(p.risk+.025,0,1);
    p.boosted=true;
    return '工期缩短 30%，失败风险上升';
  }
  requireCondition(operation==='safe'&&!p.safer,'已执行风险审查或操作无效');
  spend(s,t,p.cost*.15,'研发风险审查',true);
  p.risk*=.45;
  p.remaining*=1.15;
  p.safer=true;
  return '失败风险降低，剩余工期增加 15%';
}
export function upgradeFacility(s,id) {
  mutable(s);
  const t=teamOf(s),f=t.facilities[id],def=FACILITIES[id];
  requireCondition(f&&def,'设施不存在');
  requireCondition(!f.building&&f.level<6,'设施已在建或达到 6 级');
  spend(s,t,def.cost*(1+f.level*.6),def.name+' 建设投资',false);
  f.building={
    remaining:def.days+f.level*5,total:def.days+f.level*5
  };
  return '设施建设启动（不计入预算帽）';
}
export function upgradeDepartment(s,id) {
  mutable(s);
  const t=teamOf(s),d=t.departments[id];
  requireCondition(d&&d.level<6,'部门已达上限或不存在');
  spend(s,t,2+d.level,'部门扩编',true);
  d.level++;
  d.people+=8;
  return '部门等级与人数已提升';
}
export function advanceRND(s,days) {
  for(let day=0; day<days; day++)advanceOneRND(s,1);
}
function advanceOneRND(s,days) {
  for(const t of s.teams) {
    for(const f of Object.values(t.facilities)) {
      if(f.building) {
        f.building.remaining-=days;
        if(f.building.remaining<=0) {
          f.level++;
          f.building=null;
          news(s,`${t.name} 的设施升级至 ${f.level} 级`);
        }
      }
    }
    const speed=t.id===s.player.teamId?1:DIFFICULTIES[s.settings.difficulty].ai;
    for(const p of t.projects.filter(x=>x.status==='researching')) {
      p.remaining-=days*speed;
      p.progress=clamp(100*(1-p.remaining/p.days));
      if(p.remaining>0)continue;
      if(chance(s,p.risk)) {
        p.status='failed';
        income(s,t,p.manufacturing,'失败项目退还制造预付');
        news(s,`${t.name} 的${PARTS.find(x=>x.id===p.part).name}研发失败`,'warning');
        continue;
      }
      p.status='complete';
      if(p.kind==='research') {
        const dimension=PARTS.find(x=>x.id===p.part).dimension;
        t.research[dimension]=(t.research[dimension]||0)+p.gain;
        news(s,`${t.name} 下赛季研究完成，技术储备增加`);
      }
      else{
        for(let i=0; i<p.copies; i++)s.parts[t.id].production.push({
          id:uid(s,'unit'),part:p.part,level:p.level,gain:p.gain,risk:p.part==='cooling'?0:p.risk*3,remaining:Math.ceil(5/(1+t.facilities.factory.level*.18+t.departments.manufacturing.level*.08))
        });
        news(s,`${t.name} 研发完成，${p.copies} 套部件进入制造队列`);
      }
    }
    const q=s.parts[t.id].production,capacity=factoryCapacity(t);
    let budget=days*capacity;
    for(const item of q) {
      if(budget<=0)break;
      const use=Math.min(item.remaining,budget);
      item.remaining-=use;
      budget-=use;
    }
    for(const item of q.filter(x=>x.remaining<=0)) {
      s.parts[t.id].stock.push(item);
      news(s,`${t.name} 新规格零件生产完成，可分配装车`);
    }
    s.parts[t.id].production=q.filter(x=>x.remaining>0);
  }
}
export function factoryCapacity(t) {
  return 1+Math.floor(t.facilities.factory.level/2)+Math.floor(t.departments.manufacturing.level/3);
}
export function projectCapacity(t) {
  return 2+Math.floor(t.facilities.cfd.level/3);
}
export function researchUnlocked(s) {
  return s.calendar.round>=Math.floor(s.calendar.events.length*.55);
}
export function facilityCost(t,id) {
  return FACILITIES[id].cost*(1+t.facilities[id].level*.6);
}
export function departmentCost(t,id) {
  return 2+t.departments[id].level;
}
export function overrunTesting(s) {
  mutable(s);
  const t=teamOf(s);
  requireCondition(!t.wind.overrun,'本季超额试验已被处罚，不能再次申请');
  spend(s,t,5,'空气动力超额试验罚款',false);
  t.wind.limit+=45;
  t.cfd.limit+=60;
  t.wind.overrun=true;
  t.confidence=clamp(t.confidence-10);
  news(s,`${t.name} 违规增加风洞 / CFD 测试，被罚 $5m，董事会信心 -10`,'warning');
  return '违规试验额度已增加，同时已执行罚款与董事会处罚';
}

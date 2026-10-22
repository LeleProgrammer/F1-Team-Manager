import { assignDriverCodes, DRIVER_CODES } from './driverCodes.js';
// ===== 文件: js/core/drivers.js =====
import {
  DRIVER_DATA, YEAR_ADJUSTMENTS
}
from '../data/drivers-data.js';
import {
  between, chance, choose
}
from './rng.js';
import {
  uid, clamp, copy, teamOf, driverOf, news, requireCondition, rosterMutable
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
export function makeDriver(id,year) {
  const source=DRIVER_DATA[id];
  requireCondition(source,'车手数据不存在');
  const d=copy(source),delta=YEAR_ADJUSTMENTS[year]?.[id]||0;
  for(const k of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency'])d.attributes[k]=clamp(d.attributes[k]+delta,60,98);
  d.code=DRIVER_CODES[id];
  d.age=year-d.birth;
  d.attributes.experience=clamp((d.age-17)*4,10,99);
  Object.assign(d,{
    teamId:null,morale:80,fatigue:0,points:0,results:[],wins:0,fastest:0,star:d.attributes.pace>=90,contract:{
      salary:d.salary,years:2,bonus:.1,buyout:.65
    },plan:'balanced',academy:false,retired:false
  });
  return d;
}
export function createCustomDriver(s,name,age,pace,number) {
  requireCondition(name.trim().length>=1&&name.length<=32,'车手名字需为 1—32 个字符');
  requireCondition(Number.isInteger(age)&&age>=18&&age<=45&&Number.isFinite(pace)&&pace>=60&&pace<=80,'自建车手年龄需 18—45，初始能力 60—80');
  const d=makeDriver('drugovich',s.season.year);
  d.id=uid(s,'custom-driver');
  d.name=name.trim();delete d.code;
  d.age=age;
  d.birth=s.season.year-age;
  d.number=number;
  d.nationality='自定义';
  for(const k of Object.keys(d.attributes))d.attributes[k]=pace;
  d.attributes.fitness=90;
  d.attributes.experience=clamp((age-17)*4,10,99);
  d.attributes.potential=Math.max(pace,age<25?92:84);
  d.contract.salary=1.3;
  d.star=false;
  s.drivers.push(d);assignDriverCodes(s);
  return d;
}
export function freeReplacement(s,teamId,exclude) {
  return s.drivers.filter(d=>!d.teamId&&!d.academy&&!d.retired&&d.id!==exclude).sort((a,b)=>b.attributes.pace-a.attributes.pace)[0];
}
export function transferDriver(s,d,t,slot,salary,years) {
  const oldId=d.teamId;
  if(oldId) {
    const old=teamOf(s,oldId),seat=old.drivers.indexOf(d.id),replacement=freeReplacement(s,old.id,d.id);
    requireCondition(replacement,'对方车队无可用替补，转会暂时无法完成');
    old.drivers[seat]=replacement.id;
    replacement.teamId=old.id;
  }
  const outgoing=s.drivers.find(x=>x.id===t.drivers[slot]);
  if(outgoing)outgoing.teamId=null;
  t.drivers[slot]=d.id;
  d.teamId=t.id;
  d.academy=false;
  d.contract={
    salary,years,bonus:.1,buyout:.65
  };
  d.morale=85;
}
export function signDriver(s,id,slot,salary,years) {
  rosterMutable(s);
  const t=teamOf(s),d=driverOf(s,id);
  requireCondition(d.teamId!==t.id&&!d.retired,'该车手不可签约');
  requireCondition(!d.academy||d.academy===t.id,'只能提拔本队青训');
  requireCondition([0,1].includes(slot)&&Number.isFinite(salary)&&salary>=.1&&salary<=100&&Number.isInteger(years)&&years>=1&&years<=5,'合同参数无效');
  const outgoing=driverOf(s,t.drivers[slot]);
  const release=outgoing.contract.salary*outgoing.contract.years*.3;
  const fee=d.teamId?d.contract.salary*d.contract.years*d.contract.buyout:0;
  requireCondition(s.finance[t.id].cash>=release+fee,'现金不足以支付转会和解约补偿');
  const desire=.5+(salary/Math.max(.5,d.contract.salary)-1)*.4+(t.reputation-d.attributes.pace)*.012+t.facilities.marketing.level*.02;
  if(!chance(s,clamp(desire,.08,.98))) {
    news(s,`${d.name} 拒绝 ${t.name} 的报价，薪水与竞争力尚不足`,'warning');
    return '谈判未达成';
  }
  const old=d.teamId;
  spend(s,t,fee+release,'车手转会与席位解约',true);
  if(old)income(s,teamOf(s,old),fee,'车手转会补偿');
  transferDriver(s,d,t,slot,salary,years);
  news(s,`${d.name} 签约 ${t.name}，合同 ${years} 年`);
  return '签约成功';
}
export function renewDriver(s,id,salary,years) {
  rosterMutable(s);
  const d=driverOf(s,id);
  requireCondition(d.teamId===s.player.teamId,'只能续约本队车手');
  requireCondition(Number.isFinite(salary)&&salary>=d.contract.salary*.95&&salary<=100&&Number.isInteger(years)&&years>=1&&years<=5,'续约报价无效（最低原薪资 95%，年限 1—5 年）');
  d.contract.salary=salary;
  d.contract.years=years;
  d.morale=clamp(d.morale+8);
  return '车手续约成功';
}
export function releaseDriver(s,id) {
  rosterMutable(s);
  const t=teamOf(s),d=driverOf(s,id);
  requireCondition(d.teamId===t.id,'只能解约本队车手');
  const reserve=freeReplacement(s,t.id,id);
  requireCondition(reserve,'没有可用替补，请先招募青训或签入车手');
  spend(s,t,d.contract.salary*d.contract.years*.5,'车手解约补偿',true);
  const slot=t.drivers.indexOf(id);
  t.drivers[slot]=reserve.id;
  reserve.teamId=t.id;
  d.teamId=null;
  return `合同解除，${reserve.name} 临时接替席位`;
}
export function trainDriver(s,id,plan) {
  const d=driverOf(s,id);
  requireCondition(d.teamId===s.player.teamId||d.academy===s.player.teamId,'只能安排本队训练');
  requireCondition(['balanced','pace','tyres','wet','rest'].includes(plan),'训练项目无效');
  d.plan=plan;
  return '发展计划已更新';
}
export function recruitYouth(s) {
  rosterMutable(s);
  const t=teamOf(s);
  requireCondition(s.drivers.filter(d=>d.academy===t.id).length<4,'青训最多 4 人');
  spend(s,t,1,'招募青训车手',true);
  const names=['Ren Sato','Alex Morgan','Gabriel Costa','陈星河','Luca Moretti','Émile Laurent'];
  const d=makeDriver('pourchaire',s.season.year);
  d.id=uid(s,'youth');
  d.name=choose(s,names)+' '+s.nextId;delete d.code;
  d.age=18;
  d.birth=s.season.year-18;
  d.academy=t.id;
  d.background=chance(s,.5)?'F2':'F3';
  for(const k of Object.keys(d.attributes))d.attributes[k]=between(s,61,76);
  d.attributes.potential=between(s,86,97);
  d.contract.salary=.3;
  s.drivers.push(d);assignDriverCodes(s);
  news(s,`${d.name} 从 ${d.background} 加入青训`);
  return '新青训车手已报到';
}
export function sellYouth(s,id) {
  rosterMutable(s);
  const d=driverOf(s,id);
  requireCondition(d.academy===s.player.teamId,'不是本队青训车手');
  income(s,teamOf(s),Math.max(.5,(d.attributes.pace-55)*.2),'青训车手培养转让');
  d.academy=false;
  return '青训资产已出售，车手进入自由市场';
}
export function developDrivers(s,days) {
  for(const d of s.drivers) {
    if(d.retired)continue;
    d.fatigue=clamp(d.fatigue-days*(d.plan==='rest'?2:1)*(.5+d.attributes.fitness*.005));
    const team=d.teamId||d.academy;
    if(!team)continue;
    const t=teamOf(s,team),academy=staffAbility(s,t.id,'academy');
    const young=d.age<27;
    const growth=young?Math.max(0,d.attributes.potential-d.attributes.pace)*days/18000*(1+academy/100)*(d.academy?1.5:1)*(s.staff.some(x=>x.teamId===t.id&&x.trait==='mentor')?1.2:1):d.age>30?-(d.age-29)*days/24000:0;
    for(const key of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency','feedback'])d.attributes[key]=clamp(d.attributes[key]+growth,50,99);
    if(d.plan!=='balanced'&&d.plan!=='rest') {
      const cost=days*.008;
      if(s.finance[t.id].cash>cost) {
        spend(s,t,cost,'车手专项训练',true);
        const key=d.plan==='pace'?'qualifying':d.plan;
        d.attributes[key]=clamp(d.attributes[key]+days*(1+t.facilities.sim.level*.1)*.018,0,d.attributes.potential);
      }
    }
  }
}
export function seedAIYouth(s,t){
  if(s.drivers.some(d=>d.academy===t.id&&!d.retired))return;
  const d=makeDriver('pourchaire',s.season.year);
  d.id=uid(s,'ai-youth');delete d.code;d.name=choose(s,['Matteo Riva','Evan Brooks','Haru Mori','Rafael Lima','林逸'])+' '+t.abbr;
  d.age=18;d.birth=s.season.year-18;d.academy=t.id;d.background='F2 / F3 虚构新秀';d.contract.salary=.4;
  for(const key of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency'])d.attributes[key]=between(s,68,77);
  d.attributes.potential=between(s,88,97);s.drivers.push(d);assignDriverCodes(s);
}

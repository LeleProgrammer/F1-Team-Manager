// ===== 文件: js/core/finance.js =====
import {
  SUPPLIERS
}
from '../data/teams.js';
import {
  SPONSORS
}
from '../data/sponsors.js';
import {
  DIFFICULTIES
}
from '../data/i18n.js';
import {
  clamp, news, teamOf, requireCondition, mutable
}
from './helpers.js';
import {
  checkBudget
}
from './rules.js';
export function initFinance(s,t,cash) {
  s.finance[t.id]={
    cash,capUsed:0,capLimit:s.season.rules.cap*DIFFICULTIES[s.settings.difficulty].cap,ledger:[],sponsors:[],audited:false,disqualified:false,rescue:false
  };
}
export function spend(s,t,amount,label,cap=true,forced=false) {
  const f=s.finance[t.id];
  requireCondition(Number.isFinite(amount)&&amount>=0,'支出金额无效');
  requireCondition(forced||f.cash>=amount,'现金不足');
  f.cash-=amount;
  if(cap)f.capUsed+=amount;
  f.ledger.unshift({
    day:s.calendar.day,label,amount:-amount,cap
  });
  f.ledger.length=Math.min(f.ledger.length,160);
  return amount;
}
export function income(s,t,amount,label) {
  const f=s.finance[t.id];
  f.cash+=amount;
  f.ledger.unshift({
    day:s.calendar.day,label,amount,cap:false
  });
  f.ledger.length=Math.min(f.ledger.length,160);
}
export function signSponsor(s,id,teamId=s.player.teamId) {
  mutable(s);
  const t=teamOf(s,teamId),f=s.finance[t.id],sp=SPONSORS.find(x=>x.id===id);
  requireCondition(sp,'赞助商不存在');
  requireCondition(t.reputation>=sp.min,'声望尚未达到签约要求');
  requireCondition(!f.sponsors.some(x=>x.id===id),'已签约该赞助商');
  requireCondition(f.sponsors.filter(x=>x.kind===sp.kind).length<(sp.kind==='主赞助'?1:3),'该类型赞助席位已满');
  const boost=1+t.facilities.marketing.level*.03+(s.staff.some(x=>x.teamId===t.id&&x.trait==='money')?.08:0);
  const contract={
    ...sp,annual:sp.base*boost,paid:0
  };
  f.sponsors.push(contract);
  if(t.id===s.player.teamId||s.calendar.day>0)news(s,`${t.name} 与 ${sp.name} 签约，年收入 $${contract.annual.toFixed(2)}m`);
}
export function dailyFinance(s,days) {
  for(const t of s.teams) {
    const payroll=s.drivers.filter(x=>x.teamId===t.id).reduce((n,d)=>n+d.contract.salary,0)+s.staff.filter(x=>x.teamId===t.id).reduce((n,d)=>n+d.salary,0);
    spend(s,t,(payroll+12+t.facilities.factory.level*1.2+(t.type==='customer'?(SUPPLIERS[t.supplier]?.price||12):9))*days/365,'薪资与工厂运营',true,true);
    for(const sp of s.finance[t.id].sponsors) {
      const amount=sp.annual*days/365;
      sp.paid+=amount;
      income(s,t,amount,sp.name+' 分期赞助');
    }
  }
}
export function raceIncome(s,result) {
  for(const t of s.teams) {
    const own=result.rows.filter(r=>r.teamId===t.id);
    for(const row of own.filter(x=>x.points>0)) {
      const driver=s.drivers.find(d=>d.id===row.driverId);
      spend(s,t,driver.contract.bonus,'车手积分绩效奖金',true,true);
    }
    income(s,t,.3+t.reputation*.006+s.drivers.filter(d=>d.teamId===t.id&&d.star).length*.15,'周边与赛事分成');
    for(const sp of s.finance[t.id].sponsors) {
      let ok=false;
      if(sp.goal==='podium')ok=own.some(r=>r.position<=3&&r.classified);
      if(sp.goal==='points')ok=own.some(r=>r.points>0);
      if(sp.goal==='finish')ok=own.some(r=>!r.retired);
      if(sp.goal==='q3')ok=s.calendar.weekend.q3.some(id=>t.drivers.includes(id));
      if(sp.goal==='win')ok=own.some(r=>r.position===1&&r.classified);
      if(ok)income(s,t,sp.bonus,sp.name+' 达标奖金');
    }
    checkBudget(s,t);
    if(s.finance[t.id].cash<0&&t.id===s.player.teamId) {
      s.season.gameOver='车队现金流断裂，董事会终止你的任期。';
      news(s,s.season.gameOver,'danger');
    }
  }
}
export function emergency(s) {
  mutable(s);
  const t=teamOf(s),f=s.finance[t.id];
  requireCondition(!f.rescue,'本季董事会援助已使用');
  requireCondition(f.cash<20,'仅现金低于 $20m 时可申请');
  f.rescue=true;
  t.confidence=clamp(t.confidence-15);
  t.reputation=clamp(t.reputation-5);
  income(s,t,15,'董事会紧急注资');
  news(s,'董事会注资 $15m，信心 -15、声望 -5','warning');
}

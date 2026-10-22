// ===== 文件: js/core/rules.js =====
import {
  news, clamp
}
from './helpers.js';
export const RACE_POINTS=[25,18,15,12,10,8,6,4,2,1];
export const SPRINT_POINTS=[8,7,6,5,4,3,2,1];
export function seasonRules(year) {
  return {
    fastestLap:year<=2024,cap:year===2022?140:135,sprintFormat:year===2022?'2022':year===2023?'2023':'2024',major:year===2026,monacoStops:year>=2025?2:0
  };
}
export function sessionsFor(year,sprint) {
  if(!sprint)return ['FP1','FP2','FP3','Q','RACE'];
  if(year===2022)return ['FP1','Q','FP2','SPRINT','RACE'];
  if(year===2023)return ['FP1','Q','SQ','SPRINT','RACE'];
  return ['FP1','SQ','SPRINT','Q','RACE'];
}
export function eliminationSize(count) {
  return Math.max(1,Math.floor((count-10)/2));
}
export function penalty(s,car,seconds,reason) {
  car.penalty+=seconds;
  const record={
    lap:s.race.lap,driver:car.driverId,seconds,reason
  };
  s.race.penalties.push(record);
  s.race.events.unshift({
    lap:s.race.lap,text:`${car.name}：${reason}${seconds>0?'，罚时 '+seconds+' 秒':''}`,type:'penalty'
  });
}
export function trackLimits(s,car) {
  car.warnings++;
  if(car.warnings===3)s.race.events.unshift({
    lap:s.race.lap,text:`${car.name}：赛道限制黑白旗（三次警告）`,type:'warning'
  });
  if(car.warnings>=4)penalty(s,car,car.warnings===4?5:10,'多次超出赛道限制');
}
export function checkBudget(s,t) {
  const f=s.finance[t.id];
  const excess=f.capUsed-f.capLimit;
  const severe=excess>f.capLimit*.1;
  if(excess<=0||f.audited&&(!severe||f.disqualified))return;
  f.audited=true;
  const hard=s.settings.difficulty==='hard';
  const fine=Math.max(1,excess*(hard?1.8:1.2));
  f.cash-=fine;
  f.ledger.unshift({
    day:s.calendar.day,label:'预算帽调查罚款',amount:-fine,cap:false
  });
  t.wind.limit*=0.85;
  t.cfd.limit*=0.85;
  t.confidence=clamp(t.confidence-12);
  if(severe) {
    t.points=0;
    f.disqualified=true;
    for(const r of t.results)r.points=0;
    for(const d of s.drivers){for(const r of d.results)if(r.teamId===t.id)r.points=0;d.points=d.results.reduce((sum,r)=>sum+r.points,0);}
    for(const race of s.history.races)if(!race.year||race.year===s.season.year)for(const r of race.rows)if(r.teamId===t.id)r.points=0;
    for(const e of s.calendar.events)if(e.result)for(const r of e.result.rows)if(r.teamId===t.id)r.points=0;
    if(s.race?.result)for(const r of s.race.result.rows)if(r.teamId===t.id)r.points=0;
  }
  news(s,`${t.name} 预算帽超支 $${excess.toFixed(2)}m，罚款 $${fine.toFixed(2)}m、测试额度削减 15%${f.disqualified?'，并取消本季积分资格':''}`,'warning');
}
export function pitLanePenalty(s,car,reason){
  const t=s.teams.find(t=>t.id===car.teamId);
  if(!t.pitLaneNext)t.pitLaneNext=[false,false];
  t.pitLaneNext[car.slot]=true;
  s.race.penalties.push({lap:s.race.lap,driver:car.driverId,seconds:0,reason:reason+'，下场正赛维修区起步'});
  s.race.events.unshift({lap:s.race.lap,text:car.name+'：'+reason+'，下场正赛维修区起步',type:'penalty'});
}

// ===== 文件: js/core/season.js =====
import {
  currentEvent, advanceDays, makeCalendar
}
from './calendar.js';
import {
  income
}
from './finance.js';
import {
  checkBudget, seasonRules
}
from './rules.js';
import {
  aiTransfers
}
from './ai.js';
import {
  initParts
}
from './car.js';
import {
  PARTS
}
from '../data/parts.js';
import {
  clamp, copy, teamOf, teamStandings, driverStandings, news, requireCondition, mutable
}
from './helpers.js';
import {
  chance, between
}
from './rng.js';
export function closeWeekend(s) {
  mutable(s);
  const w=s.calendar.weekend;
  requireCondition(w&&w.index>=w.sessions.length,'比赛周末尚未结束');
  currentEvent(s).completed=true;
  s.calendar.round++;
  s.calendar.weekend=null;
  s.race=null;
  advanceDays(s,3);
  if(s.calendar.round>=s.calendar.events.length)settleSeason(s);
  return s.season.offseason?'赛季结算完成，转会窗已开启':'本站已结算，可安排工厂事务与下一站';
}
export function settleSeason(s) {
  requireCondition(!s.season.offseason,'赛季已结算');
  const standings=teamStandings(s),drivers=driverStandings(s);
  s.history.seasons.push({
    year:s.season.year,teams:standings.map(t=>({
      id:t.id,name:t.name,points:t.points,rank:standings.indexOf(t)+1
    })),drivers:drivers.map(d=>({
      id:d.id,name:d.name,points:d.points
    })),playerRank:standings.findIndex(t=>t.id===s.player.teamId)+1
  });
  for(const [i,t]of standings.entries()) {
    income(s,t,Math.max(22,78-i*5.5),'赛季制造商奖金');
    checkBudget(s,t);
    t.previousRank=i+1;
    t.reputation=clamp(t.reputation+(i<4?3:i>=8?-2:0),25,99);
    const target=t.objectives.target;
    const met=i+1<=target||t.objectives.points>0&&t.custom;
    t.confidence=clamp(t.confidence+(met?10:-18));
    for(const id of t.drivers) {
      const d=s.drivers.find(x=>x.id===id);
      d.contract.years=Math.max(0,d.contract.years-1);
    }
    for(const e of s.staff.filter(x=>x.teamId===t.id))e.years=Math.max(0,e.years-1);
  }
  for(const d of s.drivers) {
    d.age++;
    if(d.age>=39&&chance(s,.2+(d.age-39)*.08)) {
      d.retired=true;
      news(s,`${d.name} 宣布赛季结束后退役`);
    }
  }
  aiTransfers(s);
  s.season.offseason=true;
  s.season.nextRules=s.season.year+1===2026?'2026 技术重置：气动收益保留 35%，电能部署权重上升、MGU-H 退出。提前研究以 150% 系数转化。后续赛历沿用 2025，属于架空生涯。':'渐进规则调整：旧规格增益保留 75%，下季研究转化为基础性能。';
  news(s,'赛季结束：奖金到账，转会窗开启。'+s.season.nextRules);
  const p=teamOf(s);
  if(p.confidence<=0&&!s.season.gameOver)s.season.gameOver='连续未达董事会目标，本次经理生涯结束。';
}
export function nextSeason(s) {
  mutable(s);
  requireCondition(s.season.offseason,'请先完成当前赛季');
  const player=teamOf(s);
  for(const id of player.drivers) {
    const d=s.drivers.find(x=>x.id===id);
    requireCondition(!d.retired&&d.contract.years>0,'请在转会窗为两位主力续约或签入替代车手');
  }
  requireCondition(s.staff.some(x=>x.teamId===player.id&&x.role==='principal'&&x.years>0),'请为车队领队续约或聘用新领队');
  const year=s.season.year+1,major=year===2026;
  s.season={
    year,rules:seasonRules(year),offseason:false,nextRules:'',gameOver:null
  };
  const events=makeCalendar(year);
  s.calendar={
    events,round:0,weekend:null,day:0,date:`${year}-02-01`
  };
  for(const t of s.teams) {
    const carry={
      ...t.carry
    };
    for(const part of PARTS) {
      const avg=s.parts[t.id].cars.reduce((sum,c)=>sum+c[part.id].gain,0)/2;
      carry[part.dimension]=(carry[part.dimension]||0)+avg;
    }
    for(const key of Object.keys(carry))carry[key]*=major?.35:.75;
    for(const [key,gain]of Object.entries(t.research))carry[key]=(carry[key]||0)+gain*(major?1.5:1);
    t.carry=carry;
    t.research={
    };
    t.projects=[];
    t.points=0;
    t.wins=0;
    t.results=[];
    t.gridPenalties=[0,0];t.pitLaneNext=[false,false];
    t.wind={
      limit:Math.round(180+(t.previousRank-1)*14),used:0
    };
    t.cfd={
      limit:Math.round(240+(t.previousRank-1)*18),used:0
    };
    t.objectives={
      target:t.custom?Math.max(5,t.previousRank-1):Math.max(1,t.previousRank-1),points:0,finish:0,podiums:0
    };
    const f=s.finance[t.id];
    f.capUsed=0;
    f.capLimit=s.season.rules.cap*(s.settings.difficulty==='easy'?1.06:s.settings.difficulty==='hard'?.98:1);
    f.audited=false;
    f.disqualified=false;
    f.rescue=false;
    for(const sp of f.sponsors)sp.paid=0;
    initParts(s,t);
    for(const e of s.staff.filter(x=>x.teamId===t.id&&t.id!==s.player.teamId&&x.years===0))e.years=2;
  }
  for(const d of s.drivers) {
    d.points=0;
    d.results=[];
    d.wins=0;
    d.fastest=0;
    d.fatigue=0;
  }
  s.race=null;
  news(s,`${year} 赛季正式开启${year>2025?'（架空生涯，沿用 2025 赛道与冲刺站点）':''}`);
  return '新赛季已开启';
}

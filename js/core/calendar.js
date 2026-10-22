// ===== 文件: js/core/calendar.js =====
import {
  SCHEDULES, SPRINTS, trackForYear
}
from '../data/tracks.js';
import {
  sessionsFor
}
from './rules.js';
import {
  advanceRND
}
from './rnd.js';
import {
  dailyFinance
}
from './finance.js';
import {
  developDrivers
}
from './drivers.js';
import {
  aiManagement
}
from './ai.js';
import {
  staffEvents
}
from './staff.js';
import {
  between, chance
}
from './rng.js';
import {
  requireCondition, news, mutable, teamOf
}
from './helpers.js';
export function makeCalendar(year) {
  const reference=Math.min(year,2025);
  return SCHEDULES[reference].split(' ').map((item,i)=> {
    const [track,date]=item.split(':'); return {
      round:i+1,track,date:`${year}-${date}`,sprint:SPRINTS[reference].includes(track),completed:false,result:null
    };
  });
}
export function currentEvent(s) {
  return s.calendar.events[s.calendar.round];
}
export function currentTrack(s) {
  const e=currentEvent(s);
  return e?trackForYear(e.track,Math.min(s.season.year,2025)):null;
}
export function advanceDays(s,days) {
  requireCondition(Number.isInteger(days)&&days>0&&days<=180,'推进天数无效');
  s.calendar.day+=days;
  const dt=new Date(s.calendar.date+'T12:00:00Z');
  dt.setUTCDate(dt.getUTCDate()+days);
  s.calendar.date=dt.toISOString().slice(0,10);
  dailyFinance(s,days);
  developDrivers(s,days);
  advanceRND(s,days);
  const f=s.finance[s.player.teamId];
  if(f.cash<0&&!s.season.gameOver) {
    s.season.gameOver='车队现金流断裂，董事会终止你的任期。';
    news(s,s.season.gameOver,'danger');
  }
}
export function waitDays(s,days=7) {
  mutable(s);
  requireCondition(!s.calendar.weekend&&!s.season.offseason,'请先完成当前周末或转会窗');
  const e=currentEvent(s);
  const left=Math.round((Date.parse(e.date)-Date.parse(s.calendar.date))/86400000);
  requireCondition(left>2,'距离比赛不足三天，请进入比赛周末');
  advanceDays(s,Math.min(days,left-2));
  aiManagement(s);
  return '工厂与训练已推进';
}
export function enterWeekend(s) {
  mutable(s);
  requireCondition(!s.calendar.weekend&&!s.season.offseason,'当前阶段不能创建比赛周末');
  const e=currentEvent(s);
  requireCondition(e,'本赛季赛历已结束');
  const delta=Math.max(0,Math.round((Date.parse(e.date)-Date.parse(s.calendar.date))/86400000)-2);
  if(delta)advanceDays(s,delta);
  aiManagement(s);
  staffEvents(s);
  const w={
    sessions:sessionsFor(s.season.year,e.sprint),index:0,setups:{
    },ideal:{
    },confidence:{
    },grids:{
    },qualifying:null,practice:[],q3:[],strategy:{
    },tyres:{
    },weekendWet:false,weatherStart:chance(s,currentTrack(s).rain)?between(s,.2,.8):0
  };
  for(const t of s.teams) {
    w.setups[t.id]=[[50,50,50,50],[50,50,50,50]];
    w.ideal[t.id]=[0,1].map(()=>[between(s,25,75),between(s,25,75),between(s,25,75),between(s,25,75)]);
    w.confidence[t.id]=[0,1].map(()=>Array.from({
      length:4
    },()=>({
      low:0,high:100,estimate:50
    })));
    for(const [slot,id]of t.drivers.entries()) {
      w.tyres[id]={
        S:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?4:e.sprint?6:8,M:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?4:e.sprint?4:3,H:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?3:2,I:4,W:3
      };
      w.strategy[id]={
        start:w.weatherStart>.65?'W':w.weatherStart>.2?'I':'M',pitLap:Math.round(currentTrack(s).laps*.45),secondLap:0,next:'H',backup:'B',rain:'I',auto:false
      };
      const worn=Object.values(s.parts[t.id].cars[slot]).some(x=>x.wear>75);
      if(t.id===s.player.teamId&&worn)news(s,`${s.drivers.find(d=>d.id===id).name} 的部件磨损偏高，本站存在可靠性风险`,'warning');
    }
  }
  s.calendar.weekend=w;
  s.race=null;
  news(s,`抵达${currentTrack(s).name}，${e.sprint?'冲刺':'标准'}周末开始`);
  return '比赛周末已开启';
}
export function changeSetup(s,slot,values) {
  const w=s.calendar.weekend;
  requireCondition(w&&w.sessions[w.index]?.startsWith('FP'),'设定仅能在练习阶段调整');
  requireCondition([0,1].includes(slot)&&Array.isArray(values)&&values.length===4&&values.every(x=>Number.isFinite(x)&&x>=0&&x<=100),'设定参数无效');
  w.setups[s.player.teamId][slot]=values;
  return '赛车设定已更新';
}
export function setStrategy(s,id,plan) {
  const w=s.calendar.weekend;
  requireCondition(w&&!s.race?.running,'比赛开始后请使用实时指令');
  requireCondition(teamOf(s).drivers.includes(id),'不是本队车手');
  requireCondition(['S','M','H','I','W'].includes(plan.start)&&['S','M','H','I','W'].includes(plan.next),'轮胎配方无效');
  requireCondition(Number.isInteger(plan.pitLap)&&plan.pitLap>=1&&plan.pitLap<=currentTrack(s).laps,'进站圈数无效');
  requireCondition(Number.isInteger(plan.secondLap)&&plan.secondLap>=0&&plan.secondLap<=currentTrack(s).laps,'第二次进站圈无效');
  requireCondition(['A','B','C'].includes(plan.backup)&&['I','W'].includes(plan.rain),'备选策略无效');
  w.strategy[id]={
    ...plan,auto:!!plan.auto
  };
  return '策略计划已保存';
}

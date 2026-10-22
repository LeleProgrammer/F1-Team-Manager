// ===== 文件: js/core/race.js =====
import {
  COMPOUNDS, MODES, ENGINES, PARTS
}
from '../data/parts.js';
import {
  DIFFICULTIES
}
from '../data/i18n.js';
import {
  currentTrack
}
from './calendar.js';
import {
  theoreticalLap, setupPenalty, lapTime, performance
}
from './car.js';
import {
  staffAbility
}
from './staff.js';
import {
  aiRaceDecision
}
from './ai.js';
import {
  raceIncome
}
from './finance.js';
import {
  RACE_POINTS, SPRINT_POINTS, eliminationSize, penalty, trackLimits, pitLanePenalty
}
from './rules.js';
import {
  between, chance, choose
}
from './rng.js';
import {
  clamp, copy, teamOf, driverOf, news, requireCondition
}
from './helpers.js';
export function event(s,text,type='info') {
  const r=s.race;
  r.sequence++;
  r.events.unshift({
    lap:r.lap,text,type,...(r.realtime?{at:r.time}:{})
  });
  if(r.events.length>300)r.events.pop();
}
export function practice(s) {
  const w=s.calendar.weekend,track=currentTrack(s);
  requireCondition(w&&w.sessions[w.index]?.startsWith('FP'),'当前不是练习阶段');
  const session=w.sessions[w.index],rows=[];
  for(const t of s.teams)for(const [slot,id]of t.drivers.entries()) {
    const d=driverOf(s,id),conf=w.confidence[t.id][slot],skill=staffAbility(s,t.id,'engineer')*.75+staffAbility(s,t.id,'analyst')*.25;
    for(let i=0; i<4; i++) {
      const prior=conf[i],half=Math.max(3,(prior.high-prior.low)*.27/(1+t.facilities.sim.level*.05+(skill-45)*.003));
      const noise=between(s,-half*.55,half*.55)*(s.staff.some(x=>x.teamId===t.id&&x.trait==='precise')?.85:1);
      const estimate=clamp(w.ideal[t.id][slot][i]+noise,0,100);
      prior.estimate=estimate;
      prior.low=clamp(estimate-half);
      prior.high=clamp(estimate+half);
      if(t.id!==s.player.teamId)w.setups[t.id][slot][i]=estimate;
    }
    const time=theoreticalLap(s,t,d,slot,track)+setupPenalty(w.setups[t.id][slot],w.ideal[t.id][slot])+between(s,-.15,.15);
    d.fatigue=clamp(d.fatigue+1);
    for(const p of Object.values(s.parts[t.id].cars[slot]))p.wear=clamp(p.wear+.5);
    rows.push({
      id,name:d.name,time,feedback:Math.round((d.attributes.feedback+skill)/2)
    });
  }
  rows.sort((a,b)=>a.time-b.time);
  w.practice.push({
    session,rows,wearEstimate:[Math.round(19/track.wear),Math.round(29/track.wear),Math.round(40/track.wear)],fuel:1.65*track.length/5.4
  });
  w.index++;
  news(s,`${session} 完成：设定置信区间收敛，已取得轮胎与燃油数据`);
  return '练习完成，可参照置信区间调整下一节设定';
}
export function qualifying(s,mode='push',all=false) {
  const w=s.calendar.weekend,track=currentTrack(s),kind=w?.sessions[w.index];
  requireCondition(kind==='Q'||kind==='SQ','当前不是排位阶段');
  requireCondition(['push','safe','save'].includes(mode),'排位指令无效');
  if(!w.qualifying||w.qualifying.kind!==kind||w.qualifying.done)w.qualifying={
    kind,stage:0,active:s.teams.flatMap(t=>t.drivers),eliminated:[],stages:[],done:false
  };
  const q=w.qualifying;
  do{
    q.stage++;
    const rows=q.active.map(id=> {
      const d=driverOf(s,id),t=teamOf(s,d.teamId),slot=t.drivers.indexOf(id); const selected=t.id===s.player.teamId?mode:'push'; const compound=kind==='SQ'&&q.stage<3?'M':selected==='save'?'M':'S'; const stock=w.tyres[id]; let tyre=compound; if(stock[tyre]<=0)tyre=stock.S>0?'S':stock.M>0?'M':'H'; stock[tyre]=Math.max(0,stock[tyre]-1); const push=selected==='push'?-.12:selected==='safe'?.2:.55; const error=chance(s,(100-d.attributes.consistency)*.0015*(selected==='push'?1.6:.6)); const time=theoreticalLap(s,t,d,slot,track,true)+setupPenalty(w.setups[t.id][slot],w.ideal[t.id][slot])+COMPOUNDS[tyre].pace+push+between(s,-.15,.15)+(error?between(s,.3,1.4):0); return {
        id,name:d.name,teamId:t.id,time,stage:q.stage,compound:tyre
      };
    }).sort((a,b)=>a.time-b.time);
    q.stages.push(rows);
    if(q.stage<3) {
      const count=eliminationSize(s.teams.length*2),eliminated=rows.slice(-count);
      q.eliminated=eliminated.concat(q.eliminated);
      q.active=rows.slice(0,-count).map(x=>x.id);
    }
    else{
      q.done=true;
      w.grids[kind]=rows.concat(q.eliminated).map(x=>x.id);
      if(kind==='Q')w.q3=rows.map(x=>x.id);
      w.index++;
      news(s,`${kind==='Q'?'正赛':'冲刺'}排位结束，${rows[0].name} 获杆位`);
    }
  }
  while(all&&!q.done);
  return q.done?'排位结束':`第 ${q.stage} 段完成，可调整下一段指令`;
}
export function useTyre(s,car,compound) {
  const stock=s.calendar.weekend.tyres[car.driverId];
  if(!COMPOUNDS[compound]||stock[compound]<=0)return false;
  stock[compound]--;
  car.compound=compound;
  car.tyreAge=0;
  car.tyreWear=0;
  if(['S','M','H'].includes(compound)&&!car.usedDry.includes(compound))car.usedDry.push(compound);
  return true;
}
export function startRace(s) {
  const w=s.calendar.weekend,track=currentTrack(s),kind=w?.sessions[w.index];
  requireCondition(kind==='RACE'||kind==='SPRINT','当前不是比赛阶段');
  requireCondition(!s.race||s.race.finished,'比赛已开始');
  const sprint=kind==='SPRINT',totalLaps=sprint?Math.ceil(100/track.length):track.laps;
  let grid=copy(sprint?(w.grids.SQ||w.grids.Q):(s.season.year===2022&&w.grids.SPRINT?w.grids.SPRINT:w.grids.Q));
  requireCondition(Array.isArray(grid)&&grid.length===s.teams.length*2,'请先完成排位赛');
  const pitDrivers=new Set(!sprint?s.teams.flatMap(t=>t.drivers.filter((id,slot)=>t.pitLaneNext?.[slot])):[]);
  if(!sprint) {
    grid=grid.map((id,i)=> {
      const d=driverOf(s,id),t=teamOf(s,d.teamId); return {
        id,index:i+t.gridPenalties[t.drivers.indexOf(id)]+(pitDrivers.has(id)?999:0)
      };
    }).sort((a,b)=>a.index-b.index).map(x=>x.id);
    for(const t of s.teams)t.gridPenalties=[0,0];
  }
  const initial=w.weatherStart??(chance(s,track.rain)?between(s,.2,.8):0);
  const forecast=Array.from({
    length:Math.ceil(totalLaps/5)+1
  },(_,i)=>({
    lap:i*5+1,rain:chance(s,track.rain)?between(s,.2,.9):0,confidence:clamp(staffAbility(s,s.player.teamId,'strategy'),40,98)
  }));
  s.race={
    kind,sprint,totalLaps,lap:0,running:true,finished:false,control:'GREEN',controlLeft:0,red:false,sequence:0,wetness:initial,rain:initial,forecast,weatherWet:initial>.1,events:[],penalties:[],cars:[],fastest:{
      time:9999,driverId:null
    },fuelPerLap:track.length*.31,positions:[],segments:[],result:null
  };
  const r=s.race;
  for(const [position,id]of grid.entries()) {
    const d=driverOf(s,id),t=teamOf(s,d.teamId),slot=t.drivers.indexOf(id),strategy=w.strategy[id];
    const car={
      driverId:id,name:d.name,teamId:t.id,slot,grid:position+1,position:position+1,time:position*.22+(pitDrivers.has(id)?15:0),lastLap:0,best:9999,lap:0,compound:'M',tyreAge:0,tyreWear:0,tyreTemperature:80,fuel:Math.min(110,totalLaps*r.fuelPerLap*1.04),mode:'normal',engine:'normal',penalty:0,warnings:0,stops:0,retired:false,reason:'',usedDry:[],pitRequest:null,pitLog:[],drs:false,dirty:false,drsBroken:false,driveThrough:false,pitThisLap:false,plan:copy(strategy),planUsed:[],sectors:[]
    };
    let tyre=t.id===s.player.teamId&&!strategy.auto&&!sprint?strategy.start:initial>.65?'W':initial>.2?'I':sprint?'M':strategy.start;
    if(w.tyres[id][tyre]<=0)tyre=Object.keys(COMPOUNDS).find(k=>w.tyres[id][k]>0)||'H';
    useTyre(s,car,tyre);
    r.cars.push(car);
  }
  if(!sprint)for(const t of s.teams)t.pitLaneNext=[false,false];
  event(s,`${sprint?'冲刺赛':'正赛'}开始，${r.cars.length} 台赛车就位`);
  return '绿灯亮起';
}
export function raceCommand(s,id,command,value) {
  const r=s.race;
  requireCondition(r&&!r.finished,'当前无进行中的比赛');
  const c=r.cars.find(c=>c.driverId===id&&c.teamId===s.player.teamId);
  requireCondition(c&&!c.retired,'该赛车已退赛或不是本队赛车');
  if(command==='mode') {
    requireCondition(MODES[value],'驾驶指令无效');
    c.mode=value;
  }
  else if(command==='engine') {
    requireCondition(ENGINES[value],'引擎模式无效');
    c.engine=value;
  }
  else if(command==='pit') {
    requireCondition(COMPOUNDS[value]&&s.calendar.weekend.tyres[id][value]>0,'该配方没有新胎可用');
    c.pitRequest=value;
    event(s,`${c.name}：收到进站指令，本圈末换 ${value} 胎`,'radio');
  }
  else if(command==='cancelPit') {
    c.pitRequest=null;
  }
  else throw new Error('指令不存在');
  return '车手已确认指令';
}
export function resumeRed(s) {
  requireCondition(s.race?.red,'当前没有红旗');
  s.race.red=false;
  s.race.control='SC';
  s.race.controlLeft=2;
  event(s,'红旗解除，安全车带领重新发车','warning');
  return '比赛恢复';
}
export function pit(s,car,track) {
  const target=car.pitRequest;
  if(!target)return;
  car.pitRequest=null;
  if(!useTyre(s,car,target)) {
    event(s,`${car.name}：请求配方已用尽，取消进站`,'warning');
    return;
  }
  const ability=staffAbility(s,car.teamId,'mechanics');
  let stop=clamp(4.7-ability*.025+between(s,-.18,.18),2,4.5);
  if(s.staff.some(x=>x.teamId===car.teamId&&x.trait==='pit'))stop=Math.max(2,stop-.15);
  if(chance(s,.006+(100-ability)*.0003)) {
    stop+=between(s,7,14);
    event(s,`${car.name}：螺栓卡住，停站 ${stop.toFixed(1)} 秒`,'warning');
  }
  const loss=track.pitLoss*(s.race.control==='GREEN'?1:.58)+stop;
  car.time+=loss;
  car.stops++;
  car.pitThisLap=true;
  car.pitLog.push({
    lap:s.race.lap,compound:target,stop,loss
  });
  event(s,`${car.name} 进站：${target} 胎，停站 ${stop.toFixed(2)} 秒`,'pit');
  if(chance(s,.003)) {
    penalty(s,car,0,'维修区超速，罚穿越维修区');
    car.driveThrough=true;
  }
}
export function retire(s,c,reason) {
  if(c.retired)return;
  c.retired=true;
  c.reason=reason;
  event(s,`${c.name} 退赛：${reason}`,'danger');
}
export function reliability(s,c,track) {
  const t=teamOf(s,c.teamId),v=performance(s,t,c.slot),engine=ENGINES[c.engine];
  for(const def of PARTS) {
    if(def.id==='mguh'&&s.season.year>=2026)continue;
    const p=s.parts[t.id].cars[c.slot][def.id];
    p.wear=clamp(p.wear+(def.department==='power'?.17:.08)*track.wear*(def.department==='power'?engine.wear:1));
    // 每个部件整站基础故障约 0.5%—4%，按本站圈数摊分。
    const perRace=clamp(.005+Math.max(0,p.wear-30)*.0004+(100-v.reliability)*.00012+Math.max(0,track.temp-30)*.0002+(c.dirty?.002:0),.005,.04);
    if(chance(s,perRace*engine.wear/s.race.totalLaps)) {
      retire(s,c,def.name+' 故障');
      return;
    }
  }
}
export function controlEvents(s,track) {
  const r=s.race;
  if(r.controlLeft>0) {
    r.controlLeft--;
    if(r.controlLeft===0) {
      r.control='GREEN';
      event(s,'赛道恢复绿旗，DRS 将重新启用');
    }
  }
  if(r.lap%5===1) {
    const cell=r.forecast[Math.floor((r.lap-1)/5)];
    r.rain=cell?.rain||0;
    if(r.rain>.25&&r.wetness<.2)event(s,'雨带抵达赛道，注意轮胎交叉点','weather');
  }
  r.wetness=clamp(r.wetness+(r.rain-r.wetness)*.35,0,1);
  if(r.wetness>.15)r.weatherWet=true;
  if(r.control==='GREEN'&&chance(s,track.sc/r.totalLaps)) {
    r.control=chance(s,.58)?'SC':'VSC';
    r.controlLeft=3;
    event(s,r.control==='SC'?'安全车出动，维修区保持开放':'虚拟安全车启动','warning');
  }
  if(r.control==='GREEN'&&chance(s,.045/r.totalLaps)) {
    r.control='RED';
    r.red=true;
    event(s,'红旗：赛道需清理，比赛暂停','danger');
  }
}
export function tick(s,count=1,untilEvent=false) {
  const r=s.race;
  requireCondition(r&&!r.finished,'当前没有比赛');
  requireCondition(Number.isInteger(count)&&count>0&&count<=1000,'推进圈数无效');
  const track=currentTrack(s),sequence=r.sequence;
  for(let iteration=0; iteration<count&&!r.finished; iteration++) {
    if(r.red)break;
    r.lap++;
    controlEvents(s,track);
    if(r.red) {
      r.lap--;
      break;
    }
    const previous=r.cars.filter(c=>!c.retired).slice().sort((a,b)=>a.time-b.time);
    const previousTimes=Object.fromEntries(previous.map(c=>[c.driverId,c.time]));
    for(const [index,c]of previous.entries()) {
      c.pitThisLap=false;
      const ahead=previous[index-1],oldGap=ahead?previousTimes[c.driverId]-previousTimes[ahead.driverId]:999;
      c.dirty=oldGap<1.5&&r.control==='GREEN';
      c.drs=!!ahead&&oldGap<1&&r.lap>2&&r.wetness<.18&&r.control==='GREEN'&&!c.drsBroken;
      const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
      if(t.id!==s.player.teamId||c.plan.auto)aiRaceDecision(s,c,track);
      else{
        const planned=[c.plan.pitLap,c.plan.secondLap];
        for(let i=0; i<planned.length; i++)if(planned[i]===r.lap&&!c.planUsed.includes(i)) {
          c.pitRequest=c.plan.next;
          c.planUsed.push(i);
        }
        if(r.control!=='GREEN'&&c.plan.backup==='B'&&c.tyreAge>12&&r.totalLaps-r.lap>8)c.pitRequest=r.wetness>.23?c.plan.rain:'H';
        if(c.plan.backup==='C'&&r.wetness>.25&&!['I','W'].includes(c.compound))c.pitRequest=r.wetness>.7?'W':c.plan.rain;
      }
      const oldWear=c.tyreWear,oldFuel=c.fuel;
      let time=lapTime(s,c,track);
      c.tyreAge++;
      if(r.lap===1) {
        time+=(95-d.attributes.starts)*.024+between(s,-.3,.3);
        if(chance(s,.0015)) {
          time+=between(s,3,8);
          event(s,`${c.name} 起步拥挤中发生轻微接触`,'warning');
        }
      }
      if(r.control!=='GREEN') {
        time=track.baseTime*1.38+(time-track.baseTime)*.2;
        c.tyreTemperature-=25;
        c.tyreWear=oldWear+(c.tyreWear-oldWear)*.45;
        c.fuel=oldFuel-(oldFuel-c.fuel)*.65;
      }
      const calm=s.staff.some(x=>x.teamId===t.id&&x.trait==='calm')?.9:1;
      const human=t.id===s.player.teamId?DIFFICULTIES[s.settings.difficulty].mistake:1;
      const error=(100-d.attributes.consistency)*.000045*MODES[c.mode].risk*(1+r.wetness*3)*calm*human*(1.15-d.attributes.experience*.002);
      if(chance(s,error)) {
        time+=between(s,1,5);
        event(s,`${c.name} 锁死轮胎，损失时间`,'warning');
      }
      if(chance(s,.0015*MODES[c.mode].risk*(1.15-staffAbility(s,t.id,'sporting')*.002)))trackLimits(s,c);
      if(chance(s,.015/r.totalLaps)) {
        c.drsBroken=true;
        event(s,`${c.name}：DRS 失效`,'radio');
      }
      if(c.tyreWear>102&&chance(s,(c.tyreWear-100)*.012))retire(s,c,'轮胎爆胎');
      if(c.fuel<=0)retire(s,c,'燃油耗尽');
      reliability(s,c,track);
      if(c.retired)continue;
      if(c.driveThrough) {
        time+=track.pitLoss;
        c.driveThrough=false;
        event(s,`${c.name} 完成穿越维修区罚则`,'penalty');
      }
      c.lastLap=time;
      c.time+=time;
      c.lap=r.lap;
      c.sectors=[time*.32,time*.36,time*.32];
      c.best=Math.min(c.best,time);
      if(time<r.fastest.time&&r.control==='GREEN') {
        r.fastest={
          time,driverId:c.driverId
        };
      }
      pit(s,c,track);
      // 不能仅按自由空气圈速穿过对手：必须通过超车对抗，否则被限制在前车之后。
      if(ahead&&!ahead.retired&&c.time<ahead.time&&!ahead.pitThisLap&&!c.pitThisLap) {
        const rival=driverOf(s,ahead.driverId);
        const overtaking=clamp((1-track.overtake)*.6+(d.attributes.racecraft-rival.attributes.defending)*.006+(c.drs?.2:0)+(c.mode==='attack'?.12:0)-(ahead.mode==='defend'?.1:0),.025,.95);
        if(r.control!=='GREEN'||!chance(s,overtaking)) {
          c.time=ahead.time+between(s,.15,.45);
        }
        else{
          if(chance(s,.003*MODES[c.mode].risk*(1+r.wetness)*(.6+d.attributes.aggression*.008))) {
            retire(s,c,'争夺位置时发生碰撞');
            if(chance(s,.4))retire(s,ahead,'被卷入碰撞');
            if(chance(s,.35))penalty(s,c,10,'造成碰撞');
            if(chance(s,.08))pitLanePenalty(s,c,'危险驾驶');
          }
          else if(c.teamId===s.player.teamId||ahead.teamId===s.player.teamId)event(s,`${c.name} 超过 ${ahead.name}`,'overtake');
        }
      }
    }
    const active=r.cars.filter(c=>!c.retired).sort((a,b)=>a.time-b.time);
    if(r.control==='SC'&&active.length) {
      const lead=active[0].time;
      for(let i=1; i<active.length; i++)active[i].time=lead+Math.max(i*.8,(active[i].time-lead)*.65);
    }
    r.cars.sort((a,b)=>Number(a.retired)-Number(b.retired)||(a.retired?b.lap-a.lap:a.time-b.time));
    r.cars.forEach((c,i)=>c.position=i+1);
    r.positions.push({
      lap:r.lap,positions:r.cars.map(c=>({
        id:c.driverId,position:c.position
      }))
    });
    if(r.lap%10===0)r.segments.push({
      lap:r.lap,leader:r.cars[0].driverId,time:r.cars[0].time
    });
    if(r.lap>=r.totalLaps||!active.length)finishRace(s);
    if(untilEvent&&r.sequence!==sequence)break;
  }
  return r.finished?'比赛结束':r.red?'红旗暂停':`推进至第 ${r.lap} 圈`;
}
export function simulateToEnd(s) {
  let guard=0;
  while(s.race&&!s.race.finished&&guard++<10) {
    if(s.race.red)resumeRed(s);
    tick(s,1000);
  }
  requireCondition(s.race.finished,'比赛未能完成');
  return '比赛已模拟完毕';
}
export function finishRace(s) {
  const r=s.race,w=s.calendar.weekend,track=currentTrack(s);
  if(r.finished)return;
  for(const c of r.cars) {
    if(!r.sprint&&!(r.realtime?c.usedWet:r.weatherWet)&&!c.retired&&c.usedDry.length<2) {
      c.disqualified=true;
      event(s,`${c.name} 未使用两种干胎，取消本站资格`,'penalty');
    }
    if(!r.sprint&&track.id==='monaco'&&s.season.rules.monacoStops===2&&c.stops<2&&!c.retired) {
      c.disqualified=true;
      event(s,`${c.name} 未满足摩纳哥两停规则，取消资格`,'penalty');
    }
    c.time+=c.penalty;
  }
  r.cars.sort((a,b)=>Number(!!a.disqualified)-Number(!!b.disqualified)||b.lap-a.lap||a.time-b.time);
  const points=r.sprint?SPRINT_POINTS:RACE_POINTS;
  const fullDistance=r.cars[0]?.lap||r.totalLaps;
  const rows=r.cars.map((c,i)=> {
    const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId); const classified=!c.disqualified&&c.lap>=Math.floor(fullDistance*.9)&&c.lap>0; let awarded=classified?(points[i]||0):0; if(!r.sprint&&s.season.rules.fastestLap&&i<10&&classified&&r.fastest.driverId===d.id)awarded++; if(s.finance[t.id].disqualified)awarded=0; const row={
      driverId:d.id,name:d.name,teamId:t.id,position:i+1,time:c.time,lap:c.lap,grid:c.grid,points:awarded,classified,retired:c.retired,disqualified:!!c.disqualified,reason:c.reason,best:c.best,stops:c.stops,penalty:c.penalty,tyres:c.compound,kind:r.kind,round:s.calendar.round+1
    }; d.points+=awarded; t.points+=awarded; d.results.push(copy(row)); t.results.push(copy(row)); d.morale=clamp(d.morale+(awarded>0?3:-1)); d.fatigue=clamp(d.fatigue+(r.sprint?3:8)*(1+(100-d.attributes.fitness)*.01)); if(i===0&&classified&&!r.sprint) {
      d.wins++; t.wins++;
    }
    if(!r.sprint&&r.fastest.driverId===d.id)d.fastest++; return row;
  });
  r.result={
    year:s.season.year,kind:r.kind,round:s.calendar.round+1,track:track.name,rows,fastest:copy(r.fastest),penalties:copy(r.penalties),segments:copy(r.segments),events:copy(r.events)
  };
  r.finished=true;
  r.running=false;
  w.grids[r.kind]=r.cars.map(c=>c.driverId);
  w.index++;
  s.history.races.push(copy(r.result));
  if(!r.sprint) {
    s.calendar.events[s.calendar.round].result=copy(r.result);
    raceIncome(s,r.result);
    const t=teamOf(s),own=rows.filter(x=>x.teamId===t.id),successful=own.some(x=>x.points>0);
    t.confidence=clamp(t.confidence+(successful?3:-1.8)/DIFFICULTIES[s.settings.difficulty].tolerance);
    t.objectives.finish+=own.filter(x=>!x.retired&&!x.disqualified).length;
    t.objectives.points+=own.reduce((a,x)=>a+x.points,0);
    t.objectives.podiums+=own.filter(x=>x.position<=3&&x.classified).length;
    if(t.confidence<=0&&!s.season.gameOver)s.season.gameOver='董事会信心归零，你被解除车队经理职务。';
  }
  news(s,`${track.name}${r.sprint?'冲刺赛':'正赛'}：${rows[0]?.name||'无'} 获胜`);
}

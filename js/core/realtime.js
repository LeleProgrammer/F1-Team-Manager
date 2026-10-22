// Continuous, serializable discrete-event simulation. All event times are seconds.
import { currentTrack } from './calendar.js';
import { theoreticalLap, setupPenalty, tyreState } from './car.js';
import { MODES, ENGINES, COMPOUNDS } from '../data/parts.js';
import { teamOf, driverOf, clamp, copy, requireCondition, news } from './helpers.js';
import { between, chance } from './rng.js';
import { eliminationSize, trackLimits } from './rules.js';
import { aiRaceDecision } from './ai.js';
import { startRace, finishRace, event, useTyre, pit, retire, reliability, controlEvents, resumeRed } from './race.js';
import { SECTOR_ENDS, geometry, sectorMotion } from './trackGeometry.js';
const NEVER=1e12,EPS=1e-7;
export const PHASE_NAMES={GARAGE:'车库',OUT:'出场圈',FLY:'飞行圈',ABORT:'已放弃',IN:'回场圈',RACE:'比赛中',GRID:'等待出发',PIT:'维修区',FINISHED:'已冲线',ELIMINATED:'已淘汰'};
export function initCar(c,time=0){
  Object.assign(c,{phase:'RACE',progress:0,sector:0,segmentStart:time,segmentEnd:time,segmentDuration:0,lapStart:time,
    sectorStart:time,currentLap:0,speed:0,sectors:[],sectorSpeeds:[],sectorTones:[],bestSectors:[9999,9999,9999],lastSectors:[],lastSectorSpeeds:[],lastSectorTones:[],lapValid:true,finished:false,usedWet:['I','W'].includes(c.compound),crossings:[],nextRelease:NEVER,pitUntil:0,totalDistance:c.lap||0});
}
function startSegment(s,c){
  const r=s.race,track=currentTrack(s),t=teamOf(s,c.teamId),d=driverOf(s,c.driverId),fraction=SECTOR_ENDS[c.sector]-(SECTOR_ENDS[c.sector-1]||0);
  const tyres=tyreState(c,track,d,r.wetness,c.mode,s.staff.some(x=>x.teamId===t.id&&x.trait==='tyre'));
  const base=theoreticalLap(s,t,d,c.slot,track,!!r.qualifying)+setupPenalty(s.calendar.weekend.setups[t.id][c.slot],s.calendar.weekend.ideal[t.id][c.slot])+c.fuel*.03+tyres.loss+MODES[c.mode].pace+ENGINES[c.engine].pace+r.wetness*(7+(100-d.attributes.wet)*.07);
  let duration=Math.max(12,base*geometry(track.id).sectorWeights[c.sector]+between(s,-.06,.06));
  if(r.qualifying&&c.phase!=='FLY')duration*=c.phase==='OUT'?1.25:1.3;
  if(r.qualifying&&c.phase==='FLY'&&c.consecutive)duration*=.998;
  const ahead=r.cars.filter(x=>x!==c&&!x.retired&&!x.finished&&x.phase==='RACE'&&x.totalDistance>c.totalDistance).sort((a,b)=>a.totalDistance-b.totalDistance)[0];
  c.drs=!!ahead&&!r.qualifying&&r.control==='GREEN'&&c.lap>=(s.season.year>=2024?1:2)&&r.wetness<.18&&!c.drsBroken&&(ahead.totalDistance-c.totalDistance)*track.baseTime<1;
  c.dirty=!!ahead&&(ahead.totalDistance-c.totalDistance)*track.baseTime<1.5;
  if(c.drs)duration-=.4*fraction;if(c.dirty)duration+=.22*fraction;
  if(r.control==='SC')duration*=1.45;else if(r.control==='VSC')duration*=1.35;
  if(ahead&&ahead.lap===c.lap&&ahead.sector===c.sector&&ahead.segmentEnd>r.time&&ahead.segmentEnd>r.time+duration){
    const rival=driverOf(s,ahead.driverId),prob=clamp((1-track.overtake)*.6+(d.attributes.racecraft-rival.attributes.defending)*.006+(c.drs?.2:0)+(c.mode==='attack'?.12:0)-(ahead.mode==='defend'?.1:0),.025,.95);
    if(r.control!=='GREEN'||!chance(s,prob))duration=ahead.segmentEnd-r.time+.25;
    else if(c.teamId===s.player.teamId||ahead.teamId===s.player.teamId)event(s,`${d.code} 获得超车机会，正在进攻 ${rival.code}`,'overtake');
  }
  if(c.phase==='FLY'&&chance(s,(100-d.attributes.consistency)*.00025*(c.mode==='push'?1.8:1))){
    duration+=between(s,.3,1.1);if(chance(s,.35)){c.lapValid=false;event(s,`${d.code} 超出赛道边界，本圈成绩删除`,'warning');}
  }
  c.segmentStart=r.time;c.sectorStart=r.time;c.segmentDuration=duration;c.segmentEnd=r.time+duration;
  c.segmentWear=tyres.wear*fraction*(r.control==='GREEN'?1:.45)*(r.qualifying&&c.phase!=='FLY'?.6:1);
  c.segmentFuel=r.fuelPerLap*fraction*MODES[c.mode].fuel*ENGINES[c.engine].fuel*(r.control==='GREEN'?1:.65)*(r.qualifying&&c.phase!=='FLY'?.65:1);
  c.tyreTemperature=tyres.temperature-(r.control==='GREEN'?0:20);
}
export function refreshPositions(s){
  const r=s.race,track=currentTrack(s);
  for(const c of r.cars){
    if(['RACE','OUT','FLY','IN','ABORT'].includes(c.phase)&&!c.retired&&!c.finished){
      const f=clamp((r.time-c.segmentStart)/(c.segmentDuration||1),0,1),start=SECTOR_ENDS[c.sector-1]||0,width=SECTOR_ENDS[c.sector]-start;
      const motion=sectorMotion(track.id,c.sector,f);c.progress=start+width*motion.distance;c.speed=track.length*width/c.segmentDuration*3600*motion.rate;
      c.currentLap=Math.max(0,r.time-c.lapStart);c.totalDistance=c.lap+c.progress;
    }else{c.speed=0;if(c.phase==='PIT')c.currentLap=r.time-c.lapStart;}
  }
  if(r.qualifying)r.cars.sort((a,b)=>Number(a.phase==='ELIMINATED')-Number(b.phase==='ELIMINATED')||a.stageBest-b.stageBest||a.bestAt-b.bestAt||a.grid-b.grid);
  else r.cars.sort((a,b)=>Number(a.retired)-Number(b.retired)||(a.finished&&b.finished?b.lap-a.lap||a.time-b.time:b.totalDistance-a.totalDistance)||a.grid-b.grid);
  r.cars.forEach((c,i)=>{c.position=i+1;});
}
export function startRealtimeRace(s){startRace(s);s.settings.speed=1;attachRealtimeRace(s);return '绿灯亮起 · 1× 对应真实时间';}
export function attachRealtimeRace(s){
  const r=s.race;if(!r||r.realtime||r.finished)return;
  r.realtime=true;r.qualifying=false;r.time=r.lap?Math.min(...r.cars.filter(c=>!c.retired).map(c=>c.time),r.lap*currentTrack(s).baseTime):0;r.chequered=false;r.bestSectors=[9999,9999,9999];r.timeLimit=(r.sprint?1:2)*3600;
  for(const c of r.cars){const delay=r.lap?Math.max(0,c.time-r.time):(c.grid-1)*.15+(c.time>10?15:0);initCar(c,r.time);if(r.lap>0&&r.weatherWet)c.usedWet=true;if(c.retired){c.segmentEnd=NEVER;continue;}c.phase=delay?'GRID':'RACE';c.nextRelease=delay?r.time+delay:NEVER;c.segmentEnd=NEVER;if(!delay){prepareRaceLap(s,c);startSegment(s,c);}}
  refreshPositions(s);
}
function prepareRaceLap(s,c){
  const r=s.race,track=currentTrack(s);c.pitThisLap=false;
  if(c.teamId!==s.player.teamId||c.plan.auto)aiRaceDecision(s,c,track);
  else{
    [c.plan.pitLap,c.plan.secondLap].forEach((lap,i)=>{if(Number.isInteger(lap)&&lap>0&&lap===c.lap&&!c.planUsed.includes(i)){c.pitRequest=c.plan.next;c.planUsed.push(i);}});
    if(r.control!=='GREEN'&&c.plan.backup==='B'&&c.tyreAge>12&&r.totalLaps-c.lap>8)c.pitRequest=r.wetness>.23?c.plan.rain:'H';
    if(c.plan.backup==='C'&&r.wetness>.25&&!['I','W'].includes(c.compound))c.pitRequest=r.wetness>.7?'W':c.plan.rain;
  }
}
function completeSector(s,c){
  const r=s.race,track=currentTrack(s),sector=c.sector,dt=r.time-c.sectorStart,width=SECTOR_ENDS[sector]-(SECTOR_ENDS[sector-1]||0);
  c.tyreWear=clamp(c.tyreWear+c.segmentWear,0,130);c.fuel=Math.max(0,c.fuel-c.segmentFuel);
  c.sectors[sector]=dt;c.sectorSpeeds[sector]=track.length*width/dt*3600;
  const timing=!r.qualifying||c.phase==='FLY';
  c.sectorTones[sector]=!timing||!c.lapValid?'neutral':dt<r.bestSectors[sector]-EPS?'fastest':dt<c.bestSectors[sector]-EPS?'success':'warning';

  if(sector<2){c.sector++;startSegment(s,c);return;}
  c.progress=0;c.lap++;c.totalDistance=c.lap;c.tyreAge++;c.lastLap=r.time-c.lapStart;
  if(!c.lapValid)c.sectorTones=['neutral','neutral','neutral'];
  c.lastSectors=copy(c.sectors);c.lastSectorSpeeds=copy(c.sectorSpeeds);c.lastSectorTones=copy(c.sectorTones);
  if(timing&&c.lapValid&&r.control==='GREEN'){
    for(let i=0;i<3;i++){r.bestSectors[i]=Math.min(r.bestSectors[i],c.sectors[i]);c.bestSectors[i]=Math.min(c.bestSectors[i],c.sectors[i]);}
    c.best=Math.min(c.best,c.lastLap);
    if(c.lastLap<r.fastest.time)r.fastest={time:c.lastLap,driverId:c.driverId};
  }
  if(r.qualifying){qualCrossing(s,c);if(r.q.status==='RUNNING'&&oldFlying(c)&&chance(s,.0008))suspendQualifying(s);return;}
  c.time=r.time;c.crossings.push(r.time);if(c.crossings.length>100)c.crossings.shift();
  if(c.lap>r.lap){
    r.lap=c.lap;
    r.positions.push({lap:r.lap,positions:r.cars.map(x=>({id:x.driverId,position:x.position}))});
    if(r.lap%10===0)r.segments.push({lap:r.lap,leader:c.driverId,time:r.time});
    if(c.lap>=r.totalLaps||(r.limitFinishLap&&c.lap>=r.limitFinishLap)){r.chequered=true;event(s,'方格旗：领先车手完成比赛，其余车手在下一次过线结束','info');}
    if(!r.chequered){const old=r.control;controlEvents(s,track);if(old!==r.control)rescaleControl(s,old,r.control);}
  }
  if(r.chequered){c.finished=true;c.phase='FINISHED';c.segmentEnd=NEVER;return;}
  if(chance(s,(100-driverOf(s,c.driverId).attributes.consistency)*.000045*MODES[c.mode].risk)){c.penalty+=0;event(s,`${c.name} 锁死轮胎，下一段损失时间`,'warning');c.pendingDelay=between(s,1,3);}
  if(chance(s,.0015*MODES[c.mode].risk))trackLimits(s,c);
  if(c.tyreWear>102&&chance(s,(c.tyreWear-100)*.012))retire(s,c,'轮胎爆胎');
  if(chance(s,.015/r.totalLaps)){c.drsBroken=true;event(s,`${c.name} 的 DRS 发生故障`,'radio');}
  if(c.fuel<=0)retire(s,c,'燃油耗尽');
  reliability(s,c,track);if(c.retired){c.segmentEnd=NEVER;return;}
  prepareRaceLap(s,c);
  if(c.driveThrough&&r.control==='GREEN'){c.driveThrough=false;c.lapStart=r.time;c.phase='PIT';c.pitUntil=r.time+track.pitLoss;c.segmentEnd=NEVER;c.sectors=[];c.sectorTones=[];event(s,`${c.name} 执行穿越维修区罚则`,'penalty');return;}
  if(c.pitRequest){
    c.lapStart=r.time;const before=c.time;pit(s,c,track);const delay=c.time-before;c.time=before;
    if(delay>0){c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.phase='PIT';c.pitUntil=r.time+delay;c.segmentEnd=NEVER;c.usedWet=c.usedWet||['I','W'].includes(c.compound);return;}
  }
  c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.lapStart=r.time;c.lapValid=true;startSegment(s,c);
  if(c.pendingDelay){c.segmentDuration+=c.pendingDelay;c.segmentEnd+=c.pendingDelay;c.pendingDelay=0;}
}
function oldFlying(c){return c.phase==='FLY';}
export function suspendQualifying(s){
  const r=s.race;requireCondition(r?.qualifying&&!r.finished,'当前不是排位赛');r.red=true;r.control='RED';
  for(const c of r.cars)if(!['ELIMINATED','GARAGE'].includes(c.phase)){c.phase='GARAGE';c.segmentEnd=NEVER;c.nextRelease=NEVER;c.lapValid=false;c.progress=0;c.speed=0;}
  event(s,'排位红旗：倒计时冻结，进行中的圈作废；赛车返回车库等待恢复','danger');
}
function stageDuration(r){return (r.kind==='SQ'?[12,10,8]:[18,15,12])[r.q.stage-1]*60;}
export function startQualifying(s){
  const w=s.calendar.weekend,kind=w?.sessions[w.index];requireCondition(kind==='Q'||kind==='SQ','当前不是排位赛');requireCondition(!s.race||s.race.finished,'请先完成当前场次');
  const ids=s.teams.flatMap(t=>t.drivers),practiceOrder=w.practice.at(-1)?.rows.map(x=>x.id)||ids,q={kind,stage:1,active:ids,eliminated:[],stages:[],done:false,status:'RUNNING'};
  w.qualifying=q;
  const wet=w.weatherStart||0;
  s.race={realtime:true,qualifying:true,q,kind,sprint:false,totalLaps:0,lap:0,time:0,running:true,finished:false,red:false,control:'GREEN',controlLeft:0,sequence:0,events:[],penalties:[],cars:[],fastest:{time:9999,driverId:null},bestSectors:[9999,9999,9999],wetness:wet,rain:wet,fuelPerLap:currentTrack(s).length*.31,positions:[],segments:[],forecast:[],result:null};
  for(const t of s.teams)for(const [slot,id]of t.drivers.entries()){
    const c={driverId:id,name:driverOf(s,id).name,teamId:t.id,slot,grid:practiceOrder.indexOf(id)+1,position:practiceOrder.indexOf(id)+1,time:0,lastLap:0,best:9999,lap:0,compound:'S',tyreAge:0,tyreWear:0,tyreTemperature:80,fuel:0,mode:'push',engine:'normal',penalty:0,warnings:0,stops:0,retired:false,reason:'',usedDry:[],pitRequest:null,pitLog:[],drs:false,dirty:false,drsBroken:false,plan:{},planUsed:[],stageBest:9999,bestAt:NEVER,afterLap:'IN',autoQual:false};
    initCar(c);c.phase='GARAGE';s.race.cars.push(c);
  }
  s.settings.speed=1;beginQualStage(s);event(s,`${kind}1 开始，出场圈不计成绩，计时归零后仅允许完成已经开始的飞行圈`);
  return '排位开始 · 请下达出场指令';
}
function beginQualStage(s){
  const r=s.race,q=r.q;q.status='RUNNING';q.deadline=r.time+stageDuration(r);q.remaining=stageDuration(r);r.fastest={time:9999,driverId:null};r.bestSectors=[9999,9999,9999];
  for(const c of r.cars){
    c.phase=q.active.includes(c.driverId)?'GARAGE':'ELIMINATED';c.stageBest=9999;c.bestAt=NEVER;c.bestSectors=[9999,9999,9999];c.sectors=[];c.sectorSpeeds=[];c.lastSectors=[];c.lastSectorTones=[];c.sectorTones=[];c.currentLap=0;c.progress=0;c.sector=0;c.segmentEnd=NEVER;c.nextRelease=NEVER;c.stageTyre=null;c.hasSet=false;c.attempted=false;c.flyAttempted=false;
    if(c.phase==='GARAGE'&&(c.teamId!==s.player.teamId||c.autoQual))c.nextRelease=r.time+between(s,5,55);
  }
  refreshPositions(s);
}
export function allowedQualTyres(s,c){
  const r=s.race;if(r.wetness>.15)return ['S','M','H','I','W'];
  if(r.kind==='Q'&&s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id))return [['H','M','S'][r.q.stage-1]];
  return r.kind==='SQ'?[r.q.stage<3?'M':'S']:['S','M','H'];
}
function sendQual(s,c,compound,fresh=true){
  const r=s.race;requireCondition(r.q.status==='RUNNING'&&r.time<r.q.deadline,'本段已结束，禁止出场');requireCondition(c.phase==='GARAGE','车手尚未回到车库');
  requireCondition(allowedQualTyres(s,c).includes(compound),'本段只允许配方：'+allowedQualTyres(s,c).join(' / '));
  const regulated=r.kind==='SQ'&&r.wetness<=.15;
  if(regulated&&c.stageTyre){requireCondition(compound===c.stageTyre,'同一段冲刺排位仅可使用一套指定轮胎');fresh=false;}
  if(!fresh)requireCondition(c.hasSet&&c.compound===compound,'没有可复用的这套轮胎，请选择新胎');
  if(fresh){requireCondition(useTyre(s,c,compound),'该配方没有新胎可用');c.hasSet=true;c.stageTyre=compound;}
  c.fuel=r.fuelPerLap*7;c.phase='OUT';c.sector=0;c.progress=0;c.lapStart=r.time;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.afterLap='IN';c.outChoice='FLY';c.lapValid=true;c.nextRelease=NEVER;c.consecutive=false;c.attempted=true;
  event(s,`${driverOf(s,c.driverId).code} 离开车库 · ${compound} 胎出场圈`,'pit');startSegment(s,c);
}
export function qualCommand(s,id,command,value){
  const r=s.race,c=r?.cars.find(x=>x.driverId===id&&x.teamId===s.player.teamId);
  requireCondition(r?.qualifying&&!r.finished&&c&&!c.retired,'当前车手不能接收排位指令');
  if(command==='send')sendQual(s,c,value?.compound||allowedQualTyres(s,c)[0],value?.fresh!==false);
  else if(command==='auto'){
    c.autoQual=!c.autoQual;if(!c.autoQual)c.nextRelease=NEVER;if(c.autoQual&&c.phase==='GARAGE'&&r.q.status==='RUNNING')c.nextRelease=r.time+1;
  }
  else if(command==='fly'){requireCondition(c.phase==='OUT','仅在出场圈选择开始飞行圈');c.outChoice='FLY';}
  else if(command==='return'){
    requireCondition(['OUT','FLY','ABORT'].includes(c.phase),'当前阶段无法选择回站');
    if(c.phase==='OUT')c.outChoice='PIT';else c.afterLap='IN';
  }
  else if(command==='abort'){
    requireCondition(c.phase==='FLY','当前没有飞行圈');c.phase='ABORT';c.lapValid=false;c.afterLap='PIT';event(s,`${driverOf(s,id).code} 放弃本次飞行圈，圈末回 Pit`,'radio');
  }
  else if(command==='repeat'){requireCondition(c.phase==='FLY','当前没有飞行圈');c.afterLap='FLY';c.mode='push';}
  else throw new Error('排位指令无效');
  return '排位指令已确认';
}
function garage(s,c){
  const r=s.race;c.phase='GARAGE';c.progress=0;c.speed=0;c.segmentEnd=NEVER;c.currentLap=0;c.nextRelease=NEVER;
  if((c.teamId!==s.player.teamId||c.autoQual)&&r.time+currentTrack(s).baseTime*2.4<r.q.deadline)c.nextRelease=r.time+between(s,15,45);
}
function qualCrossing(s,c){
  const r=s.race,q=r.q,old=c.phase;
  if(old==='FLY'&&c.lapValid){
    if(c.lastLap<c.stageBest-EPS){c.stageBest=c.lastLap;c.bestAt=r.time;}
    event(s,`${driverOf(s,c.driverId).code} · ${c.lastLap.toFixed(3)} 秒${c.lastLap===r.fastest.time?' · 全场最快':''}`,c.lastLap===r.fastest.time?'fastest':'info');
  }
  if(old==='IN'||old==='ABORT'||(old==='OUT'&&c.outChoice==='PIT')){garage(s,c);return;}
  const canFly=r.time<q.deadline-EPS;
  if((old==='OUT'||(old==='FLY'&&c.afterLap==='FLY'))&&canFly&&c.fuel>r.fuelPerLap*2){
    c.phase='FLY';c.flyAttempted=true;c.consecutive=old==='FLY';c.afterLap=c.teamId!==s.player.teamId||c.autoQual?'FLY':'IN';
  }else c.phase='IN';
  c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.lapStart=r.time;c.lapValid=true;startSegment(s,c);
}
function endQualStage(s){
  const r=s.race,q=r.q,w=s.calendar.weekend;
  const rows=r.cars.filter(c=>q.active.includes(c.driverId)).sort((a,b)=>a.stageBest-b.stageBest||a.bestAt-b.bestAt||Number(b.flyAttempted)-Number(a.flyAttempted)||Number(b.attempted)-Number(a.attempted)||(a.qualRank||a.grid)-(b.qualRank||b.grid)).map(c=>({id:c.driverId,name:c.name,teamId:c.teamId,time:c.stageBest,stage:q.stage,compound:c.compound,noTime:c.stageBest>=9999,sectors:copy(c.bestSectors),achievedAt:c.bestAt}));
  q.stages.push(rows);
  // 107% is shown as a steward-review flag rather than inventing discretionary permission.
  if(q.stage===1&&r.wetness<=.15&&rows[0]?.time<9999)w.review107=rows.filter(x=>x.time>rows[0].time*1.07).map(x=>x.id);
  if(q.stage<3){
    rows.forEach((row,i)=>{const car=r.cars.find(c=>c.driverId===row.id);car.qualRank=i+1;});
    const n=eliminationSize(s.teams.length*2);q.eliminated=rows.slice(-n).concat(q.eliminated);q.active=rows.slice(0,-n).map(x=>x.id);q.status='BREAK';q.breakEnd=r.time+(r.kind==='Q'&&q.stage===2?480:420);q.remaining=q.breakEnd-r.time;
    for(const c of r.cars){c.phase=q.active.includes(c.driverId)?'GARAGE':'ELIMINATED';c.segmentEnd=NEVER;c.nextRelease=NEVER;c.progress=0;c.speed=0;}
    event(s,`${r.kind}${q.stage} 结束，${n} 台赛车淘汰；进入节间休息`,'info');
  }else{
    q.done=true;q.status='DONE';r.finished=true;r.running=false;w.grids[r.kind]=rows.concat(q.eliminated).map(x=>x.id);if(r.kind==='Q')w.q3=rows.map(x=>x.id);w.index++;
    for(const c of r.cars){c.phase='GARAGE';c.segmentEnd=NEVER;}
    news(s,`${r.kind} 排位结束：${rows[0]?.name||'无'} 获杆位`);
  }
}
export function skipQualBreak(s){requireCondition(s.race?.qualifying&&s.race.q.status==='BREAK','当前没有节间休息');advanceRealtime(s,s.race.q.breakEnd-s.race.time,true);return '节间休息已快进';}
function rescaleControl(s,old,next){
  const rate=x=>x==='SC'?1.45:x==='VSC'?1.35:1,ratio=rate(next)/rate(old);
  for(const c of s.race.cars)if(c.segmentEnd<NEVER&&c.segmentEnd>s.race.time){c.segmentStart=s.race.time-(s.race.time-c.segmentStart)*ratio;c.segmentEnd=s.race.time+(c.segmentEnd-s.race.time)*ratio;c.segmentDuration*=ratio;}
}
export function resumeRealtime(s){
  const r=s.race;if(r.qualifying){requireCondition(r.red,'当前没有红旗');r.red=false;r.control='GREEN';for(const c of r.cars)if(c.phase==='GARAGE'&&(c.teamId!==s.player.teamId||c.autoQual))c.nextRelease=r.time+between(s,5,25);return '排位恢复';}
  const old=r.control;resumeRed(s);rescaleControl(s,old,r.control);return '比赛恢复';
}
export function advanceRealtime(s,seconds,force=false){
  const r=s.race;requireCondition(r?.realtime,'当前没有实时场次');requireCondition(Number.isFinite(seconds)&&seconds>=0&&seconds<=40000,'时间步长无效');
  if(r.finished||r.red||(!r.running&&!force))return '';
  const target=r.time+seconds;let guard=0;
  while(!r.finished&&!r.red&&r.time<target-EPS&&guard++<100000){
    let next=target;if(!r.qualifying&&r.time<r.timeLimit-EPS)next=Math.min(next,r.timeLimit);
    if(r.qualifying){const q=r.q;if(q.status==='BREAK')next=Math.min(next,q.breakEnd);else if(r.time<q.deadline-EPS)next=Math.min(next,q.deadline);}
    for(const c of r.cars){if(c.retired||c.finished)continue;next=Math.min(next,c.segmentEnd,c.nextRelease,c.phase==='PIT'?c.pitUntil:NEVER);}
    r.time=next;refreshPositions(s);
    if(!r.qualifying&&!r.limitFinishLap&&r.time>=r.timeLimit-EPS){r.limitFinishLap=r.lap+2;event(s,'比赛时限已到，领先者将在下一圈结束时收到方格旗','warning');}
    // Stable ID order makes results independent of rendering cadence and sorted tower order.
    for(const c of r.cars.slice().sort((a,b)=>a.driverId.localeCompare(b.driverId))){
      if(c.retired||c.finished)continue;
      if(c.nextRelease<=r.time+EPS){
        c.nextRelease=NEVER;
        if(r.qualifying){if(r.q.status==='RUNNING'&&r.time<r.q.deadline-EPS&&c.phase==='GARAGE'){
          const preferred=r.wetness>.65?'W':r.wetness>.2?'I':r.kind==='SQ'&&r.q.stage<3?'M':'S',stock=s.calendar.weekend.tyres[c.driverId];
          const type=allowedQualTyres(s,c).find(k=>k===preferred&&(stock[k]>0||c.stageTyre===k))||allowedQualTyres(s,c).find(k=>stock[k]>0||c.stageTyre===k);
          if(type)sendQual(s,c,type,stock[type]>0);
        }}else{c.phase='RACE';c.lapStart=r.time;prepareRaceLap(s,c);startSegment(s,c);}
      }
      if(c.phase==='PIT'&&c.pitUntil<=r.time+EPS){c.phase='RACE';c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];startSegment(s,c);c.sectorStart=c.lapStart;}
      if(c.segmentEnd<=r.time+EPS&&['RACE','OUT','FLY','IN','ABORT'].includes(c.phase))completeSector(s,c);
    }
    if(r.qualifying){
      s.calendar.weekend.qualifying=r.q;const q=r.q;if(q.status==='BREAK'&&q.breakEnd<=r.time+EPS){q.stage++;beginQualStage(s);event(s,`${r.kind}${q.stage} 开始`);}
      else if(q.status==='RUNNING'&&r.time>=q.deadline-EPS&&!r.cars.some(c=>c.phase==='FLY'&&!c.retired))endQualStage(s);
      q.remaining=Math.max(0,(q.status==='BREAK'?q.breakEnd:q.deadline)-r.time);
    }else if(r.cars.every(c=>c.finished||c.retired))finishRace(s);
    refreshPositions(s);
  }
  requireCondition(guard<100000,'模拟事件上限已达到');return r.finished?'场次结束':r.red?'红旗暂停':'';
}
export function fastForwardLap(s){
  const r=s.race;requireCondition(r?.realtime&&!r.finished,'当前没有实时场次');
  requireCondition(!r.red,'当前红旗暂停，请先恢复场次');
  const leader=r.qualifying?r.cars.find(c=>c.teamId===s.player.teamId&&['FLY','OUT','IN','ABORT'].includes(c.phase))||r.cars.find(c=>['FLY','OUT','IN','ABORT'].includes(c.phase)):r.cars.find(c=>!c.retired&&!c.finished);
  if(!leader){advanceRealtime(s,Math.min(90,r.qualifying?r.q.remaining:90),true);return '已推进比赛时间';}
  const lap=leader.lap;let guard=0;
  while(!r.finished&&!r.red&&!leader.retired&&leader.lap===lap&&guard++<1000){
    const seconds=Math.max(.001,Math.min(leader.phase==='PIT'?leader.pitUntil-r.time:leader.phase==='GRID'?leader.nextRelease-r.time:leader.segmentEnd-r.time,60));advanceRealtime(s,seconds,true);
  }
  return '已快进至本圈结束';
}
export function finishRealtime(s){
  const r=s.race;requireCondition(r?.realtime,'当前没有实时场次');
  if(r.qualifying)for(const c of r.cars)if(c.teamId===s.player.teamId){c.autoQual=true;if(c.phase==='GARAGE')c.nextRelease=r.time+1;}
  let guard=0;while(!r.finished&&guard++<1000){if(r.red)resumeRealtime(s);advanceRealtime(s,60,true);}
  requireCondition(r.finished,'自动模拟未能结束');return '场次已模拟完毕';
}

import assert from 'node:assert/strict';
import { createGame, reduce } from '../js/core/state.js';
import { enterWeekend } from '../js/core/calendar.js';
import { practice, qualifying, startRace, tick } from '../js/core/race.js';
import { startQualifying, startRealtimeRace, advanceRealtime, fastForwardLap, finishRealtime, qualCommand, skipQualBreak, allowedQualTyres, suspendQualifying, resumeRealtime } from '../js/core/realtime.js';
import { exportText, importText } from '../js/core/save.js';
import { teamOf, copy } from '../js/core/helpers.js';
import { geometry, trackPoint } from '../js/core/trackGeometry.js';
import { TRACKS } from '../js/data/tracks.js';
import { assignDriverCodes, setDriverCode } from '../js/core/driverCodes.js';
const results=[];
function test(name,fn){try{fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.error('FAIL',name,e.stack);process.exitCode=1;}}
function setup({year=2025,custom=false,sprint=false,track=null,seed='live-test'}={}){
 const s=createGame({year,custom,teamId:'mclaren',seed});
 if(track)s.calendar.round=s.calendar.events.findIndex(e=>e.track===track);
 else if(sprint)s.calendar.round=s.calendar.events.findIndex(e=>e.sprint);
 if(track){const date=new Date(s.calendar.events[s.calendar.round].date+'T00:00:00Z');date.setUTCDate(date.getUTCDate()-3);s.calendar.date=date.toISOString().slice(0,10);}
 enterWeekend(s);while(s.calendar.weekend.sessions[s.calendar.weekend.index]?.startsWith('FP'))practice(s);
 return s;
}
function qgame(opts){const s=setup(opts);startQualifying(s);return s;}
function own(s){return s.race.cars.find(c=>c.driverId===teamOf(s).drivers[0]);}
function rgame(opts){const s=setup(opts);while(!['RACE','SPRINT'].includes(s.calendar.weekend.sessions[s.calendar.weekend.index])){const k=s.calendar.weekend.sessions[s.calendar.weekend.index];if(k.startsWith('FP'))practice(s);else qualifying(s,'push',true);}startRealtimeRace(s);return s;}
function send(s,c=own(s),compound='S'){qualCommand(s,c.driverId,'send',{compound});return c;}
function cross(s,c){const old=c.lap;let guard=0;while(c.lap===old&&!s.race.finished&&guard++<30){const until=c.phase==='GRID'?c.nextRelease:c.phase==='PIT'?c.pitUntil:c.segmentEnd;advanceRealtime(s,Math.max(.001,until-s.race.time),true);}assert.ok(guard<30);}
function quietAI(s){for(const c of s.race.cars)c.nextRelease=1e12;}

test('连续秒数：1 秒推进 1 秒，不提前结算整圈，赛车独立移动',()=>{
 const s=rgame();const fuel=own(s).fuel;advanceRealtime(s,1);assert.equal(s.race.time,1);assert.equal(s.race.lap,0);assert.ok(s.race.cars[0].progress>0);assert.equal(s.race.cars[0].lastLap,0);assert.equal(own(s).fuel,fuel);advanceRealtime(s,35);assert.ok(s.race.cars.some(c=>c.sectors.length===1));assert.equal(s.race.lap,0);
});
test('真实赛道轮廓 25 条：闭合路径，位置查询有限且随进度变化',()=>{for(const id of Object.keys(TRACKS)){const g=geometry(id);assert.ok(g.points.length>20);assert.deepEqual(trackPoint(id,0),trackPoint(id,1));assert.ok(trackPoint(id,.5).every(Number.isFinite));assert.notDeepEqual(trackPoint(id,.1),trackPoint(id,.5));}});
test('三字母缩写唯一，支持自建中文名与修改，拒绝冲突',()=>{const s=createGame({custom:true,driverNames:['甲','乙']});assert.equal(new Set(s.drivers.map(d=>d.code)).size,s.drivers.length);const d=teamOf(s).drivers[0];setDriverCode(s,d,'LEE');assert.equal(s.drivers.find(x=>x.id===d).code,'LEE');assert.throws(()=>setDriverCode(s,d,'VER'));assert.throws(()=>setDriverCode(s,d,'A1'));assignDriverCodes(s);assert.ok(s.drivers.every(d=>/^[A-Z]{3}$/.test(d.code)));});
test('排位：出场圈不计成绩 → 飞行圈有效 → 默认回场圈 → 车库',()=>{
 const s=qgame(),c=send(s);quietAI(s);cross(s,c);assert.equal(c.phase,'FLY');assert.equal(c.stageBest,9999);const flyStart=s.race.time;cross(s,c);assert.equal(c.phase,'IN');assert.ok(c.stageBest<9999);assert.ok(Math.abs(c.stageBest-(s.race.time-flyStart))<1e-8);assert.ok(Math.abs(c.lastSectors.reduce((a,b)=>a+b,0)-c.lastLap)<1e-7);assert.ok(c.lastSectorSpeeds.every(v=>v>0));const best=c.stageBest;cross(s,c);assert.equal(c.phase,'GARAGE');assert.equal(c.stageBest,best);
});
test('出场圈可直接回 Pit；中途放弃飞行圈不会记录圈速',()=>{
 const s=qgame(),c=send(s);quietAI(s);qualCommand(s,c.driverId,'return');cross(s,c);assert.equal(c.phase,'GARAGE');assert.equal(c.stageBest,9999);send(s,c);cross(s,c);assert.equal(c.phase,'FLY');advanceRealtime(s,10);qualCommand(s,c.driverId,'abort');assert.equal(c.phase,'ABORT');cross(s,c);assert.equal(c.phase,'GARAGE');assert.equal(c.stageBest,9999);assert.equal(s.race.fastest.time,9999);
});
test('连续飞行圈不瞬移、不补油、不消耗另一套胎，可再切回回场圈',()=>{
 const s=qgame(),c=send(s);quietAI(s);cross(s,c);const stock=s.calendar.weekend.tyres[c.driverId].S,fuel=c.fuel;qualCommand(s,c.driverId,'repeat');cross(s,c);assert.equal(c.phase,'FLY');assert.equal(c.consecutive,true);assert.equal(s.calendar.weekend.tyres[c.driverId].S,stock);assert.ok(c.fuel<fuel);qualCommand(s,c.driverId,'return');cross(s,c);assert.equal(c.phase,'IN');
});
test('倒计时归零：已开始的飞行圈可完成，禁止新的飞行圈与车库出场',()=>{
 const s=qgame(),c=send(s);quietAI(s);cross(s,c);qualCommand(s,c.driverId,'repeat');s.race.q.deadline=s.race.time+1;advanceRealtime(s,2);assert.equal(s.race.q.remaining,0);assert.equal(s.race.q.status,'RUNNING');assert.equal(c.phase,'FLY');cross(s,c);assert.ok(c.stageBest<9999);assert.equal(s.race.q.status,'BREAK');assert.throws(()=>qualCommand(s,c.driverId,'send',{compound:'S'}));
});
test('出场圈在归零后过线，不得获得飞行圈成绩',()=>{
 const s=qgame(),c=send(s);quietAI(s);s.race.q.deadline=s.race.time+1;advanceRealtime(s,2);assert.equal(s.race.q.status,'BREAK');assert.equal(c.stageBest,9999);assert.equal(s.race.fastest.time,9999);
});
test('22 车晋级、各段计时重置与 7/8 分钟节间休息',()=>{
 const s=qgame({custom:true});quietAI(s);assert.equal(s.race.q.remaining,1080);advanceRealtime(s,1080);assert.equal(s.race.q.active.length,16);assert.equal(s.race.q.remaining,420);skipQualBreak(s);assert.equal(s.race.q.stage,2);assert.equal(s.race.q.remaining,900);quietAI(s);advanceRealtime(s,900);assert.equal(s.race.q.active.length,10);assert.equal(s.race.q.remaining,480);skipQualBreak(s);assert.equal(s.race.q.remaining,720);quietAI(s);advanceRealtime(s,720);assert.equal(s.race.finished,true);assert.equal(s.calendar.weekend.grids.Q.length,22);assert.equal(s.race.q.stages.length,3);
});
test('冲刺排位 12/10/8 分钟、指定胎与每段一套限制',()=>{
 const s=qgame({sprint:true}),c=own(s);s.race.wetness=0;quietAI(s);assert.equal(s.race.kind,'SQ');assert.equal(s.race.q.remaining,720);assert.deepEqual(allowedQualTyres(s,c),['M']);assert.throws(()=>send(s,c,'S'));send(s,c,'M');const stock=s.calendar.weekend.tyres[c.driverId].M;qualCommand(s,c.driverId,'return');cross(s,c);send(s,c,'M');assert.equal(s.calendar.weekend.tyres[c.driverId].M,stock);qualCommand(s,c.driverId,'return');cross(s,c);advanceRealtime(s,s.race.q.deadline-s.race.time);skipQualBreak(s);assert.equal(s.race.q.remaining,600);quietAI(s);advanceRealtime(s,600);skipQualBreak(s);assert.equal(s.race.q.remaining,480);assert.deepEqual(allowedQualTyres(s,c),['S']);
});
test('2023 匈牙利 / 意大利 ATA 排位 H / M / S',()=>{for(const track of ['hungary','italy']){const s=qgame({year:2023,track});s.race.wetness=0;assert.deepEqual(allowedQualTyres(s,own(s)),['H']);}});
test('同一时间与指令：大步推进与逐秒推进事件 / RNG / 圈速相同',()=>{
 const a=qgame(),b=copy(a);send(a);send(b);advanceRealtime(a,400);for(let i=0;i<400;i++)advanceRealtime(b,1);assert.equal(a.rng,b.rng);assert.deepEqual(a.race.events,b.race.events);assert.deepEqual(a.race.cars.map(c=>[c.driverId,c.stageBest,c.progress,c.phase]),b.race.cars.map(c=>[c.driverId,c.stageBest,c.progress,c.phase]));
});
test('实时场次中途保存加载，排位与正赛后续逐字段一致',()=>{
 for(const init of [qgame,rgame]){const a=init();if(a.race.qualifying)send(a);advanceRealtime(a,55);const b=importText(exportText(a));finishRealtime(a);finishRealtime(b);assert.deepEqual(a,b);}
});
test('暂停不推进时钟，手动快进一圈可用且保持暂停',()=>{const s=rgame();s.race.running=false;advanceRealtime(s,30);assert.equal(s.race.time,0);fastForwardLap(s);assert.equal(s.race.lap,1);assert.equal(s.race.running,false);});
test('进站损失实际占用比赛时间，坑位期间赛车停止，圈速包含该损失',()=>{
 const s=rgame(),c=own(s);c.plan.auto=false;c.plan.pitLap=1;c.plan.secondLap=0;cross(s,c);assert.equal(c.phase,'PIT');assert.equal(c.stops,1);const time=s.race.time,delay=c.pitUntil-time;assert.ok(delay>15);advanceRealtime(s,delay/2,true);assert.equal(c.phase,'PIT');assert.equal(c.speed,0);advanceRealtime(s,c.pitUntil-s.race.time,true);assert.equal(c.phase,'RACE');cross(s,c);assert.ok(c.lastLap>80+delay*.8);assert.ok(c.usedDry.includes('H'));
});
test('方格旗按各车下一次过线结算，套圈车不补跑完整距离',()=>{
 const s=rgame(),slow=s.race.cars.at(-1);s.race.totalLaps=5;advanceRealtime(s,10);for(const c of s.race.cars){c.fuel=100;c.plan.auto=true;}slow.segmentEnd+=200;slow.segmentDuration+=200;finishRealtime(s);assert.equal(s.race.finished,true);const row=s.race.result.rows.find(c=>c.driverId===slow.driverId);assert.ok(row.lap<5);assert.ok(s.race.result.rows.every(c=>c.lap<=5));assert.equal(s.race.result.rows.length,20);
});
test('四季实时冲刺 / 排位 / 正赛可完整结算，积分守恒',()=>{
 for(const year of [2022,2023,2024,2025]){const s=setup({year,sprint:true,custom:true});while(s.calendar.weekend.index<s.calendar.weekend.sessions.length){const k=s.calendar.weekend.sessions[s.calendar.weekend.index];if(k.startsWith('FP'))practice(s);else{if(k==='Q'||k==='SQ')startQualifying(s);else{for(const id of teamOf(s).drivers)s.calendar.weekend.strategy[id].auto=true;startRealtimeRace(s);}finishRealtime(s);}}assert.equal(s.history.races.length,2);assert.ok(s.race.result.rows.every(r=>Number.isFinite(r.time)));assert.equal(s.teams.reduce((n,t)=>n+t.points,0),s.history.races.flatMap(r=>r.rows).reduce((n,r)=>n+r.points,0));}
});
test('正赛跨不同时间步长推进：RNG、事件与位置逐字段一致',()=>{const a=rgame(),b=copy(a);advanceRealtime(a,1000);for(let i=0;i<1000;i++)advanceRealtime(b,1);assert.deepEqual(a,b);});
test('红旗冻结排位倒计时与无效进行中圈，恢复后可复用轮胎出场',()=>{const s=qgame(),c=send(s);quietAI(s);cross(s,c);const remaining=s.race.q.remaining;suspendQualifying(s);advanceRealtime(s,200);assert.equal(s.race.q.remaining,remaining);assert.equal(c.phase,'GARAGE');assert.equal(c.stageBest,9999);resumeRealtime(s);qualCommand(s,c.driverId,'send',{compound:'S',fresh:false});assert.equal(c.phase,'OUT');});
test('比赛时限结束，领先者在下一圈末冲线而非立即结束',()=>{const s=rgame();s.race.timeLimit=1;s.race.totalLaps=10;advanceRealtime(s,1);assert.equal(s.race.chequered,false);assert.equal(s.race.limitFinishLap,2);fastForwardLap(s);assert.equal(s.race.lap,1);assert.equal(s.race.chequered,false);finishRealtime(s);assert.equal(s.race.result.rows[0].lap,2);});
test('自动出场关闭后取消尚未执行的出场计划',()=>{const s=qgame(),c=own(s);quietAI(s);qualCommand(s,c.driverId,'auto');qualCommand(s,c.driverId,'auto');advanceRealtime(s,10);assert.equal(c.phase,'GARAGE');assert.equal(c.autoQual,false);});
test('旧版逐圈比赛存档升级，保留圈数、轮胎磨损与可恢复的实时场次',()=>{const s=setup();while(s.calendar.weekend.sessions[s.calendar.weekend.index]!=='RACE')qualifying(s,'push',true);startRace(s);tick(s,4);s.schemaVersion=2;const lap=s.race.lap,wear=s.race.cars[0].tyreWear,id=s.race.cars[0].driverId;const migrated=importText(exportText(s));assert.equal(migrated.schemaVersion,3);assert.equal(migrated.race.realtime,true);assert.equal(migrated.race.lap,lap);assert.equal(migrated.race.cars.find(c=>c.driverId===id).tyreWear,wear);finishRealtime(migrated);assert.equal(migrated.race.finished,true);});
test('实时存档拒绝非法赛段索引和负时钟',()=>{const s=rgame();s.race.cars[0].sector=99;assert.throws(()=>importText(exportText(s)));s.race.cars[0].sector=0;s.race.time=-1;assert.throws(()=>importText(exportText(s)));});
test('新场次默认 1×，保留暂停操作与既有设置的其他内容',()=>{const s=setup();s.settings.speed=64;startQualifying(s);assert.equal(s.settings.speed,1);finishRealtime(s);s.settings.speed=32;startRealtimeRace(s);assert.equal(s.settings.speed,1);});
test('新版 action 全程推进 2025：24 站、30 场比赛、中途存档恢复与季末',()=>{
 let s=createGame({year:2025,seed:'full-live-season',custom:true});s.finance.custom.cash=5000;teamOf(s).confidence=100;let weekends=0;
 while(!s.season.offseason){reduce(s,'enterWeekend');const w=s.calendar.weekend;for(const id of teamOf(s).drivers)w.strategy[id].auto=true;
  while(w.index<w.sessions.length){const k=w.sessions[w.index];if(k.startsWith('FP'))reduce(s,'practice');else{reduce(s,k==='Q'||k==='SQ'?'startQualifying':'startRace');reduce(s,'finishRace');assert.equal(s.race.finished,true);}}
  reduce(s,'closeWeekend');weekends++;assert.equal(s.season.gameOver,null);if(weekends%6===0)s=importText(exportText(s));
 }
 assert.equal(weekends,24);assert.equal(s.history.races.length,30);assert.equal(s.history.seasons.length,1);
});
console.log(JSON.stringify({tests:results},null,2));

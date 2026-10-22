import assert from 'node:assert/strict';
import { performance as clock } from 'node:perf_hooks';
import { createGame, reduce, setState, getState, dispatch } from '../js/core/state.js';
import { practice, qualifying, startRace, simulateToEnd, tick, resumeRed, raceCommand } from '../js/core/race.js';
import { enterWeekend, currentTrack, advanceDays } from '../js/core/calendar.js';
import { closeWeekend, nextSeason } from '../js/core/season.js';
import { startProject, advanceRND } from '../js/core/rnd.js';
import { fitPart, performance, theoreticalLap } from '../js/core/car.js';
import { teamOf, copy } from '../js/core/helpers.js';
import { checkBudget, seasonRules, trackLimits } from '../js/core/rules.js';
import { signDriver, renewDriver, releaseDriver } from '../js/core/drivers.js';
import { hireStaff, renewStaff, fireStaff } from '../js/core/staff.js';
import { importText, exportText, saveSlot, loadSlot } from '../js/core/save.js';
import { random } from '../js/core/rng.js';
import { LINEUPS } from '../js/data/teams.js';
const results=[];
function test(name,fn){try{fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',message:e.stack});console.error('FAIL',name,e);process.exitCode=1;}}
function game(year=2025,custom=false,seed='test'){return createGame({year,custom,teamId:'mclaren',seed,difficulty:'easy',driverNames:['测试车手甲','测试车手乙']});}
function session(s){const w=s.calendar.weekend,k=w.sessions[w.index];if(k?.startsWith('FP'))practice(s);else if(k==='Q'||k==='SQ')qualifying(s,'push',true);else if(k==='RACE'||k==='SPRINT'){for(const id of teamOf(s).drivers)w.strategy[id].auto=true;startRace(s);simulateToEnd(s);}else throw new Error('未知场次 '+k);}
function weekend(s){enterWeekend(s);while(s.calendar.weekend.index<s.calendar.weekend.sessions.length)session(s);closeWeekend(s);}

test('四个赛季真实开季阵容与 22/24 站赛历',()=>{for(const year of [2022,2023,2024,2025]){const s=game(year);assert.equal(s.teams.length,10);assert.equal(s.calendar.events.length,year<=2023?22:24);for(const t of s.teams)assert.deepEqual(t.drivers,LINEUPS[year][t.id]);assert.equal(new Set(s.teams.flatMap(t=>t.drivers)).size,20);assert.equal(s.season.rules.fastestLap,year<=2024);}});
test('40 个历史车队开局分别完成首个周末',()=>{
 for(const year of [2022,2023,2024,2025])for(const teamId of Object.keys(LINEUPS[year])){
  const s=createGame({year,teamId,difficulty:'easy',seed:'entry-'+year+'-'+teamId});
  weekend(s);assert.equal(s.calendar.round,1);assert.equal(s.player.teamId,teamId);
 }
});
test('自建第十一队：厂商、客户及自定义车手',()=>{for(const type of ['factory','customer']){const s=createGame({year:2024,custom:true,type,name:'测试 Racing',abbr:'TES',logo:23,driverNames:['甲','乙'],seed:'new'});assert.equal(s.teams.length,11);assert.equal(s.finance.custom.cash,type==='factory'?36:43);assert.equal(teamOf(s).logo,23);assert.equal(s.drivers.find(d=>d.id===teamOf(s).drivers[0]).name,'甲');assert.equal(teamOf(s).facilities.factory.level,1);}});
test('种子重现，存档保持 RNG 状态',()=>{const a=game(),b=game();assert.deepEqual(a,b);for(let i=0;i<100;i++)assert.equal(random(a),random(b));const clone=importText(exportText(a));assert.equal(random(a),random(clone));});
test('损坏 JSON 与非法字段安全拒绝',()=>{assert.throws(()=>importText('{bad'));const s=game();s.drivers[0].attributes.pace=999;assert.throws(()=>importText(exportText(s)));assert.throws(()=>importText('{"schemaVersion":100}'));});
test('三个手动槽位和自动存档，无浏览器依赖',()=>{const store=new Map();globalThis.localStorage={setItem:(k,v)=>store.set(k,v),getItem:k=>store.get(k)||null,removeItem:k=>store.delete(k)};for(const slot of ['auto','1','2','3']){const s=game();saveSlot(s,slot);assert.deepEqual(loadSlot(slot),s);}});
test('研发 → 制造 → 单套装车，只影响指定赛车',()=>{const s=game(2024),t=teamOf(s);t.wind.limit=10000;t.cfd.limit=10000;let attempts=0;while(!s.parts[t.id].stock.length&&attempts++<10){startProject(s,'floor','development',1);advanceRND(s,80);}assert.ok(s.parts[t.id].stock.length);const spec=s.parts[t.id].stock[0],before=performance(s,t,0).downforce,other=performance(s,t,1).downforce;fitPart(s,spec.id,0);assert.ok(performance(s,t,0).downforce>before);assert.equal(performance(s,t,1).downforce,other);assert.ok(t.wind.used>0);});
test('客户车队引擎限制、风洞额度与现金拦截',()=>{const s=game(),t=teamOf(s);assert.throws(()=>startProject(s,'ice'));t.wind.limit=0;assert.throws(()=>startProject(s,'floor'));s.finance[t.id].cash=0;assert.throws(()=>startProject(s,'brakes'));});
test('原子 action：失败不会修改当前状态',()=>{setState(game());const old=copy(getState());assert.throws(()=>dispatch('project',{part:'ice'}));assert.deepEqual(getState(),old);});
test('四季两条开局：完整练习、排位、正赛与结算',()=>{for(const year of [2022,2023,2024,2025])for(const custom of [false,true]){const s=game(year,custom,'weekend-'+year);weekend(s);assert.equal(s.calendar.round,1);assert.equal(s.history.races.filter(r=>r.kind==='RACE').length,1);const result=s.history.races.at(-1);assert.equal(result.rows.length,custom?22:20);assert.equal(result.rows.reduce((a,r)=>a+r.points,0),s.teams.reduce((a,t)=>a+t.points,0));assert.ok(result.rows.every(r=>Number.isFinite(r.time)));assert.equal(s.calendar.events[0].completed,true);}});
test('22 车排位 Q1/Q2 各淘汰六车',()=>{const s=game(2025,true);enterWeekend(s);while(s.calendar.weekend.sessions[s.calendar.weekend.index].startsWith('FP'))practice(s);qualifying(s);assert.equal(s.calendar.weekend.qualifying.active.length,16);qualifying(s);assert.equal(s.calendar.weekend.qualifying.active.length,10);qualifying(s);assert.equal(s.calendar.weekend.grids.Q.length,22);});
test('各年份冲刺周末流程与正赛发车网格',()=>{for(const year of [2022,2023,2024,2025]){const s=game(year,true,'sprint-'+year);s.calendar.round=s.calendar.events.findIndex(e=>e.sprint);enterWeekend(s);const sessions=s.calendar.weekend.sessions;assert.deepEqual(sessions,year===2022?['FP1','Q','FP2','SPRINT','RACE']:year===2023?['FP1','Q','SQ','SPRINT','RACE']:['FP1','SQ','SPRINT','Q','RACE']);while(s.calendar.weekend.index<sessions.length)session(s);assert.equal(s.history.races.length,2);assert.equal(s.history.races[0].kind,'SPRINT');assert.equal(s.history.races[1].kind,'RACE');}});
test('赛事中存档：相同指令重放逐字段一致',()=>{const a=game(2024);enterWeekend(a);while(!['RACE','SPRINT'].includes(a.calendar.weekend.sessions[a.calendar.weekend.index]))session(a);startRace(a);tick(a,5);if(a.race.red)resumeRed(a);const b=importText(exportText(a));simulateToEnd(a);simulateToEnd(b);assert.deepEqual(a,b);});
test('预算帽调查与现金独立，重度超支取消积分',()=>{const s=game(),t=teamOf(s),f=s.finance[t.id];const cash=f.cash;f.capUsed=f.capLimit+20;t.points=5;checkBudget(s,t);assert.ok(f.cash<cash);assert.equal(f.disqualified,true);assert.equal(t.points,0);assert.ok(t.wind.limit<250);});
test('车手签入、续约、解约与员工合同',()=>{const s=game(),t=teamOf(s);s.finance[t.id].cash=1000;const free=s.drivers.find(d=>!d.teamId);let i=0;while(free.teamId!==t.id&&i++<30)signDriver(s,free.id,0,free.contract.salary*2,3);assert.equal(free.teamId,t.id);renewDriver(s,free.id,free.contract.salary,4);assert.equal(free.contract.years,4);releaseDriver(s,free.id);assert.equal(free.teamId,null);const existing=s.staff.find(e=>e.teamId===t.id);renewStaff(s,existing.id,existing.salary,4);assert.equal(existing.years,4);fireStaff(s,existing.id);assert.equal(existing.teamId,null);let tries=0;while(existing.teamId!==t.id&&tries++<30)hireStaff(s,existing.id,existing.salary*2,2);assert.equal(existing.teamId,t.id);});
test('完整 2025 → 2026 赛季结算、转会窗与新规',()=>{const s=game(2025,false,'season');s.finance.mclaren.cash=2000;teamOf(s).confidence=100;while(!s.season.offseason){weekend(s);if(s.season.gameOver)throw new Error(s.season.gameOver);}assert.equal(s.history.seasons.length,1);assert.equal(s.history.seasons[0].year,2025);const t=teamOf(s);for(const id of t.drivers){const d=s.drivers.find(x=>x.id===id);d.contract.years=3;d.retired=false;}s.staff.find(e=>e.teamId===t.id&&e.role==='principal').years=3;nextSeason(s);assert.equal(s.season.year,2026);assert.equal(s.season.rules.major,true);assert.equal(s.calendar.round,0);assert.equal(s.finance[t.id].capUsed,0);assert.ok(s.teams.every(t=>t.points===0));assert.ok(s.drivers.every(d=>d.points===0));assert.equal(s.parts[t.id].cars[0].ice.used,1);});
test('SC、雨地、红旗恢复、进站、赛道限制与 DRS 距离',()=>{
 const s=game(2024,false,'event-check');enterWeekend(s);
 while(!['RACE','SPRINT'].includes(s.calendar.weekend.sessions[s.calendar.weekend.index]))session(s);
 startRace(s);const r=s.race,c=r.cars.find(c=>c.teamId===s.player.teamId);
 r.control='SC';r.controlLeft=3;r.wetness=.8;for(const cell of r.forecast)cell.rain=.8;
 raceCommand(s,c.driverId,'pit','H');tick(s,1);
 assert.equal(c.stops,1);assert.equal(c.compound,'H');assert.equal(r.weatherWet,true);
 for(let i=0;i<4;i++)trackLimits(s,c);assert.equal(c.penalty,5);
 r.red=true;r.control='RED';resumeRed(s);assert.equal(r.control,'SC');assert.equal(r.red,false);
 r.control='GREEN';r.controlLeft=0;r.wetness=0;r.rain=0;r.lap=3;
 for(const cell of r.forecast)cell.rain=0;
 const active=r.cars.filter(c=>!c.retired);active.forEach((car,i)=>{car.time=i*3;car.pitRequest=null;car.plan.auto=false;car.plan.pitLap=40;car.plan.secondLap=0;});
 tick(s,1);assert.equal(active[1].drs,false,'相隔三秒不应开启 DRS');
});
test('预算帽升级处罚保持积分明细与总积分一致',()=>{
 const s=game(2025,false,'audit');weekend(s);const t=teamOf(s),f=s.finance[t.id];
 f.capUsed=f.capLimit+1;checkBudget(s,t);assert.equal(f.audited,true);assert.equal(f.disqualified,false);
 f.capUsed=f.capLimit+30;checkBudget(s,t);assert.equal(f.disqualified,true);
 assert.equal(t.results.reduce((a,r)=>a+r.points,0),0);
 assert.equal(s.history.races.flatMap(r=>r.rows).filter(r=>r.teamId===t.id).reduce((a,r)=>a+r.points,0),0);
});
test('500 圈模拟性能：十场 50 圈总计少于 1000 ms（不含 DOM 与存档）',()=>{
 const states=[];
 for(let i=0;i<10;i++){
  const s=game(2024,true,'speed-'+i);enterWeekend(s);
  while(!['RACE','SPRINT'].includes(s.calendar.weekend.sessions[s.calendar.weekend.index]))session(s);
  startRace(s);s.race.totalLaps=50;s.race.fuelPerLap=1.5;
  for(const c of s.race.cars){c.fuel=100;c.plan.auto=true;}
  states.push(s);
 }
 const start=clock.now();
 for(const s of states){simulateToEnd(s);assert.equal(s.race.lap,50);}
 const elapsed=clock.now()-start;
 assert.ok(elapsed<1000,'耗时 '+elapsed.toFixed(2)+'ms');
 results.push({name:'500圈实测',milliseconds:elapsed,totalLaps:500});
 console.log('  benchmark:',elapsed.toFixed(2),'ms / 500 laps');
});
console.log(JSON.stringify({tests:results},null,2));

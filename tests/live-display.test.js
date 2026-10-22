import assert from 'node:assert/strict';
import { createGame, reduce } from '../js/core/state.js';
import { currentTrack } from '../js/core/calendar.js';
import { qualifying, practice } from '../js/core/race.js';
import { startRealtimeRace, advanceRealtime, fastForwardLap, resumeRealtime } from '../js/core/realtime.js';
import { timingGap, layoutMapLabels } from '../js/ui/liveData.js';
import { liveView } from '../js/ui/liveView.js';
import { importText, exportText } from '../js/core/save.js';
import { teamOf } from '../js/core/helpers.js';
const tests=[];
function test(name,fn){try{fn();tests.push({name,status:'PASS'});console.log('PASS',name);}catch(e){tests.push({name,status:'FAIL',error:e.message});console.error('FAIL',name,e.stack);process.exitCode=1;}}
function race(){const s=createGame({year:2025,seed:'pit-window-fix'});reduce(s,'enterWeekend');while(s.calendar.weekend.sessions[s.calendar.weekend.index].startsWith('FP'))practice(s);qualifying(s,'push',true);for(const id of teamOf(s).drivers)Object.assign(s.calendar.weekend.strategy[id],{start:'M',pitLap:26,secondLap:0,next:'H',backup:'A',auto:false});s.calendar.weekend.weatherStart=0;startRealtimeRace(s);for(const cell of s.race.forecast)cell.rain=0;return s;}
function untilOwnLap(s,c,lap){let guard=0;while(c.lap<lap&&!c.retired&&!s.race.finished&&guard++<2000){if(s.race.red)resumeRealtime(s);advanceRealtime(s,1,true);}assert.ok(!c.retired,'test driver retired');assert.ok(guard<2000);}
test('首停第26圈、二停关闭：两台赛车第一圈和第25圈均不提前进站，第26圈才执行',()=>{
 const s=race(),cars=teamOf(s).drivers.map(id=>s.race.cars.find(c=>c.driverId===id));
 for(const c of cars){assert.equal(c.pitRequest,null);assert.deepEqual(c.planUsed,[]);}
 const slow=cars.sort((a,b)=>b.grid-a.grid)[0];untilOwnLap(s,slow,1);for(const c of cars){assert.equal(c.stops,0);assert.equal(c.pitRequest,null);}
 // Preserve the scheduled lap while neutralising unrelated tyre and failure risks.
 let guard=0;while(cars.some(c=>c.lap<26)&&guard++<4000){for(const c of cars){c.tyreWear=0;c.tyreAge=0;for(const p of Object.values(s.parts[c.teamId].cars[c.slot]))p.wear=0;}if(s.race.red)resumeRealtime(s);advanceRealtime(s,1,true);for(const c of cars)if(c.lap<26)assert.equal(c.stops,0);}
 for(const c of cars){assert.equal(c.retired,false);assert.equal(c.stops,1);assert.equal(c.pitLog[0].lap,26);assert.equal(c.pitLog[0].from,'M');assert.equal(c.pitLog[0].compound,'H');assert.ok(c.pitLog[0].at>0);assert.deepEqual(c.planUsed,[0]);}
});
test('LEADER / INTERVAL 使用不同参照，领先车为 LEADER，退赛车为 OUT，套圈差距正常',()=>{
 const s=race(),[a,b,c]=s.race.cars;s.race.cars=[a,b,c];[a,b,c].forEach((x,i)=>{x.position=i+1;x.totalDistance=5-i*.1;});const base=currentTrack(s).baseTime;
 assert.equal(timingGap(s,a,base),'LEADER');const leader=timingGap(s,c,base);reduce(s,'timingGap',{value:'interval'});const interval=timingGap(s,c,base);assert.equal(leader,'+'+(.2*base).toFixed(1));assert.equal(interval,'+'+(.1*base).toFixed(1));c.retired=true;assert.equal(timingGap(s,c,base),'OUT');c.retired=false;c.totalDistance=3.4;assert.equal(timingGap(s,c,base),'+1 LAP');assert.throws(()=>reduce(s,'timingGap',{value:'bad'}));
});
test('22辆赛车聚集在同一点或边缘：标签不相交、完整位于地图内',()=>{
 for(const [x,y]of [[400,370],[8,8],[792,732]]){const markers=Array.from({length:22},(_,i)=>({id:'driver'+i,x,y}));const labels=layoutMapLabels(markers);assert.equal(labels.length,22);for(let i=0;i<labels.length;i++){const a=labels[i];assert.ok(a.x>=0&&a.y>=0&&a.x+a.width<=800&&a.y+a.height<=740);for(const b of labels.slice(i+1))assert.ok(a.x+a.width<=b.x||b.x+b.width<=a.x||a.y+a.height<=b.y||b.y+b.height<=a.y,'overlapping labels');}}
});
test('正赛排名恰好三列，天气和赛事状态位于上方，完整详细数据位于最后',()=>{
 const s=race(),markup=liveView(s),tower=markup.slice(markup.indexOf('<table class="broadcast-timing'),markup.indexOf('</table>'));
 assert.equal((tower.match(/<th[ >]/g)||[]).length,3);assert.equal((tower.match(/<td /g)||[]).length,s.race.cars.length*3);assert.ok(!tower.includes('data-cell="best"'));assert.ok(markup.indexOf('id="toolbar-weather"')<markup.indexOf('id="timing-body"'));assert.ok(markup.indexOf('id="tower-race-control"')<markup.indexOf('id="timing-body"'));assert.ok(markup.indexOf('id="race-details"')>markup.indexOf('id="race-events"'));assert.ok(markup.includes('id="pit-history"'));assert.ok(markup.includes('data-detail-cell="current"'));assert.ok(markup.includes('data-detail-cell="best"'));
});
test('聚焦身份取明确车手ID，排序变化后仍保留选择；红旗与SC横幅对应当前状态',()=>{
 const s=race(),id=s.race.cars.at(-1).driverId;reduce(s,'focusDriver',{id});s.race.cars.reverse();const markup=liveView(s);assert.ok(markup.includes('data-focused-driver="'+id+'"'));assert.throws(()=>reduce(s,'focusDriver',{id:'missing'}));s.race.control='SC';assert.ok(liveView(s).includes('SAFETY CAR'));s.race.red=true;assert.ok(liveView(s).includes('RED FLAG'));
});
test('修复旧存档中的第0圈二停误请求，同时保留手动进站指令',()=>{for(const manual of [false,true]){const s=race(),c=s.race.cars.find(c=>c.teamId===s.player.teamId);c.planUsed=[1];c.pitRequest=c.plan.next;if(manual)s.race.events.push({lap:0,type:'radio',text:c.name+'：收到进站指令，本圈末换 H 胎'});const loaded=importText(exportText(s)),car=loaded.race.cars.find(x=>x.driverId===c.driverId);assert.deepEqual(car.planUsed,[]);assert.equal(car.pitRequest,manual?'H':null);}});
test('排名模式与聚焦选择经过保存后仍保留，界面计算不消耗RNG',()=>{const s=race(),id=s.race.cars.at(-1).driverId;reduce(s,'timingGap',{value:'interval'});reduce(s,'focusDriver',{id});const before=s.rng;liveView(s);assert.equal(s.rng,before);const saved=importText(exportText(s));assert.equal(saved.settings.timingGap,'interval');assert.equal(saved.settings.focusDriver,id);});
console.log(JSON.stringify({tests},null,2));

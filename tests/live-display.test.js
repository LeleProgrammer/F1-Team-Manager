import assert from 'node:assert/strict';
import { createGame, reduce } from '../js/core/state.js';
import { currentTrack } from '../js/core/calendar.js';
import { qualifying, practice } from '../js/core/race.js';
import { startRealtimeRace, advanceRealtime, fastForwardLap, resumeRealtime } from '../js/core/realtime.js';
import { timingGap, layoutMapLabels } from '../js/ui/liveData.js';
import { standingsView } from '../js/ui/standingsView.js';
import { liveView, patchLive } from '../js/ui/liveView.js';
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
test('LEADER / INTERVAL 使用不同参照，领先车随模式显示 LEADER / INTERVAL，退赛车为 OUT，套圈差距正常',()=>{
 const s=race(),[a,b,c]=s.race.cars;s.race.cars=[a,b,c];[a,b,c].forEach((x,i)=>{x.position=i+1;x.totalDistance=5-i*.1;});const base=currentTrack(s).baseTime;
 assert.equal(timingGap(s,a,base),'LEADER');const leader=timingGap(s,c,base);reduce(s,'timingGap',{value:'interval'});const interval=timingGap(s,c,base);assert.equal(timingGap(s,a,base),'INTERVAL');assert.equal(leader,'+'+(.2*base).toFixed(3));assert.equal(interval,'+'+(.1*base).toFixed(3));c.totalDistance=b.totalDistance-.000001;assert.match(timingGap(s,c,base),/^\+\d+\.\d{3}$/);c.retired=true;assert.equal(timingGap(s,c,base),'OUT');c.retired=false;c.totalDistance=3.4;assert.equal(timingGap(s,c,base),'+1 LAP');assert.throws(()=>reduce(s,'timingGap',{value:'bad'}));
});
test('22辆赛车聚集在同一点或边缘：标签不相交、完整位于地图内',()=>{
 for(const [x,y]of [[400,370],[8,8],[792,732]]){const markers=Array.from({length:22},(_,i)=>({id:'driver'+i,x,y}));const labels=layoutMapLabels(markers);assert.equal(labels.length,22);for(let i=0;i<labels.length;i++){const a=labels[i];assert.ok(a.x>=0&&a.y>=0&&a.x+a.width<=800&&a.y+a.height<=740);for(const b of labels.slice(i+1))assert.ok(a.x+a.width<=b.x||b.x+b.width<=a.x||a.y+a.height<=b.y||b.y+b.height<=a.y,'overlapping labels');}}
});
test('正赛排名恰好三列，天气和赛事状态位于上方，完整详细数据位于最后',()=>{
 const s=race(),markup=liveView(s),tower=markup.slice(markup.indexOf('<table class="broadcast-timing'),markup.indexOf('</table>'));
 assert.equal((tower.match(/class="tower-position"/g)||[]).length,s.race.cars.length);for(const c of s.race.cars)assert.ok(tower.includes('aria-label="第 '+c.position+' 名">'+c.position+'</span>'));assert.equal((tower.match(/<th[ >]/g)||[]).length,3);assert.equal((tower.match(/<td /g)||[]).length,s.race.cars.length*3);assert.ok(!tower.includes('data-cell="best"'));assert.ok(markup.indexOf('id="toolbar-weather"')<markup.indexOf('id="timing-body"'));assert.ok(markup.indexOf('id="tower-race-control"')<markup.indexOf('id="timing-body"'));assert.ok(markup.indexOf('id="race-details"')>markup.indexOf('id="race-events"'));assert.ok(markup.includes('id="pit-history"'));assert.ok(markup.includes('data-detail-cell="current"'));assert.ok(markup.includes('data-detail-cell="best"'));
});
test('聚焦身份取明确车手ID，排序变化后仍保留选择；红旗与SC横幅对应当前状态',()=>{
 const s=race(),id=s.race.cars.at(-1).driverId;reduce(s,'focusDriver',{id});s.race.cars.reverse();const markup=liveView(s);assert.ok(markup.includes('data-focused-driver="'+id+'"'));assert.throws(()=>reduce(s,'focusDriver',{id:'missing'}));s.race.control='SC';assert.ok(liveView(s).includes('SAFETY CAR'));s.race.red=true;assert.ok(liveView(s).includes('RED FLAG'));
});
test('修复旧存档中的第0圈二停误请求，同时保留手动进站指令',()=>{for(const manual of [false,true]){const s=race(),c=s.race.cars.find(c=>c.teamId===s.player.teamId);c.planUsed=[1];c.pitRequest=c.plan.next;if(manual)s.race.events.push({lap:0,type:'radio',text:c.name+'：收到进站指令，本圈末换 H 胎'});const loaded=importText(exportText(s)),car=loaded.race.cars.find(x=>x.driverId===c.driverId);assert.deepEqual(car.planUsed,[]);assert.equal(car.pitRequest,manual?'H':null);}});
test('排名模式与聚焦选择经过保存后仍保留，界面计算不消耗RNG',()=>{const s=race(),id=s.race.cars.at(-1).driverId;reduce(s,'timingGap',{value:'interval'});reduce(s,'focusDriver',{id});const before=s.rng;liveView(s);assert.equal(s.rng,before);const saved=importText(exportText(s));assert.equal(saved.settings.timingGap,'interval');assert.equal(saved.settings.focusDriver,id);});
test('本队高亮绑定车手所属车队，覆盖实时排名、详细表、积分榜与车队分站明细',()=>{
 const s=race(),own=teamOf(s).drivers,markup=liveView(s);
 for(const id of own){assert.ok(markup.includes('data-car="'+id+'" data-action="focusDriver"'));assert.ok(markup.includes('data-detail-car="'+id+'" class="player-row"'));}
 const tower=markup.slice(markup.indexOf('id="timing-body"'),markup.indexOf('</tbody>'));assert.equal((tower.match(/class="player-row"/g)||[]).length,2);
 const standings=standingsView(s);for(const [id,count]of [['constructors',1],['drivers-standings',2],['round-points',1]]){const section=standings.slice(standings.indexOf('id="'+id+'"'));assert.equal((section.slice(0,section.indexOf('</table>')).match(/class="player-row"/g)||[]).length,count);}
 const original=s.race.cars[0];s.race.cars.reverse();assert.ok(liveView(s).includes('aria-label="第 '+original.position+' 名">'+original.position+'</span>'));
});
test('时间差按现实时间每500ms刷新，模式切换立即刷新，排位不节流',()=>{
 const s=race(),cells=new Map(),rows=s.race.cars.map(c=>{
  const values=Object.fromEntries(['driver','gap','tyre'].map(key=>[key,{innerHTML:''}]));cells.set(c.driverId,values);
  return {dataset:{car:c.driverId},classList:{toggle(){}},querySelector(selector){return values[selector.match(/data-cell="(.*?)"/)[1]];}};
 });
 const body={children:rows},priorDocument=Object.getOwnPropertyDescriptor(globalThis,'document'),priorPerformance=Object.getOwnPropertyDescriptor(globalThis,'performance');let now=0;
 try{
  Object.defineProperty(globalThis,'document',{configurable:true,value:{querySelector:selector=>selector==='#timing-body'?body:null,querySelectorAll:()=>[]}});
  Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>now}});
  const c=s.race.cars[1],gap=cells.get(c.driverId).gap;patchLive(s);const initial=gap.innerHTML;c.totalDistance-=.001;
  for(now=60;now<500;now+=60)patchLive(s);assert.equal(gap.innerHTML,initial);
  now=500;patchLive(s);assert.notEqual(gap.innerHTML,initial);const sampled=gap.innerHTML;
  s.settings.speed=64;s.race.time+=64;c.totalDistance-=.001;now=999;patchLive(s);assert.equal(gap.innerHTML,sampled);
  now=1000;patchLive(s);assert.notEqual(gap.innerHTML,sampled);
  s.settings.timingGap='interval';now=1001;patchLive(s);assert.ok(cells.get(s.race.cars[0].driverId).gap.innerHTML.includes('INTERVAL'));
  c.phase='PIT';now=1002;patchLive(s);assert.ok(gap.innerHTML.includes('IN PIT'));assert.ok(gap.innerHTML.includes('gap-in-pit'));c.phase='RACE';now=1003;patchLive(s);assert.ok(!gap.innerHTML.includes('IN PIT'));c.retired=true;now=1501;patchLive(s);assert.ok(gap.innerHTML.includes('OUT'));
  s.race.qualifying=true;s.race.q={stage:1,status:'RUNNING',remaining:100};s.race.kind='Q';c.retired=false;c.stageBest=90;s.race.fastest.time=89;now=1502;patchLive(s);const qualifying=gap.innerHTML;
  c.stageBest=89.5;now=1503;patchLive(s);assert.notEqual(gap.innerHTML,qualifying);
 }finally{
  if(priorDocument)Object.defineProperty(globalThis,'document',priorDocument);else delete globalThis.document;
  Object.defineProperty(globalThis,'performance',priorPerformance);
 }
});
console.log(JSON.stringify({tests},null,2));

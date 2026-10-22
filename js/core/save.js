import { assignDriverCodes } from './driverCodes.js';
import { attachRealtimeRace } from './realtime.js';
// ===== 文件: js/core/save.js =====
import {
  copy, requireCondition
}
from './helpers.js';
import {
  PARTS
}
from '../data/parts.js';
import {
  TRACKS
}
from '../data/tracks.js';
const PREFIX='apex-manager-v2-';
export const SLOT_NAMES={
  auto:'自动存档',1:'手动槽位 1',2:'手动槽位 2',3:'手动槽位 3'
};
export function migrate(raw) {
  let s=copy(raw);
  requireCondition(s&&typeof s==='object'&&!Array.isArray(s),'存档必须是对象');
  if(s.schemaVersion===1) {
    s.schemaVersion=2;
    s.history=s.history||{
      races:[],seasons:[]
    };
    s.settings.autosave=true;
    for(const t of s.teams||[])t.carry=t.carry||{
    };
  }
  if(s.schemaVersion===2){s.schemaVersion=3;assignDriverCodes(s);if(s.race&&!s.race.finished)attachRealtimeRace(s);}
  requireCondition(s.schemaVersion===3,'存档版本不受支持（本版本为 3）');
  // Repair the 2.0.0 disabled-second-stop request in saves made before lap one.
  if(s.race?.realtime&&!s.race.qualifying&&!s.race.finished&&Array.isArray(s.race.cars))for(const c of s.race.cars){
    if(c.lap===0&&c.plan?.secondLap===0&&Array.isArray(c.planUsed)&&c.planUsed.includes(1)){
      c.planUsed=c.planUsed.filter(i=>i!==1);
      const manual=Array.isArray(s.race.events)&&s.race.events.some(e=>e.type==='radio'&&e.text?.startsWith(c.name+'：收到进站指令'));
      if(!manual&&c.pitRequest===c.plan.next)c.pitRequest=null;
    }
  }
  return s;
}
export function validate(raw) {
  const s=migrate(raw);
  requireCondition(Array.isArray(s.teams)&&s.teams.length>=10&&s.teams.length<=11,'车队数据损坏');
  requireCondition(Array.isArray(s.drivers)&&s.drivers.length>=20&&s.drivers.length<=500,'车手数据损坏');
  requireCondition(Array.isArray(s.staff)&&s.staff.length<=1000,'员工数据损坏');
  requireCondition(Number.isInteger(s.rng)&&s.rng>=0&&s.rng<=4294967295,'随机状态损坏');
  requireCondition(Number.isInteger(s.nextId)&&s.nextId>=0,'对象编号损坏');
  requireCondition(s.player&&s.settings&&s.season&&s.calendar&&s.history&&Array.isArray(s.news),'存档缺少必要字段');
  requireCondition(['easy','standard','hard'].includes(s.settings.difficulty),'难度数据损坏');
  requireCondition(Number.isInteger(s.season.year)&&s.season.year>=2022&&s.season.year<=2200&&s.season.rules,'赛季数据损坏');
  requireCondition(s.teams.some(t=>t.id===s.player.teamId),'玩家车队不存在');
  requireCondition(Array.isArray(s.calendar.events)&&s.calendar.events.length>=22&&s.calendar.events.length<=24&&s.calendar.events.every(e=>TRACKS[e.track]),'赛历损坏');
  requireCondition(Number.isInteger(s.calendar.round)&&s.calendar.round>=0&&s.calendar.round<=s.calendar.events.length&&/^\d{4}-\d{2}-\d{2}$/.test(s.calendar.date),'赛历进度损坏');
  requireCondition(new Set(s.teams.map(t=>t.id)).size===s.teams.length&&new Set(s.drivers.map(d=>d.id)).size===s.drivers.length,'对象编号重复');
  const active=[];
  for(const t of s.teams) {
    const f=s.finance?.[t.id],p=s.parts?.[t.id];
    requireCondition(f&&Number.isFinite(f.cash)&&Number.isFinite(f.capUsed)&&Number.isFinite(f.capLimit)&&f.capLimit>0&&Array.isArray(f.ledger)&&Array.isArray(f.sponsors),'财务数据损坏');
    requireCondition(t.departments&&t.facilities&&t.wind&&t.cfd&&Array.isArray(t.projects)&&Array.isArray(t.results)&&t.objectives&&Array.isArray(t.gridPenalties),'车队管理数据损坏');
    requireCondition(t.drivers?.length===2,'车手阵容损坏');
    for(const id of t.drivers) {
      requireCondition(s.drivers.some(d=>d.id===id&&d.teamId===t.id),'车手归属冲突');
      active.push(id);
    }
    requireCondition(p&&p.cars?.length===2&&Array.isArray(p.stock)&&Array.isArray(p.production),'部件数据损坏');
    for(const car of p.cars)for(const def of PARTS)requireCondition(car[def.id]&&Number.isFinite(car[def.id].wear)&&Number.isFinite(car[def.id].gain),'部件规格损坏');
  }
  requireCondition(new Set(active).size===active.length,'车手重复占位');
  for(const d of s.drivers)requireCondition(typeof d.name==='string'&&d.name.length<=100&&d.attributes&&Object.keys(d.attributes).length>=14&&Object.values(d.attributes).every(v=>Number.isFinite(v)&&v>=0&&v<=100)&&d.contract&&Number.isFinite(d.contract.salary)&&Array.isArray(d.results),'车手属性损坏');
  if(s.calendar.weekend) {
    const w=s.calendar.weekend;
    requireCondition(Array.isArray(w.sessions)&&Number.isInteger(w.index)&&w.index>=0&&w.index<=w.sessions.length&&w.setups&&w.ideal&&w.strategy&&w.confidence&&w.tyres&&w.grids,'周末数据损坏');
    for(const t of s.teams)requireCondition(w.setups[t.id]?.length===2&&w.ideal[t.id]?.length===2&&t.drivers.every(id=>w.tyres[id]&&w.strategy[id]),'周末赛车数据损坏');
  }
  if(s.race)requireCondition(s.calendar.weekend&&Array.isArray(s.race.cars)&&s.race.cars.length===active.length&&s.race.cars.every(c=>active.includes(c.driverId))&&Number.isFinite(s.race.lap)&&s.race.lap<=s.race.totalLaps&&Array.isArray(s.race.events)&&Array.isArray(s.race.penalties),'比赛数据损坏');
  if(s.race?.realtime){
    const r=s.race;requireCondition(Number.isFinite(r.time)&&r.time>=0&&r.cars.every(c=>Number.isFinite(c.segmentEnd)&&Number.isFinite(c.segmentDuration)&&Number.isFinite(c.progress)&&c.progress>=0&&c.progress<=1&&Number.isInteger(c.sector)&&c.sector>=0&&c.sector<=2),'实时计时数据损坏');
    requireCondition(r.cars.every(c=>['GRID','RACE','PIT','GARAGE','OUT','FLY','IN','ABORT','ELIMINATED','FINISHED'].includes(c.phase)&&['segmentStart','segmentEnd','segmentDuration','sectorStart','lapStart','currentLap','speed','progress','totalDistance','nextRelease','pitUntil'].every(k=>Number.isFinite(c[k]))&&c.segmentDuration>=0),'实时赛车状态损坏');
    requireCondition(r.cars.every(c=>!c.pitTransit||(['entered','stopStart','stopEnd','release','lap'].every(k=>Number.isFinite(c.pitTransit[k]))&&c.pitTransit.entered<=c.pitTransit.stopStart&&c.pitTransit.stopStart<=c.pitTransit.stopEnd&&c.pitTransit.stopEnd<=c.pitTransit.release&&typeof c.pitTransit.driveThrough==='boolean')),'维修区动画时间线损坏');
    if(r.qualifying){requireCondition(r.q&&[1,2,3].includes(r.q.stage)&&['RUNNING','BREAK','DONE'].includes(r.q.status),'排位阶段损坏');s.calendar.weekend.qualifying=r.q;}
  }
  requireCondition(s.drivers.every(d=>/^[A-Z]{3}$/.test(d.code))&&new Set(s.drivers.map(d=>d.code)).size===s.drivers.length,'车手缩写数据损坏');
  let nodes=0;
  const walk=(x,depth)=> {
    requireCondition(depth<45&&++nodes<1200000,'存档结构超出安全限制');
    if(typeof x==='number')requireCondition(Number.isFinite(x),'存档包含无效数值');
    if(typeof x==='string')requireCondition(x.length<10000,'存档文本异常');
    if(x&&typeof x==='object')for(const [k,v]of Object.entries(x)) {
      requireCondition(!['__proto__','constructor','prototype'].includes(k),'存档包含无效字段');
      walk(v,depth+1);
    }
  };
  walk(s,0);
  return s;
}
export function exportText(s) {
  return JSON.stringify({
    format:'APEX_MANAGER',schemaVersion:3,state:s
  },null,2);
}
export function importText(text) {
  requireCondition(typeof text==='string'&&text.length<=12*1024*1024,'存档为空或超过 12 MB');
  let data;
  try{
    data=JSON.parse(text);
  }
  catch(e) {
    throw new Error('JSON 无法解析，请检查是否复制完整');
  }
  return validate(data?.format==='APEX_MANAGER'?data.state:data);
}
function storage() {
  try{
    return globalThis.localStorage;
  }
  catch(e) {
    throw new Error('浏览器禁用本地存储，请使用 JSON 导出备份');
  }
}
export function saveSlot(s,slot='auto') {
  requireCondition(Object.hasOwn(SLOT_NAMES,slot),'存档槽位无效');
  try{
    storage().setItem(PREFIX+slot,JSON.stringify({
      format:'APEX_MANAGER',savedAt:new Date().toISOString(),state:s
    }));
    return new Date().toLocaleTimeString('zh-CN',{
      hour12:false
    });
  }
  catch(e) {
    throw new Error('保存失败：存储空间不足或浏览器限制，请导出 JSON 备份');
  }
}
export function loadSlot(slot='auto') {
  const text=storage().getItem(PREFIX+slot);
  requireCondition(text,'该槽位暂无存档');
  return importText(text);
}
export function slotInfo(slot) {
  try{
    const text=storage().getItem(PREFIX+slot);
    if(!text)return null;
    const d=JSON.parse(text);
    return {
      savedAt:d.savedAt,year:d.state?.season?.year,team:d.state?.teams?.find(t=>t.id===d.state?.player?.teamId)?.name||'未知车队'
    };
  }
  catch(e) {
    return {
      broken:true
    };
  }
}
export function deleteSlot(slot) {
  requireCondition(Object.hasOwn(SLOT_NAMES,slot),'槽位无效');
  storage().removeItem(PREFIX+slot);
}

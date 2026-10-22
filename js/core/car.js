// ===== 文件: js/core/car.js =====
import {
  PARTS, COMPOUNDS, MODES, ENGINES, partQuota
}
from '../data/parts.js';
import {
  SUPPLIERS
}
from '../data/teams.js';
import {
  clamp, teamOf, driverOf, requireCondition, mutable
}
from './helpers.js';
import {
  spend
}
from './finance.js';
import {
  between
}
from './rng.js';
export function initParts(s,t) {
  s.parts[t.id]={
    cars:[0,1].map(()=>Object.fromEntries(PARTS.map(p=>[p.id,{
      level:1,gain:0,wear:0,used:1,risk:0
    }]))),stock:[],production:[]
  };
}
export function performance(s,t,slot=0) {
  const p=t.performance,pu=SUPPLIERS[t.supplier]||{
    power:p,reliability:75
  };
  const v={
    downforce:p,aero:p-1,grip:p+1,suspension:p-2,brakes:p, power:t.custom&&t.type==='factory'?p-2:pu.power,ers:p-1,reliability:t.custom?76:89,tyres:p-1,weight:p
  };
  for(const part of PARTS) {
    const item=s.parts[t.id].cars[slot][part.id];
    v[part.dimension]+=item.gain;
    v.reliability-=item.risk;
  }
  if(t.type==='customer')v.power=pu.power+(s.season.year>=2026?2:0);
  for(const [key,gain]of Object.entries(t.carry||{
  }))if(Object.hasOwn(v,key))v[key]+=gain;
  for(const key of Object.keys(v))v[key]=clamp(v[key],30,99);
  return v;
}
export const WEIGHTS = {
  downforce:{
    downforce:.34,aero:.13,grip:.12,suspension:.08,brakes:.08,power:.09,ers:.05,tyres:.07,weight:.04
  },low:{
    downforce:.08,aero:.32,grip:.08,suspension:.04,brakes:.1,power:.21,ers:.09,tyres:.03,weight:.05
  },street:{
    downforce:.15,aero:.04,grip:.29,suspension:.15,brakes:.17,power:.05,ers:.04,tyres:.06,weight:.05
  },fast:{
    downforce:.22,aero:.24,grip:.1,suspension:.07,brakes:.05,power:.16,ers:.07,tyres:.05,weight:.04
  },traction:{
    downforce:.15,aero:.12,grip:.21,suspension:.09,brakes:.12,power:.15,ers:.06,tyres:.06,weight:.04
  }
};
export function carScore(s,t,slot,track) {
  const v=performance(s,t,slot),w={
    ...WEIGHTS[track.type]
  };
  if(s.season.year>=2026) {
    w.ers+=.13;
    w.power+=.05;
    w.downforce*=.7;
  }
  const sum=Object.values(w).reduce((a,x)=>a+x,0);
  return Object.entries(w).reduce((n,[k,a])=>n+v[k]*a,0)/sum;
} // 圈速基线：评分每差 1 分约 0.075 秒，顶底车差 25–35 分对应 1.9–2.6 秒。
// 车手有效评分每分 0.026 秒；常见队友差 4–20 分对应 0.1–0.52 秒。
export function theoreticalLap(s,t,d,slot,track,qualifying=false) {
  const a=d.attributes;
  const skill=qualifying?a.qualifying*.8+a.pace*.2:a.racePace*.55+a.tyres*.18+a.consistency*.12+a.pace*.15;
  return track.baseTime+(95-carScore(s,t,slot,track))*.075+(95-skill)*.026+(d.fatigue||0)*.002+(75-d.morale)*.0015;
}
export function setupPenalty(setup,ideal) {
  return setup.reduce((sum,v,i)=>sum+Math.max(0,Math.abs(v-ideal[i])-5),0)*.008;
}
export function tyreState(car,track,driver,weather,mode='normal',trait=false) {
  const c=COMPOUNDS[car.compound],m=MODES[mode],wet=['I','W'].includes(car.compound);
  const life=c.life/track.wear*(.78+driver.attributes.tyres*.003);
  const fraction=car.tyreWear/100;
  const gripLoss=c.deg*car.tyreAge+Math.pow(Math.max(0,fraction-.65),2)*24;
  const temp=track.temp+(wet?30:60)+m.wear*7-weather*20+(car.dirty?5:0);
  const tempLoss=Math.max(c.min-temp,0)*.024+Math.max(temp-c.max,0)*.032;
  const mismatch=car.compound==='I'?Math.max(0,.22-weather)*22+Math.max(0,weather-.7)*12:car.compound==='W'?Math.max(0,.65-weather)*22:weather*weather*24;
  return {
    loss:c.pace+gripLoss+tempLoss+mismatch,temperature:temp,wear:100/life*m.wear*(trait?.95:1)*(wet&&weather<.15?2.5:1)
  };
}
export function lapTime(s,car,track) {
  const t=teamOf(s,car.teamId),d=driverOf(s,car.driverId),mode=MODES[car.mode],engine=ENGINES[car.engine];
  const tyres=tyreState(car,track,d,s.race.wetness,car.mode,s.staff.some(x=>x.teamId===t.id&&x.trait==='tyre'));
  car.tyreTemperature=tyres.temperature;
  car.tyreWear=clamp(car.tyreWear+tyres.wear,0,130);
  const setup=s.calendar.weekend.setups[t.id][car.slot];
  const ideal=s.calendar.weekend.ideal[t.id][car.slot];
  // 燃油质量影响 0.03 s/kg，即每 10 kg 慢 0.3 秒；单圈噪声限定 ±0.15 秒。
  const time=theoreticalLap(s,t,d,car.slot,track)+setupPenalty(setup,ideal)+car.fuel*.03+tyres.loss+mode.pace+engine.pace+(car.dirty?.22:0)-(car.drs?.4:0)+s.race.wetness*(7+(100-d.attributes.wet)*.07)+between(s,-.15,.15);
  car.fuel-=s.race.fuelPerLap*mode.fuel*engine.fuel;
  return Math.max(40,time);
}
export function replacePart(s,slot,id) {
  mutable(s);
  requireCondition(!s.calendar.weekend,'更换部件请在进入比赛周末之前进行');
  const t=teamOf(s),part=PARTS.find(p=>p.id===id);
  requireCondition(part&&[0,1].includes(slot),'部件或赛车无效');
  spend(s,t,part.cost*.23,'更换 '+part.name,true);
  const item=s.parts[t.id].cars[slot][id];
  item.wear=0;
  item.used++;
  if(item.used>partQuota(part,s.season.year)) {
    t.gridPenalties[slot]+=10;
  }
  return '已换新'+(item.used>partQuota(part,s.season.year)?'，下站罚退 10 位':'');
}
export function fitPart(s,stockId,slot) {
  mutable(s);
  requireCondition(!s.calendar.weekend,'周末开始后禁止装新规格，请先完成本周末');
  const t=teamOf(s),p=s.parts[t.id],i=p.stock.findIndex(x=>x.id===stockId);
  requireCondition(i>=0&&[0,1].includes(slot),'库存不存在');
  const spec=p.stock[i],item=p.cars[slot][spec.part];
  requireCondition(spec.level>item.level,'该赛车已安装同级或更高规格');
  item.level=spec.level;
  item.gain=spec.gain;
  item.risk=spec.risk;
  p.stock.splice(i,1);
  return '规格已装车，性能立即生效';
}
export function replacementCost(part) {
  return part.cost*.23;
}
// 供界面展示的纯数据预测；不会消耗 RNG，也不会改动真实轮胎库存。
export function tyreChartData(s,track){
  if(!track)return {labels:[],series:[]};
  const t=teamOf(s),d=driverOf(s,t.drivers[0]);
  const labels=Array.from({length:46},(_,i)=>String(i));
  const series=['S','M','H'].map(compound=>{
    const values=[],c={compound,tyreAge:0,tyreWear:0,dirty:false};
    for(let lap=0;lap<=45;lap++){
      const state=tyreState(c,track,d,0,'normal',false);
      values.push(Math.min(125,c.tyreWear));
      c.tyreWear+=state.wear;c.tyreAge++;
    }
    return {values,color:COMPOUNDS[compound].color};
  });
  return {labels,series,type:'line'};
}

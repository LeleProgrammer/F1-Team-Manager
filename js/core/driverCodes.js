// Official broadcast codes where available; custom drivers receive unique editable codes.
import { requireCondition, driverOf } from './helpers.js';
export const DRIVER_CODES={verstappen:'VER',perez:'PER',leclerc:'LEC',sainz:'SAI',hamilton:'HAM',russell:'RUS',norris:'NOR',ricciardo:'RIC',alonso:'ALO',ocon:'OCO',gasly:'GAS',tsunoda:'TSU',vettel:'VET',stroll:'STR',albon:'ALB',latifi:'LAT',bottas:'BOT',zhou:'ZHO',magnussen:'MAG',schumacher:'MSC',piastri:'PIA',devries:'DEV',sargeant:'SAR',hulkenberg:'HUL',lawson:'LAW',antonelli:'ANT',doohan:'DOO',hadjar:'HAD',bearman:'BEA',bortoleto:'BOR',colapinto:'COL',drugovich:'DRU',pourchaire:'POU',iwasa:'IWA',vandoorne:'VAN',fittipaldi:'FIT'};
export function assignDriverCodes(s){
  const used=new Set();
  for(const d of s.drivers){
    let code=d.code||DRIVER_CODES[d.id]||d.name.split(' ').at(-1).replace(/[^a-z]/gi,'').slice(0,3).toUpperCase().padEnd(3,'X');
    if(!/^[A-Z]{3}$/.test(code))code='DRV';
    if(used.has(code)){const base=code.slice(0,2);let i=0;while(i<26&&used.has(base+String.fromCharCode(65+i)))i++;if(i<26)code=base+String.fromCharCode(65+i);else{let n=0;do{code=String.fromCharCode(65+Math.floor(n/676)%26,65+Math.floor(n/26)%26,65+n%26);n++;}while(used.has(code));}}
    d.code=code;used.add(code);
  }
}
export function setDriverCode(s,id,value){
  const d=driverOf(s,id),code=String(value).trim().toUpperCase();
  requireCondition(d?.teamId===s.player.teamId,'只能修改本队车手缩写');
  requireCondition(/^[A-Z]{3}$/.test(code),'缩写必须是三个英文字母');
  requireCondition(!s.drivers.some(x=>x.id!==id&&x.code===code),'该缩写已被其他车手使用');
  d.code=code;return '车手缩写已更新';
}

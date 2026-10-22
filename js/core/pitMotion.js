// Deterministic schematic pit lane. Timing comes from the actual recorded stop.
import { geometry, trackPoint, SECTOR_ENDS } from './trackGeometry.js';
const lanes=new Map();
export const PIT_EXIT_PROGRESS=.035;
const clamp01=x=>Math.max(0,Math.min(1,x));
function cubic(points,t){
  const u=1-t;
  return [0,1].map(i=>u*u*u*points[0][i]+3*u*u*t*points[1][i]+3*u*t*t*points[2][i]+t*t*t*points[3][i]);
}
function tangent(id,p){const a=trackPoint(id,p-.001),b=trackPoint(id,p+.001),length=Math.hypot(b[0]-a[0],b[1]-a[1])||1;return [(b[0]-a[0])/length,(b[1]-a[1])/length];}
export function pitLaneGeometry(id){
  if(lanes.has(id))return lanes.get(id);
  const entry=trackPoint(id,0),exit=trackPoint(id,PIT_EXIT_PROGRESS),a=tangent(id,0),b=tangent(id,PIT_EXIT_PROGRESS);
  const midpoint=[(entry[0]+exit[0])/2,(entry[1]+exit[1])/2],normal=[-a[1],a[0]];
  // Pick the side with more space inside the map, then keep the box in bounds.
  const space=sign=>Math.min(midpoint[0]+normal[0]*sign*65,800-midpoint[0]-normal[0]*sign*65,midpoint[1]+normal[1]*sign*65,740-midpoint[1]-normal[1]*sign*65);
  const sign=space(1)>=space(-1)?1:-1,box=midpoint.map((x,i)=>Math.max(24,Math.min(i?716:776,x+normal[i]*sign*65)));
  const distance=Math.hypot(exit[0]-entry[0],exit[1]-entry[1])||1,along=[(exit[0]-entry[0])/distance,(exit[1]-entry[1])/distance];
  const inward=[entry,entry.map((x,i)=>x+a[i]*22),box.map((x,i)=>x-along[i]*24),box];
  const outward=[box,box.map((x,i)=>x+along[i]*24),exit.map((x,i)=>x-b[i]*22),exit];
  const lane={entry,exit,box,inward,outward,path:`M${entry.join(',')} C${inward.slice(1).map(p=>p.join(',')).join(' ')} C${outward.slice(1).map(p=>p.join(',')).join(' ')}`};
  lanes.set(id,lane);return lane;
}
export function beginPitTransit(c,entered,release,stop=0,driveThrough=false){
  const stationary=driveThrough?0:Math.max(0,Math.min(stop,release-entered)),travel=(release-entered-stationary)/2;
  c.pitTransit={entered,stopStart:entered+travel,stopEnd:entered+travel+stationary,release,lap:c.lap,driveThrough};
  return c.pitTransit;
}
export function pitTimeline(c){
  if(c.pitTransit)return c.pitTransit;
  // Older saves may already be in PIT, with no separate animation timeline.
  const log=c.pitLog?.at(-1),entered=c.lapStart,release=c.pitUntil;
  const stop=log&&log.lap===c.lap&&Math.abs((log.at??entered)-entered)<.01?Math.min(log.stop,release-entered):0;
  const travel=(release-entered-stop)/2;
  return {entered,stopStart:entered+travel,stopEnd:entered+travel+stop,release,lap:c.lap,driveThrough:stop===0};
}
export function pitCarState(id,c,time){
  const lane=pitLaneGeometry(id),timeline=pitTimeline(c),{entered,stopStart,stopEnd,release}=timeline;
  let segment,f,rate,stage;
  if(time<stopStart){
    const duration=stopStart-entered||1;f=clamp01((time-entered)/duration);rate=timeline.driveThrough?1/duration:2*(1-f)/duration;f=timeline.driveThrough?f:2*f-f*f;segment=lane.inward;stage='ENTRY';
  }else if(time<stopEnd){return {point:lane.box.slice(),speed:0,stage:'SERVICE',remaining:Math.max(0,stopEnd-time)};}
  else{
    const duration=release-stopEnd||1;f=clamp01((time-stopEnd)/duration);rate=timeline.driveThrough?1/duration:2*f/duration;f=timeline.driveThrough?f:f*f;segment=lane.outward;stage='EXIT';
  }
  const point=cubic(segment,f),u=1-f,velocity=[0,1].map(i=>3*u*u*(segment[1][i]-segment[0][i])+6*u*f*(segment[2][i]-segment[1][i])+3*f*f*(segment[3][i]-segment[2][i]));
  return {point,speed:Math.hypot(...velocity)*rate,stage,remaining:0};
}
export function raceMapPoint(id,c,time){
  if(c.phase==='PIT')return pitCarState(id,c,time).point;
  let progress=c.progress;
  // Rejoin at the drawn exit, then merge continuously into the normal S1 path.
  // This display interpolation does not alter lap timing or race classification.
  if(c.phase==='RACE'&&c.pitTransit?.lap===c.lap&&c.sector===0&&time>=c.pitTransit.release)
    progress=PIT_EXIT_PROGRESS+(SECTOR_ENDS[0]-PIT_EXIT_PROGRESS)*clamp01(progress/SECTOR_ENDS[0]);
  return trackPoint(id,progress);
}

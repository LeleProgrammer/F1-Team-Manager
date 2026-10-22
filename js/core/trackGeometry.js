import { TRACK_LAYOUTS } from '../data/track-layouts.js';
const cache=new Map();
export const SECTOR_ENDS=[.32,.68,1];
export function geometry(id){
  if(cache.has(id))return cache.get(id);
  const points=TRACK_LAYOUTS[id],lengths=[0];
  for(let i=1;i<points.length;i++)lengths.push(lengths.at(-1)+Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]));
  const total=lengths.at(-1),fractions=lengths.map(v=>v/total),value={points,fractions,profiles:[],sectorWeights:[]};cache.set(id,value);
  // Equal-distance samples estimate bend intensity, rather than using the density
  // of GeoJSON vertices. The resulting travel-time profile is deterministic.
  for(let sector=0;sector<3;sector++){
    const start=SECTOR_ENDS[sector-1]||0,width=SECTOR_ENDS[sector]-start,cumulative=[0];
    for(let i=0;i<120;i++){
      const f=start+width*(i+.5)/120,a=trackPoint(id,f-.006),b=trackPoint(id,f),c=trackPoint(id,f+.006);
      const ux=b[0]-a[0],uy=b[1]-a[1],vx=c[0]-b[0],vy=c[1]-b[1];
      const angle=Math.acos(Math.max(-1,Math.min(1,(ux*vx+uy*vy)/(Math.hypot(ux,uy)*Math.hypot(vx,vy)||1))));
      const cost=1+Math.min(2,angle*4);cumulative.push(cumulative.at(-1)+cost);
    }
    const sum=cumulative.at(-1);value.profiles.push(cumulative.map(n=>n/sum));value.sectorWeights.push(sum/120*width);
  }
  const sum=value.sectorWeights.reduce((a,b)=>a+b,0);value.sectorWeights=value.sectorWeights.map(n=>n/sum);return value;
}
export function trackPoint(id,progress){
  const g=geometry(id),p=((progress%1)+1)%1;let low=0,high=g.fractions.length-1;
  while(high-low>1){const mid=(low+high)>>1;if(g.fractions[mid]<=p)low=mid;else high=mid;}
  const f=(p-g.fractions[low])/(g.fractions[high]-g.fractions[low]||1),a=g.points[low],b=g.points[high];return [a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];
}
export function sectorMotion(id,sector,f){
  const profile=geometry(id).profiles[sector];let low=0,high=profile.length-1;
  while(high-low>1){const mid=(low+high)>>1;if(profile[mid]<=f)low=mid;else high=mid;}
  const duration=profile[high]-profile[low]||1,inside=Math.max(0,Math.min(1,(f-profile[low])/duration));
  return {distance:(low+inside)/(profile.length-1),rate:1/(duration*(profile.length-1))};
}

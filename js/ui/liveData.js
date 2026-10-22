// Pure display calculations. These never advance the simulation or consume RNG.
export function timingGap(s,c,baseTime){
  const r=s.race;
  if(c.retired)return 'OUT';
  if(r.qualifying)return c.stageBest>=9999?'NO TIME':r.fastest.time===c.stageBest?'LEADER':'+'+(c.stageBest-r.fastest.time).toFixed(3);
  const active=r.cars.filter(x=>!x.retired).slice().sort((a,b)=>a.position-b.position),index=active.findIndex(x=>x.driverId===c.driverId);
  if(index<=0)return s.settings.timingGap==='interval'?'INTERVAL':'LEADER';
  const reference=s.settings.timingGap==='interval'?active[index-1]:active[0];
  const distance=Math.max(0,reference.totalDistance-c.totalDistance),laps=Math.floor(distance+1e-8);
  return laps>0?'+'+laps+' LAP':'+'+(distance*baseTime).toFixed(3);
}
const intersects=(a,b,gap=5)=>a.x<b.x+b.width+gap&&a.x+a.width+gap>b.x&&a.y<b.y+b.height+gap&&a.y+a.height+gap>b.y;
export function layoutMapLabels(markers,previous={},reserved=[]){
  const width=76,height=36,placed=reserved.slice(),result=[];
  for(const marker of markers){
    const {id,x,y}=marker,candidates=[];
    if(previous[id])candidates.push(previous[id]);
    for(let ring=0;ring<8;ring++){
      const dx=14+ring*42,dy=12+ring*40;
      candidates.push([dx,-height/2],[-width-dx,-height/2],[-width/2,-height-dy],[-width/2,dy],
        [dx,-height-dy],[-width-dx,-height-dy],[dx,dy],[-width-dx,dy]);
    }
    // A bounded grid guarantees a place even when the whole field shares one point.
    for(let yy=10;yy<=740-height-10;yy+=height+8)for(let xx=10;xx<=800-width-10;xx+=width+8)candidates.push([xx-x,yy-y]);
    let best=null;
    for(const [dx,dy]of candidates){
      const box={x:Math.max(8,Math.min(800-width-8,x+dx)),y:Math.max(8,Math.min(740-height-8,y+dy)),width,height};
      if(placed.some(p=>intersects(box,p)))continue;
      if(markers.some(p=>p.x>=box.x-9&&p.x<=box.x+width+9&&p.y>=box.y-9&&p.y<=box.y+height+9))continue;
      best=box;break;
    }
    if(!best)best={x:8,y:8,width,height};
    placed.push(best);result.push({id,...best,dx:best.x-x,dy:best.y-y});
  }
  return result;
}

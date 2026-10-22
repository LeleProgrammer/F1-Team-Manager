// ===== 文件: js/core/ai.js =====
import {
  PARTS, partQuota
}
from '../data/parts.js';
import {
  DIFFICULTIES
}
from '../data/i18n.js';
import {
  startProject
}
from './rnd.js';
import {
  chance, choose, between
}
from './rng.js';
import {
  transferDriver, freeReplacement, seedAIYouth
}
from './drivers.js';
import {
  spend, income
}
from './finance.js';
import {
  news
}
from './helpers.js';
export function aiManagement(s) {
  for(const t of s.teams) {
    if(t.id===s.player.teamId)continue;
    seedAIYouth(s,t);
    const f=s.finance[t.id],spending=t.personality==='吝啬'?22:t.personality==='激进'?8:t.personality==='技术优先'?12:18;
    if(f.cash>spending&&t.projects.filter(p=>p.status==='researching').length<2) {
      const options=PARTS.filter(p=>!(t.type==='customer'&&p.department==='power')&&!(s.season.year>=2026&&p.id==='mguh')&&!t.projects.some(x=>x.part===p.id&&x.status==='researching'));
      if(options.length) {
        const focused=options.filter(p=>t.personality==='技术优先'?p.department==='aero':t.personality==='稳健'?p.department==='reliability':false);
        const part=choose(s,focused.length?focused:options);
        try{
          startProject(s,part.id,s.calendar.round>s.calendar.events.length*.7&&chance(s,.5)?'research':'development',2,t.id);
        }
        catch(e) {
          if(!(e instanceof Error))throw e;
        }
      }
    }
    const store=s.parts[t.id];
    for(let i=store.stock.length-1; i>=0; i--) {
      const spec=store.stock[i];
      const slot=store.cars.findIndex(c=>c[spec.part].level<spec.level);
      if(slot>=0) {
        const c=store.cars[slot][spec.part];
        c.level=spec.level;
        c.gain=spec.gain;
        c.risk=spec.risk;
        store.stock.splice(i,1);
      }
    }
    for(const c of store.cars)for(const p of PARTS)if(c[p.id].wear>67&&f.cash>p.cost*.3) {
      spend(s,t,p.cost*.23,'AI 更换磨损部件',true);
      c[p.id].wear=0;
      c[p.id].used++;
      if(c[p.id].used>partQuota(p,s.season.year))t.gridPenalties[store.cars.indexOf(c)]+=10;
    }
  }
}
export function aiRaceDecision(s,car,track) {
  const r=s.race,difficulty=DIFFICULTIES[s.settings.difficulty];
  const error=chance(s,s.settings.difficulty==='easy'?.2:s.settings.difficulty==='hard'?.015:.07);
  const remain=r.totalLaps-r.lap;
  const wet=r.wetness;
  const weatherTyre=wet>.7?'W':wet>.23?'I':null;
  const wrong=weatherTyre?car.compound!==weatherTyre:['I','W'].includes(car.compound);
  let pit=wrong&&!error&&remain>2;
  let target=weatherTyre||'H';
  const threshold=error?94:73+(difficulty.ai-1)*-10;
  if(car.tyreWear>threshold&&remain>4) {
    pit=true;
    if(!weatherTyre)target=remain<16?'S':remain<27?'M':'H';
  }
  if(!r.sprint&&!weatherTyre&&car.usedDry.length<2&&remain<=Math.max(5,Math.floor(r.totalLaps*.18))) {
    pit=true;
    target=car.compound==='H'?'M':'H';
  }
  if(!r.sprint&&track.id==='monaco'&&s.season.rules.monacoStops===2&&car.stops<2&&remain<8) {
    pit=true;
    target=car.compound==='H'?'M':'H';
  }
  if(r.control!=='GREEN'&&!error&&car.tyreAge>10&&remain>10) {
    pit=true;
    target=weatherTyre||'H';
  }
  if(pit) {
    const stock=s.calendar.weekend.tyres[car.driverId];
    if(stock[target]<=0) {
      const alternatives=weatherTyre?['I','W']:['H','M','S'];
      target=alternatives.find(k=>stock[k]>0)||null;
    }
    if(target)car.pitRequest=target;
  }
  if(car.tyreWear>85)car.mode='tyres';
  else if(remain<7&&car.fuel>remain*r.fuelPerLap*1.1)car.mode='attack';
  else car.mode=car.fuel<remain*r.fuelPerLap*.94?'fuel':'normal';
  const team=s.teams.find(t=>t.id===car.teamId);
  if(team.personality==='激进'&&car.tyreWear<55&&remain<15)car.mode='attack';
  if(team.personality==='稳健'&&car.tyreWear>65)car.mode='tyres';
  car.engine=car.tyreWear>95?'save':'normal';
}
export function aiTransfers(s) {
  for(const t of s.teams.filter(t=>t.id!==s.player.teamId)) {
    for(let slot=0; slot<2; slot++) {
      const d=s.drivers.find(d=>d.id===t.drivers[slot]);
      if(d.contract.years>0&&!d.retired)continue;
      const free=s.drivers.filter(x=>!x.teamId&&!x.academy&&!x.retired).sort((a,b)=>b.attributes.pace-a.attributes.pace);
      const rival=s.drivers.filter(x=>x.teamId&&x.teamId!==t.id&&!x.retired&&x.contract.years<=1&&x.attributes.pace< t.reputation+6).sort((a,b)=>b.attributes.pace-a.attributes.pace)[0];
      const youth=s.drivers.filter(x=>x.academy===t.id&&!x.retired).sort((a,b)=>b.attributes.pace-a.attributes.pace)[0];
      const candidate=youth&&youth.attributes.pace>=74&&chance(s,.25)?youth:rival&&chance(s,.3)?rival:free[0];
      if(candidate&&candidate.attributes.pace>d.attributes.pace+1&&s.finance[t.id].cash>15) {
        const old=candidate.teamId,fee=old?candidate.contract.salary*.65:0;
        spend(s,t,fee,'AI 转会补偿',true);
        if(old)income(s,s.teams.find(x=>x.id===old),fee,'AI 转会收入');
        transferDriver(s,candidate,t,slot,candidate.contract.salary*1.12,2);
        news(s,`${t.name} 在转会窗签下 ${candidate.name}`);
      }
      else if(d.retired) {
        const reserve=freeReplacement(s,t.id,d.id);
        if(reserve)transferDriver(s,reserve,t,slot,reserve.contract.salary,2);
      }
      else{
        d.contract.years=2;
        d.contract.salary*=between(s,1.02,1.1);
      }
    }
  }
}

import { teamOf, driverOf } from '../core/helpers.js';
import { currentTrack } from '../core/calendar.js';
import { PHASE_NAMES, allowedQualTyres } from '../core/realtime.js';
import { geometry, trackPoint, SECTOR_ENDS } from '../core/trackGeometry.js';
import { MODES, ENGINES } from '../data/parts.js';
import { SESSION_NAMES } from '../data/i18n.js';
import { h, header, panel, badge, button, icon, time, number, tyre, tyreInventory, tyreField, select, lapDisplay, flagState, fastestSummary, eventItem, wearMeter, table } from './uiKit.js';
export function clock(seconds,countdown=true){const n=Math.max(0,countdown?Math.ceil(seconds):Math.floor(seconds));return `${Math.floor(n/60).toString().padStart(2,'0')}:${(n%60).toString().padStart(2,'0')}`;}
function phase(c){return c.retired?'退赛':PHASE_NAMES[c.phase]||c.phase;}
function phaseTone(c){return c.retired?'danger':c.phase==='FLY'?'success':c.phase==='OUT'?'info':['PIT','IN','ABORT'].includes(c.phase)?'warning':'neutral';}
function focused(s){return s.race.cars.find(c=>c.driverId===(s.settings.focusDriver||teamOf(s).drivers[0]))||s.race.cars.find(c=>c.driverId===teamOf(s).drivers[0])||s.race.cars[0];}
function sectorTone(c,i){return c.phase==='ABORT'?'neutral':c.sectorTones[i]||c.lastSectorTones?.[i]||'neutral';}
function sectorValue(c,i){return c.sectors[i]||c.lastSectors[i]||0;}
function sectorSpeed(c,i){return c.sectorSpeeds[i]||c.lastSectorSpeeds[i]||0;}
function delta(s,c){
  const r=s.race;if(c.retired)return 'OUT';if(r.qualifying)return c.stageBest>=9999?'NO TIME':r.fastest.time===c.stageBest?'LEADER':'+'+(c.stageBest-r.fastest.time).toFixed(3);
  const lead=r.cars.find(x=>!x.retired)||c;if(c===lead)return 'LEADER';
  const laps=lead.lap-c.lap;if(laps>0&&lead.progress>=c.progress)return '+'+laps+' LAP';
  return '~+'+Math.max(0,(lead.totalDistance-c.totalDistance)*currentTrack(s).baseTime).toFixed(1);
}
function timingCells(s,c){
  const r=s.race,d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
  return {pos:`<b>${c.position}</b>`,driver:`<button class="driver-code" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" style="--team:${h(t.color)}" title="${h(d.name)}">${h(d.code)}</button><span class="tiny-sector-strip">${[0,1,2].map(i=>`<i class="tone-${sectorTone(c,i)}"></i>`).join('')}</span>`,gap:`<span class="tower-gap">${delta(s,c)}</span>`,best:lapDisplay(r.qualifying?c.stageBest:c.best,{fastest:r.fastest.driverId===c.driverId}),status:`<span class="phase-label tone-${phaseTone(c)}">${h(phase(c))}</span>`,tyre:tyre(c.compound)};
}
function timingRow(s,c){return `<tr data-car="${h(c.driverId)}" class="${c.teamId===s.player.teamId?'player-row':''}">${Object.entries(timingCells(s,c)).map(([k,v])=>`<td data-cell="${k}">${v}</td>`).join('')}</tr>`;}
function trackSvg(s){
  const track=currentTrack(s),g=geometry(track.id),start=trackPoint(track.id,0),end=trackPoint(track.id,.98),out=trackPoint(track.id,.02);
  return `<svg id="track-map" viewBox="0 0 800 740" aria-label="${h(track.name)}赛道实时位置，点击三字母缩写查看车手" role="group"><defs><pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#91a7bb" stroke-opacity=".035"/></pattern></defs><rect width="800" height="740" fill="url(#map-grid)"/><polyline points="${g.points.map(p=>p.join(',')).join(' ')}" class="circuit-shadow"/><polyline points="${g.points.map(p=>p.join(',')).join(' ')}" class="circuit-line"/>
    <path class="pit-lane" d="M${end.join(',')} Q${start[0]+40},${start[1]+40} ${out.join(',')}"/><text x="${start[0]+27}" y="${start[1]+48}" class="map-small">PIT</text><g transform="translate(${start.join(',')})"><rect x="-7" y="-9" width="14" height="18" fill="#e8eef6"/><path d="M-7-9H0V0H7V9H0V0H-7Z" fill="#121a25"/><text x="12" y="-13" class="map-small">START / FINISH</text></g>
    ${[.32,.68].map((f,i)=>{const p=trackPoint(track.id,f);return `<g transform="translate(${p.join(',')})"><circle r="7" fill="${i?'#67b9ff':'#d1a0ff'}"/><text x="12" y="-12" class="sector-label">S${i+1} / S${i+2}</text></g>`;}).join('')}
    ${s.race.cars.map(c=>{const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);return `<a data-dot="${h(c.driverId)}" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" tabindex="0" role="button" aria-label="${h(d.code+' '+d.name)}"><title>${h(d.name+' · '+t.name)}</title><circle class="dot-halo" r="16"/><circle class="driver-dot" r="8" fill="${c.slot?'#101925':t.color}" stroke="${t.color}" stroke-width="${c.slot?4:2}"/><rect class="dot-label-bg" x="11" y="${c.slot?-27:7}" width="41" height="22" rx="4"/><text class="dot-label" x="15" y="${c.slot?-11:23}" fill="${t.color}">${h(d.code)}</text></a>`;}).join('')}</svg>`;
}
function telemetry(s,c){
  const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
  return `<div class="map-telemetry" id="map-telemetry" style="--team:${t.color}"><div class="telemetry-title"><strong>${h(d.code)}</strong><div><b>${h(d.name)}</b><small>${h(t.name)} · <span data-focus="phase">${phase(c)}</span></small></div><span data-focus="tyre">${tyre(c.compound)}</span></div><div class="live-numbers"><div><small>当前圈计时</small><b data-focus="lap">${time(c.currentLap)}</b></div><div><small>模拟实时速度</small><b><span data-focus="speed">${number(c.speed)}</span><em> km/h</em></b></div></div><div class="sector-grid">${[0,1,2].map(i=>`<div data-sector="${i}" class="sector-box tone-${sectorTone(c,i)}"><small>S${i+1}<span data-sector-current="${i}"></span></small><b data-sector-time="${i}">${sectorValue(c,i)>0?time(sectorValue(c,i)):'—'}</b><span><strong data-sector-speed="${i}">${number(sectorSpeed(c,i))}</strong> km/h 均速</span></div>`).join('')}</div><div class="telemetry-foot"><span>上圈 <b data-focus="last">${time(c.lastLap)}</b></span><span>最佳 <b data-focus="best">${time(c.best)}</b></span><span>已完成 <b data-focus="completed">${c.lap}</b> 圈</span></div></div>`;
}
function command(s,c){
  const r=s.race,d=driverOf(s,c.driverId),q=r.qualifying,id=c.driverId;
  return `<article class="live-command" data-command-car="${h(id)}"><div class="split"><h3><span class="driver-chip">${h(d.code)}</span> ${h(d.name)}</h3><span data-live="phase">${badge(phase(c),phaseTone(c))}</span></div><div class="car-health"><span>${icon('fuel')}<b data-live="fuel">${number(c.fuel)}</b> kg</span><span>${icon('thermometer')}<b data-live="temp">${number(c.tyreTemperature)}</b>°C</span></div><div data-live="wear">${wearMeter(c.tyreWear)}</div>
    ${q?`<form data-form="qualSend"><input name="id" value="${h(id)}" type="hidden">${tyreField('出场配方','compound',allowedQualTyres(s,c)[0],{compact:true})}<div class="inline-form">${select('fresh',[['new','使用新胎'],['reuse','复用本段轮胎']],'new','aria-label="选择新胎或复用轮胎"')}<button class="btn primary" type="submit" data-q-send>驶出车库</button></div></form><div class="qual-commands">${button('出场圈后 → 飞行圈','qualCommand',{id,command:'fly'},{class:'small'})}${button('出场圈后 → 回 Pit','qualCommand',{id,command:'return'},{class:'small'})}${button('放弃飞行圈 → 回 Pit','qualCommand',{id,command:'abort'},{class:'small danger'})}${button('完成后 → 回场圈','qualCommand',{id,command:'return'},{class:'small'})}${button('完成后 → 再推一圈','qualCommand',{id,command:'repeat'},{class:'small'})}${button('自动出场：'+(c.autoQual?'开':'关'),'qualCommand',{id,command:'auto'},{class:'small'})}</div><p class="command-intent" data-live="intent"></p>`:
    `<label class="field"><span>驾驶指令</span>${select('mode',Object.entries(MODES).map(([k,v])=>[k,v.name]),c.mode,`data-live-command="mode" data-driver="${h(id)}"`)}</label><label class="field"><span>引擎模式</span>${select('engine',Object.entries(ENGINES).map(([k,v])=>[k,v.name]),c.engine,`data-live-command="engine" data-driver="${h(id)}"`)}</label><form data-form="pit"><input name="id" value="${h(id)}" type="hidden">${tyreField('下一次过线进站','value','H',{compact:true})}<div class="actions"><button class="btn primary small" type="submit">${icon('pit')}确认进站</button>${button('取消','command',{id,command:'cancelPit'},{class:'small'})}</div></form><p class="command-intent" data-live="intent"></p>`}
    <div data-live="inventory">${tyreInventory(s.calendar.weekend.tyres[id])}</div></article>`;
}
export function liveView(s){
  const r=s.race,track=currentTrack(s),q=r.qualifying,c=focused(s);
  return `${header('LIVE TIMING / 比赛指挥',track.name+' · '+SESSION_NAMES[r.kind],q?'出场圈 → 飞行圈 → 回场圈。倒计时结束后，只能完成已开始的飞行圈。':'连续比赛时钟 · 车手独立计时 · 默认 1× 为现实时间',`<span class="live-indicator">LIVE</span>`)}
    <div class="live-toolbar"><div class="session-clock"><small>${q?r.kind+r.q.stage+' · '+(r.q.status==='BREAK'?'节间休息':'剩余时间'):'已用时间'}</small><strong data-live-clock>${clock(q?r.q.remaining:r.time,q)}</strong></div><div class="live-lap"><strong data-live-lap>${q?r.kind+r.q.stage:'LAP '+Math.min(r.lap+1,r.totalLaps)}</strong><small>${q?(r.kind==='SQ'?'12 / 10 / 8 MIN':'18 / 15 / 12 MIN'):' / '+r.totalLaps}</small></div>${flagState(r)}<div class="speed-controls">${[1,2,4,8,16,32,64].map(v=>button(v+'×','speed',{value:v},{class:s.settings.speed===v?'selected':''})).join('')}</div><div class="actions">${button(r.running?'暂停':'继续','pause',{}, {class:'small'})}${button('快进一圈','tick',{}, {class:'small'})}${q?button('跳过节间休息','skipQualBreak',{}, {class:'small',disabled:r.q.status!=='BREAK'}):''}${button('自动完成','finishRace',{}, {class:'small',confirm:'按当前策略自动完成本场次；排位期间由 AI 安排本队出场。确认？'})}${button('红旗后恢复','resume',{}, {class:'small',disabled:!r.red})}</div></div>
    <div class="broadcast-grid"><section class="panel live-tower"><div class="panel-heading"><h2>${icon('stopwatch')}实时排名</h2><span class="muted">${q?'最佳圈差距':'~ 估算差距'}</span></div><div class="table-scroll"><table class="broadcast-timing"><thead><tr><th>P</th><th>车手</th><th>差距</th><th>最佳圈</th><th>状态</th><th>胎</th></tr></thead><tbody id="timing-body">${r.cars.map(x=>timingRow(s,x)).join('')}</tbody></table></div><div class="timing-legend compact"><span class="tone-fastest">● 全场最快</span><span class="tone-success">● 个人最快</span><span class="tone-warning">● 较慢</span></div></section>
    <section class="panel track-panel"><div class="map-heading"><div><p class="eyebrow">CIRCUIT TRACKER</p><h2>${h(track.city)}</h2></div><span>${track.length.toFixed(3)} KM · ${track.corners} TURNS</span></div>${trackSvg(s)}<div class="map-caption"><span>● 实心 / 空心：同队两台赛车</span><span>计时线示意 ${button('标注：'+(s.settings.mapLabels==='team'?'本队':'全场'),'mapLabels',{}, {class:'small map-label-toggle'})}</span></div>${telemetry(s,c)}</section>
    <aside class="live-commands"><h2>${icon('radio')}车队无线电</h2>${r.cars.filter(x=>x.teamId===s.player.teamId).sort((a,b)=>a.slot-b.slot).map(x=>command(s,x)).join('')}</aside></div>
    <div id="live-fastest">${fastestSummary(s,r.fastest)}</div><div class="grid-2">${panel('赛事消息',`<div id="race-events" class="race-events">${r.events.slice(0,10).map(eventItem).join('')}</div>`)}${panel(q?'排位规则与状态':'天气与比赛策略',q?`<p>${s.teams.length*2} 台赛车，前两段各淘汰 ${s.teams.length===11?6:5} 台，最后 10 台争夺杆位。无有效圈显示 NO TIME。</p><p>${r.kind==='SQ'?'干地 SQ1 / SQ2 每段只允许一套新中性胎，SQ3 一套软胎。':'成绩相同时，先做出该成绩者排名靠前。Q1 / Q2 之间休息 7 分钟，Q2 / Q3 之间休息 8 分钟。'}</p><p class="muted">${r.kind==='SQ'?'冲刺排位各段之间休息 7 分钟。':'107% 超时将标记为待裁判审查，游戏默认允许发车。'}飞行圈默认完成后回场；可提前选择连续推进。${r.q.status==='BREAK'?'本段已结束，可等待倒计时或跳过休息。':''}</p><details><summary>已完成各段成绩</summary>${r.q.stages.map((rows,i)=>`<h3>${r.kind}${i+1}</h3>${table(['名次','车手','时间'],rows.map((x,j)=>[j+1,h(driverOf(s,x.id).code),time(x.time)]))}`).join('')||'暂无'}</details>`:`<p>${icon('rain')} 路面积水 <strong data-live-wet>${number(r.wetness*100)}%</strong> · 基准路温 ${track.temp}°C</p><p>正赛干地须实际使用两种干胎；使用过雨胎可豁免。${track.id==='monaco'&&s.season.year>=2025?'摩纳哥至少两次停站。':''}</p><p class="muted">绿色旗帜下可使用 DRS；雨地、安全车与虚拟安全车期间禁用。出站损失计入连续比赛时间。离开此页面、切换到后台或打开对话框时暂停推进。</p>`)}</div>`;
}
const setText=(el,value)=>{if(el&&el.textContent!==String(value))el.textContent=value;};
const setHtml=(el,value)=>{if(el&&el._liveHTML!==value){el.innerHTML=value;el._liveHTML=value;}};
export function patchLive(s){
  const r=s.race,track=currentTrack(s),body=document.querySelector('#timing-body');if(!body)return;
  setText(document.querySelector('[data-live-clock]'),clock(r.qualifying?r.q.remaining:r.time,r.qualifying));
  setText(document.querySelector('[data-live-lap]'),r.qualifying?r.kind+r.q.stage:'LAP '+Math.min(r.lap+1,r.totalLaps));
  const flag=document.querySelector('[data-race="control"]'),code=r.red?'RED':r.control;
  if(flag){flag.className='flag-state flag-'+code;setHtml(flag,`${icon('flag')}<span>${h({GREEN:'绿旗',SC:'安全车',VSC:'虚拟安全车',RED:'红旗暂停'}[code]||code)}</span>`);}
  const cells=new Map([...body.children].map(el=>[el.dataset.car,el]));
  for(const c of r.cars){
    const row=cells.get(c.driverId);for(const [k,v]of Object.entries(timingCells(s,c)))setHtml(row?.querySelector(`[data-cell="${k}"]`),v);
    if(row){row.classList.toggle('retired-row',c.retired);row.classList.toggle('focused-row',c.driverId===focused(s).driverId);body.appendChild(row);}
    const dot=document.querySelector(`[data-dot="${c.driverId}"]`);if(dot){
      const hidden=['GARAGE','ELIMINATED','GRID'].includes(c.phase)||c.retired;
      dot.style.display=hidden?'none':'';
      const p=trackPoint(track.id,c.progress);if(c.phase==='PIT'){p[0]+=25;p[1]+=25;}
      dot.setAttribute('transform',`translate(${p[0].toFixed(2)} ${p[1].toFixed(2)})`);
      dot.classList.toggle('hide-label',s.settings.mapLabels==='team'&&c.teamId!==s.player.teamId&&c.driverId!==focused(s).driverId);
      dot.classList.toggle('selected-dot',c.driverId===focused(s).driverId);dot.classList.toggle('slow-dot',['OUT','IN','ABORT','PIT'].includes(c.phase));
      setText(dot.querySelector('.dot-label'),driverOf(s,c.driverId).code);
    }
    const ctrl=document.querySelector(`[data-command-car="${c.driverId}"]`);if(ctrl){
      setText(ctrl.querySelector('[data-live="fuel"]'),number(c.fuel));setText(ctrl.querySelector('[data-live="temp"]'),number(c.tyreTemperature));setHtml(ctrl.querySelector('[data-live="phase"]'),badge(phase(c),phaseTone(c)));setHtml(ctrl.querySelector('[data-live="wear"]'),wearMeter(c.tyreWear));setHtml(ctrl.querySelector('[data-live="inventory"]'),tyreInventory(s.calendar.weekend.tyres[c.driverId]));
      const inactive=c.retired||c.finished||c.phase==='ELIMINATED';
      for(const el of ctrl.querySelectorAll('select,input,button'))el.disabled=inactive;
      if(r.qualifying){
        const garage=c.phase==='GARAGE'&&r.q.status==='RUNNING'&&r.q.remaining>0;
        for(const el of ctrl.querySelectorAll('form input,form select,form button'))el.disabled=!garage;
        for(const input of ctrl.querySelectorAll('input[name="compound"]'))input.disabled=!garage||!allowedQualTyres(s,c).includes(input.value);
        for(const btn of ctrl.querySelectorAll('[data-action="qualCommand"]')){
          const p=JSON.parse(btn.dataset.payload);btn.disabled=inactive||(p.command==='fly'?c.phase!=='OUT':p.command==='abort'||p.command==='repeat'?c.phase!=='FLY':p.command==='return'?!['FLY','OUT'].includes(c.phase):false);
          if(p.command==='auto')setText(btn,'自动出场：'+(c.autoQual?'开':'关'));
        }
        setText(ctrl.querySelector('[data-live="intent"]'),c.phase==='OUT'?'圈末计划：'+(c.outChoice==='PIT'?'返回 Pit':'开始飞行圈'):c.phase==='FLY'?'完成后：'+(c.afterLap==='FLY'?'再推一个飞行圈':'进入回场圈'):c.phase==='ABORT'?'本圈无效，圈末返回 Pit':c.phase==='IN'?'完成回场圈后返回车库':c.phase==='GARAGE'?'等待出场指令':'本段已淘汰');
      }else setText(ctrl.querySelector('[data-live="intent"]'),c.pitRequest?'已预约：本圈末进站换 '+c.pitRequest+' 胎':c.phase==='PIT'?'正在维修区，出站后恢复比赛':'按当前策略行驶 · 停站 '+c.stops+' 次');
    }
  }
  const c=focused(s),focus=document.querySelector('#map-telemetry');if(focus){
    for(const [k,v]of Object.entries({phase:phase(c),lap:time(c.currentLap),speed:number(c.speed),last:time(c.lastLap),best:time(r.qualifying?c.stageBest:c.best),completed:c.lap}))setText(focus.querySelector(`[data-focus="${k}"]`),v);
    setHtml(focus.querySelector('[data-focus="tyre"]'),tyre(c.compound));
    for(let i=0;i<3;i++){
      const box=focus.querySelector(`[data-sector="${i}"]`);box.className='sector-box tone-'+(sectorTone(c,i));const active=c.sector===i&&['RACE','OUT','FLY','IN','ABORT'].includes(c.phase);
      setText(focus.querySelector(`[data-sector-current="${i}"]`),active?'进行中':'');setText(focus.querySelector(`[data-sector-time="${i}"]`),active?time(Math.max(0,r.time-c.sectorStart)):sectorValue(c,i)>0?time(sectorValue(c,i)):'—');setText(focus.querySelector(`[data-sector-speed="${i}"]`),number(sectorSpeed(c,i)));
    }
  }
  setHtml(document.querySelector('#live-fastest'),fastestSummary(s,r.fastest));setHtml(document.querySelector('#race-events'),r.events.slice(0,10).map(eventItem).join(''));setText(document.querySelector('[data-live-wet]'),number(r.wetness*100)+'%');
}

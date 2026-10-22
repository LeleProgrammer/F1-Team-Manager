import { liveView, patchLive } from './liveView.js';
// ===== 文件: js/ui/raceView.js =====
import { teamOf } from '../core/helpers.js';
import { currentTrack } from '../core/calendar.js';
import { SESSION_NAMES } from '../data/i18n.js';
import { MODES, ENGINES, COMPOUNDS } from '../data/parts.js';
import {
  h, header, panel, badge, button, link, table, time, number, icon, select, empty,
  tyre, tyreField, tyreInventory, tyreLegend, lapDisplay, wearMeter, severity,
  rankBadge, positionChange, raceStatus, flagState, eventItem, fastestSummary
} from './uiKit.js';

function timingLegend() {
  return `<div class="timing-legend"><span class="tone-fastest">${icon('stopwatch')}全场最快</span><span class="tone-success">${icon('check')}个人最快</span><span class="tone-warning">${icon('warning')}需要关注</span><span class="tone-danger">${icon('cross')}故障 / 处罚</span></div>`;
}
function resultTable(s,result) {
  const leader=result.rows.find(r=>r.classified);
  return table(['名次','车手','车队','位次变化','差距 / 状态','最快圈','进站','罚时','积分'],result.rows.map(r=>[
    rankBadge(r.position),h(s.drivers.find(d=>d.id===r.driverId)?.code||'')+' · '+h(r.name),h(s.teams.find(t=>t.id===r.teamId)?.name||r.teamId),
    positionChange(r.grid,r.position),
    r.disqualified?badge('DSQ · 取消资格','danger'):r.retired?badge('退赛 · '+r.reason,'danger'):r.position===1?time(r.time):r.lap<(leader?.lap||0)?'+'+((leader?.lap||0)-r.lap)+' LAP':'+'+number(r.time-(leader?.time||0))+'s',
    lapDisplay(r.best,{fastest:result.fastest?.driverId===r.driverId}),
    `<span class="pit-count">${icon('pit')}${r.stops}</span>`,
    r.penalty?badge('+'+r.penalty+'s','danger','warning'):'—',
    `<strong class="points-value ${r.points>0?'tone-success':''}">${r.points}</strong>`
  ]),'race-result');
}
function sessionControls(s) {
  const w=s.calendar.weekend,current=w.sessions[w.index];
  if(!current)return `<div class="notice">${icon('check')}周末全部场次已完成。${button('完成本站结算','closeWeekend',{}, {class:'primary'})}</div>`;
  if(current.startsWith('FP'))return panel(SESSION_NAMES[current],`<p>练习将采集设定置信区间、轮胎寿命和燃油数据。可先在赛历页面调整两台赛车的设定。</p><div class="actions">${link('调校赛车','calendar')}${button('模拟本节练习','practice',{}, {class:'primary'})}</div>`);
  if(current==='Q'||current==='SQ') {
    const q=w.qualifying;
    return panel(SESSION_NAMES[current],`<p>${s.teams.length*2} 台赛车参加。排位赛使用实时倒计时与赛道地图，请分别安排两台赛车出场。</p><p>${current==='SQ'?'SQ1 / SQ2 / SQ3 为 12 / 10 / 8 分钟。':'Q1 / Q2 / Q3 为 18 / 15 / 12 分钟。'}前两段各淘汰 ${s.teams.length===11?6:5} 台赛车。</p><div class="actions">${button('进入实时'+SESSION_NAMES[current],'startQualifying',{}, {class:'primary'})}</div>`);

  }
  return panel(SESSION_NAMES[current]+' · 发车准备',`<p>发车路面积水预估 ${number((w.weatherStart||0)*100)}%。策略工作台可配置两台赛车的起步轮胎、进站窗口和安全车预案。默认由你指挥。</p>${tyreLegend()}<div class="actions">${link('检查策略','calendar')}${button('开始'+SESSION_NAMES[current],'startRace',{}, {class:'primary'})}</div>`);
}
function temperatureTone(car) {
  const compound=COMPOUNDS[car.compound];
  if(!compound)return 'neutral';
  return car.tyreTemperature<compound.min?'info':car.tyreTemperature>compound.max?'warning':'success';
}
function liveRow(s,c) {
  const leader=s.race.cars.find(x=>!x.retired)||s.race.cars[0],fastest=s.race.fastest?.driverId===c.driverId;
  return `<tr data-car="${h(c.driverId)}" class="${c.teamId===s.player.teamId?'player-row':''} ${c.retired?'retired-row':''}">
    <td data-cell="position">${rankBadge(c.position)}</td>
    <td><span class="team-line" style="--row-color:${h(s.teams.find(t=>t.id===c.teamId).color)}"></span><strong>${h(c.name)}</strong><small>${h(s.teams.find(t=>t.id===c.teamId).abbr)}</small></td>
    <td data-cell="gap">${c.retired?badge('退赛','danger'):c.position===1?'领先':'+'+number(c.time-leader.time)}</td>
    <td data-cell="last">${lapDisplay(c.lastLap,{fastest:c.lastLap>0&&c.lastLap===s.race.fastest?.time,personal:c.lastLap>0&&c.lastLap===c.best})}</td>
    <td data-cell="best">${lapDisplay(c.best,{fastest})}</td>
    <td data-cell="tyre"><span class="tyre-age">${tyre(c.compound)}<span>${c.tyreAge} 圈</span></span></td>
    <td data-cell="wear">${wearMeter(c.tyreWear)}</td>
    <td data-cell="stops"><span class="pit-count">${icon('pit')}${c.stops}</span></td>
    <td data-cell="status">${raceStatus(c)}</td>
  </tr>`;
}
function carControl(s,c) {
  return `<article class="command-card ${c.retired?'retired-car':''}" data-command-car="${h(c.driverId)}">
    <div class="split"><div><p class="eyebrow">${c.slot+1} 号车 · P<span data-live="position">${c.position}</span></p><h3>${h(c.name)}</h3></div><span class="tyre tyre-${h(c.compound)}" data-live="compound" title="${h(COMPOUNDS[c.compound].name)}">${c.compound}</span></div>
    <div class="telemetry-cells">
      <div><small>${icon('tyre')}轮胎磨损</small><strong data-live="wear" class="tone-${severity(c.tyreWear)}">${number(c.tyreWear)}%</strong></div>
      <div><small>${icon('thermometer')}轮胎温度</small><strong data-live="temp" class="tone-${temperatureTone(c)}">${number(c.tyreTemperature)}°C</strong></div>
      <div><small>${icon('fuel')}燃油</small><strong data-live="fuel">${number(c.fuel)} kg</strong></div>
      <div><small>${icon('stopwatch')}最佳单圈</small><strong data-live="best">${lapDisplay(c.best,{fastest:s.race.fastest?.driverId===c.driverId})}</strong></div>
    </div>
    <label class="field"><span>${icon('car')}驾驶指令</span>${select('mode',Object.entries(MODES).map(([k,v])=>[k,v.name]),c.mode,`data-live-command="mode" data-driver="${h(c.driverId)}"`)}</label>
    <label class="field"><span>${icon('bolt')}引擎模式</span>${select('engine',Object.entries(ENGINES).map(([k,v])=>[k,v.name]),c.engine,`data-live-command="engine" data-driver="${h(c.driverId)}"`)}</label>
    <form data-form="pit" class="pit-form"><input type="hidden" name="id" value="${h(c.driverId)}">${tyreField('进站轮胎','value','H',{compact:true})}<button type="submit" class="btn primary">${icon('pit')}进站换胎</button></form>
    <div class="actions">${button('取消进站','command',{id:c.driverId,command:'cancelPit'},{class:'small'})}</div>
    <p class="radio-advice" data-live="advice">${c.retired?'已退赛':c.tyreWear>65?'轮胎退化明显，建议准备进站':'轮胎状态正常，注意天气与窗口。'}</p>
    <div data-live="inventory">${tyreInventory(s.calendar.weekend.tyres[c.driverId])}</div>
  </article>`;
}
export function raceView(s) {
  const w=s.calendar.weekend,track=currentTrack(s),r=s.race;
  if(r?.realtime&&!r.finished)return liveView(s);
  if(!w)return `${header('比赛指挥','维修墙待命','先进入比赛周末，再执行练习、排位与比赛。')}${panel('下一站准备',`${empty(s.season.offseason?'当前处于转会窗。':'本站赛车尚未登记。')}${link('前往赛历','calendar','primary')}`)}`;
  if(!r||r.finished)return `${header('比赛指挥',track.name+' · '+(SESSION_NAMES[w.sessions[w.index]]||'周末结束'),'按对应年份的周末流程推进。')}${sessionControls(s)}${r?.qualifying&&r.finished?panel('排位赛各段成绩',r.q.stages.map((rows,i)=>`<details ${i===2?'open':''}><summary>${r.kind}${i+1}</summary>${table(['名次','车手','配方','成绩'],rows.map((x,j)=>[rankBadge(j+1),h(s.drivers.find(d=>d.id===x.id)?.code)+' · '+h(x.name),tyre(x.compound),lapDisplay(x.time,{fastest:j===0})]))}</details>`).join('')):''}${r?.result?panel((r.sprint?'冲刺赛':'正赛')+'赛后报告',`${fastestSummary(s,r.fastest)}${timingLegend()}${resultTable(s,r.result)}<p class="muted">${s.season.rules.fastestLap?'正赛前十中的全场最快圈可获 1 分。':'本赛季最快圈不加分。'}</p><details><summary>罚则与事件记录</summary>${r.events.map(eventItem).join('')}</details><details><summary>分段成绩与位置轨迹</summary>${table(['圈数','领跑车手','累计时间'],r.segments.map(x=>[x.lap,h(s.drivers.find(d=>d.id===x.leader)?.name),time(x.time)]))}<canvas data-chart="positions" aria-label="本队位置变化图"></canvas></details>`):''}`;
  return `${header('比赛指挥 / 实时计时',track.name+' · '+SESSION_NAMES[r.kind],track.city+' · '+r.totalLaps+' 圈',`<span class="live-indicator">实时模拟</span>`)}
    <div class="race-toolbar"><div class="lap-count"><span data-race="lap">${r.lap}</span><small> / ${r.totalLaps} 圈</small></div>${flagState(r)}<div class="speed-controls">${[1,2,4,10].map(v=>button(v+'×','speed',{value:v},{class:s.settings.speed===v?'selected':''})).join('')}</div><div class="actions">${button(r.running?'暂停':'继续','pause',{}, {class:'small'})}${button('下一圈','tick',{count:1},{class:'small'})}${button('下一事件','tick',{count:1000,untilEvent:true},{class:'small'})}${button('模拟到底','finishRace',{}, {class:'small',confirm:'自动执行当前指令和策略直到终点，确认？'})}${button('红旗后恢复','resume',{}, {class:'small',disabled:!r.red})}</div></div>
    <div id="live-fastest">${fastestSummary(s,r.fastest)}</div>${timingLegend()}
    <div class="race-layout"><section class="panel tower"><div class="panel-heading"><h2>${icon('stopwatch')}实时计时塔</h2><span class="muted">差距相对领先者 / 秒</span></div><div class="table-scroll"><table class="timing-table"><thead><tr><th>位置</th><th>车手 / 车队</th><th>领先差距</th><th>上一圈</th><th>最佳圈</th><th>配方 / 胎龄</th><th>磨损</th><th>停站</th><th>状态</th></tr></thead><tbody id="timing-body">${r.cars.map(c=>liveRow(s,c)).join('')}</tbody></table></div></section><aside class="command-column">${r.cars.filter(c=>c.teamId===s.player.teamId).sort((a,b)=>a.slot-b.slot).map(c=>carControl(s,c)).join('')}</aside></div>
    <div class="grid-2">${panel('气象与雨带预报',`<div class="weather-overview"><strong data-race="weather">${icon('rain')}路面积水 ${number(r.wetness*100)}%</strong><span>${icon('thermometer')}${track.temp}°C 基准路温</span></div><div class="weather-radar">${r.forecast.map(cell=>`<div title="第 ${cell.lap} 圈，预报降雨强度 ${number(cell.rain*100)}%，可信度 ${number(cell.confidence)}%"><i style="height:${Math.max(6,cell.rain*75)}px"></i><small>L${cell.lap}</small></div>`).join('')}</div><p class="muted">阴影柱表示预报雨带强度；路面湿度滞后于降雨。DRS 在湿地与安全车期间禁用。</p>`)}${panel('车队无线电与事件',`<div class="race-events" id="race-events">${r.events.slice(0,12).map(eventItem).join('')}</div>`)}</div>`;
}
// 只替换改变的单元格内容与现有行顺序；不会重建行或驾驶 / 换胎控件。
export function patchRace(s) {
  if(s.race?.realtime){patchLive(s);return;}
  const r=s.race,body=document.querySelector('#timing-body');
  if(!r||r.finished||!body)return;
  const text=(el,value)=>{if(el&&el.textContent!==String(value))el.textContent=value;};
  const html=(el,value)=>{if(el&&el._visualHtml!==value){el.innerHTML=value;el._visualHtml=value;}};
  text(document.querySelector('[data-race="lap"]'),r.lap);
  const flag=document.querySelector('[data-race="control"]'),code=r.red?'RED':r.control;
  if(flag&&flag.dataset.control!==code)html(flag.parentElement.querySelector('[data-race="control"]'),`${icon('flag')}<span>${h({GREEN:'绿旗',SC:'安全车',VSC:'虚拟安全车',RED:'红旗暂停'}[code]||code)}</span>`);
  if(flag){flag.className='flag-state flag-'+code;flag.dataset.control=code;}
  html(document.querySelector('[data-race="weather"]'),`${icon('rain')}路面积水 ${number(r.wetness*100)}%`);
  html(document.querySelector('#live-fastest'),fastestSummary(s,r.fastest));
  const leader=r.cars.find(c=>!c.retired)||r.cars[0],rows=new Map(Array.from(body.children).map(el=>[el.dataset.car,el]));
  const controls=new Map(Array.from(document.querySelectorAll('[data-command-car]')).map(el=>[el.dataset.commandCar,el]));
  for(const c of r.cars) {
    const row=rows.get(c.driverId);if(!row)continue;
    const values={
      position:rankBadge(c.position),gap:c.retired?badge('退赛','danger'):h(c.position===1?'领先':'+'+number(c.time-leader.time)),
      last:lapDisplay(c.lastLap,{fastest:c.lastLap>0&&c.lastLap===r.fastest?.time,personal:c.lastLap>0&&c.lastLap===c.best}),
      best:lapDisplay(c.best,{fastest:r.fastest?.driverId===c.driverId}),
      tyre:`<span class="tyre-age">${tyre(c.compound)}<span>${c.tyreAge} 圈</span></span>`,
      wear:wearMeter(c.tyreWear),stops:`<span class="pit-count">${icon('pit')}${c.stops}</span>`,status:raceStatus(c)
    };
    for(const [key,value]of Object.entries(values))html(row.querySelector(`[data-cell="${key}"]`),value);
    row.classList.toggle('retired-row',c.retired);body.appendChild(row);
    const command=controls.get(c.driverId);
    if(command) {
      const fields={position:c.position,compound:c.compound,wear:number(c.tyreWear)+'%',temp:number(c.tyreTemperature)+'°C',fuel:number(c.fuel)+' kg',advice:c.retired?'已退赛':c.tyreWear>65?'轮胎衰退明显，建议准备进站':r.wetness>.2?'雨带已经抵达，建议检查配方':'轮胎状态正常，注意窗口。'};
      for(const [key,value]of Object.entries(fields))text(command.querySelector(`[data-live="${key}"]`),value);
      const compound=command.querySelector('[data-live="compound"]');compound.className='tyre tyre-'+c.compound;compound.title=COMPOUNDS[c.compound].name;
      command.querySelector('[data-live="wear"]').className='tone-'+severity(c.tyreWear);
      command.querySelector('[data-live="temp"]').className='tone-'+temperatureTone(c);
      html(command.querySelector('[data-live="best"]'),lapDisplay(c.best,{fastest:r.fastest?.driverId===c.driverId}));
      html(command.querySelector('[data-live="inventory"]'),tyreInventory(s.calendar.weekend.tyres[c.driverId]));
      command.classList.toggle('retired-car',c.retired);
      for(const input of command.querySelectorAll('select,button,input[type="radio"]'))input.disabled=c.retired;
    }
  }
  const events=document.querySelector('#race-events');if(events)html(events,r.events.slice(0,12).map(eventItem).join(''));
  const resume=document.querySelector('[data-action="resume"]');if(resume)resume.disabled=!r.red;
}
export function reportHtml(s,index) {
  const result=s.history.races[index];
  return result?`<p>${h(result.track)} · 第 ${result.round} 站 · ${result.kind==='SPRINT'?'冲刺':'正赛'}</p>${fastestSummary(s,result.fastest)}${resultTable(s,result)}<details><summary>罚则记录</summary>${result.penalties.map(p=>`<p>${badge('L'+p.lap,'warning','warning')} ${h(p.reason)} ${p.seconds?badge('+'+p.seconds+'s','danger'):''}</p>`).join('')||'<p>无罚则</p>'}</details>`:empty('该报告不存在。');
}

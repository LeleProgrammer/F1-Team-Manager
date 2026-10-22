import { generateSeed } from './core/rng.js';
// ===== 文件: js/main.js =====
import {
  NAV, SESSION_NAMES
}
from './data/i18n.js';
import {
  seasonTeams
}
from './data/teams.js';
import {
  DIMENSIONS, COMPOUNDS
}
from './data/parts.js';
import {
  getState, setState, createGame, dispatch
}
from './core/state.js';
import {
  teamOf, copy
}
from './core/helpers.js';
import {
  currentEvent, currentTrack
}
from './core/calendar.js';
import {
  performance, tyreChartData
}
from './core/car.js';
import {
  projectQuote
}
from './core/rnd.js';
import {
  saveSlot, loadSlot, slotInfo, deleteSlot, exportText, importText
}
from './core/save.js';
import {
  dashboard
}
from './ui/dashboard.js';
import {
  carView
}
from './ui/carView.js';
import {
  rndView
}
from './ui/rndView.js';
import {
  staffView
}
from './ui/staffView.js';
import {
  driversView
}
from './ui/driversView.js';
import {
  financeView
}
from './ui/financeView.js';
import {
  calendarView
}
from './ui/calendarView.js';
import {
  raceView, patchRace, reportHtml
}
from './ui/raceView.js';
import {
  standingsView
}
from './ui/standingsView.js';
import {
  saveView
}
from './ui/saveView.js';
import {
  setupWizard
}
from './ui/setupWizard.js';
import {
  h, icon, teamBadge, money, progress, toast, openDialog, confirmDialog, field, select, drawChart
}
from './ui/uiKit.js';
const views={
  dashboard,car:carView,rnd:rndView,staff:staffView,drivers:driversView,finance:financeView,calendar:calendarView,race:raceView,standings:standingsView,save:saveView
};
let draft={
  year:2025,teamId:'mclaren',mode:'existing',seed:generateSeed()
};
let wizard=true;
let saveStatus='尚未保存';
let lastAutosave=0;
let frame=0;
let liveFrame=false;
const root=document.querySelector('#app');
function route() {
  const key=location.hash.slice(1);
  return views[key]?key:'dashboard';
}
function autosave(force=false) {
  const s=getState();
  if(!s?.settings.autosave)return;
  if(!force&&Date.now()-lastAutosave<5000)return;
  try{
    saveStatus='已保存 '+saveSlot(s);
    lastAutosave=Date.now();
  }
  catch(error) {
    saveStatus='自动保存失败，请导出备份';
    toast(error.message,'error');
  }
  const el=document.querySelector('#save-status');
  if(el)el.textContent=saveStatus;
}
function charts() {
  const s=getState();
  if(!s)return;
  const t=teamOf(s);
  for(const canvas of root.querySelectorAll('canvas[data-chart]')) {
    const kind=canvas.dataset.chart;
    if(kind==='tyres'){drawChart(canvas,tyreChartData(s,currentTrack(s)));}
    else if(kind==='performance') {
      const v=performance(s,t);
      drawChart(canvas,{
        type:'radar',labels:['下压力','气动效率','机械抓地','动力','轮胎管理','可靠性'],values:[v.downforce,v.aero,v.grip,v.power,v.tyres,v.reliability],color:t.color
      });
    }
    else if(kind==='finance') {
      const list=s.finance[t.id].ledger.slice(0,12).reverse();
      drawChart(canvas,{
        labels:list.map(x=>'日'+x.day),values:list.map(x=>Math.abs(x.amount)),colors:list.map(x=>x.amount>=0?'#78e3b0':'#ff8794'),color:t.color
      });
    }
    else if(kind==='points') {
      let total=0;
      const values=s.calendar.events.map((e,i)=> {
        total+=t.results.filter(x=>x.round===i+1).reduce((a,x)=>a+x.points,0); return total;
      });
      drawChart(canvas,{
        type:'line',labels:values.map((_,i)=>'R'+(i+1)),values,color:t.color
      });
    }
    else if(kind==='positions'&&s.race) {
      const records=s.race.positions;
      drawChart(canvas,{
        type:'line',labels:records.map(x=>'L'+x.lap),series:t.drivers.map((id,i)=>({
          color:i?t.secondary:t.color,values:records.map(x=>x.positions.find(p=>p.id===id)?.position||s.teams.length*2)
        }))
      });
    }
  }
}
function shell(s,content) {
  const t=teamOf(s),f=s.finance[t.id],e=currentEvent(s),track=currentTrack(s),w=s.calendar.weekend;
  document.documentElement.style.setProperty('--accent',t.color);
  return `<div class="app-shell"><aside class="sidebar"><a class="wordmark" href="#dashboard"><span class="brand-slashes">▰▰</span><b class="brand-name">维修墙</b><span>车队经理</span></a><p class="nav-group-label">赛季运营</p><nav aria-label="主导航">${NAV.map(([key,label,id])=>`<a class="nav-link ${route()===key?'active':''}" href="#${key}" title="${h(label)}" ${route()===key?'aria-current="page"':''}>${icon(id)}<span>${h(label)}</span></a>`).join('')}</nav><div class="sidebar-footer"><strong>${s.season.year} · ${s.teams.length} 支车队</strong><p>本地模拟 / 零外部依赖</p><p>非官方 F1 同人项目</p></div></aside><div class="workspace"><header class="topbar">${teamBadge(t)}<div class="top-metrics"><div><small>当前日期</small><strong>${h(s.calendar.date)}</strong></div><div class="top-next"><small>${s.season.offseason?'赛季阶段':'下一站 / R'+(e?.round||'—')}</small><strong>${h(track?.name||'转会窗')}</strong></div><div class="top-money"><small>可用现金</small><strong>${money(f.cash)}</strong></div><div class="top-cap"><small>预算帽 ${money(f.capUsed)} / ${money(f.capLimit)}</small>${progress(f.capUsed,f.capLimit)}</div><span id="save-status" class="save-status" role="status">${h(saveStatus)}</span></div></header><main id="main-content" class="main-content">${s.season.gameOver?`<section class="game-over"><h2>经理生涯结束</h2><p>${h(s.season.gameOver)}</p><a class="btn" href="#save">读取存档或新建生涯</a></section>`:''}${content}</main></div></div>`;
}
function render() {
  frame=0;
  const s=getState();
  try{
    if(wizard||!s) {
      root.innerHTML=setupWizard(draft,!!slotInfo('auto'));
      document.documentElement.style.setProperty('--accent','#68e8b5');
      return;
    }
    root.innerHTML=shell(s,views[route()](s));
    requestAnimationFrame(()=>{charts();const latest=getState();if(route()==='race'&&latest?.race?.realtime&&!latest.race.finished)patchRace(latest);});
  }
  catch(error) {
    toast('界面渲染失败：'+error.message,'error');
    root.innerHTML=`<main class="boot-message"><h1>无法显示当前页面</h1><p>${h(error.message)}</p><a class="btn" href="#save">前往存档</a><button class="btn" data-new-game>重新开始</button></main>`;
  }
}
function scheduleRender(live=false) {
  if(frame) {
    if(!live)liveFrame=false;
    return;
  }
  liveFrame=live;
  frame=requestAnimationFrame(()=> {
    frame=0; const s=getState(); if(liveFrame&&!wizard&&route()==='race'&&s?.race&&!s.race.finished&&document.querySelector('#timing-body')) {
      liveFrame=false; patchRace(s); return;
    }
    liveFrame=false; render();
  });
}
function perform(action,payload={
},quiet=false) {
  try{
    const prev=getState()?.race;const signature=prev?`${prev.q?.stage}/${prev.q?.status}`:'';
    const message=dispatch(action,payload);const active=getState()?.race;const changed=active&&signature!==`${active.q?.stage}/${active.q?.status}`;
    if(!changed&&['tick','command','advanceRealtime','qualCommand','focusDriver','timingGap'].includes(action)&&getState().race&&!getState().race.finished) {
      if(action==='command'||action==='qualCommand')toast(message);
      if(action==='focusDriver'||action==='timingGap')patchRace(getState());
      scheduleRender(true);
    }
    else{
      scheduleRender();
      if(!quiet)toast(message);
    }
    autosave(!quiet);
  }
  catch(error) {
    toast(error.message,'error');
    if(!quiet)scheduleRender();
  }
}
function captureDraft() {
  const form=document.querySelector('#setup-form');
  if(form)draft={
    ...draft,...Object.fromEntries(new FormData(form))
  };
}
function load(slot) {
  const work=()=> {
    try{
      const state=loadSlot(slot);
      setState(state);
      wizard=false;
      saveStatus='已读取 '+slot;
      location.hash='dashboard';
      render();
      toast('存档读取成功');
    }
    catch(error) {
      toast(error.message,'error');
    }
  };
  if(getState()&&!wizard)confirmDialog('读取此存档将替换当前进度，请确保已备份。确认读取？',work);
  else work();
}
function download(filename,text) {
  const url=URL.createObjectURL(new Blob([text],{
    type:'application/json'
  })),a=document.createElement('a');
  a.href=url;
  a.download=filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function contractDialog(kind,id) {
  const s=getState(),isStaff=kind.includes('Staff'),entity=(isStaff?s.staff:s.drivers).find(x=>x.id===id);
  if(!entity)return;
  const salary=isStaff?entity.salary:entity.contract.salary;
  const signing=kind==='signDriver'||kind==='hireStaff';
  openDialog((signing?'接洽签约 · ':'续约 · ')+entity.name,`<form><p class="muted">合同将立即生效。比赛周末已登记时，请先完成周末再签约。${signing?'对方可能拒绝报价；挖角及替换已有席位需要违约金。':''}</p>${field('年薪（百万美元）',`<input name="salary" type="number" min="0.1" max="${isStaff?20:100}" step="0.01" value="${(salary*1.15).toFixed(2)}" required>`)}${field('合同年限',select('years',[1,2,3,4,5],2))}${kind==='signDriver'?field('替换席位',select('slot',[[0,'1 号车 · '+s.drivers.find(d=>d.id===teamOf(s).drivers[0]).name],[1,'2 号车 · '+s.drivers.find(d=>d.id===teamOf(s).drivers[1]).name]],0)):''}<p class="notice">确认即提出合同并按结果支付解约 / 挖角费用；薪资在日常运营中计入预算帽。</p><div class="actions"><button class="btn" type="button" data-close>取消</button><button type="submit" class="btn primary">确认合同报价</button></div></form>`,data=> {
    document.querySelector('#modal').close(); perform(kind,{
      id,...Object.fromEntries(data)
    });
  });
}
root.addEventListener('click',event=> {
  const el=event.target.closest('button,a,[data-action]'); if(!el)return; if(el.hasAttribute('data-generate-seed')){captureDraft();draft.seed=generateSeed();render();return;}
  if(el.dataset.chooseTeam) {
    captureDraft(); draft.teamId=el.dataset.chooseTeam; render(); return;
  }
  if(el.dataset.action) {
    const action=el.dataset.action; let payload; try{
      payload=JSON.parse(el.dataset.payload||'{}');
    }
    catch(error) {
      toast('操作参数无效','error'); return;
    }
    if(el.dataset.confirm)confirmDialog(el.dataset.confirm,()=>perform(action,payload)); else perform(action,payload); return;
  }
  if(el.dataset.contract) {
    contractDialog(el.dataset.contract,el.dataset.id); return;
  }
  if(el.dataset.report!==undefined) {
    openDialog('比赛档案',reportHtml(getState(),Number(el.dataset.report))); return;
  }
  if(el.dataset.save) {
    confirmDialog('将当前进度写入此槽位，覆盖原有存档。确认？',()=> {
      try{
        saveStatus='手动保存 '+saveSlot(getState(),el.dataset.save); render(); toast('手动存档成功');
      }
      catch(error) {
        toast(error.message,'error');
      }
    }); return;
  }
  if(el.dataset.load) {
    load(el.dataset.load); return;
  }
  if(el.dataset.deleteSave) {
    confirmDialog('永久删除这个本地存档槽位，确认？',()=> {
      try{
        deleteSlot(el.dataset.deleteSave); render(); toast('存档已删除');
      }
      catch(error) {
        toast(error.message,'error');
      }
    }); return;
  }
  if(el.hasAttribute('data-new-game')) {
    confirmDialog('进入新生涯向导，当前进度请先手动保存或导出备份。确认？',()=> {
      wizard=true; location.hash='setup'; render();
    }); return;
  }
  if(el.hasAttribute('data-export')) {
    download('pitwall-'+getState().season.year+'-'+getState().calendar.round+'.json',exportText(getState())); toast('存档已导出'); return;
  }
  if(el.hasAttribute('data-export-text')) {
    document.querySelector('#export-text').value=exportText(getState()); toast('JSON 文本已生成'); return;
  }
  if(el.hasAttribute('data-copy')) {
    const area=document.querySelector('#export-text'); if(!area.value)area.value=exportText(getState()); if(navigator.clipboard&&location.protocol!=='file:') {
      navigator.clipboard.writeText(area.value).then(()=>toast('已复制存档')).catch(()=> {
        area.select(); toast('请按 Ctrl+C 复制选中文本');
      });
    }
    else{
      area.select(); toast('请按 Ctrl+C 复制选中文本');
    }
    return;
  }
  if(el.dataset.sort!==undefined) {
    const table=el.closest('table'),body=table.tBodies[0],index=Number(el.dataset.sort),direction=el.dataset.direction==='asc'?-1:1; el.dataset.direction=direction===1?'asc':'desc'; const rows=Array.from(body.rows); rows.sort((a,b)=> {
      const x=a.cells[index].textContent.trim(),y=b.cells[index].textContent.trim(),nx=Number(x.replace(/[^\d.\-]/g,'')),ny=Number(y.replace(/[^\d.\-]/g,'')); return direction*(x.match(/\d/)&&y.match(/\d/)&&Number.isFinite(nx)&&Number.isFinite(ny)?nx-ny:x.localeCompare(y,'zh-CN'));
    }); for(const row of rows)body.append(row);
  }
});
root.addEventListener('change',event=> {
  const el=event.target; if(wizard&&el.type==='color'){captureDraft();render();}
  else if(el.hasAttribute('data-wizard-change')) {
    const previousYear=Number(draft.year); captureDraft(); if(Number(draft.year)!==previousYear) {
      draft.alternate=-1; draft.teamId=seasonTeams(Number(draft.year))[0].id;
    }
    render();
  }
  else if(el.dataset.liveCommand) {
    perform('command',{
      id:el.dataset.driver,command:el.dataset.liveCommand,value:el.value
    });
  }
  else if(el.hasAttribute('data-autosave')) {
    perform('autosave',{
      value:el.checked
    });
  }
  else if(el.id==='import-file') {
    const file=el.files[0]; if(!file)return; if(file.size>12*1024*1024) {
      toast('存档超过 12 MB 限制','error'); return;
    }
    file.text().then(text=> {
      document.querySelector('#import-text').value=text; toast('文件已读取，请点击验证并导入');
    }).catch(()=>toast('无法读取文件','error'));
  }
});
root.addEventListener('keydown',event=>{const el=event.target.closest('a[role="button"][data-action]');if(el&&['Enter',' '].includes(event.key)){event.preventDefault();perform(el.dataset.action,JSON.parse(el.dataset.payload||'{}'));}});
root.addEventListener('input',event=> {
  const el=event.target; if(el.type==='range'&&el.nextElementSibling?.tagName==='OUTPUT')el.nextElementSibling.value=el.value; if(el.dataset.filter) {
    const term=el.value.trim().toLocaleLowerCase(); const table=document.getElementById(el.dataset.filter); if(table)for(const row of table.tBodies[0].rows)row.hidden=!row.textContent.toLocaleLowerCase().includes(term);
  }
});
root.addEventListener('submit',event=> {
  const form=event.target; if(!form.dataset.form)return; event.preventDefault(); const p=Object.fromEntries(new FormData(form)),kind=form.dataset.form; try{
    if(kind==='newGame') {
      const state=createGame({
        ...p,custom:p.mode==='custom',driverNames:[p.driverName0||'Ren Aoki',p.driverName1||'Alex Morgan'],driverIds:[p.driverId0||'custom',p.driverId1||'custom']
      }); setState(state); wizard=false; location.hash='dashboard'; autosave(true); render(); toast('欢迎来到维修墙，先检查目标与工厂，再进入比赛周末。');
    }
    else if(kind==='setup') {
      perform('setup',{
        slot:Number(p.slot),values:[0,1,2,3].map(i=>Number(p['v'+i]))
      });
    }
    else if(kind==='strategy') {
      perform('strategy',{
        id:p.id,plan:{
          start:p.start,pitLap:Number(p.pitLap),secondLap:Number(p.secondLap),next:p.next,backup:p.backup,rain:p.rain,auto:form.querySelector('[name="auto"]').checked
        }
      });
    }
    else if(kind==='project') {
      const q=projectQuote(getState(),teamOf(getState()),p.part,p.kind,Number(p.copies)); confirmDialog(`项目总预付 ${money(q.cost+q.manufacturing)}，工期 ${q.days} 天，风洞 ${q.wind} / CFD ${q.cfd}，失败风险 ${(q.risk*100).toFixed(1)}%。确认立项？`,()=>perform('project',p));
    }
    else if(kind==='qualSend'){perform('qualCommand',{id:p.id,command:'send',value:{compound:p.compound,fresh:p.fresh!=='reuse'}});}
    else if(kind==='driverCode'){perform('driverCode',{id:p.id,value:p.value});}
    else if(kind==='train') {
      perform('train',p);
    }
    else if(kind==='pit') {
      perform('command',{
        id:p.id,command:'pit',value:p.value
      });
    }
    else if(kind==='import') {
      const imported=importText(p.json); confirmDialog('存档结构验证通过。导入将替换当前进度，确认？',()=> {
        setState(imported); wizard=false; location.hash='dashboard'; autosave(true); render(); toast('存档导入成功');
      });
    }
  }
  catch(error) {
    toast(error.message,'error');
  }
});
document.addEventListener('click',event=>{const skip=event.target.closest('a[href="#main-content"]');if(skip){event.preventDefault();const main=document.querySelector('#main-content');if(main){main.setAttribute('tabindex','-1');main.focus();main.scrollIntoView();}}});
document.addEventListener('click',event=> {
  if(event.target.closest('[data-close]'))document.querySelector('#modal').close();
});
root.addEventListener('toggle',event=> {
  if(event.target.tagName==='DETAILS'&&event.target.open)requestAnimationFrame(charts);
},true);
window.addEventListener('hashchange',()=> {
  if(!wizard&&!getState())wizard=true; render(); window.scrollTo(0,0);
});
let resizeFrame=0;
window.addEventListener('resize',()=> {
  cancelAnimationFrame(resizeFrame); resizeFrame=requestAnimationFrame(charts);
});
window.addEventListener('beforeunload',()=> {
  if(!wizard)autosave(true);
});
let lastTick=performanceNow();
function performanceNow() {
  return globalThis.performance.now();
}
document.addEventListener('visibilitychange',()=>{lastTick=performanceNow();});
setInterval(()=> {
  const s=getState(),now=performanceNow(); if(wizard||document.hidden||document.querySelector('dialog[open]')||!s?.race||s.race.finished||!s.race.running||s.race.red||s.season.gameOver||route()!=='race') {
    lastTick=now; return;
  }
  const elapsed=Math.max(0,(now-lastTick)/1000);lastTick=now;
  if(s.race.realtime)perform('advanceRealtime',{seconds:Math.min(elapsed*s.settings.speed,40000)},true);
  else if(elapsed>=1.2/s.settings.speed)perform('tick',{count:1},true);
},60);
try{
  const saved=slotInfo('auto');
  if(saved&&!saved.broken) {
    setState(loadSlot('auto'));
    wizard=false;
    saveStatus='已恢复自动存档';
  }
}
catch(error) {
  toast('自动存档无法读取，可新建生涯或导入备份：'+error.message,'error');
}
render();

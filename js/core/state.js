import { assignDriverCodes, setDriverCode } from './driverCodes.js';
import { startRealtimeRace, startQualifying, advanceRealtime, qualCommand, skipQualBreak, fastForwardLap, finishRealtime, resumeRealtime } from './realtime.js';
// ===== 文件: js/core/state.js =====
import {
  seasonTeams
}
from '../data/teams.js';
import {
  DRIVER_DATA, RESERVES
}
from '../data/drivers-data.js';
import {
  STAFF_POOL
}
from '../data/staff-data.js';
import {
  DEPARTMENTS, FACILITIES
}
from '../data/parts.js';
import {
  DIFFICULTIES
}
from '../data/i18n.js';
import {
  seedFrom, choose
}
from './rng.js';
import {
  copy, uid, clamp, teamOf, news, requireCondition
}
from './helpers.js';
import {
  seasonRules
}
from './rules.js';
import {
  makeCalendar, enterWeekend, changeSetup, setStrategy, waitDays
}
from './calendar.js';
import {
  initParts, replacePart, fitPart
}
from './car.js';
import {
  initFinance, signSponsor, spend, emergency
}
from './finance.js';
import {
  seedStaff, hireStaff, renewStaff, fireStaff
}
from './staff.js';
import {
  makeDriver, createCustomDriver, signDriver, renewDriver, releaseDriver, trainDriver, recruitYouth, sellYouth
}
from './drivers.js';
import {
  startProject, changeProject, upgradeFacility, upgradeDepartment, overrunTesting
}
from './rnd.js';
import {
  practice, qualifying, startRace, raceCommand, tick, resumeRed, simulateToEnd
}
from './race.js';
import {
  closeWeekend, nextSeason
}
from './season.js';
let state=null;
export function getState() {
  return state;
}
export function setState(value) {
  state=value;
}
function enrichTeam(s,t) {
  Object.assign(t,{
    points:0,wins:0,results:[],confidence:t.custom?65:80,projects:[],research:{
    },carry:{
    },gridPenalties:[0,0],personality:choose(s,['激进','稳健','吝啬','技术优先']),facilities:Object.fromEntries(Object.keys(FACILITIES).map(k=>[k,{
      level:t.custom?1:clamp(Math.floor((t.performance-50)/9),1,5),building:null
    }])),departments:Object.fromEntries(Object.keys(DEPARTMENTS).map(k=>[k,{
      level:t.custom?1:clamp(Math.floor((t.performance-50)/10),1,4),people:t.custom?12:40,supervisor:k==='aero'?'空气动力主管':'部门主管'
    }])),wind:{
      limit:180+(t.previousRank-1)*14,used:0
    },cfd:{
      limit:240+(t.previousRank-1)*18,used:0
    },objectives:{
      target:t.custom?9:Math.max(1,Math.ceil((100-t.performance)/4)),points:0,finish:0,podiums:0
    }
  });
  initParts(s,t);
  initFinance(s,t,t.cash);
  seedStaff(s,t);
  for(const id of t.drivers) {
    const d=s.drivers.find(d=>d.id===id);
    d.teamId=t.id;
  }
}
export function createGame(options={
}) {
  const year=Number(options.year||2025);
  requireCondition([2022,2023,2024,2025].includes(year),'请选择内置赛季');
  const difficulty=options.difficulty||'standard';
  requireCondition(DIFFICULTIES[difficulty],'难度无效');
  const seed=String(options.seed||'APEX-2025');
  requireCondition(seed.length<=100,'种子过长');
  const teams=seasonTeams(year,Number(options.alternate??-1));
  const ids=new Set(teams.flatMap(t=>t.drivers).concat(RESERVES[year]));
  const s={
    schemaVersion:3,rng:seedFrom(seed),nextId:0,teams,drivers:Array.from(ids).map(id=>makeDriver(id,year)),staff:[],parts:{
    },finance:{
    },calendar:{
      events:makeCalendar(year),round:0,weekend:null,day:0,date:`${year}-02-01`
    },race:null,season:{
      year,rules:seasonRules(year),offseason:false,nextRules:'',gameOver:null
    },player:{
      teamId:options.custom?'custom':options.teamId||teams[0].id
    },settings:{
      difficulty,seed,speed:1,autosave:true
    },news:[],history:{
      races:[],seasons:[]
    }
  };
  if(options.custom) {
    const name=String(options.name||'Aurora Racing').trim(),abbr=String(options.abbr||'AUR').toUpperCase();
    requireCondition(name.length>0&&name.length<=32&&/^[A-Z]{3}$/.test(abbr),'车队名称 1—32 字，缩写为三个英文字母');
    const color=options.color||'#68e8b5',secondary=options.secondary||'#eff8ff';
    requireCondition(/^#[0-9a-f]{6}$/i.test(color)&&/^#[0-9a-f]{6}$/i.test(secondary),'颜色无效');
    const type=options.type||'customer',supplier=options.supplier||'Mercedes';
    requireCondition(['customer','factory'].includes(type)&&['Mercedes','Ferrari','HondaRBPT','Renault'].includes(supplier),'制造商或供应商无效');
    const names=options.driverNames||['Ren Aoki','Alex Morgan'];
    const age=Number(options.age||21),pace=Number(options.pace||74);
    const selected=options.driverIds||['custom','custom'];
    const customDrivers=names.map((n,i)=> {
      if(selected[i]&&selected[i]!=='custom') {
        const d=s.drivers.find(x=>x.id===selected[i]); requireCondition(d&&!teams.some(t=>t.drivers.includes(d.id)),'所选车手已被占用'); return d;
      }
      return createCustomDriver(s,n,age,pace,i?91:90);
    });
    requireCondition(customDrivers[0].id!==customDrivers[1].id,'两个席位不能使用同一车手');
    teams.push({
      id:'custom',custom:true,name,fullName:name,abbr,color,secondary,hq:'玩家自建总部',type,supplier,drivers:customDrivers.map(d=>d.id),performance:type==='factory'?60:58,cash:type==='factory'?48:55,reputation:38,logo:clamp(Math.floor(Number(options.logo)||0),0,23),previousRank:11
    });
  }
  requireCondition(teams.some(t=>t.id===s.player.teamId),'车队不存在');
  for(const t of teams)enrichTeam(s,t);
  for(const e of STAFF_POOL)s.staff.push({
    ...copy(e),teamId:null
  });
  for(const t of teams) {
    signSponsor(s,t.reputation>=75?'apex':t.reputation>=55?'orbit':'nova',t.id);
    signSponsor(s,'vector',t.id);
  }
  if(options.custom)spend(s,teamOf(s),12,'入场担保金（游戏化）',false);
  news(s,`${year} 赛季开始。你已接管 ${teamOf(s).name}，所有能力与财务数值均为非官方游戏化设计。`);
  assignDriverCodes(s);
  return s;
} // UI 的全部游戏变更只经过此 action 入口；失败时由调用方保留旧状态。
export function reduce(s,action,p={
}) {
  requireCondition(s,'请先创建或加载游戏');
  requireCondition(!s.season.gameOver||['autosave','speed','pause'].includes(action),'生涯已结束，请读取存档或新建生涯');
  switch(action) {
    case'enterWeekend':return enterWeekend(s);
    case'wait':return waitDays(s,Number(p.days)||7);
    case'setup':return changeSetup(s,Number(p.slot),p.values);
    case'strategy':return setStrategy(s,p.id,p.plan);
    case'practice':return practice(s);
    case'qualifying':startQualifying(s);return p.all?finishRealtime(s):'排位开始';
    case'startQualifying':return startQualifying(s);
    case'advanceRealtime':return advanceRealtime(s,Number(p.seconds));
    case'qualCommand':return qualCommand(s,p.id,p.command,p.value);
    case'skipQualBreak':return skipQualBreak(s);
    case'mapLabels':s.settings.mapLabels=s.settings.mapLabels==='team'?'all':'team';return '地图标注已切换';
    case'focusDriver':s.settings.focusDriver=p.id;return '已切换遥测车手';
    case'driverCode':return setDriverCode(s,p.id,p.value);
    case'startRace':return startRealtimeRace(s);
    case'tick':return s.race?.realtime?fastForwardLap(s):tick(s,p.count||1,!!p.untilEvent);
    case'finishRace':return s.race?.realtime?finishRealtime(s):simulateToEnd(s);
    case'resume':return s.race?.realtime?resumeRealtime(s):resumeRed(s);
    case'command':return raceCommand(s,p.id,p.command,p.value);
    case'closeWeekend':return closeWeekend(s);
    case'project':return startProject(s,p.part,p.kind,Number(p.copies)||2);
    case'projectChange':return changeProject(s,p.id,p.operation);
    case'overrun':return overrunTesting(s);
    case'facility':return upgradeFacility(s,p.id);
    case'department':return upgradeDepartment(s,p.id);
    case'replace':return replacePart(s,Number(p.slot),p.id);
    case'fit':return fitPart(s,p.id,Number(p.slot));
    case'hireStaff':return hireStaff(s,p.id,Number(p.salary),Number(p.years));
    case'renewStaff':return renewStaff(s,p.id,Number(p.salary),Number(p.years));
    case'fireStaff':return fireStaff(s,p.id);
    case'signDriver':return signDriver(s,p.id,Number(p.slot),Number(p.salary),Number(p.years));
    case'renewDriver':return renewDriver(s,p.id,Number(p.salary),Number(p.years));
    case'releaseDriver':return releaseDriver(s,p.id);
    case'train':return trainDriver(s,p.id,p.plan);
    case'youth':return recruitYouth(s);
    case'sellYouth':return sellYouth(s,p.id);
    case'sponsor':signSponsor(s,p.id);
    return'赞助合同已签署';
    case'rescue':return emergency(s);
    case'nextSeason':return nextSeason(s);
    case'pause':requireCondition(s.race&&!s.race.finished,'当前没有进行中的比赛');
    s.race.running=!s.race.running;
    return s.race.running?'比赛继续':'比赛已暂停';
    case'speed':requireCondition([1,2,4,8,10,16,32,64].includes(Number(p.value)),'速度无效');
    s.settings.speed=Number(p.value);
    return'比赛速度已调整';
    case'autosave':s.settings.autosave=!!p.value;
    return'自动存档设置已更新';
    default:throw new Error('未知操作');
  }
}
export function dispatch(action,p={
}) {
  // Time updates have validated numeric inputs and no user-supplied transaction.
  if(action==='advanceRealtime')return reduce(state,action,p);
  const before=copy(state);
  try{
    const message=reduce(state,action,p);
    return message;
  }
  catch(e) {
    state=before;
    throw e;
  }
}

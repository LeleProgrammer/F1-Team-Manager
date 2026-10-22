// 由 tools/build_offline.py 从分层 ES Module 源码生成；无运行时依赖。
(function () {
'use strict';
const modules = {};

// ===== 文件: js/core/rng.js =====
modules['js/core/rng.js'] = (function () {
// ===== 文件: js/core/rng.js =====
function seedFrom(value) {
  let h=2166136261;
  for(const c of String(value)) {
    h^=c.charCodeAt(0);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
} // Mulberry32：仅修改可序列化状态 s.rng，保存/加载后继续同一随机序列。
function random(s) {
  s.rng=(s.rng+0x6D2B79F5)>>>0;
  let t=s.rng;
  t=Math.imul(t^(t>>>15),t|1);
  t^=t+Math.imul(t^(t>>>7),t|61);
  return ((t^(t>>>14))>>>0)/4294967296;
}
function between(s,a,b) {
  return a+(b-a)*random(s);
}
function integer(s,a,b) {
  return Math.floor(between(s,a,b+1));
}
function chance(s,p) {
  return random(s)<p;
}
function choose(s,items) {
  return items[integer(s,0,items.length-1)];
}
// 只在新生涯向导点击“生成种子”时使用时钟作为初始熵；比赛中不调用。
function generateSeed(){const source={rng:seedFrom(String(Date.now()))};return 'PIT-'+integer(source,10000000,99999999).toString(36).toUpperCase();}

return {seedFrom, random, between, integer, chance, choose, generateSeed};
}());

// ===== 文件: js/data/i18n.js =====
modules['js/data/i18n.js'] = (function () {
// ===== 文件: js/data/i18n.js =====
const NAV = [['dashboard','总览','grid'],['car','车辆','car'],['rnd','研发','flask'],['staff','人员','users'],['drivers','车手','helmet'],['finance','财务','wallet'],['calendar','赛历','calendar'],['race','比赛指挥','flag'],['standings','积分档案','trophy'],['save','存档','save']];
const SESSION_NAMES = {
  FP1:'第一节练习',FP2:'第二节练习',FP3:'第三节练习',Q:'正赛排位',SQ:'冲刺排位',SPRINT:'冲刺赛',RACE:'正赛',DONE:'周末结束'
};
const DIFFICULTIES = {
  easy:{
    name:'简单',ai:0.82,mistake:0.8,tolerance:1.5,cap:1.06
  },standard:{
    name:'标准',ai:1,mistake:1,tolerance:1,cap:1
  },hard:{
    name:'硬核',ai:1.2,mistake:1.2,tolerance:0.75,cap:0.98
  }
};

return {NAV, SESSION_NAMES, DIFFICULTIES};
}());

// ===== 文件: js/data/teams.js =====
modules['js/data/teams.js'] = (function () {
// ===== 文件: js/data/teams.js =====
// 基础史实字段与游戏数值分开：performance、cash、设施等级均非官方。
const SUPPLIERS = {
  Mercedes:{
    name:'Mercedes',power:88,reliability:94,price:13
  },Ferrari:{
    name:'Ferrari',power:91,reliability:89,price:14
  },RBPT:{
    name:'Red Bull Powertrains',power:90,reliability:90,price:12
  },HondaRBPT:{
    name:'Honda RBPT',power:92,reliability:93,price:13
  },Renault:{
    name:'Renault',power:82,reliability:86,price:10
  }
};
const identities = {
  redbull:['Red Bull','Oracle Red Bull Racing','RBR','#3671c6','Milton Keynes, 英国','factory'], ferrari:['Ferrari','Scuderia Ferrari','FER','#ef3340','Maranello, 意大利','factory'], mercedes:['Mercedes','Mercedes-AMG PETRONAS F1 Team','MER','#27f4d2','Brackley, 英国','factory'], mclaren:['McLaren','McLaren F1 Team','MCL','#ff8700','Woking, 英国','customer'], alpine:['Alpine','BWT Alpine F1 Team','ALP','#ff87bc','Enstone, 英国 / Viry, 法国','factory'], aston:['Aston Martin','Aston Martin Aramco F1 Team','AMR','#229971','Silverstone, 英国','customer'], williams:['Williams','Williams Racing','WIL','#64c4ff','Grove, 英国','customer'], junior:['AlphaTauri','Scuderia AlphaTauri','ATY','#7695b1','Faenza, 意大利','customer'], sauber:['Alfa Romeo','Alfa Romeo F1 Team ORLEN','ALF','#c92d4b','Hinwil, 瑞士','customer'], haas:['Haas','Haas F1 Team','HAS','#b6babd','Kannapolis, 美国 / Banbury, 英国','customer']
};
const LINEUPS = {
  2022:{
    redbull:['verstappen','perez'],ferrari:['leclerc','sainz'],mercedes:['hamilton','russell'],mclaren:['norris','ricciardo'],alpine:['alonso','ocon'],junior:['gasly','tsunoda'],aston:['vettel','stroll'],williams:['albon','latifi'],sauber:['bottas','zhou'],haas:['magnussen','schumacher']
  }, 2023:{
    redbull:['verstappen','perez'],ferrari:['leclerc','sainz'],mercedes:['hamilton','russell'],mclaren:['norris','piastri'],alpine:['gasly','ocon'],junior:['tsunoda','devries'],aston:['alonso','stroll'],williams:['albon','sargeant'],sauber:['bottas','zhou'],haas:['hulkenberg','magnussen']
  }, 2024:{
    redbull:['verstappen','perez'],ferrari:['leclerc','sainz'],mercedes:['hamilton','russell'],mclaren:['norris','piastri'],aston:['alonso','stroll'],alpine:['gasly','ocon'],williams:['albon','sargeant'],junior:['tsunoda','ricciardo'],sauber:['bottas','zhou'],haas:['hulkenberg','magnussen']
  }, 2025:{
    mclaren:['norris','piastri'],ferrari:['leclerc','hamilton'],redbull:['verstappen','lawson'],mercedes:['russell','antonelli'],aston:['alonso','stroll'],alpine:['gasly','doohan'],williams:['albon','sainz'],junior:['hadjar','tsunoda'],haas:['ocon','bearman'],sauber:['hulkenberg','bortoleto']
  }
};
const ALTERNATIVE_LINEUPS = {
  2022:[], 2023:[{
    label:'2023 新加坡：Lawson 代替伤停的 Ricciardo',changes:{
      junior:['tsunoda','lawson']
    }
  }], 2024:[{
    label:'2024 美国站：Colapinto / Lawson',changes:{
      williams:['albon','colapinto'],junior:['tsunoda','lawson']
    }
  }], 2025:[{
    label:'2025 日本站：Tsunoda / Lawson 互换',changes:{
      redbull:['verstappen','tsunoda'],junior:['hadjar','lawson']
    }
  },{
    label:'2025 伊莫拉站：另含 Colapinto 接替 Doohan',changes:{
      redbull:['verstappen','tsunoda'],junior:['hadjar','lawson'],alpine:['gasly','colapinto']
    }
  }]
};
const PERFORMANCE = {
  2022:{
    redbull:94,ferrari:92,mercedes:87,mclaren:79,alpine:80,aston:72,junior:73,sauber:75,haas:72,williams:64
  },2023:{
    redbull:97,ferrari:87,mercedes:87,mclaren:83,aston:85,alpine:78,williams:71,junior:68,sauber:69,haas:68
  },2024:{
    redbull:95,ferrari:91,mclaren:91,mercedes:87,aston:78,alpine:68,williams:69,junior:75,sauber:65,haas:72
  },2025:{
    mclaren:96,ferrari:90,redbull:91,mercedes:90,williams:79,aston:72,alpine:70,junior:75,haas:74,sauber:68
  }
};
const PREVIOUS_RANKS = {
  2022:['mercedes','redbull','ferrari','mclaren','alpine','junior','aston','williams','sauber','haas'],2023:['redbull','ferrari','mercedes','alpine','mclaren','sauber','aston','haas','junior','williams'],2024:['redbull','mercedes','ferrari','mclaren','aston','alpine','williams','junior','sauber','haas'],2025:['mclaren','ferrari','redbull','mercedes','aston','alpine','haas','junior','williams','sauber']
};
function seasonTeams(year,alternate=-1) {
  const lineups=LINEUPS[year];
  if(!lineups)throw new Error('尚未内置该历史赛季');
  return Object.entries(lineups).map(([id,drivers],index)=> {
    let [name,fullName,abbr,color,hq,type]=identities[id]; if(id==='junior'&&year>=2024) {
      name=year===2024?'RB':'Racing Bulls'; fullName=year===2024?'Visa Cash App RB F1 Team':'Visa Cash App Racing Bulls F1 Team'; abbr='VCB'; color='#6692ff';
    }
    if(id==='sauber'&&year>=2024) {
      name='Sauber'; fullName='Stake F1 Team Kick Sauber'; abbr='SAU'; color='#52e252';
    }
    if(id==='sauber'&&year===2023)fullName='Alfa Romeo F1 Team Stake'; if(id==='ferrari'&&year===2025)fullName='Scuderia Ferrari HP'; if(id==='haas'&&year>=2023)fullName='MoneyGram Haas F1 Team'; if(id==='williams'&&year===2025)fullName='Atlassian Williams Racing'; if(id==='aston'&&year<=2023)fullName='Aston Martin Aramco Cognizant F1 Team'; const supplier=['redbull','junior'].includes(id)?(year===2022?'RBPT':'HondaRBPT'):['ferrari','sauber','haas'].includes(id)?'Ferrari':id==='alpine'?'Renault':'Mercedes'; const p=PERFORMANCE[year][id]; return {
      id,name,fullName,abbr,color,secondary:'#f1f5fb',hq,type,supplier,drivers:ALTERNATIVE_LINEUPS[year][alternate]?.changes[id]||drivers,performance:p,cash:68+(p-60)*2.1,reputation:p,logo:index,previousRank:PREVIOUS_RANKS[year].indexOf(id)+1
    };
  });
}

return {SUPPLIERS, LINEUPS, ALTERNATIVE_LINEUPS, PERFORMANCE, PREVIOUS_RANKS, seasonTeams};
}());

// ===== 文件: js/data/parts.js =====
modules['js/data/parts.js'] = (function () {
// ===== 文件: js/data/parts.js =====
const DIMENSIONS = {
  downforce:'下压力',aero:'气动效率',grip:'机械抓地',suspension:'路肩适应',brakes:'制动',power:'动力功率',ers:'能量部署',reliability:'可靠性',tyres:'轮胎友好',weight:'轻量化'
};
const PARTS = [ ['front','前翼','aero','downforce',1.8,8,99],['rear','尾翼','aero','aero',1.8,8,99],['floor','底板','aero','downforce',3.8,14,99],['sidepod','侧箱','aero','aero',2.8,11,99],['suspension','悬挂','chassis','grip',2.1,10,99],['gearbox','变速箱','chassis','suspension',1.6,9,4],['ice','内燃机','power','power',4.8,18,3],['turbo','涡轮','power','power',3.1,14,3],['mguk','MGU-K','power','ers',2.8,14,3],['mguh','MGU-H','power','ers',2.6,14,3],['battery','电池','power','ers',2.2,12,2],['electronics','电子系统','power','ers',1.7,9,2],['brakes','制动系统','chassis','brakes',1.5,8,99],['cooling','散热','reliability','reliability',1.4,7,99] ].map(([id,name,department,dimension,cost,days,quota])=>({
  id,name,department,dimension,cost,days,quota
}));
function partQuota(part,year) {
  return ['ice','turbo','mguk','mguh'].includes(part.id)&&year>=2023?4:part.quota;
}
const DEPARTMENTS = {
  aero:'空气动力部',chassis:'底盘机械部',power:'动力单元部',reliability:'可靠性部',strategy:'策略赛道工程部',manufacturing:'制造生产部'
};
const FACILITIES = {
  wind:{
    name:'风洞',effect:'提高空气动力研发效率',cost:8,days:35
  },cfd:{
    name:'CFD 集群',effect:'提高 CFD 研发效率',cost:7,days:28
  },sim:{
    name:'模拟器',effect:'提高设定数据采集与车手训练效率',cost:5,days:24
  },factory:{
    name:'制造车间',effect:'增加同时生产能力并缩短工期',cost:6,days:30
  },marketing:{
    name:'市场营销部',effect:'提高赞助报价与车手吸引力',cost:4,days:21
  }
};
const COMPOUNDS = {
  S:{
    name:'软胎',life:19,pace:-0.65,deg:0.085,min:85,max:105,color:'#ff5364'
  },M:{
    name:'中性胎',life:29,pace:0,deg:0.05,min:80,max:105,color:'#ffd166'
  },H:{
    name:'硬胎',life:40,pace:0.4,deg:0.035,min:80,max:110,color:'#e5eaf1'
  },I:{
    name:'半雨胎',life:33,pace:1,deg:0.04,min:55,max:85,color:'#50d6a1'
  },W:{
    name:'全雨胎',life:29,pace:2,deg:0.05,min:45,max:70,color:'#67a9ff'
  }
};
const MODES = {
  push:{
    name:'推进到底',pace:-0.38,wear:1.35,fuel:1.1,risk:1.8
  },normal:{
    name:'正常',pace:0,wear:1,fuel:1,risk:1
  },tyres:{
    name:'节省轮胎',pace:0.32,wear:0.73,fuel:0.98,risk:0.7
  },fuel:{
    name:'节省燃油',pace:0.4,wear:0.94,fuel:0.84,risk:0.85
  },attack:{
    name:'攻击',pace:-0.15,wear:1.15,fuel:1.05,risk:1.35
  },defend:{
    name:'防守',pace:0.12,wear:1.1,fuel:1.03,risk:1.2
  },yield:{
    name:'让车',pace:0.65,wear:0.88,fuel:0.94,risk:0.6
  },safe:{
    name:'保守完赛',pace:0.75,wear:0.7,fuel:0.9,risk:0.4
  }
};
const ENGINES = {
  high:{
    name:'高功率',pace:-0.2,wear:1.55,fuel:1.06
  },normal:{
    name:'常规',pace:0,wear:1,fuel:1
  },save:{
    name:'保寿命',pace:0.28,wear:0.7,fuel:0.94
  }
};

return {DIMENSIONS, PARTS, partQuota, DEPARTMENTS, FACILITIES, COMPOUNDS, MODES, ENGINES};
}());

// ===== 文件: js/core/helpers.js =====
modules['js/core/helpers.js'] = (function () {
// ===== 文件: js/core/helpers.js =====
const clamp=(n,a=0,b=100)=>Math.max(a,Math.min(b,n));
const copy=x=>JSON.parse(JSON.stringify(x));
function uid(s,prefix) {
  s.nextId=(s.nextId||0)+1;
  return prefix+'-'+s.nextId;
}
function news(s,text,type='info') {
  s.news.unshift({
    id:uid(s,'news'),day:s.calendar?.day||0,date:s.calendar?.date||'',text,type
  });
  s.news.length=Math.min(120,s.news.length);
}
function teamOf(s,id=s.player.teamId) {
  const t=s.teams.find(t=>t.id===id);
  if(!t)throw new Error('车队不存在');
  return t;
}
function driverOf(s,id) {
  const d=s.drivers.find(d=>d.id===id);
  if(!d)throw new Error('车手不存在');
  return d;
}
function requireCondition(ok,message) {
  if(!ok)throw new Error(message);
}
function mutable(s) {
  requireCondition(!s.race||s.race.finished,'比赛进行中：请先完成比赛');
  requireCondition(!s.season.gameOver,'本次生涯已结束，可读取存档或重新开局');
}
function rosterMutable(s) {
  mutable(s);
  requireCondition(!s.calendar.weekend||s.season.offseason,'比赛周末已登记阵容，请在周末结算后签约');
}
function ties(a,b) {
  const n=Math.max(a.results?.length||0,b.results?.length||0,30);
  for(let p=1; p<=n; p++) {
    const ca=(a.results||[]).filter(x=>x.position===p&&x.kind==='RACE').length;
    const cb=(b.results||[]).filter(x=>x.position===p&&x.kind==='RACE').length;
    if(ca!==cb)return cb-ca;
  }
  return (a.previousRank||99)-(b.previousRank||99)||String(a.id).localeCompare(String(b.id));
}
function teamStandings(s) {
  return s.teams.slice().sort((a,b)=>b.points-a.points||ties(a,b));
}
function driverStandings(s) {
  return s.drivers.filter(d=>d.teamId||d.points||d.results.length).slice().sort((a,b)=>b.points-a.points||ties(a,b));
}

return {clamp, copy, uid, news, teamOf, driverOf, requireCondition, mutable, rosterMutable, ties, teamStandings, driverStandings};
}());

// ===== 文件: js/core/driverCodes.js =====
modules['js/core/driverCodes.js'] = (function () {
// Official broadcast codes where available; custom drivers receive unique editable codes.
const { requireCondition, driverOf } = modules['js/core/helpers.js'];
const DRIVER_CODES={verstappen:'VER',perez:'PER',leclerc:'LEC',sainz:'SAI',hamilton:'HAM',russell:'RUS',norris:'NOR',ricciardo:'RIC',alonso:'ALO',ocon:'OCO',gasly:'GAS',tsunoda:'TSU',vettel:'VET',stroll:'STR',albon:'ALB',latifi:'LAT',bottas:'BOT',zhou:'ZHO',magnussen:'MAG',schumacher:'MSC',piastri:'PIA',devries:'DEV',sargeant:'SAR',hulkenberg:'HUL',lawson:'LAW',antonelli:'ANT',doohan:'DOO',hadjar:'HAD',bearman:'BEA',bortoleto:'BOR',colapinto:'COL',drugovich:'DRU',pourchaire:'POU',iwasa:'IWA',vandoorne:'VAN',fittipaldi:'FIT'};
function assignDriverCodes(s){
  const used=new Set();
  for(const d of s.drivers){
    let code=d.code||DRIVER_CODES[d.id]||d.name.split(' ').at(-1).replace(/[^a-z]/gi,'').slice(0,3).toUpperCase().padEnd(3,'X');
    if(!/^[A-Z]{3}$/.test(code))code='DRV';
    if(used.has(code)){const base=code.slice(0,2);let i=0;while(i<26&&used.has(base+String.fromCharCode(65+i)))i++;if(i<26)code=base+String.fromCharCode(65+i);else{let n=0;do{code=String.fromCharCode(65+Math.floor(n/676)%26,65+Math.floor(n/26)%26,65+n%26);n++;}while(used.has(code));}}
    d.code=code;used.add(code);
  }
}
function setDriverCode(s,id,value){
  const d=driverOf(s,id),code=String(value).trim().toUpperCase();
  requireCondition(d?.teamId===s.player.teamId,'只能修改本队车手缩写');
  requireCondition(/^[A-Z]{3}$/.test(code),'缩写必须是三个英文字母');
  requireCondition(!s.drivers.some(x=>x.id!==id&&x.code===code),'该缩写已被其他车手使用');
  d.code=code;return '车手缩写已更新';
}

return {DRIVER_CODES, assignDriverCodes, setDriverCode};
}());

// ===== 文件: js/data/tracks.js =====
modules['js/data/tracks.js'] = (function () {
// ===== 文件: js/data/tracks.js =====
// 长度/圈数取通常完整赛程；基准圈速、气象与策略系数是游戏化参数。
const raw = [ ['bahrain','巴林','巴林','Sakhir',5.412,57,15,92,1.3,.35,22,80,420,3,31,.06,.25,'traction','重刹与后轮牵引，夜间赛温度逐渐下降。'], ['saudi','沙特阿拉伯','沙特阿拉伯','Jeddah',6.174,50,27,91,0.8,.4,23,80,450,3,30,.05,.65,'fast','高速街道，墙边容错小，安全车概率较高。'], ['australia','澳大利亚','澳大利亚','Melbourne',5.278,58,14,81,1,.4,22,80,430,4,28,.25,.55,'fast','高速变向和路肩，轮胎温度需要管理。'], ['imola','艾米利亚-罗马涅','意大利','Imola',4.909,63,19,78,1,.78,27,80,550,1,28,.3,.45,'downforce','狭窄而难超车，进站损失大，强调排位。'], ['miami','迈阿密','美国','Miami',5.412,57,19,90,1.1,.48,21,80,410,3,38,.2,.4,'traction','炎热路面与低速组合弯，冷却和牵引关键。'], ['spain','西班牙','西班牙','Barcelona',4.657,66,14,79,1.5,.55,23,80,450,2,36,.15,.25,'downforce','高速长弯持续压迫轮胎，气动效率与耐久并重。'], ['monaco','摩纳哥','摩纳哥','Monte Carlo',3.337,78,19,75,.6,.98,20,60,310,1,27,.2,.75,'street','几乎无法超车，设定、排位与进站窗口决定比赛。'], ['azerbaijan','阿塞拜疆','阿塞拜疆','Baku',6.003,51,20,104,.75,.3,22,80,440,2,29,.1,.65,'low','超长直道与古城窄弯，低阻和制动同样重要。'], ['canada','加拿大','加拿大','Montreal',4.361,70,14,75,1,.38,19,80,360,3,26,.32,.6,'traction','重刹、路肩和墙边出口，制动系统压力大。'], ['britain','英国','英国','Silverstone',5.891,52,18,89,1.4,.45,23,80,460,2,26,.4,.35,'downforce','高速弯链与侧向载荷，风雨变化常影响策略。'], ['austria','奥地利','奥地利','Spielberg',4.318,71,10,68,1.1,.28,20,80,400,3,30,.32,.4,'fast','短圈、海拔与严格赛道限制，交通密集。'], ['france','法国','法国','Le Castellet',5.842,53,15,95,1.25,.48,24,80,460,2,39,.08,.2,'downforce','长直道和高速弯相连，前胎温度不容忽视。'], ['hungary','匈牙利','匈牙利','Budapest',4.381,70,14,82,1.2,.85,21,80,410,2,37,.25,.25,'downforce','连续中低速弯，高下压力；脏空气损失明显。'], ['belgium','比利时','比利时','Spa-Francorchamps',7.004,44,19,108,1.2,.3,23,80,470,2,23,.5,.5,'fast','单圈最长，气候多变，高速与低阻需要折中。'], ['netherlands','荷兰','荷兰','Zandvoort',4.259,72,14,75,1.3,.85,21,60,340,2,27,.35,.5,'downforce','倾斜弯与狭窄赛道，前轮负荷高。'], ['italy','意大利','意大利','Monza',5.793,53,11,83,.8,.22,24,80,470,2,31,.2,.35,'low','低下压力与长直道，DRS 和刹车效率突出。'], ['singapore','新加坡','新加坡','Singapore',4.94,62,19,97,1.15,.8,28,60,410,3,34,.4,.8,'street','闷热夜赛，慢弯频繁，安全车可能改写局面。'], ['japan','日本','日本','Suzuka',5.807,53,18,91,1.4,.65,23,80,460,2,27,.45,.4,'downforce','高速 S 弯，前轴响应、节奏与轮胎管理关键。'], ['usa','美国','美国','Austin',5.513,56,20,98,1.35,.4,22,80,420,2,33,.25,.4,'downforce','颠簸和连续变向，综合性能考验。'], ['mexico','墨西哥','墨西哥','Mexico City',4.304,71,17,79,.85,.45,22,80,430,3,32,.18,.45,'traction','高海拔冷却困难，低速抓地与动力部署重要。'], ['brazil','圣保罗','巴西','São Paulo',4.309,71,15,74,1.15,.25,21,80,410,2,29,.45,.6,'traction','短圈、起伏和常见阵雨，安全车窗口价值高。'], ['abudhabi','阿布扎比','阿联酋','Yas Island',5.281,58,16,89,.9,.4,22,80,420,2,30,.04,.25,'traction','黄昏到夜间，长直道与中低速弯相连。'], ['qatar','卡塔尔','卡塔尔','Lusail',5.419,57,16,85,1.5,.55,25,80,500,1,35,.06,.25,'downforce','高速长弯和高胎压负荷，轮胎过热风险大。'], ['vegas','拉斯维加斯','美国','Las Vegas',6.201,50,17,96,.65,.25,22,80,430,2,16,.08,.65,'low','低温夜赛与超长直道，暖胎困难。'], ['china','中国','中国','Shanghai',5.451,56,16,94,1.25,.38,23,80,460,2,25,.35,.35,'traction','大半径弯加超长后直道，左前胎和牵引力关键。'] ];
const TRACKS = Object.fromEntries(raw.map(([id,name,country,city,length,laps,corners,baseTime,wear,overtake,pitLoss,pitSpeed,pitLength,drs,temp,rain,sc,type,notes])=>[id,{
  id,name,country,city,length,laps,corners,baseTime,wear,overtake,pitLoss,pitSpeed,pitLength,drs,temp,rain,sc,type,notes
}]));
const SCHEDULES = {
  2022:'bahrain:03-20 saudi:03-27 australia:04-10 imola:04-24 miami:05-08 spain:05-22 monaco:05-29 azerbaijan:06-12 canada:06-19 britain:07-03 austria:07-10 france:07-24 hungary:07-31 belgium:08-28 netherlands:09-04 italy:09-11 singapore:10-02 japan:10-09 usa:10-23 mexico:10-30 brazil:11-13 abudhabi:11-20', 2023:'bahrain:03-05 saudi:03-19 australia:04-02 azerbaijan:04-30 miami:05-07 monaco:05-28 spain:06-04 canada:06-18 austria:07-02 britain:07-09 hungary:07-23 belgium:07-30 netherlands:08-27 italy:09-03 singapore:09-17 japan:09-24 qatar:10-08 usa:10-22 mexico:10-29 brazil:11-05 vegas:11-18 abudhabi:11-26', 2024:'bahrain:03-02 saudi:03-09 australia:03-24 japan:04-07 china:04-21 miami:05-05 imola:05-19 monaco:05-26 canada:06-09 spain:06-23 austria:06-30 britain:07-07 hungary:07-21 belgium:07-28 netherlands:08-25 italy:09-01 azerbaijan:09-15 singapore:09-22 usa:10-20 mexico:10-27 brazil:11-03 vegas:11-23 qatar:12-01 abudhabi:12-08', 2025:'australia:03-16 china:03-23 japan:04-06 bahrain:04-13 saudi:04-20 miami:05-04 imola:05-18 monaco:05-25 spain:06-01 canada:06-15 austria:06-29 britain:07-06 belgium:07-27 hungary:08-03 netherlands:08-31 italy:09-07 azerbaijan:09-21 singapore:10-05 usa:10-19 mexico:10-26 brazil:11-09 vegas:11-22 qatar:11-30 abudhabi:12-07'
};
const SPRINTS = {
  2022:['imola','austria','brazil'],2023:['azerbaijan','austria','belgium','qatar','usa','brazil'],2024:['china','miami','austria','usa','brazil','qatar'],2025:['china','miami','belgium','usa','brazil','qatar']
};
function trackForYear(id,year) {
  const t={
    ...TRACKS[id]
  };
  if(id==='spain'&&year===2022) {
    t.length=4.675;
    t.corners=16;
    t.baseTime=82;
  }
  if(id==='singapore'&&year===2022) {
    t.length=5.063;
    t.laps=61;
    t.corners=23;
    t.baseTime=103;
    t.drs=3;
  }
  if(id==='singapore'&&year>=2024)t.drs=4;
  if(id==='australia'&&year===2022)t.drs=3;
  return t;
}

return {TRACKS, SCHEDULES, SPRINTS, trackForYear};
}());

// ===== 文件: js/core/rules.js =====
modules['js/core/rules.js'] = (function () {
// ===== 文件: js/core/rules.js =====
const {
  news, clamp
} = modules['js/core/helpers.js'];
const RACE_POINTS=[25,18,15,12,10,8,6,4,2,1];
const SPRINT_POINTS=[8,7,6,5,4,3,2,1];
function seasonRules(year) {
  return {
    fastestLap:year<=2024,cap:year===2022?140:135,sprintFormat:year===2022?'2022':year===2023?'2023':'2024',major:year===2026,monacoStops:year>=2025?2:0
  };
}
function sessionsFor(year,sprint) {
  if(!sprint)return ['FP1','FP2','FP3','Q','RACE'];
  if(year===2022)return ['FP1','Q','FP2','SPRINT','RACE'];
  if(year===2023)return ['FP1','Q','SQ','SPRINT','RACE'];
  return ['FP1','SQ','SPRINT','Q','RACE'];
}
function eliminationSize(count) {
  return Math.max(1,Math.floor((count-10)/2));
}
function penalty(s,car,seconds,reason) {
  car.penalty+=seconds;
  const record={
    lap:s.race.lap,driver:car.driverId,seconds,reason
  };
  s.race.penalties.push(record);
  s.race.events.unshift({
    lap:s.race.lap,text:`${car.name}：${reason}${seconds>0?'，罚时 '+seconds+' 秒':''}`,type:'penalty'
  });
}
function trackLimits(s,car) {
  car.warnings++;
  if(car.warnings===3)s.race.events.unshift({
    lap:s.race.lap,text:`${car.name}：赛道限制黑白旗（三次警告）`,type:'warning'
  });
  if(car.warnings>=4)penalty(s,car,car.warnings===4?5:10,'多次超出赛道限制');
}
function checkBudget(s,t) {
  const f=s.finance[t.id];
  const excess=f.capUsed-f.capLimit;
  const severe=excess>f.capLimit*.1;
  if(excess<=0||f.audited&&(!severe||f.disqualified))return;
  f.audited=true;
  const hard=s.settings.difficulty==='hard';
  const fine=Math.max(1,excess*(hard?1.8:1.2));
  f.cash-=fine;
  f.ledger.unshift({
    day:s.calendar.day,label:'预算帽调查罚款',amount:-fine,cap:false
  });
  t.wind.limit*=0.85;
  t.cfd.limit*=0.85;
  t.confidence=clamp(t.confidence-12);
  if(severe) {
    t.points=0;
    f.disqualified=true;
    for(const r of t.results)r.points=0;
    for(const d of s.drivers){for(const r of d.results)if(r.teamId===t.id)r.points=0;d.points=d.results.reduce((sum,r)=>sum+r.points,0);}
    for(const race of s.history.races)if(!race.year||race.year===s.season.year)for(const r of race.rows)if(r.teamId===t.id)r.points=0;
    for(const e of s.calendar.events)if(e.result)for(const r of e.result.rows)if(r.teamId===t.id)r.points=0;
    if(s.race?.result)for(const r of s.race.result.rows)if(r.teamId===t.id)r.points=0;
  }
  news(s,`${t.name} 预算帽超支 $${excess.toFixed(2)}m，罚款 $${fine.toFixed(2)}m、测试额度削减 15%${f.disqualified?'，并取消本季积分资格':''}`,'warning');
}
function pitLanePenalty(s,car,reason){
  const t=s.teams.find(t=>t.id===car.teamId);
  if(!t.pitLaneNext)t.pitLaneNext=[false,false];
  t.pitLaneNext[car.slot]=true;
  s.race.penalties.push({lap:s.race.lap,driver:car.driverId,seconds:0,reason:reason+'，下场正赛维修区起步'});
  s.race.events.unshift({lap:s.race.lap,text:car.name+'：'+reason+'，下场正赛维修区起步',type:'penalty'});
}

return {RACE_POINTS, SPRINT_POINTS, seasonRules, sessionsFor, eliminationSize, penalty, trackLimits, checkBudget, pitLanePenalty};
}());

// ===== 文件: js/data/sponsors.js =====
modules['js/data/sponsors.js'] = (function () {
// ===== 文件: js/data/sponsors.js =====
// 赞助商均为虚构品牌；金额单位：百万美元。
const SPONSORS = [ {
  id:'apex',name:'APEX 科技',kind:'主赞助',min:75,base:15,goal:'podium',bonus:2
}, {
  id:'orbit',name:'ORBIT 云计算',kind:'主赞助',min:55,base:11,goal:'points',bonus:0.7
}, {
  id:'nova',name:'NOVA 能源',kind:'主赞助',min:0,base:8,goal:'finish',bonus:0.15
}, {
  id:'vector',name:'VECTOR 工程',kind:'技术伙伴',min:0,base:3,goal:'q3',bonus:0.5
}, {
  id:'pulse',name:'PULSE 通讯',kind:'技术伙伴',min:55,base:4,goal:'points',bonus:0.5
}, {
  id:'zenith',name:'ZENITH 精密',kind:'技术伙伴',min:70,base:5,goal:'win',bonus:3
}, {
  id:'arc',name:'ARC 出行',kind:'技术伙伴',min:0,base:2.5,goal:'finish',bonus:0.12
} ];
const SPONSOR_GOALS = {
  podium:'正赛登上领奖台',points:'正赛获得积分',finish:'正赛至少一车完赛',q3:'进入 Q3',win:'赢得正赛'
};

return {SPONSORS, SPONSOR_GOALS};
}());

// ===== 文件: js/core/finance.js =====
modules['js/core/finance.js'] = (function () {
// ===== 文件: js/core/finance.js =====
const {
  SUPPLIERS
} = modules['js/data/teams.js'];
const {
  SPONSORS
} = modules['js/data/sponsors.js'];
const {
  DIFFICULTIES
} = modules['js/data/i18n.js'];
const {
  clamp, news, teamOf, requireCondition, mutable
} = modules['js/core/helpers.js'];
const {
  checkBudget
} = modules['js/core/rules.js'];
function initFinance(s,t,cash) {
  s.finance[t.id]={
    cash,capUsed:0,capLimit:s.season.rules.cap*DIFFICULTIES[s.settings.difficulty].cap,ledger:[],sponsors:[],audited:false,disqualified:false,rescue:false
  };
}
function spend(s,t,amount,label,cap=true,forced=false) {
  const f=s.finance[t.id];
  requireCondition(Number.isFinite(amount)&&amount>=0,'支出金额无效');
  requireCondition(forced||f.cash>=amount,'现金不足');
  f.cash-=amount;
  if(cap)f.capUsed+=amount;
  f.ledger.unshift({
    day:s.calendar.day,label,amount:-amount,cap
  });
  f.ledger.length=Math.min(f.ledger.length,160);
  return amount;
}
function income(s,t,amount,label) {
  const f=s.finance[t.id];
  f.cash+=amount;
  f.ledger.unshift({
    day:s.calendar.day,label,amount,cap:false
  });
  f.ledger.length=Math.min(f.ledger.length,160);
}
function signSponsor(s,id,teamId=s.player.teamId) {
  mutable(s);
  const t=teamOf(s,teamId),f=s.finance[t.id],sp=SPONSORS.find(x=>x.id===id);
  requireCondition(sp,'赞助商不存在');
  requireCondition(t.reputation>=sp.min,'声望尚未达到签约要求');
  requireCondition(!f.sponsors.some(x=>x.id===id),'已签约该赞助商');
  requireCondition(f.sponsors.filter(x=>x.kind===sp.kind).length<(sp.kind==='主赞助'?1:3),'该类型赞助席位已满');
  const boost=1+t.facilities.marketing.level*.03+(s.staff.some(x=>x.teamId===t.id&&x.trait==='money')?.08:0);
  const contract={
    ...sp,annual:sp.base*boost,paid:0
  };
  f.sponsors.push(contract);
  if(t.id===s.player.teamId||s.calendar.day>0)news(s,`${t.name} 与 ${sp.name} 签约，年收入 $${contract.annual.toFixed(2)}m`);
}
function dailyFinance(s,days) {
  for(const t of s.teams) {
    const payroll=s.drivers.filter(x=>x.teamId===t.id).reduce((n,d)=>n+d.contract.salary,0)+s.staff.filter(x=>x.teamId===t.id).reduce((n,d)=>n+d.salary,0);
    spend(s,t,(payroll+12+t.facilities.factory.level*1.2+(t.type==='customer'?(SUPPLIERS[t.supplier]?.price||12):9))*days/365,'薪资与工厂运营',true,true);
    for(const sp of s.finance[t.id].sponsors) {
      const amount=sp.annual*days/365;
      sp.paid+=amount;
      income(s,t,amount,sp.name+' 分期赞助');
    }
  }
}
function raceIncome(s,result) {
  for(const t of s.teams) {
    const own=result.rows.filter(r=>r.teamId===t.id);
    for(const row of own.filter(x=>x.points>0)) {
      const driver=s.drivers.find(d=>d.id===row.driverId);
      spend(s,t,driver.contract.bonus,'车手积分绩效奖金',true,true);
    }
    income(s,t,.3+t.reputation*.006+s.drivers.filter(d=>d.teamId===t.id&&d.star).length*.15,'周边与赛事分成');
    for(const sp of s.finance[t.id].sponsors) {
      let ok=false;
      if(sp.goal==='podium')ok=own.some(r=>r.position<=3&&r.classified);
      if(sp.goal==='points')ok=own.some(r=>r.points>0);
      if(sp.goal==='finish')ok=own.some(r=>!r.retired);
      if(sp.goal==='q3')ok=s.calendar.weekend.q3.some(id=>t.drivers.includes(id));
      if(sp.goal==='win')ok=own.some(r=>r.position===1&&r.classified);
      if(ok)income(s,t,sp.bonus,sp.name+' 达标奖金');
    }
    checkBudget(s,t);
    if(s.finance[t.id].cash<0&&t.id===s.player.teamId) {
      s.season.gameOver='车队现金流断裂，董事会终止你的任期。';
      news(s,s.season.gameOver,'danger');
    }
  }
}
function emergency(s) {
  mutable(s);
  const t=teamOf(s),f=s.finance[t.id];
  requireCondition(!f.rescue,'本季董事会援助已使用');
  requireCondition(f.cash<20,'仅现金低于 $20m 时可申请');
  f.rescue=true;
  t.confidence=clamp(t.confidence-15);
  t.reputation=clamp(t.reputation-5);
  income(s,t,15,'董事会紧急注资');
  news(s,'董事会注资 $15m，信心 -15、声望 -5','warning');
}

return {initFinance, spend, income, signSponsor, dailyFinance, raceIncome, emergency};
}());

// ===== 文件: js/data/staff-data.js =====
modules['js/data/staff-data.js'] = (function () {
// ===== 文件: js/data/staff-data.js =====
const ROLES = {
  principal:'车队领队',technical:'技术总监',aero:'空气动力主管',performance:'性能主管',reliability:'可靠性主管',engineer:'比赛工程师',analyst:'性能工程师',strategy:'策略主管',mechanics:'维修区机械师',sporting:'运动总监',academy:'青训主管',marketing:'市场赞助主管'
};
const TRAITS = {
  pit:{
    name:'进站大师',description:'停站时间减少 0.15 秒'
  },aggressive:{
    name:'激进研发',description:'研发速度 +10%，失败风险 +5%'
  },tyre:{
    name:'轮胎低语者',description:'轮胎磨损 -5%'
  },money:{
    name:'摇钱树',description:'赞助收入 +8%'
  },calm:{
    name:'沉稳',description:'车手失误概率 -10%'
  },mentor:{
    name:'育成专家',description:'青训成长 +20%'
  },precise:{
    name:'数据专家',description:'练习采集误差 -15%'
  }
};
// 虚构员工，避免对真实工程师合同与能力作伪精确推断。
const names=['林远','Elias Weber','Sofia Rossi','陈翊','Amelia Clarke','Hugo Martin','Marco Bellini','Anna Fischer','Lucas Moreau','松田 凛','James Reed','Eva Laurent','Noah Silva','周宁','Luca Bianchi','Mia Evans','Daniel König','Oliver Walsh','Elena Costa','Leo Park','高桥 悠','Isabel Santos','Max Keller','许知行'];
const STAFF_POOL = names.map((name,i)=>({
  id:'market-'+i,name,role:Object.keys(ROLES)[i%12],ability:65+(i*7)%31,trait:Object.keys(TRAITS)[i%7],salary:0.45+(i*7%31)*0.045,loyalty:55+i%30,morale:75,years:2
}));

return {ROLES, TRAITS, STAFF_POOL};
}());

// ===== 文件: js/core/staff.js =====
modules['js/core/staff.js'] = (function () {
// ===== 文件: js/core/staff.js =====
const {
  ROLES, TRAITS, STAFF_POOL
} = modules['js/data/staff-data.js'];
const {
  between, chance, choose
} = modules['js/core/rng.js'];
const {
  uid, clamp, news, teamOf, requireCondition, rosterMutable
} = modules['js/core/helpers.js'];
const {
  spend, income
} = modules['js/core/finance.js'];
function staffAbility(s,teamId,role) {
  const group=s.staff.filter(x=>x.teamId===teamId&&x.role===role);
  return group.length?group.reduce((a,x)=>a+x.ability*(.8+x.morale*.002),0)/group.length:45;
}
function seedStaff(s,t) {
  for(const [i,role]of Object.keys(ROLES).entries())s.staff.push({
    id:uid(s,'staff'),name:STAFF_POOL[(i+t.logo)%STAFF_POOL.length].name,role,teamId:t.id,ability:clamp(t.performance+between(s,-10,2),50,95),trait:Object.keys(TRAITS)[i%7],salary:.45+(t.performance-60)*.035,years:2,morale:78,loyalty:between(s,55,90)
  });
}
function hireStaff(s,id,salary,years) {
  rosterMutable(s);
  const t=teamOf(s),candidate=s.staff.find(x=>x.id===id);
  requireCondition(candidate&&candidate.teamId!==t.id,'员工不可签约');
  requireCondition(Number.isFinite(salary)&&salary>=.1&&salary<=20&&Number.isInteger(years)&&years>=1&&years<=5,'合同参数无效');
  const occupied=s.staff.filter(x=>x.teamId===t.id&&x.role===candidate.role).length;
  requireCondition(occupied<2,'同一岗位最多两位员工，请先解约');
  const willing=clamp(.35+(salary/candidate.salary-1)*.55+(t.reputation-candidate.ability)*.012, .08,.98);
  if(!chance(s,willing)) {
    news(s,`${candidate.name} 拒绝了报价；提高薪资或提升车队声望后可再次谈判`,'warning');
    return '谈判未达成';
  }
  const fee=candidate.teamId?candidate.salary*candidate.years*.6:0;
  spend(s,t,fee,'员工签约违约金',true);
  if(candidate.teamId)income(s,teamOf(s,candidate.teamId),fee,'员工转会补偿');
  Object.assign(candidate,{
    teamId:t.id,salary,years,morale:85,loyalty:65
  });
  news(s,`${candidate.name} 加盟 ${t.name}，担任${ROLES[candidate.role]}`);
  return '签约成功';
}
function renewStaff(s,id,salary,years) {
  rosterMutable(s);
  const e=s.staff.find(x=>x.id===id&&x.teamId===s.player.teamId);
  requireCondition(e,'员工不存在');
  requireCondition(Number.isFinite(salary)&&salary>=e.salary*.95&&salary<=20&&Number.isInteger(years)&&years>=1&&years<=5,'续约报价需至少为原薪资的 95%，年限 1—5 年');
  e.salary=salary;
  e.years=years;
  e.morale=clamp(e.morale+7);
  e.loyalty=clamp(e.loyalty+10);
  return '员工已续约';
}
function fireStaff(s,id) {
  rosterMutable(s);
  const e=s.staff.find(x=>x.id===id&&x.teamId===s.player.teamId);
  requireCondition(e,'员工不存在');
  spend(s,teamOf(s),e.salary*e.years*.5,'员工解约补偿',true);
  e.teamId=null;
  e.morale=55;
  return '员工合同已解除';
}
function staffEvents(s) {
  for(const e of s.staff.filter(x=>x.teamId)) {
    e.morale=clamp(e.morale+between(s,-2,2));
    if(e.loyalty<65&&chance(s,.003)) {
      const buyer=choose(s,s.teams.filter(t=>t.id!==e.teamId));
      if(s.finance[buyer.id].cash>e.salary*3) {
        const old=teamOf(s,e.teamId);
        spend(s,buyer,e.salary,'员工挖角补偿',true);
        income(s,old,e.salary,'员工离职补偿');
        e.teamId=buyer.id;
        e.salary*=1.2;
        e.loyalty=80;
        news(s,`${e.name} 接受 ${buyer.name} 报价，离开 ${old.name}`,'warning');
      }
    }
  }
}

return {staffAbility, seedStaff, hireStaff, renewStaff, fireStaff, staffEvents};
}());

// ===== 文件: js/core/rnd.js =====
modules['js/core/rnd.js'] = (function () {
// ===== 文件: js/core/rnd.js =====
const {
  PARTS, FACILITIES
} = modules['js/data/parts.js'];
const {
  DIFFICULTIES
} = modules['js/data/i18n.js'];
const {
  chance
} = modules['js/core/rng.js'];
const {
  uid, clamp, news, teamOf, requireCondition, mutable
} = modules['js/core/helpers.js'];
const {
  spend, income
} = modules['js/core/finance.js'];
const {
  staffAbility
} = modules['js/core/staff.js'];
function projectQuote(s,t,part,kind='development',copies=2) {
  const p=PARTS.find(x=>x.id===part);
  requireCondition(p,'研发部件不存在');
  const level=Math.max(...s.parts[t.id].cars.map(c=>c[part].level),...t.projects.filter(x=>x.part===part).map(x=>x.level),1)+1;
  const aero=p.department==='aero';
  const feedback=t.drivers.reduce((a,id)=>a+s.drivers.find(d=>d.id===id).attributes.feedback,0)/200;
  const aggressive=s.staff.some(x=>x.teamId===t.id&&x.trait==='aggressive');
  const efficiency=(.65+(staffAbility(s,t.id,'technical')*.55+staffAbility(s,t.id,'aero')*.25+staffAbility(s,t.id,'performance')*.2)/180)*(1+t.departments[p.department].level*.07)*(aero?1+(t.facilities.wind.level+t.facilities.cfd.level)*.025:1)*(1+feedback*.12)*(aggressive?1.1:1);
  return {
    level,cost:p.cost*(1+level*.12)*(kind==='research'?1.1:1),days:Math.ceil(p.days*(1+level*.05)/efficiency),gain:2.2/(1+level*.08),wind:aero?18+level*2:0,cfd:aero?24+level*2:0,risk:clamp(.04+level*.008+(aggressive?.05:0)-(staffAbility(s,t.id,'reliability')-60)*.001,.015,.25),manufacturing:p.cost*.22*copies
  };
}
function startProject(s,part,kind='development',copies=2,teamId=s.player.teamId) {
  mutable(s);
  const t=teamOf(s,teamId),p=PARTS.find(x=>x.id===part);
  requireCondition(p,'研发部件不存在');
  requireCondition(['development','research'].includes(kind)&&[1,2].includes(copies),'研发参数无效');
  requireCondition(!(t.type==='customer'&&p.department==='power'),'客户车队不能自主改进动力单元，请依靠供应商');
  requireCondition(!(s.season.year>=2026&&part==='mguh'),'新规赛季不再允许 MGU-H 研发');
  requireCondition(kind!=='research'||s.calendar.round>=Math.floor(s.calendar.events.length*.55),'下赛季研究在赛季过半后开放');
  requireCondition(t.projects.filter(p=>p.status==='researching').length<2+Math.floor(t.facilities.cfd.level/3),'研发槽位已满');
  requireCondition(!t.projects.some(x=>x.part===part&&x.kind===kind&&x.status==='researching'),'相同项目已在进行');
  const q=projectQuote(s,t,part,kind,copies);
  requireCondition(t.wind.used+q.wind<=t.wind.limit&&t.cfd.used+q.cfd<=t.cfd.limit,'风洞或 CFD 额度不足');
  spend(s,t,q.cost+q.manufacturing,`${p.name} ${kind==='research'?'下季研究':'研发与制造预付'}`,true);
  t.wind.used+=q.wind;
  t.cfd.used+=q.cfd;
  const item={
    id:uid(s,'project'),part,kind,copies,...q,remaining:q.days,progress:0,status:'researching',boosted:false,safer:false
  };
  t.projects.push(item);
  news(s,`${t.name} 启动${p.name}${kind==='research'?'下季研究':'升级'}，预计 ${q.days} 天`);
  return '研发项目已立项';
}
function changeProject(s,id,operation) {
  mutable(s);
  const t=teamOf(s),p=t.projects.find(x=>x.id===id&&x.status==='researching');
  requireCondition(p,'项目不在研发阶段');
  if(operation==='cancel') {
    p.status='cancelled';
    income(s,t,p.manufacturing,'取消项目退还制造预付');
    return '项目已叫停，研发成本不退，制造预付已退回';
  }
  if(operation==='boost') {
    requireCondition(!p.boosted,'已追加过投入');
    spend(s,t,p.cost*.3,'研发追加投入',true);
    p.remaining*=.7;
    p.risk=clamp(p.risk+.025,0,1);
    p.boosted=true;
    return '工期缩短 30%，失败风险上升';
  }
  requireCondition(operation==='safe'&&!p.safer,'已执行风险审查或操作无效');
  spend(s,t,p.cost*.15,'研发风险审查',true);
  p.risk*=.45;
  p.remaining*=1.15;
  p.safer=true;
  return '失败风险降低，剩余工期增加 15%';
}
function upgradeFacility(s,id) {
  mutable(s);
  const t=teamOf(s),f=t.facilities[id],def=FACILITIES[id];
  requireCondition(f&&def,'设施不存在');
  requireCondition(!f.building&&f.level<6,'设施已在建或达到 6 级');
  spend(s,t,def.cost*(1+f.level*.6),def.name+' 建设投资',false);
  f.building={
    remaining:def.days+f.level*5,total:def.days+f.level*5
  };
  return '设施建设启动（不计入预算帽）';
}
function upgradeDepartment(s,id) {
  mutable(s);
  const t=teamOf(s),d=t.departments[id];
  requireCondition(d&&d.level<6,'部门已达上限或不存在');
  spend(s,t,2+d.level,'部门扩编',true);
  d.level++;
  d.people+=8;
  return '部门等级与人数已提升';
}
function advanceRND(s,days) {
  for(let day=0; day<days; day++)advanceOneRND(s,1);
}
function advanceOneRND(s,days) {
  for(const t of s.teams) {
    for(const f of Object.values(t.facilities)) {
      if(f.building) {
        f.building.remaining-=days;
        if(f.building.remaining<=0) {
          f.level++;
          f.building=null;
          news(s,`${t.name} 的设施升级至 ${f.level} 级`);
        }
      }
    }
    const speed=t.id===s.player.teamId?1:DIFFICULTIES[s.settings.difficulty].ai;
    for(const p of t.projects.filter(x=>x.status==='researching')) {
      p.remaining-=days*speed;
      p.progress=clamp(100*(1-p.remaining/p.days));
      if(p.remaining>0)continue;
      if(chance(s,p.risk)) {
        p.status='failed';
        income(s,t,p.manufacturing,'失败项目退还制造预付');
        news(s,`${t.name} 的${PARTS.find(x=>x.id===p.part).name}研发失败`,'warning');
        continue;
      }
      p.status='complete';
      if(p.kind==='research') {
        const dimension=PARTS.find(x=>x.id===p.part).dimension;
        t.research[dimension]=(t.research[dimension]||0)+p.gain;
        news(s,`${t.name} 下赛季研究完成，技术储备增加`);
      }
      else{
        for(let i=0; i<p.copies; i++)s.parts[t.id].production.push({
          id:uid(s,'unit'),part:p.part,level:p.level,gain:p.gain,risk:p.part==='cooling'?0:p.risk*3,remaining:Math.ceil(5/(1+t.facilities.factory.level*.18+t.departments.manufacturing.level*.08))
        });
        news(s,`${t.name} 研发完成，${p.copies} 套部件进入制造队列`);
      }
    }
    const q=s.parts[t.id].production,capacity=factoryCapacity(t);
    let budget=days*capacity;
    for(const item of q) {
      if(budget<=0)break;
      const use=Math.min(item.remaining,budget);
      item.remaining-=use;
      budget-=use;
    }
    for(const item of q.filter(x=>x.remaining<=0)) {
      s.parts[t.id].stock.push(item);
      news(s,`${t.name} 新规格零件生产完成，可分配装车`);
    }
    s.parts[t.id].production=q.filter(x=>x.remaining>0);
  }
}
function factoryCapacity(t) {
  return 1+Math.floor(t.facilities.factory.level/2)+Math.floor(t.departments.manufacturing.level/3);
}
function projectCapacity(t) {
  return 2+Math.floor(t.facilities.cfd.level/3);
}
function researchUnlocked(s) {
  return s.calendar.round>=Math.floor(s.calendar.events.length*.55);
}
function facilityCost(t,id) {
  return FACILITIES[id].cost*(1+t.facilities[id].level*.6);
}
function departmentCost(t,id) {
  return 2+t.departments[id].level;
}
function overrunTesting(s) {
  mutable(s);
  const t=teamOf(s);
  requireCondition(!t.wind.overrun,'本季超额试验已被处罚，不能再次申请');
  spend(s,t,5,'空气动力超额试验罚款',false);
  t.wind.limit+=45;
  t.cfd.limit+=60;
  t.wind.overrun=true;
  t.confidence=clamp(t.confidence-10);
  news(s,`${t.name} 违规增加风洞 / CFD 测试，被罚 $5m，董事会信心 -10`,'warning');
  return '违规试验额度已增加，同时已执行罚款与董事会处罚';
}

return {projectQuote, startProject, changeProject, upgradeFacility, upgradeDepartment, advanceRND, factoryCapacity, projectCapacity, researchUnlocked, facilityCost, departmentCost, overrunTesting};
}());

// ===== 文件: js/data/drivers-data.js =====
modules['js/data/drivers-data.js'] = (function () {
// ===== 文件: js/data/drivers-data.js =====
// 所有能力、薪资、潜力均为非官方游戏化平衡值；年龄按赛季年减出生年。
const ATTRS = {
  pace:'总体速度',qualifying:'单圈速度',racePace:'正赛节奏',racecraft:'超车',defending:'防守',tyres:'轮胎管理',wet:'湿地能力',starts:'起步',consistency:'稳定性',feedback:'研发反馈',fitness:'体能',aggression:'攻击性',experience:'经验',potential:'潜力'
};
const rows = [ ['verstappen','Max Verstappen',1,'荷兰',1997,95,98,94,18], ['perez','Sergio Pérez',11,'墨西哥',1990,86,88,87,9], ['leclerc','Charles Leclerc',16,'摩纳哥',1997,92,97,94,13], ['sainz','Carlos Sainz',55,'西班牙',1994,89,91,91,10], ['hamilton','Lewis Hamilton',44,'英国',1985,93,94,94,20], ['russell','George Russell',63,'英国',1998,90,94,94,11], ['norris','Lando Norris',4,'英国',1999,91,94,96,12], ['ricciardo','Daniel Ricciardo',3,'澳大利亚',1989,83,86,86,7], ['alonso','Fernando Alonso',14,'西班牙',1981,91,91,92,14], ['ocon','Esteban Ocon',31,'法国',1996,84,86,88,6], ['gasly','Pierre Gasly',10,'法国',1996,85,88,89,7], ['tsunoda','Yuki Tsunoda',22,'日本',2000,81,86,88,3], ['vettel','Sebastian Vettel',5,'德国',1987,86,87,87,12], ['stroll','Lance Stroll',18,'加拿大',1998,78,79,81,4], ['albon','Alexander Albon',23,'泰国',1996,84,89,89,5], ['latifi','Nicholas Latifi',6,'加拿大',1995,69,72,73,1.5], ['bottas','Valtteri Bottas',77,'芬兰',1989,85,90,87,8], ['zhou','Zhou Guanyu',24,'中国',1999,76,79,83,2], ['magnussen','Kevin Magnussen',20,'丹麦',1992,81,85,83,4], ['schumacher','Mick Schumacher',47,'德国',1999,74,77,84,2], ['piastri','Oscar Piastri',81,'澳大利亚',2001,85,89,97,6], ['devries','Nyck de Vries',21,'荷兰',1995,72,75,80,1.5], ['sargeant','Logan Sargeant',2,'美国',2000,71,74,80,1], ['hulkenberg','Nico Hülkenberg',27,'德国',1987,84,90,86,6], ['lawson','Liam Lawson',30,'新西兰',2002,77,81,89,2], ['antonelli','Kimi Antonelli',12,'意大利',2006,78,83,97,3], ['doohan','Jack Doohan',7,'澳大利亚',2003,73,77,87,1.5], ['hadjar','Isack Hadjar',6,'法国',2004,77,82,93,2], ['bearman','Oliver Bearman',87,'英国',2005,77,82,94,2], ['bortoleto','Gabriel Bortoleto',5,'巴西',2004,76,80,94,2], ['colapinto','Franco Colapinto',43,'阿根廷',2003,76,80,89,2], ['drugovich','Felipe Drugovich',34,'巴西',2000,75,78,87,1.5], ['pourchaire','Théo Pourchaire',98,'法国',2003,74,78,90,1.3], ['iwasa','Ayumu Iwasa',40,'日本',2001,73,77,88,1.2], ['vandoorne','Stoffel Vandoorne',42,'比利时',1992,77,80,81,2], ['fittipaldi','Pietro Fittipaldi',51,'巴西',1996,69,72,77,1] ];
const DRIVER_DATA = Object.fromEntries(rows.map(([id,name,number,nationality,birth,pace,qualifying,potential,salary],i)=>[id,{
  id,name,number,nationality,birth,salary,attributes:{
    pace,qualifying,racePace:pace+(i%3)-1,racecraft:Math.min(98,pace+2),defending:pace,tyres:Math.min(97,pace+3),wet:Math.max(60,pace+(i%5)-2),starts:pace-1,consistency:Math.min(98,pace+2),feedback:Math.min(97,pace+2),fitness:88-i%8,aggression:72+i%23,experience:Math.min(99,Math.max(10,(2025-birth-17)*4)),potential
  }
}]));
// 赛季初相对实力调整，避免把成熟期能力倒灌进新秀赛季。
const YEAR_ADJUSTMENTS = {
  2022:{
    piastri:-9,norris:-3,tsunoda:-5,albon:-2,hamilton:1
  },2023:{
    piastri:-5,norris:-1,alonso:1,tsunoda:-2,devries:0
  },2024:{
    piastri:2,norris:2,ricciardo:-2,perez:-3
  },2025:{
    piastri:7,norris:3,hamilton:-3,perez:-3,tsunoda:2,albon:2,gasly:1
  }
};
const RESERVES = {
  2022:['hulkenberg','piastri','vandoorne','fittipaldi'],2023:['ricciardo','lawson','drugovich','schumacher','pourchaire'],2024:['lawson','bearman','doohan','colapinto','drugovich','pourchaire'],2025:['perez','bottas','zhou','ricciardo','drugovich','colapinto','iwasa']
};

return {ATTRS, DRIVER_DATA, YEAR_ADJUSTMENTS, RESERVES};
}());

// ===== 文件: js/core/drivers.js =====
modules['js/core/drivers.js'] = (function () {
const { assignDriverCodes, DRIVER_CODES } = modules['js/core/driverCodes.js'];
// ===== 文件: js/core/drivers.js =====
const {
  DRIVER_DATA, YEAR_ADJUSTMENTS
} = modules['js/data/drivers-data.js'];
const {
  between, chance, choose
} = modules['js/core/rng.js'];
const {
  uid, clamp, copy, teamOf, driverOf, news, requireCondition, rosterMutable
} = modules['js/core/helpers.js'];
const {
  spend, income
} = modules['js/core/finance.js'];
const {
  staffAbility
} = modules['js/core/staff.js'];
function makeDriver(id,year) {
  const source=DRIVER_DATA[id];
  requireCondition(source,'车手数据不存在');
  const d=copy(source),delta=YEAR_ADJUSTMENTS[year]?.[id]||0;
  for(const k of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency'])d.attributes[k]=clamp(d.attributes[k]+delta,60,98);
  d.code=DRIVER_CODES[id];
  d.age=year-d.birth;
  d.attributes.experience=clamp((d.age-17)*4,10,99);
  Object.assign(d,{
    teamId:null,morale:80,fatigue:0,points:0,results:[],wins:0,fastest:0,star:d.attributes.pace>=90,contract:{
      salary:d.salary,years:2,bonus:.1,buyout:.65
    },plan:'balanced',academy:false,retired:false
  });
  return d;
}
function createCustomDriver(s,name,age,pace,number) {
  requireCondition(name.trim().length>=1&&name.length<=32,'车手名字需为 1—32 个字符');
  requireCondition(Number.isInteger(age)&&age>=18&&age<=45&&Number.isFinite(pace)&&pace>=60&&pace<=80,'自建车手年龄需 18—45，初始能力 60—80');
  const d=makeDriver('drugovich',s.season.year);
  d.id=uid(s,'custom-driver');
  d.name=name.trim();delete d.code;
  d.age=age;
  d.birth=s.season.year-age;
  d.number=number;
  d.nationality='自定义';
  for(const k of Object.keys(d.attributes))d.attributes[k]=pace;
  d.attributes.fitness=90;
  d.attributes.experience=clamp((age-17)*4,10,99);
  d.attributes.potential=Math.max(pace,age<25?92:84);
  d.contract.salary=1.3;
  d.star=false;
  s.drivers.push(d);assignDriverCodes(s);
  return d;
}
function freeReplacement(s,teamId,exclude) {
  return s.drivers.filter(d=>!d.teamId&&!d.academy&&!d.retired&&d.id!==exclude).sort((a,b)=>b.attributes.pace-a.attributes.pace)[0];
}
function transferDriver(s,d,t,slot,salary,years) {
  const oldId=d.teamId;
  if(oldId) {
    const old=teamOf(s,oldId),seat=old.drivers.indexOf(d.id),replacement=freeReplacement(s,old.id,d.id);
    requireCondition(replacement,'对方车队无可用替补，转会暂时无法完成');
    old.drivers[seat]=replacement.id;
    replacement.teamId=old.id;
  }
  const outgoing=s.drivers.find(x=>x.id===t.drivers[slot]);
  if(outgoing)outgoing.teamId=null;
  t.drivers[slot]=d.id;
  d.teamId=t.id;
  d.academy=false;
  d.contract={
    salary,years,bonus:.1,buyout:.65
  };
  d.morale=85;
}
function signDriver(s,id,slot,salary,years) {
  rosterMutable(s);
  const t=teamOf(s),d=driverOf(s,id);
  requireCondition(d.teamId!==t.id&&!d.retired,'该车手不可签约');
  requireCondition(!d.academy||d.academy===t.id,'只能提拔本队青训');
  requireCondition([0,1].includes(slot)&&Number.isFinite(salary)&&salary>=.1&&salary<=100&&Number.isInteger(years)&&years>=1&&years<=5,'合同参数无效');
  const outgoing=driverOf(s,t.drivers[slot]);
  const release=outgoing.contract.salary*outgoing.contract.years*.3;
  const fee=d.teamId?d.contract.salary*d.contract.years*d.contract.buyout:0;
  requireCondition(s.finance[t.id].cash>=release+fee,'现金不足以支付转会和解约补偿');
  const desire=.5+(salary/Math.max(.5,d.contract.salary)-1)*.4+(t.reputation-d.attributes.pace)*.012+t.facilities.marketing.level*.02;
  if(!chance(s,clamp(desire,.08,.98))) {
    news(s,`${d.name} 拒绝 ${t.name} 的报价，薪水与竞争力尚不足`,'warning');
    return '谈判未达成';
  }
  const old=d.teamId;
  spend(s,t,fee+release,'车手转会与席位解约',true);
  if(old)income(s,teamOf(s,old),fee,'车手转会补偿');
  transferDriver(s,d,t,slot,salary,years);
  news(s,`${d.name} 签约 ${t.name}，合同 ${years} 年`);
  return '签约成功';
}
function renewDriver(s,id,salary,years) {
  rosterMutable(s);
  const d=driverOf(s,id);
  requireCondition(d.teamId===s.player.teamId,'只能续约本队车手');
  requireCondition(Number.isFinite(salary)&&salary>=d.contract.salary*.95&&salary<=100&&Number.isInteger(years)&&years>=1&&years<=5,'续约报价无效（最低原薪资 95%，年限 1—5 年）');
  d.contract.salary=salary;
  d.contract.years=years;
  d.morale=clamp(d.morale+8);
  return '车手续约成功';
}
function releaseDriver(s,id) {
  rosterMutable(s);
  const t=teamOf(s),d=driverOf(s,id);
  requireCondition(d.teamId===t.id,'只能解约本队车手');
  const reserve=freeReplacement(s,t.id,id);
  requireCondition(reserve,'没有可用替补，请先招募青训或签入车手');
  spend(s,t,d.contract.salary*d.contract.years*.5,'车手解约补偿',true);
  const slot=t.drivers.indexOf(id);
  t.drivers[slot]=reserve.id;
  reserve.teamId=t.id;
  d.teamId=null;
  return `合同解除，${reserve.name} 临时接替席位`;
}
function trainDriver(s,id,plan) {
  const d=driverOf(s,id);
  requireCondition(d.teamId===s.player.teamId||d.academy===s.player.teamId,'只能安排本队训练');
  requireCondition(['balanced','pace','tyres','wet','rest'].includes(plan),'训练项目无效');
  d.plan=plan;
  return '发展计划已更新';
}
function recruitYouth(s) {
  rosterMutable(s);
  const t=teamOf(s);
  requireCondition(s.drivers.filter(d=>d.academy===t.id).length<4,'青训最多 4 人');
  spend(s,t,1,'招募青训车手',true);
  const names=['Ren Sato','Alex Morgan','Gabriel Costa','陈星河','Luca Moretti','Émile Laurent'];
  const d=makeDriver('pourchaire',s.season.year);
  d.id=uid(s,'youth');
  d.name=choose(s,names)+' '+s.nextId;delete d.code;
  d.age=18;
  d.birth=s.season.year-18;
  d.academy=t.id;
  d.background=chance(s,.5)?'F2':'F3';
  for(const k of Object.keys(d.attributes))d.attributes[k]=between(s,61,76);
  d.attributes.potential=between(s,86,97);
  d.contract.salary=.3;
  s.drivers.push(d);assignDriverCodes(s);
  news(s,`${d.name} 从 ${d.background} 加入青训`);
  return '新青训车手已报到';
}
function sellYouth(s,id) {
  rosterMutable(s);
  const d=driverOf(s,id);
  requireCondition(d.academy===s.player.teamId,'不是本队青训车手');
  income(s,teamOf(s),Math.max(.5,(d.attributes.pace-55)*.2),'青训车手培养转让');
  d.academy=false;
  return '青训资产已出售，车手进入自由市场';
}
function developDrivers(s,days) {
  for(const d of s.drivers) {
    if(d.retired)continue;
    d.fatigue=clamp(d.fatigue-days*(d.plan==='rest'?2:1)*(.5+d.attributes.fitness*.005));
    const team=d.teamId||d.academy;
    if(!team)continue;
    const t=teamOf(s,team),academy=staffAbility(s,t.id,'academy');
    const young=d.age<27;
    const growth=young?Math.max(0,d.attributes.potential-d.attributes.pace)*days/18000*(1+academy/100)*(d.academy?1.5:1)*(s.staff.some(x=>x.teamId===t.id&&x.trait==='mentor')?1.2:1):d.age>30?-(d.age-29)*days/24000:0;
    for(const key of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency','feedback'])d.attributes[key]=clamp(d.attributes[key]+growth,50,99);
    if(d.plan!=='balanced'&&d.plan!=='rest') {
      const cost=days*.008;
      if(s.finance[t.id].cash>cost) {
        spend(s,t,cost,'车手专项训练',true);
        const key=d.plan==='pace'?'qualifying':d.plan;
        d.attributes[key]=clamp(d.attributes[key]+days*(1+t.facilities.sim.level*.1)*.018,0,d.attributes.potential);
      }
    }
  }
}
function seedAIYouth(s,t){
  if(s.drivers.some(d=>d.academy===t.id&&!d.retired))return;
  const d=makeDriver('pourchaire',s.season.year);
  d.id=uid(s,'ai-youth');delete d.code;d.name=choose(s,['Matteo Riva','Evan Brooks','Haru Mori','Rafael Lima','林逸'])+' '+t.abbr;
  d.age=18;d.birth=s.season.year-18;d.academy=t.id;d.background='F2 / F3 虚构新秀';d.contract.salary=.4;
  for(const key of ['pace','qualifying','racePace','racecraft','defending','tyres','wet','starts','consistency'])d.attributes[key]=between(s,68,77);
  d.attributes.potential=between(s,88,97);s.drivers.push(d);assignDriverCodes(s);
}

return {makeDriver, createCustomDriver, freeReplacement, transferDriver, signDriver, renewDriver, releaseDriver, trainDriver, recruitYouth, sellYouth, developDrivers, seedAIYouth};
}());

// ===== 文件: js/core/ai.js =====
modules['js/core/ai.js'] = (function () {
// ===== 文件: js/core/ai.js =====
const {
  PARTS, partQuota
} = modules['js/data/parts.js'];
const {
  DIFFICULTIES
} = modules['js/data/i18n.js'];
const {
  startProject
} = modules['js/core/rnd.js'];
const {
  chance, choose, between
} = modules['js/core/rng.js'];
const {
  transferDriver, freeReplacement, seedAIYouth
} = modules['js/core/drivers.js'];
const {
  spend, income
} = modules['js/core/finance.js'];
const {
  news
} = modules['js/core/helpers.js'];
function aiManagement(s) {
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
function aiRaceDecision(s,car,track) {
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
function aiTransfers(s) {
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

return {aiManagement, aiRaceDecision, aiTransfers};
}());

// ===== 文件: js/core/calendar.js =====
modules['js/core/calendar.js'] = (function () {
// ===== 文件: js/core/calendar.js =====
const {
  SCHEDULES, SPRINTS, trackForYear
} = modules['js/data/tracks.js'];
const {
  sessionsFor
} = modules['js/core/rules.js'];
const {
  advanceRND
} = modules['js/core/rnd.js'];
const {
  dailyFinance
} = modules['js/core/finance.js'];
const {
  developDrivers
} = modules['js/core/drivers.js'];
const {
  aiManagement
} = modules['js/core/ai.js'];
const {
  staffEvents
} = modules['js/core/staff.js'];
const {
  between, chance
} = modules['js/core/rng.js'];
const {
  requireCondition, news, mutable, teamOf
} = modules['js/core/helpers.js'];
function makeCalendar(year) {
  const reference=Math.min(year,2025);
  return SCHEDULES[reference].split(' ').map((item,i)=> {
    const [track,date]=item.split(':'); return {
      round:i+1,track,date:`${year}-${date}`,sprint:SPRINTS[reference].includes(track),completed:false,result:null
    };
  });
}
function currentEvent(s) {
  return s.calendar.events[s.calendar.round];
}
function currentTrack(s) {
  const e=currentEvent(s);
  return e?trackForYear(e.track,Math.min(s.season.year,2025)):null;
}
function advanceDays(s,days) {
  requireCondition(Number.isInteger(days)&&days>0&&days<=180,'推进天数无效');
  s.calendar.day+=days;
  const dt=new Date(s.calendar.date+'T12:00:00Z');
  dt.setUTCDate(dt.getUTCDate()+days);
  s.calendar.date=dt.toISOString().slice(0,10);
  dailyFinance(s,days);
  developDrivers(s,days);
  advanceRND(s,days);
  const f=s.finance[s.player.teamId];
  if(f.cash<0&&!s.season.gameOver) {
    s.season.gameOver='车队现金流断裂，董事会终止你的任期。';
    news(s,s.season.gameOver,'danger');
  }
}
function waitDays(s,days=7) {
  mutable(s);
  requireCondition(!s.calendar.weekend&&!s.season.offseason,'请先完成当前周末或转会窗');
  const e=currentEvent(s);
  const left=Math.round((Date.parse(e.date)-Date.parse(s.calendar.date))/86400000);
  requireCondition(left>2,'距离比赛不足三天，请进入比赛周末');
  advanceDays(s,Math.min(days,left-2));
  aiManagement(s);
  return '工厂与训练已推进';
}
function enterWeekend(s) {
  mutable(s);
  requireCondition(!s.calendar.weekend&&!s.season.offseason,'当前阶段不能创建比赛周末');
  const e=currentEvent(s);
  requireCondition(e,'本赛季赛历已结束');
  const delta=Math.max(0,Math.round((Date.parse(e.date)-Date.parse(s.calendar.date))/86400000)-2);
  if(delta)advanceDays(s,delta);
  aiManagement(s);
  staffEvents(s);
  const w={
    sessions:sessionsFor(s.season.year,e.sprint),index:0,setups:{
    },ideal:{
    },confidence:{
    },grids:{
    },qualifying:null,practice:[],q3:[],strategy:{
    },tyres:{
    },weekendWet:false,weatherStart:chance(s,currentTrack(s).rain)?between(s,.2,.8):0
  };
  for(const t of s.teams) {
    w.setups[t.id]=[[50,50,50,50],[50,50,50,50]];
    w.ideal[t.id]=[0,1].map(()=>[between(s,25,75),between(s,25,75),between(s,25,75),between(s,25,75)]);
    w.confidence[t.id]=[0,1].map(()=>Array.from({
      length:4
    },()=>({
      low:0,high:100,estimate:50
    })));
    for(const [slot,id]of t.drivers.entries()) {
      w.tyres[id]={
        S:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?4:e.sprint?6:8,M:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?4:e.sprint?4:3,H:s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id)?3:2,I:4,W:3
      };
      w.strategy[id]={
        start:w.weatherStart>.65?'W':w.weatherStart>.2?'I':'M',pitLap:Math.round(currentTrack(s).laps*.45),secondLap:0,next:'H',backup:'B',rain:'I',auto:false
      };
      const worn=Object.values(s.parts[t.id].cars[slot]).some(x=>x.wear>75);
      if(t.id===s.player.teamId&&worn)news(s,`${s.drivers.find(d=>d.id===id).name} 的部件磨损偏高，本站存在可靠性风险`,'warning');
    }
  }
  s.calendar.weekend=w;
  s.race=null;
  news(s,`抵达${currentTrack(s).name}，${e.sprint?'冲刺':'标准'}周末开始`);
  return '比赛周末已开启';
}
function changeSetup(s,slot,values) {
  const w=s.calendar.weekend;
  requireCondition(w&&w.sessions[w.index]?.startsWith('FP'),'设定仅能在练习阶段调整');
  requireCondition([0,1].includes(slot)&&Array.isArray(values)&&values.length===4&&values.every(x=>Number.isFinite(x)&&x>=0&&x<=100),'设定参数无效');
  w.setups[s.player.teamId][slot]=values;
  return '赛车设定已更新';
}
function setStrategy(s,id,plan) {
  const w=s.calendar.weekend;
  requireCondition(w&&!s.race?.running,'比赛开始后请使用实时指令');
  requireCondition(teamOf(s).drivers.includes(id),'不是本队车手');
  requireCondition(['S','M','H','I','W'].includes(plan.start)&&['S','M','H','I','W'].includes(plan.next),'轮胎配方无效');
  requireCondition(Number.isInteger(plan.pitLap)&&plan.pitLap>=1&&plan.pitLap<=currentTrack(s).laps,'进站圈数无效');
  requireCondition(Number.isInteger(plan.secondLap)&&plan.secondLap>=0&&plan.secondLap<=currentTrack(s).laps,'第二次进站圈无效');
  requireCondition(['A','B','C'].includes(plan.backup)&&['I','W'].includes(plan.rain),'备选策略无效');
  w.strategy[id]={
    ...plan,auto:!!plan.auto
  };
  return '策略计划已保存';
}

return {makeCalendar, currentEvent, currentTrack, advanceDays, waitDays, enterWeekend, changeSetup, setStrategy};
}());

// ===== 文件: js/core/car.js =====
modules['js/core/car.js'] = (function () {
// ===== 文件: js/core/car.js =====
const {
  PARTS, COMPOUNDS, MODES, ENGINES, partQuota
} = modules['js/data/parts.js'];
const {
  SUPPLIERS
} = modules['js/data/teams.js'];
const {
  clamp, teamOf, driverOf, requireCondition, mutable
} = modules['js/core/helpers.js'];
const {
  spend
} = modules['js/core/finance.js'];
const {
  between
} = modules['js/core/rng.js'];
function initParts(s,t) {
  s.parts[t.id]={
    cars:[0,1].map(()=>Object.fromEntries(PARTS.map(p=>[p.id,{
      level:1,gain:0,wear:0,used:1,risk:0
    }]))),stock:[],production:[]
  };
}
function performance(s,t,slot=0) {
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
const WEIGHTS = {
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
function carScore(s,t,slot,track) {
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
function theoreticalLap(s,t,d,slot,track,qualifying=false) {
  const a=d.attributes;
  const skill=qualifying?a.qualifying*.8+a.pace*.2:a.racePace*.55+a.tyres*.18+a.consistency*.12+a.pace*.15;
  return track.baseTime+(95-carScore(s,t,slot,track))*.075+(95-skill)*.026+(d.fatigue||0)*.002+(75-d.morale)*.0015;
}
function setupPenalty(setup,ideal) {
  return setup.reduce((sum,v,i)=>sum+Math.max(0,Math.abs(v-ideal[i])-5),0)*.008;
}
function tyreState(car,track,driver,weather,mode='normal',trait=false) {
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
function lapTime(s,car,track) {
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
function replacePart(s,slot,id) {
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
function fitPart(s,stockId,slot) {
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
function replacementCost(part) {
  return part.cost*.23;
}
// 供界面展示的纯数据预测；不会消耗 RNG，也不会改动真实轮胎库存。
function tyreChartData(s,track){
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

return {initParts, performance, WEIGHTS, carScore, theoreticalLap, setupPenalty, tyreState, lapTime, replacePart, fitPart, replacementCost, tyreChartData};
}());

// ===== 文件: js/core/race.js =====
modules['js/core/race.js'] = (function () {
// ===== 文件: js/core/race.js =====
const {
  COMPOUNDS, MODES, ENGINES, PARTS
} = modules['js/data/parts.js'];
const {
  DIFFICULTIES
} = modules['js/data/i18n.js'];
const {
  currentTrack
} = modules['js/core/calendar.js'];
const {
  theoreticalLap, setupPenalty, lapTime, performance
} = modules['js/core/car.js'];
const {
  staffAbility
} = modules['js/core/staff.js'];
const {
  aiRaceDecision
} = modules['js/core/ai.js'];
const {
  raceIncome
} = modules['js/core/finance.js'];
const {
  RACE_POINTS, SPRINT_POINTS, eliminationSize, penalty, trackLimits, pitLanePenalty
} = modules['js/core/rules.js'];
const {
  between, chance, choose
} = modules['js/core/rng.js'];
const {
  clamp, copy, teamOf, driverOf, news, requireCondition
} = modules['js/core/helpers.js'];
function event(s,text,type='info') {
  const r=s.race;
  r.sequence++;
  r.events.unshift({
    lap:r.lap,text,type,...(r.realtime?{at:r.time}:{})
  });
  if(r.events.length>300)r.events.pop();
}
function practice(s) {
  const w=s.calendar.weekend,track=currentTrack(s);
  requireCondition(w&&w.sessions[w.index]?.startsWith('FP'),'当前不是练习阶段');
  const session=w.sessions[w.index],rows=[];
  for(const t of s.teams)for(const [slot,id]of t.drivers.entries()) {
    const d=driverOf(s,id),conf=w.confidence[t.id][slot],skill=staffAbility(s,t.id,'engineer')*.75+staffAbility(s,t.id,'analyst')*.25;
    for(let i=0; i<4; i++) {
      const prior=conf[i],half=Math.max(3,(prior.high-prior.low)*.27/(1+t.facilities.sim.level*.05+(skill-45)*.003));
      const noise=between(s,-half*.55,half*.55)*(s.staff.some(x=>x.teamId===t.id&&x.trait==='precise')?.85:1);
      const estimate=clamp(w.ideal[t.id][slot][i]+noise,0,100);
      prior.estimate=estimate;
      prior.low=clamp(estimate-half);
      prior.high=clamp(estimate+half);
      if(t.id!==s.player.teamId)w.setups[t.id][slot][i]=estimate;
    }
    const time=theoreticalLap(s,t,d,slot,track)+setupPenalty(w.setups[t.id][slot],w.ideal[t.id][slot])+between(s,-.15,.15);
    d.fatigue=clamp(d.fatigue+1);
    for(const p of Object.values(s.parts[t.id].cars[slot]))p.wear=clamp(p.wear+.5);
    rows.push({
      id,name:d.name,time,feedback:Math.round((d.attributes.feedback+skill)/2)
    });
  }
  rows.sort((a,b)=>a.time-b.time);
  w.practice.push({
    session,rows,wearEstimate:[Math.round(19/track.wear),Math.round(29/track.wear),Math.round(40/track.wear)],fuel:1.65*track.length/5.4
  });
  w.index++;
  news(s,`${session} 完成：设定置信区间收敛，已取得轮胎与燃油数据`);
  return '练习完成，可参照置信区间调整下一节设定';
}
function qualifying(s,mode='push',all=false) {
  const w=s.calendar.weekend,track=currentTrack(s),kind=w?.sessions[w.index];
  requireCondition(kind==='Q'||kind==='SQ','当前不是排位阶段');
  requireCondition(['push','safe','save'].includes(mode),'排位指令无效');
  if(!w.qualifying||w.qualifying.kind!==kind||w.qualifying.done)w.qualifying={
    kind,stage:0,active:s.teams.flatMap(t=>t.drivers),eliminated:[],stages:[],done:false
  };
  const q=w.qualifying;
  do{
    q.stage++;
    const rows=q.active.map(id=> {
      const d=driverOf(s,id),t=teamOf(s,d.teamId),slot=t.drivers.indexOf(id); const selected=t.id===s.player.teamId?mode:'push'; const compound=kind==='SQ'&&q.stage<3?'M':selected==='save'?'M':'S'; const stock=w.tyres[id]; let tyre=compound; if(stock[tyre]<=0)tyre=stock.S>0?'S':stock.M>0?'M':'H'; stock[tyre]=Math.max(0,stock[tyre]-1); const push=selected==='push'?-.12:selected==='safe'?.2:.55; const error=chance(s,(100-d.attributes.consistency)*.0015*(selected==='push'?1.6:.6)); const time=theoreticalLap(s,t,d,slot,track,true)+setupPenalty(w.setups[t.id][slot],w.ideal[t.id][slot])+COMPOUNDS[tyre].pace+push+between(s,-.15,.15)+(error?between(s,.3,1.4):0); return {
        id,name:d.name,teamId:t.id,time,stage:q.stage,compound:tyre
      };
    }).sort((a,b)=>a.time-b.time);
    q.stages.push(rows);
    if(q.stage<3) {
      const count=eliminationSize(s.teams.length*2),eliminated=rows.slice(-count);
      q.eliminated=eliminated.concat(q.eliminated);
      q.active=rows.slice(0,-count).map(x=>x.id);
    }
    else{
      q.done=true;
      w.grids[kind]=rows.concat(q.eliminated).map(x=>x.id);
      if(kind==='Q')w.q3=rows.map(x=>x.id);
      w.index++;
      news(s,`${kind==='Q'?'正赛':'冲刺'}排位结束，${rows[0].name} 获杆位`);
    }
  }
  while(all&&!q.done);
  return q.done?'排位结束':`第 ${q.stage} 段完成，可调整下一段指令`;
}
function useTyre(s,car,compound) {
  const stock=s.calendar.weekend.tyres[car.driverId];
  if(!COMPOUNDS[compound]||stock[compound]<=0)return false;
  stock[compound]--;
  car.compound=compound;
  car.tyreAge=0;
  car.tyreWear=0;
  if(['S','M','H'].includes(compound)&&!car.usedDry.includes(compound))car.usedDry.push(compound);
  return true;
}
function startRace(s) {
  const w=s.calendar.weekend,track=currentTrack(s),kind=w?.sessions[w.index];
  requireCondition(kind==='RACE'||kind==='SPRINT','当前不是比赛阶段');
  requireCondition(!s.race||s.race.finished,'比赛已开始');
  const sprint=kind==='SPRINT',totalLaps=sprint?Math.ceil(100/track.length):track.laps;
  let grid=copy(sprint?(w.grids.SQ||w.grids.Q):(s.season.year===2022&&w.grids.SPRINT?w.grids.SPRINT:w.grids.Q));
  requireCondition(Array.isArray(grid)&&grid.length===s.teams.length*2,'请先完成排位赛');
  const pitDrivers=new Set(!sprint?s.teams.flatMap(t=>t.drivers.filter((id,slot)=>t.pitLaneNext?.[slot])):[]);
  if(!sprint) {
    grid=grid.map((id,i)=> {
      const d=driverOf(s,id),t=teamOf(s,d.teamId); return {
        id,index:i+t.gridPenalties[t.drivers.indexOf(id)]+(pitDrivers.has(id)?999:0)
      };
    }).sort((a,b)=>a.index-b.index).map(x=>x.id);
    for(const t of s.teams)t.gridPenalties=[0,0];
  }
  const initial=w.weatherStart??(chance(s,track.rain)?between(s,.2,.8):0);
  const forecast=Array.from({
    length:Math.ceil(totalLaps/5)+1
  },(_,i)=>({
    lap:i*5+1,rain:chance(s,track.rain)?between(s,.2,.9):0,confidence:clamp(staffAbility(s,s.player.teamId,'strategy'),40,98)
  }));
  s.race={
    kind,sprint,totalLaps,lap:0,running:true,finished:false,control:'GREEN',controlLeft:0,red:false,sequence:0,wetness:initial,rain:initial,forecast,weatherWet:initial>.1,events:[],penalties:[],cars:[],fastest:{
      time:9999,driverId:null
    },fuelPerLap:track.length*.31,positions:[],segments:[],result:null
  };
  const r=s.race;
  for(const [position,id]of grid.entries()) {
    const d=driverOf(s,id),t=teamOf(s,d.teamId),slot=t.drivers.indexOf(id),strategy=w.strategy[id];
    const car={
      driverId:id,name:d.name,teamId:t.id,slot,grid:position+1,position:position+1,time:position*.22+(pitDrivers.has(id)?15:0),lastLap:0,best:9999,lap:0,compound:'M',tyreAge:0,tyreWear:0,tyreTemperature:80,fuel:Math.min(110,totalLaps*r.fuelPerLap*1.04),mode:'normal',engine:'normal',penalty:0,warnings:0,stops:0,retired:false,reason:'',usedDry:[],pitRequest:null,pitLog:[],drs:false,dirty:false,drsBroken:false,driveThrough:false,pitThisLap:false,plan:copy(strategy),planUsed:[],sectors:[]
    };
    let tyre=t.id===s.player.teamId&&!strategy.auto&&!sprint?strategy.start:initial>.65?'W':initial>.2?'I':sprint?'M':strategy.start;
    if(w.tyres[id][tyre]<=0)tyre=Object.keys(COMPOUNDS).find(k=>w.tyres[id][k]>0)||'H';
    useTyre(s,car,tyre);
    r.cars.push(car);
  }
  if(!sprint)for(const t of s.teams)t.pitLaneNext=[false,false];
  event(s,`${sprint?'冲刺赛':'正赛'}开始，${r.cars.length} 台赛车就位`);
  return '绿灯亮起';
}
function raceCommand(s,id,command,value) {
  const r=s.race;
  requireCondition(r&&!r.finished,'当前无进行中的比赛');
  const c=r.cars.find(c=>c.driverId===id&&c.teamId===s.player.teamId);
  requireCondition(c&&!c.retired,'该赛车已退赛或不是本队赛车');
  if(command==='mode') {
    requireCondition(MODES[value],'驾驶指令无效');
    c.mode=value;
  }
  else if(command==='engine') {
    requireCondition(ENGINES[value],'引擎模式无效');
    c.engine=value;
  }
  else if(command==='pit') {
    requireCondition(COMPOUNDS[value]&&s.calendar.weekend.tyres[id][value]>0,'该配方没有新胎可用');
    c.pitRequest=value;
    event(s,`${c.name}：收到进站指令，本圈末换 ${value} 胎`,'radio');
  }
  else if(command==='cancelPit') {
    c.pitRequest=null;
  }
  else throw new Error('指令不存在');
  return '车手已确认指令';
}
function resumeRed(s) {
  requireCondition(s.race?.red,'当前没有红旗');
  s.race.red=false;
  s.race.control='SC';
  s.race.controlLeft=2;
  event(s,'红旗解除，安全车带领重新发车','warning');
  return '比赛恢复';
}
function pit(s,car,track) {
  const target=car.pitRequest;
  if(!target)return;
  car.pitRequest=null;
  const previousCompound=car.compound;
  if(!useTyre(s,car,target)) {
    event(s,`${car.name}：请求配方已用尽，取消进站`,'warning');
    return;
  }
  const ability=staffAbility(s,car.teamId,'mechanics');
  let stop=clamp(4.7-ability*.025+between(s,-.18,.18),2,4.5);
  if(s.staff.some(x=>x.teamId===car.teamId&&x.trait==='pit'))stop=Math.max(2,stop-.15);
  if(chance(s,.006+(100-ability)*.0003)) {
    stop+=between(s,7,14);
    event(s,`${car.name}：螺栓卡住，停站 ${stop.toFixed(1)} 秒`,'warning');
  }
  const loss=track.pitLoss*(s.race.control==='GREEN'?1:.58)+stop;
  car.time+=loss;
  car.stops++;
  car.pitThisLap=true;
  car.pitLog.push({
    lap:s.race.realtime?car.lap:s.race.lap,compound:target,stop,loss,...(s.race.realtime?{at:s.race.time}:{}),from:previousCompound
  });
  event(s,`${car.name} 进站：${target} 胎，停站 ${stop.toFixed(2)} 秒`,'pit');
  if(chance(s,.003)) {
    penalty(s,car,0,'维修区超速，罚穿越维修区');
    car.driveThrough=true;
  }
}
function retire(s,c,reason) {
  if(c.retired)return;
  c.retired=true;
  c.reason=reason;
  event(s,`${c.name} 退赛：${reason}`,'danger');
}
function reliability(s,c,track) {
  const t=teamOf(s,c.teamId),v=performance(s,t,c.slot),engine=ENGINES[c.engine];
  for(const def of PARTS) {
    if(def.id==='mguh'&&s.season.year>=2026)continue;
    const p=s.parts[t.id].cars[c.slot][def.id];
    p.wear=clamp(p.wear+(def.department==='power'?.17:.08)*track.wear*(def.department==='power'?engine.wear:1));
    // 每个部件整站基础故障约 0.5%—4%，按本站圈数摊分。
    const perRace=clamp(.005+Math.max(0,p.wear-30)*.0004+(100-v.reliability)*.00012+Math.max(0,track.temp-30)*.0002+(c.dirty?.002:0),.005,.04);
    if(chance(s,perRace*engine.wear/s.race.totalLaps)) {
      retire(s,c,def.name+' 故障');
      return;
    }
  }
}
function controlEvents(s,track) {
  const r=s.race;
  if(r.controlLeft>0) {
    r.controlLeft--;
    if(r.controlLeft===0) {
      r.control='GREEN';
      event(s,'赛道恢复绿旗，DRS 将重新启用');
    }
  }
  if(r.lap%5===1) {
    const cell=r.forecast[Math.floor((r.lap-1)/5)];
    r.rain=cell?.rain||0;
    if(r.rain>.25&&r.wetness<.2)event(s,'雨带抵达赛道，注意轮胎交叉点','weather');
  }
  r.wetness=clamp(r.wetness+(r.rain-r.wetness)*.35,0,1);
  if(r.wetness>.15)r.weatherWet=true;
  if(r.control==='GREEN'&&chance(s,track.sc/r.totalLaps)) {
    r.control=chance(s,.58)?'SC':'VSC';
    r.controlLeft=3;
    event(s,r.control==='SC'?'安全车出动，维修区保持开放':'虚拟安全车启动','warning');
  }
  if(r.control==='GREEN'&&chance(s,.045/r.totalLaps)) {
    r.control='RED';
    r.red=true;
    event(s,'红旗：赛道需清理，比赛暂停','danger');
  }
}
function tick(s,count=1,untilEvent=false) {
  const r=s.race;
  requireCondition(r&&!r.finished,'当前没有比赛');
  requireCondition(Number.isInteger(count)&&count>0&&count<=1000,'推进圈数无效');
  const track=currentTrack(s),sequence=r.sequence;
  for(let iteration=0; iteration<count&&!r.finished; iteration++) {
    if(r.red)break;
    r.lap++;
    controlEvents(s,track);
    if(r.red) {
      r.lap--;
      break;
    }
    const previous=r.cars.filter(c=>!c.retired).slice().sort((a,b)=>a.time-b.time);
    const previousTimes=Object.fromEntries(previous.map(c=>[c.driverId,c.time]));
    for(const [index,c]of previous.entries()) {
      c.pitThisLap=false;
      const ahead=previous[index-1],oldGap=ahead?previousTimes[c.driverId]-previousTimes[ahead.driverId]:999;
      c.dirty=oldGap<1.5&&r.control==='GREEN';
      c.drs=!!ahead&&oldGap<1&&r.lap>2&&r.wetness<.18&&r.control==='GREEN'&&!c.drsBroken;
      const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
      if(t.id!==s.player.teamId||c.plan.auto)aiRaceDecision(s,c,track);
      else{
        const planned=[c.plan.pitLap,c.plan.secondLap];
        for(let i=0; i<planned.length; i++)if(planned[i]===r.lap&&!c.planUsed.includes(i)) {
          c.pitRequest=c.plan.next;
          c.planUsed.push(i);
        }
        if(r.control!=='GREEN'&&c.plan.backup==='B'&&c.tyreAge>12&&r.totalLaps-r.lap>8)c.pitRequest=r.wetness>.23?c.plan.rain:'H';
        if(c.plan.backup==='C'&&r.wetness>.25&&!['I','W'].includes(c.compound))c.pitRequest=r.wetness>.7?'W':c.plan.rain;
      }
      const oldWear=c.tyreWear,oldFuel=c.fuel;
      let time=lapTime(s,c,track);
      c.tyreAge++;
      if(r.lap===1) {
        time+=(95-d.attributes.starts)*.024+between(s,-.3,.3);
        if(chance(s,.0015)) {
          time+=between(s,3,8);
          event(s,`${c.name} 起步拥挤中发生轻微接触`,'warning');
        }
      }
      if(r.control!=='GREEN') {
        time=track.baseTime*1.38+(time-track.baseTime)*.2;
        c.tyreTemperature-=25;
        c.tyreWear=oldWear+(c.tyreWear-oldWear)*.45;
        c.fuel=oldFuel-(oldFuel-c.fuel)*.65;
      }
      const calm=s.staff.some(x=>x.teamId===t.id&&x.trait==='calm')?.9:1;
      const human=t.id===s.player.teamId?DIFFICULTIES[s.settings.difficulty].mistake:1;
      const error=(100-d.attributes.consistency)*.000045*MODES[c.mode].risk*(1+r.wetness*3)*calm*human*(1.15-d.attributes.experience*.002);
      if(chance(s,error)) {
        time+=between(s,1,5);
        event(s,`${c.name} 锁死轮胎，损失时间`,'warning');
      }
      if(chance(s,.0015*MODES[c.mode].risk*(1.15-staffAbility(s,t.id,'sporting')*.002)))trackLimits(s,c);
      if(chance(s,.015/r.totalLaps)) {
        c.drsBroken=true;
        event(s,`${c.name}：DRS 失效`,'radio');
      }
      if(c.tyreWear>102&&chance(s,(c.tyreWear-100)*.012))retire(s,c,'轮胎爆胎');
      if(c.fuel<=0)retire(s,c,'燃油耗尽');
      reliability(s,c,track);
      if(c.retired)continue;
      if(c.driveThrough) {
        time+=track.pitLoss;
        c.driveThrough=false;
        event(s,`${c.name} 完成穿越维修区罚则`,'penalty');
      }
      c.lastLap=time;
      c.time+=time;
      c.lap=r.lap;
      c.sectors=[time*.32,time*.36,time*.32];
      c.best=Math.min(c.best,time);
      if(time<r.fastest.time&&r.control==='GREEN') {
        r.fastest={
          time,driverId:c.driverId
        };
      }
      pit(s,c,track);
      // 不能仅按自由空气圈速穿过对手：必须通过超车对抗，否则被限制在前车之后。
      if(ahead&&!ahead.retired&&c.time<ahead.time&&!ahead.pitThisLap&&!c.pitThisLap) {
        const rival=driverOf(s,ahead.driverId);
        const overtaking=clamp((1-track.overtake)*.6+(d.attributes.racecraft-rival.attributes.defending)*.006+(c.drs?.2:0)+(c.mode==='attack'?.12:0)-(ahead.mode==='defend'?.1:0),.025,.95);
        if(r.control!=='GREEN'||!chance(s,overtaking)) {
          c.time=ahead.time+between(s,.15,.45);
        }
        else{
          if(chance(s,.003*MODES[c.mode].risk*(1+r.wetness)*(.6+d.attributes.aggression*.008))) {
            retire(s,c,'争夺位置时发生碰撞');
            if(chance(s,.4))retire(s,ahead,'被卷入碰撞');
            if(chance(s,.35))penalty(s,c,10,'造成碰撞');
            if(chance(s,.08))pitLanePenalty(s,c,'危险驾驶');
          }
          else if(c.teamId===s.player.teamId||ahead.teamId===s.player.teamId)event(s,`${c.name} 超过 ${ahead.name}`,'overtake');
        }
      }
    }
    const active=r.cars.filter(c=>!c.retired).sort((a,b)=>a.time-b.time);
    if(r.control==='SC'&&active.length) {
      const lead=active[0].time;
      for(let i=1; i<active.length; i++)active[i].time=lead+Math.max(i*.8,(active[i].time-lead)*.65);
    }
    r.cars.sort((a,b)=>Number(a.retired)-Number(b.retired)||(a.retired?b.lap-a.lap:a.time-b.time));
    r.cars.forEach((c,i)=>c.position=i+1);
    r.positions.push({
      lap:r.lap,positions:r.cars.map(c=>({
        id:c.driverId,position:c.position
      }))
    });
    if(r.lap%10===0)r.segments.push({
      lap:r.lap,leader:r.cars[0].driverId,time:r.cars[0].time
    });
    if(r.lap>=r.totalLaps||!active.length)finishRace(s);
    if(untilEvent&&r.sequence!==sequence)break;
  }
  return r.finished?'比赛结束':r.red?'红旗暂停':`推进至第 ${r.lap} 圈`;
}
function simulateToEnd(s) {
  let guard=0;
  while(s.race&&!s.race.finished&&guard++<10) {
    if(s.race.red)resumeRed(s);
    tick(s,1000);
  }
  requireCondition(s.race.finished,'比赛未能完成');
  return '比赛已模拟完毕';
}
function finishRace(s) {
  const r=s.race,w=s.calendar.weekend,track=currentTrack(s);
  if(r.finished)return;
  for(const c of r.cars) {
    if(!r.sprint&&!(r.realtime?c.usedWet:r.weatherWet)&&!c.retired&&c.usedDry.length<2) {
      c.disqualified=true;
      event(s,`${c.name} 未使用两种干胎，取消本站资格`,'penalty');
    }
    if(!r.sprint&&track.id==='monaco'&&s.season.rules.monacoStops===2&&c.stops<2&&!c.retired) {
      c.disqualified=true;
      event(s,`${c.name} 未满足摩纳哥两停规则，取消资格`,'penalty');
    }
    c.time+=c.penalty;
  }
  r.cars.sort((a,b)=>Number(!!a.disqualified)-Number(!!b.disqualified)||b.lap-a.lap||a.time-b.time);
  const points=r.sprint?SPRINT_POINTS:RACE_POINTS;
  const fullDistance=r.cars[0]?.lap||r.totalLaps;
  const rows=r.cars.map((c,i)=> {
    const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId); const classified=!c.disqualified&&c.lap>=Math.floor(fullDistance*.9)&&c.lap>0; let awarded=classified?(points[i]||0):0; if(!r.sprint&&s.season.rules.fastestLap&&i<10&&classified&&r.fastest.driverId===d.id)awarded++; if(s.finance[t.id].disqualified)awarded=0; const row={
      driverId:d.id,name:d.name,teamId:t.id,position:i+1,time:c.time,lap:c.lap,grid:c.grid,points:awarded,classified,retired:c.retired,disqualified:!!c.disqualified,reason:c.reason,best:c.best,stops:c.stops,penalty:c.penalty,tyres:c.compound,kind:r.kind,round:s.calendar.round+1
    }; d.points+=awarded; t.points+=awarded; d.results.push(copy(row)); t.results.push(copy(row)); d.morale=clamp(d.morale+(awarded>0?3:-1)); d.fatigue=clamp(d.fatigue+(r.sprint?3:8)*(1+(100-d.attributes.fitness)*.01)); if(i===0&&classified&&!r.sprint) {
      d.wins++; t.wins++;
    }
    if(!r.sprint&&r.fastest.driverId===d.id)d.fastest++; return row;
  });
  r.result={
    year:s.season.year,kind:r.kind,round:s.calendar.round+1,track:track.name,rows,fastest:copy(r.fastest),penalties:copy(r.penalties),segments:copy(r.segments),events:copy(r.events)
  };
  r.finished=true;
  r.running=false;
  w.grids[r.kind]=r.cars.map(c=>c.driverId);
  w.index++;
  s.history.races.push(copy(r.result));
  if(!r.sprint) {
    s.calendar.events[s.calendar.round].result=copy(r.result);
    raceIncome(s,r.result);
    const t=teamOf(s),own=rows.filter(x=>x.teamId===t.id),successful=own.some(x=>x.points>0);
    t.confidence=clamp(t.confidence+(successful?3:-1.8)/DIFFICULTIES[s.settings.difficulty].tolerance);
    t.objectives.finish+=own.filter(x=>!x.retired&&!x.disqualified).length;
    t.objectives.points+=own.reduce((a,x)=>a+x.points,0);
    t.objectives.podiums+=own.filter(x=>x.position<=3&&x.classified).length;
    if(t.confidence<=0&&!s.season.gameOver)s.season.gameOver='董事会信心归零，你被解除车队经理职务。';
  }
  news(s,`${track.name}${r.sprint?'冲刺赛':'正赛'}：${rows[0]?.name||'无'} 获胜`);
}

return {event, practice, qualifying, useTyre, startRace, raceCommand, resumeRed, pit, retire, reliability, controlEvents, tick, simulateToEnd, finishRace};
}());

// ===== 文件: js/data/track-layouts.js =====
modules['js/data/track-layouts.js'] = (function () {
// Geographic centre lines, adapted from bacinger/f1-circuits (MIT). See THIRD_PARTY_NOTICES.md.
const TRACK_LAYOUTS = {"australia":[[344.55,524.79],[311.76,492.42],[263.21,442.9],[260.4,440.04],[259.21,436.12],[259.4,434.4],[260.21,432.81],[261.85,428.81],[264.6,423.95],[266.3,417.75],[267.27,410.11],[267.46,404.52],[265.76,393.62],[263.63,388.07],[260.31,382.27],[256.41,377.61],[247.77,369.0],[237.51,359.61],[223.07,345.65],[205.47,326.87],[198.41,319.31],[179.64,295.76],[170.33,283.3],[160.69,268.16],[142.15,235.7],[137.57,226.6],[134.8,219.78],[135.15,215.98],[136.73,213.29],[140.64,211.33],[153.72,209.04],[178.48,203.98],[181.35,202.84],[183.16,201.65],[184.38,199.94],[186.19,194.59],[186.54,188.95],[184.87,140.62],[184.29,122.9],[184.71,121.39],[189.96,115.26],[194.76,111.63],[231.58,85.05],[239.74,80.36],[277.75,64.84],[292.1,59.66],[305.09,51.82],[314.95,45.82],[319.37,45.04],[322.88,45.0],[326.14,46.92],[330.43,51.98],[335.62,56.55],[342.71,61.58],[351.74,64.96],[363.44,66.39],[374.02,66.88],[382.98,68.23],[392.97,71.7],[401.81,75.91],[411.54,83.13],[418.12,89.01],[424.66,97.54],[430.79,108.16],[434.24,118.98],[436.4,127.35],[437.49,134.37],[446.39,182.99],[446.46,189.08],[445.49,196.38],[443.1,203.86],[440.3,210.23],[435.3,217.33],[430.69,222.96],[425.63,229.82],[423.08,234.8],[420.86,240.44],[419.18,246.85],[409.09,300.37],[408.32,306.9],[407.9,314.66],[407.9,321.76],[408.51,334.66],[409.99,344.67],[412.73,356.14],[416.12,367.24],[420.5,376.8],[425.08,385.66],[432.69,397.58],[437.78,405.09],[447.97,415.91],[481.66,445.88],[486.98,450.0],[491.98,452.74],[495.65,454.49],[502.78,456.65],[509.61,457.23],[517.93,456.9],[525.44,456.86],[532.73,456.57],[538.92,456.78],[544.21,458.08],[549.49,460.66],[553.1,462.7],[559.52,468.41],[596.76,500.13],[610.62,511.73],[617.39,519.85],[622.42,525.69],[627.9,534.39],[633.44,547.29],[638.99,563.46],[653.69,614.33],[662.49,646.66],[664.17,655.64],[665.1,660.17],[665.2,662.95],[662.88,664.18],[655.98,666.83],[622.84,680.22],[588.7,693.82],[586.05,694.55],[581.8,695.0],[576.61,694.63],[571.25,692.43],[565.84,688.79],[562.65,685.85],[559.58,681.08],[539.34,643.72],[527.09,623.88],[525.44,621.23],[523.73,619.67],[522.03,619.02],[519.09,618.9],[517.03,620.08],[495.04,644.99],[491.98,648.05],[488.69,649.97],[484.56,651.6],[480.89,652.46],[477.6,652.42],[473.67,651.64],[468.22,649.72],[464.19,646.87],[462.61,645.31],[344.55,524.79]],"bahrain":[[194.83,353.12],[199.92,170.68],[204.73,51.2],[207.0,45.84],[211.76,45.0],[216.9,46.38],[220.74,49.21],[245.4,74.19],[252.11,76.72],[259.46,76.18],[302.35,62.27],[312.63,61.13],[321.93,61.73],[603.28,116.21],[612.9,119.03],[618.04,124.39],[619.28,131.25],[618.31,137.75],[615.12,145.1],[609.06,152.5],[602.03,158.46],[592.4,165.86],[558.49,191.08],[531.24,219.43],[524.53,225.99],[519.12,235.32],[506.95,262.89],[502.79,268.85],[496.35,273.06],[489.97,276.49],[479.75,277.64],[448.97,272.52],[440.64,272.82],[432.04,274.51],[424.96,278.18],[416.36,286.12],[353.89,365.28],[347.84,370.69],[339.18,372.08],[333.77,367.86],[331.83,359.32],[332.15,346.31],[347.19,256.63],[355.84,200.47],[357.14,189.4],[355.52,179.17],[353.3,171.52],[348.81,163.88],[323.17,141.73],[319.66,140.04],[315.82,141.12],[313.6,145.1],[304.3,214.38],[301.76,260.6],[297.27,343.73],[294.08,430.58],[290.83,509.73],[292.13,522.73],[297.27,530.44],[305.27,534.65],[316.47,536.94],[327.99,536.1],[342.37,533.27],[357.14,526.16],[369.58,517.38],[381.75,504.92],[389.16,492.7],[402.89,456.95],[410.57,441.9],[417.93,433.11],[427.56,425.16],[439.08,418.06],[455.08,414.09],[472.66,413.79],[485.16,416.68],[501.81,424.62],[545.68,446.41],[554.65,452.97],[562.33,460.62],[566.17,467.72],[570.93,475.66],[570.93,482.77],[567.09,490.11],[559.41,497.51],[548.87,505.46],[216.57,691.57],[210.52,694.7],[200.89,695.0],[196.72,691.03],[182.01,659.79],[180.72,647.33],[181.04,623.79],[185.2,494.69],[194.83,353.12]],"china":[[247.42,595.41],[198.48,607.69],[189.56,608.51],[178.82,608.51],[169.25,605.45],[162.69,602.67],[154.03,597.13],[147.78,591.52],[142.99,585.15],[139.41,577.65],[136.44,570.1],[136.13,562.07],[136.44,552.87],[137.65,545.91],[139.71,539.24],[143.59,533.4],[148.99,528.38],[160.93,523.13],[171.97,523.13],[180.59,526.43],[184.16,530.33],[186.58,534.52],[186.84,540.36],[185.07,548.68],[181.49,561.19],[180.59,566.5],[182.7,571.81],[187.74,577.36],[196.41,580.66],[205.94,578.72],[211.03,575.41],[214.3,569.86],[217.28,564.26],[220.25,556.76],[222.07,548.44],[222.67,538.94],[221.16,530.92],[216.37,522.01],[213.09,516.46],[203.27,504.48],[177.01,476.39],[156.75,449.96],[140.02,431.9],[119.15,408.24],[112.6,397.09],[109.57,389.06],[88.1,325.92],[81.25,306.98],[75.3,288.33],[75.0,283.61],[77.67,279.72],[83.06,277.47],[92.29,279.19],[101.86,285.56],[109.88,292.23],[117.94,300.84],[129.28,312.53],[139.11,326.98],[156.45,357.31],[179.68,398.21],[187.14,409.6],[194.6,418.51],[202.96,426.59],[212.79,431.9],[223.27,435.8],[234.01,437.98],[246.51,437.98],[257.55,435.8],[268.28,431.9],[279.02,425.17],[289.2,416.85],[297.21,407.41],[305.88,388.76],[319.29,360.38],[324.98,351.77],[330.93,345.92],[338.39,341.5],[349.42,336.72],[359.86,335.89],[368.83,336.72],[376.89,339.79],[384.05,344.51],[389.09,348.7],[393.57,353.71],[415.65,396.55],[421.04,402.4],[427.59,404.34],[433.84,403.22],[439.54,400.98],[461.61,371.77],[464.59,365.93],[464.59,360.68],[462.77,355.37],[408.79,263.61],[375.08,209.08],[338.08,147.89],[333.04,146.24],[327.95,147.59],[323.17,151.78],[317.52,158.16],[312.13,164.83],[307.09,168.19],[300.79,170.14],[294.24,169.02],[287.69,163.17],[279.92,154.56],[276.04,147.59],[273.67,141.22],[272.46,131.72],[273.07,123.11],[274.58,114.79],[277.25,107.0],[284.41,97.56],[291.26,92.24],[300.79,88.05],[310.97,85.87],[319.03,85.05],[328.86,85.58],[341.66,88.64],[350.03,92.24],[358.7,96.97],[370.59,108.12],[381.08,122.87],[494.42,296.42],[565.13,403.22],[601.82,458.87],[634.03,509.2],[676.67,572.87],[722.33,639.67],[725.0,645.51],[724.7,651.06],[720.82,654.95],[714.57,654.42],[701.72,648.29],[694.26,642.98],[685.94,636.9],[598.55,517.52],[594.67,515.34],[587.51,514.75],[477.99,540.65],[247.42,595.41]],"spain":[[552.8,335.27],[484.03,444.47],[446.01,505.69],[406.47,568.14],[365.09,634.65],[350.96,657.1],[346.44,662.15],[342.39,665.71],[338.9,667.31],[332.64,668.11],[326.93,667.74],[322.69,666.64],[318.6,664.42],[304.33,655.32],[299.82,653.29],[291.72,651.5],[285.18,651.5],[275.84,653.53],[270.54,656.86],[230.96,686.45],[225.43,689.22],[219.73,691.31],[212.08,693.89],[204.86,695.0],[198.55,695.0],[191.69,694.63],[184.05,693.65],[176.64,691.25],[167.71,686.82],[163.11,683.43],[158.87,679.74],[155.05,676.3],[144.93,663.01],[139.96,652.73],[136.37,641.29],[135.45,633.23],[134.52,623.63],[134.75,613.48],[136.27,602.71],[140.55,585.61],[145.25,571.83],[150.31,561.0],[155.74,552.45],[224.51,443.06],[228.66,439.18],[234.41,435.8],[245.13,433.15],[251.95,433.95],[257.47,435.62],[263.82,439.18],[271.0,444.97],[275.61,450.2],[281.13,461.27],[283.11,469.64],[283.66,482.62],[283.2,490.37],[281.27,499.11],[277.54,507.66],[270.63,520.89],[220.69,598.96],[219.31,604.25],[219.22,608.87],[220.46,614.4],[222.76,618.22],[225.29,621.42],[229.25,624.19],[234.18,625.91],[238.05,626.59],[244.35,625.35],[247.25,624.19],[322.33,590.22],[332.73,583.76],[343.08,575.83],[353.49,565.98],[360.85,557.06],[390.73,510.18],[393.95,503.17],[395.33,498.31],[394.09,490.62],[390.26,483.73],[384.37,478.25],[370.75,470.19],[363.34,464.16],[359.24,459.55],[355.19,453.64],[352.93,449.64],[334.15,404.85],[312.84,354.4],[311.14,345.73],[311.14,336.87],[312.01,330.04],[313.4,323.46],[317.58,315.83],[320.81,310.66],[327.71,303.09],[334.57,297.74],[573.46,175.18],[581.84,170.45],[586.21,165.77],[588.33,161.28],[588.88,155.87],[587.18,149.84],[584.37,145.04],[580.32,141.1],[574.43,136.61],[564.9,132.43],[559.01,131.01],[550.86,129.9],[543.87,129.6],[536.82,130.03],[529.14,131.99],[518.46,137.16],[511.14,141.41],[500.92,150.39],[490.79,157.65],[483.8,160.79],[472.98,161.59],[466.54,160.17],[458.85,156.24],[452.68,151.07],[448.86,145.04],[445.78,138.27],[444.81,130.83],[444.53,127.32],[446.65,117.48],[450.43,110.46],[456.32,104.74],[513.26,57.86],[518.87,53.12],[525.96,48.94],[532.4,46.66],[541.38,45.25],[550.22,45.0],[558.32,46.66],[564.95,49.49],[578.39,58.04],[593.39,67.7],[606.37,76.68],[614.75,81.55],[643.06,99.51],[649.87,104.31],[654.2,108.86],[658.11,114.15],[661.29,120.24],[663.91,128.36],[665.38,135.93],[665.48,146.82],[663.91,156.6],[656.04,172.17],[552.8,335.27]],"monaco":[[475.21,172.0],[474.13,165.32],[475.63,159.3],[479.5,151.06],[483.15,145.26],[494.52,130.85],[552.32,52.35],[556.34,46.71],[562.3,45.0],[569.54,47.08],[574.58,51.24],[578.23,57.77],[578.98,65.13],[579.15,71.22],[579.74,76.19],[582.74,82.13],[586.23,86.66],[592.72,95.8],[597.12,103.9],[598.84,108.8],[601.04,111.69],[604.53,112.66],[608.55,111.47],[611.56,108.35],[612.47,103.9],[610.48,100.11],[605.39,96.39],[590.31,77.23],[588.16,72.63],[588.11,68.17],[589.29,64.76],[590.9,61.56],[597.98,57.92],[608.93,55.1],[614.88,52.87],[621.0,50.42],[629.48,47.45],[638.71,46.78],[643.59,49.23],[645.42,56.81],[643.7,101.07],[636.88,146.6],[629.8,175.56],[621.91,196.21],[608.39,219.83],[592.83,239.81],[570.29,264.39],[538.04,284.15],[518.83,293.58],[481.81,310.88],[456.91,319.5],[420.15,328.19],[396.49,331.9],[383.93,334.28],[381.78,337.92],[381.62,341.11],[380.87,344.82],[379.26,348.46],[373.95,350.32],[366.44,351.58],[358.12,346.83],[353.56,346.53],[287.34,355.22],[254.45,359.97],[224.18,364.73],[215.81,365.99],[210.23,366.95],[206.2,371.11],[199.87,383.59],[194.51,395.7],[190.21,407.8],[188.34,416.42],[186.35,431.42],[186.19,457.12],[186.46,463.5],[188.34,467.89],[192.09,472.12],[200.41,478.21],[205.99,483.33],[208.4,488.83],[209.37,496.78],[218.82,551.44],[221.23,561.02],[221.98,564.06],[221.77,568.15],[219.35,571.42],[214.04,575.13],[208.73,577.73],[207.49,581.44],[208.51,589.24],[214.58,606.99],[220.1,620.36],[225.74,630.91],[235.4,644.72],[247.52,656.97],[256.43,662.1],[266.41,666.78],[271.4,669.01],[273.92,671.83],[276.82,680.52],[275.43,685.12],[270.92,687.8],[250.9,693.07],[239.74,694.85],[232.39,695.0],[225.84,694.03],[221.71,690.92],[219.19,688.32],[219.08,682.23],[218.12,677.32],[216.19,671.31],[204.92,657.42],[196.65,644.13],[190.21,634.17],[183.4,615.31],[168.32,562.8],[164.19,545.87],[161.29,527.75],[157.53,501.31],[154.58,466.92],[154.58,444.49],[155.55,427.34],[157.43,409.51],[160.75,397.11],[164.51,385.97],[166.34,379.14],[167.25,373.12],[166.82,363.98],[166.66,358.34],[168.48,355.0],[173.15,352.77],[184.53,350.02],[194.67,349.58],[208.57,347.87],[227.94,345.42],[245.11,342.37],[288.79,329.52],[313.2,322.84],[335.58,319.2],[350.93,317.94],[362.89,313.63],[397.5,297.22],[412.69,290.98],[434.85,286.0],[453.37,283.4],[471.02,280.43],[480.95,276.94],[493.02,269.37],[503.48,258.45],[509.39,249.24],[512.02,239.58],[511.59,229.48],[509.87,219.98],[506.11,209.51],[501.12,199.55],[493.29,193.46],[485.78,186.41],[482.13,183.21],[478.75,179.8],[475.21,172.0]],"canada":[[471.31,515.66],[479.3,552.81],[485.24,580.18],[488.55,600.43],[488.99,617.13],[483.84,661.93],[484.79,667.29],[488.39,670.64],[501.68,676.52],[504.32,678.48],[505.59,682.37],[505.11,686.29],[503.24,690.21],[499.64,693.23],[495.1,695.0],[489.15,695.0],[482.6,693.57],[466.95,689.16],[456.3,685.57],[446.16,680.07],[436.46,673.66],[414.07,654.46],[400.78,642.02],[398.27,638.14],[397.66,634.93],[397.82,631.73],[400.15,624.6],[400.94,620.19],[400.46,616.61],[398.9,613.59],[373.4,582.48],[368.88,578.6],[360.27,572.53],[355.11,568.27],[349.48,560.8],[346.34,552.81],[344.15,544.62],[343.38,538.06],[343.54,489.53],[343.54,485.46],[341.82,482.25],[338.68,479.77],[333.2,478.52],[325.86,480.29],[321.63,480.82],[316.48,479.39],[312.09,476.56],[308.97,473.54],[306.14,469.81],[304.43,466.42],[302.07,459.67],[300.04,451.33],[297.71,441.0],[297.4,432.29],[294.41,395.15],[294.73,375.05],[295.2,358.88],[296.6,341.12],[298.48,327.09],[300.36,316.04],[313.49,263.1],[315.68,258.27],[318.83,256.35],[322.11,255.63],[326.94,255.26],[330.69,254.01],[334.31,251.9],[338.23,247.79],[341.19,243.0],[343.85,236.44],[356.83,183.65],[361.98,155.03],[363.7,134.93],[364.49,114.31],[364.34,107.56],[363.54,100.47],[354.0,53.52],[353.69,50.69],[354.0,48.21],[356.2,45.72],[360.42,45.0],[363.09,45.9],[364.97,48.02],[365.58,49.79],[366.69,60.27],[368.25,76.3],[368.88,81.61],[370.92,87.5],[377.79,101.52],[383.89,113.97],[414.71,193.6],[418.3,203.9],[463.97,422.53],[465.84,431.58],[465.39,434.59],[463.36,436.93],[459.74,438.33],[457.41,440.66],[456.46,443.3],[456.62,446.7],[464.92,484.56],[471.31,515.66]],"france":[[415.89,398.63],[491.43,456.23],[529.95,486.01],[532.37,486.84],[534.63,486.67],[536.44,485.69],[537.48,484.19],[537.94,482.24],[538.55,461.99],[539.13,457.73],[540.05,455.43],[541.7,452.95],[544.27,449.8],[547.88,446.7],[552.08,444.39],[556.6,443.07],[561.25,442.75],[566.54,443.07],[571.35,444.71],[575.11,447.01],[578.26,449.98],[584.29,456.58],[590.16,461.99],[596.93,467.09],[604.15,471.2],[611.22,474.35],[618.74,476.48],[626.12,478.12],[634.56,478.78],[643.43,478.78],[650.5,477.8],[657.44,476.13],[664.36,473.82],[671.27,471.03],[677.15,467.75],[680.91,465.44],[684.22,463.8],[687.37,462.83],[690.55,462.65],[693.85,463.31],[697.01,465.13],[699.73,467.57],[701.53,470.05],[702.57,472.53],[703.49,475.5],[704.07,479.58],[704.07,484.71],[703.18,488.49],[701.84,492.12],[699.88,495.89],[698.07,498.54],[683.61,517.46],[678.8,524.2],[674.15,531.6],[669.47,540.33],[667.36,545.42],[666.47,548.53],[666.01,551.5],[666.47,554.47],[667.51,557.12],[669.01,559.74],[671.58,562.88],[674.88,565.67],[679.41,568.78],[684.06,571.08],[688.74,572.41],[692.94,572.9],[697.16,572.72],[701.53,571.75],[705.6,570.28],[709.64,568.46],[712.67,566.47],[715.36,564.34],[717.63,561.73],[720.04,558.76],[722.0,554.95],[723.5,551.85],[724.39,548.39],[724.85,544.93],[725.0,541.79],[724.69,472.85],[724.69,468.06],[724.39,464.47],[723.8,461.15],[722.3,456.58],[720.63,451.79],[718.69,448.16],[716.13,444.39],[712.82,440.59],[709.06,436.64],[704.99,433.36],[701.38,430.88],[697.92,429.07],[694.59,427.6],[667.51,417.06],[635.3,404.88],[604.3,393.35],[567.43,379.71],[534.63,367.21],[530.56,365.39],[526.8,363.26],[499.26,344.34],[494.28,340.88],[491.89,338.23],[484.06,326.22],[481.95,324.27],[478.95,322.45],[475.92,321.96],[473.69,321.96],[471.27,323.12],[469.31,324.58],[458.79,334.46],[456.52,336.1],[453.95,336.59],[451.26,336.1],[421.31,324.93],[326.64,289.53],[288.4,275.04],[174.19,232.42],[147.54,222.4],[144.85,221.07],[142.58,219.26],[141.39,217.62],[140.02,215.66],[138.52,213.18],[137.47,210.7],[131.45,196.39],[129.79,193.6],[128.14,190.46],[125.57,187.18],[123.18,183.54],[120.77,180.93],[116.09,176.63],[111.59,173.04],[107.52,170.56],[102.84,168.57],[98.65,167.42],[95.93,167.1],[92.93,167.59],[89.9,168.57],[87.51,170.07],[85.09,172.2],[83.75,173.84],[82.83,176.0],[75.76,196.88],[75.0,199.67],[75.0,201.0],[75.61,202.82],[76.96,204.14],[79.07,204.77],[83.14,204.63],[97.27,202.33],[101.34,202.33],[105.41,202.82],[108.87,204.28],[111.28,206.27],[113.39,208.58],[114.59,210.7],[115.78,213.5],[116.24,215.8],[116.39,217.79],[116.09,220.41],[114.74,228.47],[114.74,230.46],[115.2,232.59],[116.09,234.58],[117.89,236.22],[120.61,238.53],[136.86,248.23],[150.11,255.63],[162.14,260.73],[172.69,265.16],[178.1,267.99],[183.98,271.1],[190.28,275.39],[198.57,280.98],[209.56,289.85],[218.28,296.27],[223.69,301.72],[231.07,309.43],[234.25,311.73],[238.59,314.21],[254.87,323.26],[259.82,325.25],[263.74,325.56],[267.35,325.07],[270.96,323.78],[274.27,321.61],[276.53,319.31],[278.95,316.03],[281.03,313.41],[283.75,311.25],[286.45,310.27],[289.47,309.78],[293.39,309.78],[297.46,310.09],[301.07,311.25],[303.3,312.75],[319.58,325.25],[341.09,341.86],[365.47,359.81],[388.94,378.06],[415.89,398.63]],"austria":[[508.23,532.39],[463.46,544.28],[352.54,574.48],[344.9,575.05],[339.8,570.44],[331.21,553.81],[304.04,517.09],[274.56,475.18],[251.39,438.18],[230.26,401.69],[195.68,326.3],[186.15,306.21],[171.53,282.54],[149.02,255.0],[111.66,217.48],[77.08,182.9],[75.0,178.28],[75.24,173.37],[79.2,170.95],[88.25,169.33],[116.56,166.04],[144.87,164.95],[174.11,165.24],[201.95,167.95],[234.22,173.14],[332.82,192.19],[377.83,198.14],[475.06,202.24],[482.98,204.95],[487.84,210.38],[489.68,216.38],[489.21,222.68],[486.67,228.62],[476.94,242.53],[469.26,251.77],[455.1,264.3],[439.58,272.73],[420.76,278.96],[400.33,282.25],[379.01,280.87],[296.16,267.53],[285.03,268.92],[275.97,272.15],[268.09,277.63],[261.11,284.97],[256.72,293.68],[254.37,303.21],[253.94,311.92],[255.31,321.45],[257.86,328.49],[298.01,398.69],[304.75,406.08],[315.41,412.83],[327.72,415.61],[339.56,414.51],[352.07,409.31],[359.75,403.08],[367.64,393.26],[375.05,383.74],[382.96,375.6],[392.45,369.08],[403.59,362.5],[419.15,356.78],[435.38,353.26],[563.94,350.55],[662.82,348.12],[673.25,348.35],[683.44,351.93],[691.83,358.17],[698.54,366.59],[703.63,377.74],[723.82,445.8],[725.0,452.03],[723.82,456.65],[721.51,460.23],[713.63,466.47],[703.2,472.7],[689.71,479.51],[674.42,486.04],[656.31,492.04],[508.23,532.39]],"britain":[[436.94,51.15],[507.64,45.0],[520.2,45.76],[529.86,48.96],[536.16,53.13],[543.67,61.86],[548.41,71.8],[552.25,84.32],[557.63,105.56],[563.15,126.42],[566.36,149.48],[567.74,163.97],[569.58,199.12],[570.35,229.13],[571.57,240.85],[576.03,251.8],[584.45,267.1],[587.99,275.83],[587.84,282.4],[586.29,290.11],[574.34,321.72],[573.57,334.45],[575.4,343.55],[579.71,351.31],[591.52,367.79],[594.26,375.37],[594.57,384.31],[592.58,392.44],[585.38,401.38],[576.18,407.95],[563.59,415.28],[553.8,421.06],[546.88,427.8],[538.93,441.12],[523.28,470.49],[437.25,628.83],[409.04,672.75],[401.06,683.49],[394.64,689.23],[387.13,693.02],[379.3,695.0],[372.1,694.41],[364.12,692.6],[357.39,689.65],[351.4,684.89],[346.32,677.3],[344.8,674.35],[337.13,657.66],[328.55,642.74],[319.36,630.43],[313.06,622.89],[306.02,615.14],[293.58,602.41],[265.84,569.24],[263.06,567.47],[259.23,567.05],[255.42,568.86],[243.77,579.4],[239.78,580.79],[235.79,580.37],[232.42,578.98],[227.65,574.42],[222.6,569.24],[216.31,560.9],[211.72,551.96],[208.48,542.81],[205.74,532.49],[205.43,528.32],[206.2,524.14],[208.48,520.18],[214.0,511.42],[298.66,401.0],[317.67,376.55],[321.64,371.96],[328.55,367.41],[336.82,365.43],[343.58,365.22],[352.93,366.02],[378.99,369.98],[387.59,370.99],[396.48,371.37],[406.61,369.98],[415.8,367.62],[424.07,363.03],[478.05,320.12],[481.58,317.76],[485.88,315.57],[490.31,315.15],[493.67,316.37],[496.76,319.15],[498.6,322.31],[507.79,354.51],[510.56,359.06],[514.37,361.84],[518.83,362.06],[523.75,359.86],[526.81,355.9],[528.8,351.73],[532.64,341.19],[535.69,332.26],[538.0,323.49],[539.22,314.98],[539.99,306.0],[539.37,296.69],[537.53,292.52],[532.79,287.16],[357.83,127.44],[353.09,124.44],[346.48,121.07],[338.37,119.89],[329.93,120.86],[321.35,125.03],[318.27,128.83],[316.12,134.39],[312.6,163.38],[310.6,169.33],[306.33,174.13],[299.88,177.29],[292.83,178.3],[285.01,176.28],[279.49,172.53],[276.12,168.15],[273.5,163.01],[273.04,157.44],[274.13,151.46],[278.4,141.72],[300.94,97.05],[308.17,88.49],[315.21,81.33],[325.34,72.6],[333.6,66.83],[344.04,62.45],[353.09,59.5],[372.26,57.1],[436.94,51.15]],"hungary":[[256.06,534.69],[149.01,449.08],[117.36,424.34],[114.51,419.57],[112.82,414.8],[113.3,409.44],[115.43,405.26],[118.53,402.46],[122.59,400.49],[128.54,399.6],[137.35,399.6],[161.88,400.2],[178.29,403.0],[193.29,407.47],[209.01,413.67],[220.91,420.41],[229.92,426.61],[317.3,495.76],[323.7,499.1],[329.89,500.53],[336.08,500.53],[341.11,498.8],[346.58,496.83],[350.84,493.5],[354.42,489.56],[356.79,485.92],[358.92,480.86],[359.65,473.82],[359.41,469.89],[357.52,464.52],[355.87,459.22],[330.85,416.77],[328.24,408.9],[327.76,402.7],[329.21,397.39],[331.1,390.66],[333.47,384.46],[361.09,329.37],[410.11,230.17],[418.92,214.43],[429.17,200.66],[442.0,185.75],[444.62,181.58],[446.55,177.35],[446.99,172.58],[445.58,167.21],[423.22,82.92],[422.74,76.48],[423.42,70.28],[425.11,64.08],[427.73,58.18],[432.47,53.41],[438.18,49.17],[444.13,46.13],[450.09,45.0],[457.48,45.24],[464.6,46.97],[473.21,50.6],[482.94,56.8],[489.86,61.57],[497.94,67.48],[506.5,74.21],[517.24,85.42],[562.92,134.9],[565.05,139.67],[565.78,143.37],[565.54,147.3],[563.16,150.64],[559.34,154.28],[556.25,157.38],[555.08,160.18],[555.32,165.25],[556.49,170.85],[573.14,233.57],[576.72,241.97],[579.33,245.37],[581.94,248.41],[585.52,251.27],[589.82,252.64],[597.91,254.31],[632.41,259.38],[639.57,262.18],[644.07,265.28],[647.89,268.38],[651.23,273.75],[652.4,278.52],[653.84,284.12],[653.84,290.32],[652.64,297.06],[644.07,357.45],[643.83,368.18],[644.55,374.92],[646.44,381.89],[649.1,388.69],[682.88,442.64],[686.22,450.75],[686.94,456.41],[687.18,461.72],[686.46,467.32],[685.25,472.99],[682.88,478.06],[679.06,483.06],[620.99,548.28],[569.36,608.14],[551.74,627.81],[547.44,630.32],[543.42,630.91],[539.6,630.32],[536.26,628.35],[532.92,625.31],[497.7,585.37],[491.99,579.76],[465.08,557.82],[460.34,555.32],[455.59,553.35],[449.84,552.52],[444.86,553.05],[438.18,556.15],[434.16,560.62],[431.31,565.45],[429.62,569.63],[429.17,575.29],[429.86,580.89],[432.23,586.2],[435.33,590.43],[488.41,633.18],[498.18,642.12],[501.03,646.95],[503.17,653.69],[504.13,661.56],[503.41,668.83],[501.03,675.03],[498.18,680.93],[493.68,686.0],[486.28,690.77],[478.68,693.87],[470.35,695.0],[461.55,693.87],[453.66,690.77],[446.31,685.7],[256.06,534.69]],"belgium":[[320.47,113.93],[284.72,51.45],[284.34,48.65],[285.93,46.16],[289.23,45.0],[292.92,46.02],[304.68,51.94],[333.25,65.65],[346.98,74.1],[361.28,84.69],[374.09,95.42],[384.26,106.5],[438.86,171.61],[442.7,175.25],[449.29,179.35],[461.06,186.96],[466.22,192.08],[470.57,199.02],[473.36,205.33],[475.22,212.42],[476.8,225.5],[477.72,230.12],[479.3,234.4],[482.34,240.01],[509.32,283.17],[526.49,310.59],[531.25,320.83],[534.29,328.43],[537.86,340.67],[559.41,415.88],[592.46,530.07],[600.12,557.52],[600.52,561.98],[599.72,566.92],[597.08,570.88],[593.24,574.21],[588.35,576.84],[585.45,579.65],[583.46,582.94],[581.88,587.92],[582.14,592.87],[588.75,622.46],[588.62,627.58],[587.57,632.21],[584.0,637.32],[579.75,640.8],[504.43,692.86],[499.67,694.86],[494.91,695.0],[489.89,693.53],[485.78,690.55],[482.88,686.27],[481.69,681.96],[481.42,677.33],[482.88,673.02],[485.51,668.56],[489.35,665.44],[522.27,645.11],[525.84,641.46],[527.81,637.82],[528.61,633.54],[528.21,628.24],[514.59,588.24],[510.37,571.9],[500.72,521.48],[495.96,492.56],[494.91,487.61],[492.52,482.32],[489.35,478.01],[484.6,473.38],[479.3,469.91],[473.5,467.59],[467.4,466.61],[447.7,465.28],[440.18,466.12],[433.3,468.08],[426.31,471.06],[420.61,474.89],[414.0,480.99],[409.78,487.09],[405.16,495.85],[386.51,542.48],[369.85,583.96],[366.28,590.41],[362.06,594.87],[356.25,598.16],[350.42,599.81],[345.02,599.98],[339.59,598.83],[334.97,596.69],[327.29,591.71],[322.26,589.57],[316.19,588.59],[310.11,589.26],[304.55,591.04],[299.79,594.37],[296.76,598.16],[293.05,603.28],[262.52,651.21],[259.48,654.01],[255.78,656.01],[251.29,656.99],[246.26,656.68],[241.91,654.68],[221.27,639.64],[209.12,630.73],[206.09,626.77],[202.92,621.97],[201.06,617.34],[199.74,611.87],[199.48,606.26],[200.39,599.49],[202.51,593.71],[205.28,586.28],[209.39,575.02],[216.52,562.29],[224.33,551.21],[236.21,537.86],[256.04,518.5],[267.68,509.42],[277.6,503.64],[328.63,477.02],[336.02,472.4],[343.03,466.93],[349.51,460.83],[355.04,454.2],[360.2,447.26],[367.08,434.57],[372.64,422.33],[385.33,394.07],[387.56,387.93],[388.9,381.34],[389.15,373.07],[387.83,365.63],[380.3,346.28],[372.11,324.96],[362.19,298.35],[359.67,288.47],[357.3,276.72],[355.85,265.82],[354.91,256.56],[352.01,213.75],[352.54,210.94],[354.26,208.95],[356.9,208.28],[361.39,208.95],[366.03,208.95],[369.2,208.28],[371.3,205.97],[371.84,203.34],[370.52,199.87],[354.26,173.25],[320.47,113.93]],"italy":[[223.96,457.84],[234.89,329.31],[239.86,275.43],[240.39,273.23],[241.93,271.96],[243.84,271.66],[246.2,271.96],[248.41,272.13],[250.46,271.96],[251.86,270.86],[252.96,269.3],[253.24,267.9],[253.24,266.33],[245.5,236.94],[244.4,228.94],[243.98,221.71],[244.54,213.85],[247.43,175.53],[248.55,169.26],[249.93,163.43],[252.0,157.17],[254.75,150.4],[257.92,143.8],[262.6,136.41],[267.43,130.31],[273.93,123.38],[280.97,117.24],[288.82,111.61],[297.24,106.75],[306.74,102.02],[316.28,98.72],[326.76,95.75],[338.63,93.69],[350.77,92.59],[398.08,88.52],[456.01,85.05],[459.46,84.75],[461.26,83.79],[462.77,82.22],[464.68,75.46],[465.52,73.59],[466.9,72.32],[469.25,71.56],[477.11,70.13],[485.66,68.26],[497.8,64.33],[552.01,46.1],[556.69,45.0],[561.12,45.0],[565.39,45.8],[568.42,47.03],[571.33,48.77],[574.08,50.66],[577.53,54.43],[579.46,57.4],[580.84,61.03],[581.54,65.09],[583.87,90.85],[588.29,134.84],[588.15,138.77],[587.46,141.3],[586.36,143.5],[584.57,145.07],[581.26,147.27],[545.81,166.43],[516.98,182.59],[499.04,192.49],[490.34,197.52],[480.55,204.42],[473.52,209.78],[467.46,215.11],[435.99,242.14],[413.67,262.4],[366.48,303.85],[338.07,328.85],[334.2,332.78],[332.68,335.28],[332.4,337.78],[332.4,340.78],[333.38,347.37],[333.66,350.97],[333.66,356.17],[333.24,359.0],[332.12,362.6],[330.47,366.83],[327.72,371.1],[323.99,375.5],[319.73,379.1],[316.28,381.76],[314.48,383.83],[313.11,386.63],[311.85,391.83],[308.96,415.55],[305.93,440.84],[282.48,667.64],[281.5,675.81],[280.55,679.6],[278.61,683.5],[275.98,686.67],[272.95,689.5],[268.69,692.3],[264.0,694.03],[258.62,695.0],[254.05,694.67],[249.79,693.73],[244.82,691.83],[240.0,689.63],[236.41,687.14],[232.12,683.84],[227.3,678.64],[223.99,673.94],[221.1,668.91],[218.6,662.94],[216.27,656.35],[214.48,649.58],[213.64,643.78],[212.68,634.99],[212.54,626.19],[212.4,617.86],[211.99,601.36],[211.71,586.9],[211.99,571.2],[213.78,550.64],[220.54,485.6],[223.96,457.84]],"singapore":[[710.8,319.68],[723.74,418.5],[725.0,431.29],[723.74,437.61],[720.25,443.12],[704.23,467.59],[701.35,471.58],[698.32,473.04],[694.48,473.5],[685.68,473.04],[645.1,470.82],[582.54,464.15],[574.6,462.08],[569.6,459.04],[565.66,454.75],[562.37,446.15],[561.92,437.66],[562.17,432.61],[560.55,429.98],[551.81,429.37],[542.77,429.17],[496.63,426.54],[366.7,419.61],[350.98,417.74],[339.96,414.76],[328.64,409.15],[282.55,368.66],[262.84,351.83],[259.56,349.2],[254.86,348.44],[249.0,349.5],[244.6,352.43],[241.72,355.26],[233.38,380.64],[228.98,399.65],[217.97,457.17],[195.28,572.93],[194.01,575.36],[192.35,577.48],[189.21,579.75],[185.47,580.61],[180.87,580.51],[178.75,579.65],[173.45,572.93],[168.14,565.4],[164.2,556.86],[159.95,552.66],[139.94,536.64],[129.98,527.44],[123.77,521.42],[119.93,516.01],[116.04,502.82],[116.59,496.65],[117.7,491.95],[120.43,486.49],[119.02,483.05],[113.96,481.33],[104.66,478.15],[96.68,473.04],[86.88,466.17],[79.3,459.5],[76.57,453.89],[75.3,446.0],[75.0,439.08],[82.68,425.98],[113.66,370.53],[153.53,298.9],[160.61,285.96],[167.23,279.85],[169.96,277.62],[179.05,275.8],[187.09,280.76],[197.25,287.83],[239.04,331.66],[242.78,333.58],[245.86,332.82],[248.74,327.36],[265.22,295.11],[287.25,257.81],[291.3,251.79],[295.19,250.38],[302.21,253.51],[306.25,255.88],[423.5,323.72],[442.65,331.05],[455.94,333.53],[621.3,343.28],[627.72,342.02],[636.06,338.13],[642.93,333.28],[647.33,325.24],[648.44,317.61],[647.17,299.46],[642.42,274.79],[628.07,234.96],[624.18,226.47],[621.55,219.44],[620.14,210.85],[620.14,199.83],[622.56,175.31],[626.76,165.65],[632.52,159.84],[637.37,159.39],[641.77,160.55],[646.62,166.16],[649.25,169.6],[651.77,173.09],[656.32,176.93],[666.78,182.08],[675.58,184.51],[686.59,183.45],[692.25,185.72],[695.13,189.77],[696.8,196.24],[701.25,250.63],[710.8,319.68]],"japan":[[630.07,381.83],[670.17,430.1],[717.08,487.58],[721.37,493.66],[723.76,500.0],[725.0,505.71],[724.91,511.31],[724.21,515.62],[718.74,532.53],[716.14,536.96],[712.36,540.31],[709.18,542.12],[703.47,543.52],[698.27,543.33],[692.55,541.41],[687.23,537.21],[681.82,529.03],[654.15,486.55],[648.91,482.09],[644.41,480.65],[637.6,479.47],[623.3,479.36],[616.1,477.3],[611.02,473.73],[607.18,469.05],[605.37,464.48],[598.93,440.01],[596.23,433.75],[591.94,428.37],[586.95,424.72],[580.66,421.77],[574.22,420.55],[557.59,420.3],[549.9,418.82],[544.64,416.32],[539.2,412.12],[535.21,406.26],[532.76,400.29],[531.64,394.65],[531.7,389.27],[532.73,384.7],[540.89,362.37],[542.13,357.84],[542.34,351.87],[541.47,347.93],[539.32,342.22],[536.11,337.35],[529.98,333.01],[522.51,328.95],[513.65,324.49],[505.84,321.36],[500.04,319.74],[491.87,318.38],[482.62,318.23],[475.33,318.52],[469.25,320.15],[464.32,322.25],[456.64,325.52],[448.57,330.06],[439.28,337.65],[432.03,345.35],[401.51,382.34],[399.94,384.48],[395.07,385.62],[350.5,389.64],[347.62,389.27],[344.57,387.21],[343.33,383.71],[342.78,380.76],[336.01,352.9],[326.97,300.58],[325.24,290.96],[324.82,286.1],[325.3,281.09],[326.27,275.89],[328.33,270.51],[330.66,265.17],[337.85,248.66],[338.61,246.12],[338.07,243.8],[336.71,241.66],[334.38,240.08],[331.69,239.23],[329.08,239.41],[326.12,241.4],[323.67,244.94],[313.18,263.07],[304.65,276.74],[299.09,284.85],[294.49,290.19],[290.53,293.58],[283.72,298.96],[276.56,302.79],[269.06,305.04],[255.99,306.95],[243.62,307.47],[234.31,306.77],[223.21,304.34],[211.05,300.91],[197.45,295.83],[188.86,291.85],[181.33,287.31],[174.37,282.12],[167.02,275.52],[159.43,267.12],[154.41,259.79],[149.91,251.76],[138.78,222.13],[132.82,209.16],[129.8,203.96],[125.68,200.13],[120.3,197.7],[113.86,196.48],[106.15,196.67],[99.01,197.7],[92.03,199.25],[85.22,202.05],[79.66,206.29],[76.3,211.67],[75.0,216.94],[75.39,223.57],[76.91,228.51],[79.11,233.48],[82.89,237.64],[90.36,244.64],[99.71,252.42],[108.84,260.42],[120.42,269.18],[133.67,278.21],[147.22,286.69],[162.37,293.91],[175.91,300.84],[189.83,306.14],[212.42,313.95],[237.27,323.65],[267.36,334.18],[297.21,343.62],[317.87,350.77],[344.57,360.97],[350.68,362.52],[356.76,362.7],[363.2,361.49],[369.46,359.76],[380.74,355.41],[391.11,350.21],[399.82,344.83],[408.83,337.83],[425.67,322.06],[448.75,300.54],[455.16,295.24],[459.73,292.03],[463.9,289.27],[466.86,287.5],[468.47,287.35],[470.58,288.24],[475.78,292.88],[479.53,296.01],[482.59,296.89],[485.46,296.34],[488.85,294.09],[494.41,289.05],[500.67,284.55],[507.66,281.6],[516.19,280.87],[524.14,281.31],[532.55,283.04],[540.95,286.32],[548.09,289.75],[557.04,295.83],[565.09,303.31],[573.34,312.52],[630.07,381.83]],"usa":[[205.38,487.93],[264.07,534.71],[280.28,546.06],[292.83,553.54],[297.48,555.75],[299.29,556.3],[301.31,555.95],[303.12,554.84],[304.36,552.98],[304.97,551.28],[304.77,549.22],[292.01,512.53],[286.33,495.56],[285.34,490.34],[285.13,485.87],[285.34,480.65],[286.33,475.79],[288.14,469.66],[290.98,464.44],[294.03,459.77],[298.27,454.91],[302.92,451.54],[309.21,447.63],[343.41,426.39],[357.4,417.61],[360.41,414.65],[363.05,411.09],[365.27,408.12],[367.12,404.01],[368.52,400.49],[372.18,390.25],[374.61,386.89],[377.65,382.97],[381.69,380.36],[384.93,378.66],[393.01,375.5],[399.3,372.33],[402.92,369.53],[405.18,366.76],[407.2,363.0],[407.99,358.53],[409.22,350.9],[409.83,346.03],[411.03,340.66],[412.67,336.74],[414.69,332.98],[417.32,329.27],[420.16,325.91],[424.4,322.19],[429.26,318.63],[434.53,315.66],[440.17,313.25],[445.06,312.1],[449.1,311.95],[452.35,312.1],[457.61,313.61],[491.2,329.07],[494.45,330.37],[497.87,330.37],[500.5,329.27],[507.2,325.15],[515.07,318.83],[520.75,313.05],[526.43,305.42],[530.67,300.4],[534.53,297.39],[538.77,295.53],[542.02,294.78],[546.67,294.78],[551.94,296.29],[555.98,298.5],[559.23,301.7],[561.04,303.92],[562.85,306.73],[564.49,309.89],[566.92,312.5],[569.76,313.61],[572.56,313.61],[633.1,300.2],[636.97,298.9],[639.39,297.59],[641.21,295.89],[676.64,252.86],[707.8,215.18],[719.73,199.91],[724.62,190.97],[725.0,188.72],[724.42,186.66],[722.98,185.56],[721.17,184.25],[719.15,183.7],[716.93,183.85],[713.88,184.61],[649.11,205.33],[603.96,217.98],[554.16,230.08],[494.65,242.03],[457.41,248.2],[422.97,253.22],[321.56,264.41],[310.24,266.47],[308.8,267.38],[308.19,269.24],[308.39,270.74],[309.83,272.79],[316.5,280.23],[339.58,311.95],[349.71,328.36],[350.32,330.77],[349.71,334.29],[348.27,336.74],[345.64,338.6],[343.41,339.15],[339.17,339.71],[320.36,338.2],[318.51,337.3],[316.91,335.79],[315.3,333.93],[313.86,331.32],[310.03,320.88],[308.39,316.77],[305.76,313.05],[293.41,300.4],[291.6,298.9],[289.38,297.95],[287.15,297.59],[275.01,296.48],[272.58,296.64],[271.15,297.59],[269.74,299.25],[269.13,301.51],[269.95,304.12],[293.41,344.57],[302.92,362.45],[303.74,367.31],[303.53,372.14],[302.75,376.05],[301.72,379.97],[299.09,387.24],[295.43,395.27],[293.0,398.43],[288.96,401.4],[284.31,403.65],[265.09,412.39],[261.23,413.34],[257.4,413.54],[250.32,412.99],[243.61,412.04],[237.15,409.98],[230.07,407.17],[223.78,403.46],[219.54,400.29],[216.7,395.47],[194.64,364.5],[177.43,342.87],[175.21,340.66],[172.58,339.51],[169.12,338.8],[166.08,338.96],[161.84,340.1],[156.78,341.76],[152.53,343.42],[81.46,374.59],[77.43,377.36],[75.82,379.97],[75.0,382.77],[75.82,384.83],[77.43,386.69],[79.45,388.55],[116.69,418.56],[205.38,487.93]],"mexico":[[193.71,144.6],[354.99,166.99],[407.3,173.85],[462.4,178.81],[488.96,182.12],[557.48,191.79],[676.89,209.53],[701.51,214.49],[705.72,216.14],[707.94,218.04],[709.07,221.1],[709.36,223.91],[704.87,253.47],[705.44,256.07],[706.85,258.43],[719.42,265.24],[723.06,267.14],[725.0,270.2],[725.0,273.05],[722.5,291.49],[718.57,308.03],[712.43,324.06],[705.44,338.49],[650.62,431.52],[584.89,534.73],[580.68,541.8],[580.11,546.05],[580.97,549.61],[582.95,552.22],[602.51,564.24],[604.45,566.15],[604.73,569.2],[603.36,571.81],[600.01,574.86],[563.34,602.52],[559.7,604.17],[556.63,604.62],[553.84,603.67],[547.13,599.41],[546.0,596.61],[546.0,590.95],[562.77,460.08],[562.54,456.07],[560.83,452.32],[558.33,449.21],[554.41,446.4],[534.84,434.33],[527.85,427.97],[523.64,423.71],[519.44,415.69],[514.95,403.87],[510.51,396.8],[505.45,391.84],[499.87,388.29],[492.31,384.98],[431.87,375.76],[425.16,373.66],[421.01,370.1],[419.02,367.75],[417.37,364.44],[409.52,340.14],[407.02,335.38],[403.1,330.92],[393.31,325.01],[348.56,300.91],[335.66,295.5],[316.95,290.99],[167.01,269.25],[163.93,268.09],[162.28,266.19],[160.86,263.13],[160.58,259.13],[158.08,220.6],[155.0,193.95],[153.87,190.89],[151.65,188.73],[148.58,187.33],[144.65,187.78],[140.45,191.59],[135.11,199.61],[132.04,201.96],[128.4,203.36],[124.24,203.16],[119.47,201.01],[113.89,198.4],[108.55,196.75],[83.13,193.95],[78.92,192.54],[76.94,190.89],[75.28,187.78],[75.0,184.73],[76.65,177.41],[80.29,167.74],[85.07,159.68],[92.06,150.01],[100.19,143.39],[110.54,138.18],[120.03,135.63],[129.25,135.38],[142.67,137.03],[193.71,144.6]],"brazil":[[234.54,511.57],[270.91,652.31],[274.76,667.14],[278.61,675.69],[287.32,688.66],[291.81,692.31],[298.25,694.93],[304.62,695.0],[311.63,693.55],[315.3,691.62],[326.66,681.14],[337.71,668.86],[342.07,665.62],[347.75,663.62],[353.5,663.28],[361.83,665.97],[379.51,676.8],[393.53,682.59],[403.95,685.28],[413.48,686.52],[422.19,687.0],[435.01,685.48],[444.8,683.35],[456.86,679.0],[468.16,672.45],[479.34,663.69],[488.37,654.18],[495.5,644.04],[500.81,634.52],[505.23,623.84],[522.53,566.67],[529.85,537.98],[542.35,489.3],[557.63,427.1],[584.47,325.18],[594.13,288.42],[600.95,262.63],[604.11,250.63],[605.31,243.05],[604.55,235.95],[602.78,231.12],[598.93,225.39],[591.98,220.57],[583.9,217.19],[572.22,214.78],[537.3,207.88],[523.66,206.36],[515.2,206.98],[504.85,208.43],[495.06,211.33],[486.41,216.43],[478.2,221.26],[469.99,228.02],[462.1,236.77],[451.3,250.5],[415.82,298.42],[394.98,327.94],[377.24,353.17],[357.79,378.69],[347.56,392.89],[339.67,403.58],[334.17,409.65],[328.05,413.44],[319.34,416.55],[309.74,417.79],[295.34,417.44],[285.74,415.86],[278.1,413.44],[271.29,410.34],[259.6,404.0],[253.79,398.82],[249.94,393.72],[246.22,386.34],[243.38,376.34],[239.84,361.59],[236.94,348.07],[233.02,323.25],[232.26,312.97],[232.45,302.56],[234.92,294.63],[238.89,290.63],[241.67,289.18],[245.14,288.01],[249.88,287.46],[254.87,288.7],[260.11,290.77],[274.25,301.52],[279.94,304.9],[284.36,306.77],[289.09,307.73],[293.45,308.08],[298.25,307.45],[304.81,305.04],[312.58,298.63],[316.94,292.15],[319.27,285.04],[319.65,278.98],[318.7,271.94],[316.05,266.42],[309.99,257.53],[304.5,252.01],[285.11,233.05],[275.14,221.6],[268.25,211.4],[263.27,197.74],[259.41,180.78],[257.65,170.5],[256.7,161.26],[257.33,153.68],[260.3,148.51],[262.76,145.4],[266.74,144.09],[270.02,143.27],[274.25,143.96],[279.18,145.95],[302.86,172.92],[323.31,195.54],[326.85,198.43],[334.49,203.74],[341.5,206.84],[347.31,208.57],[354.44,209.74],[361.07,210.5],[368.71,210.57],[380.71,208.84],[389.87,205.88],[399.59,200.29],[409.44,192.29],[414.93,185.05],[420.81,176.92],[436.53,152.16],[453.89,123.06],[473.53,91.27],[474.79,87.55],[475.11,83.13],[473.91,78.79],[471.63,74.1],[467.28,70.03],[456.99,64.65],[442.02,59.21],[411.65,47.76],[405.71,46.17],[398.14,45.0],[382.86,46.65],[369.47,48.93],[340.17,55.21],[330.45,58.52],[311.13,66.58],[301.59,70.79],[278.86,83.06],[269.83,89.2],[262.13,96.1],[254.3,103.34],[247.92,110.86],[242.24,119.68],[237.06,130.92],[232.89,142.92],[226.33,167.4],[219.19,198.23],[214.46,227.26],[206.31,258.22],[201.07,281.53],[196.52,297.66],[195.01,309.39],[194.69,325.32],[195.58,344.21],[197.66,358.35],[201.2,374.83],[207.32,398.55],[225.19,473.71],[234.54,511.57]],"abudhabi":[[396.22,409.15],[486.62,396.9],[491.4,395.3],[494.99,391.57],[497.47,386.41],[497.93,381.29],[496.59,375.92],[482.12,314.4],[479.63,307.69],[476.23,302.73],[470.58,297.99],[465.85,295.64],[440.22,287.67],[431.7,283.35],[425.36,279.03],[419.63,273.61],[415.32,268.53],[412.11,264.3],[408.21,254.98],[406.8,247.89],[406.68,240.17],[408.25,231.02],[411.15,221.41],[417.53,196.95],[419.78,178.82],[420.01,165.94],[418.87,154.77],[411.8,97.37],[407.1,61.2],[406.19,57.0],[405.31,53.6],[402.6,50.12],[397.98,46.3],[395.19,45.34],[391.98,45.0],[388.92,45.5],[385.64,46.8],[383.19,49.28],[381.71,51.59],[379.83,55.45],[374.22,72.15],[368.87,96.32],[323.65,231.15],[306.01,283.35],[296.23,312.47],[288.89,335.05],[281.26,363.08],[265.1,414.69],[249.71,461.18],[247.91,465.72],[247.45,469.12],[247.91,471.09],[249.63,473.06],[253.53,473.19],[267.93,471.47],[271.1,471.47],[273.66,474.53],[281.83,505.58],[283.51,511.41],[288.67,524.3],[293.36,533.53],[303.48,548.26],[315.02,561.68],[329.53,574.15],[391.06,622.7],[405.08,634.07],[416.12,641.96],[430.86,651.48],[443.5,658.79],[463.94,668.65],[482.61,677.04],[510.38,690.17],[522.26,694.96],[528.94,695.0],[536.01,693.57],[542.46,689.84],[545.9,686.52],[548.19,683.25],[550.48,678.42],[551.78,673.72],[552.55,669.36],[551.93,662.14],[550.48,656.9],[548.42,651.82],[545.4,647.29],[541.13,643.18],[535.82,639.61],[530.2,637.13],[522.03,635.96],[457.25,630.76],[449.27,629.71],[445.83,628.95],[442.2,627.65],[407.41,605.91],[403.9,603.27],[401.53,600.25],[399.01,593.79],[390.91,555.89],[391.44,552.91],[393.32,550.9],[396.14,550.1],[425.02,545.78],[428.42,544.35],[430.59,543.22],[432.88,540.87],[435.18,536.55],[435.71,531.22],[435.79,504.99],[433.69,500.5],[431.09,497.82],[427.16,496.31],[421.77,495.13],[417.07,494.5],[410.81,494.29],[404.62,494.75],[344.35,504.03],[339.16,504.41],[332.55,504.15],[326.1,503.02],[321.66,501.55],[318.72,498.87],[315.67,495.59],[299.13,465.55],[290.58,451.74],[288.78,447.67],[287.52,442.26],[287.1,437.64],[287.02,432.1],[287.94,428.33],[290.16,425.6],[292.91,424.22],[299.21,423.08],[396.22,409.15]],"imola":[[487.35,241.28],[475.83,241.12],[403.92,225.67],[378.26,222.96],[363.3,222.8],[288.27,229.52],[251.42,238.25],[246.84,241.28],[244.65,243.99],[244.0,246.5],[241.3,258.26],[239.31,261.99],[234.72,265.17],[200.82,282.43],[195.76,288.09],[141.06,423.69],[140.41,427.31],[140.5,431.71],[146.29,452.78],[146.29,456.12],[144.4,460.2],[142.3,463.0],[77.53,518.41],[75.67,521.6],[75.0,525.37],[75.82,529.42],[78.2,534.25],[81.3,536.89],[84.81,537.95],[90.21,537.87],[194.64,524.31],[206.53,523.49],[224.1,524.47],[236.83,526.32],[254.18,529.62],[271.97,532.88],[281.19,534.69],[287.01,533.51],[291.42,531.31],[297.13,525.76],[302.86,515.39],[311.66,493.42],[313.71,483.79],[314.36,472.86],[312.65,461.74],[299.91,401.44],[300.08,397.67],[301.88,393.35],[309.3,381.67],[319.0,366.58],[321.84,365.13],[325.61,364.73],[328.22,365.87],[342.58,371.65],[347.0,372.24],[497.59,371.26],[499.53,372.08],[501.41,376.56],[502.81,380.49],[504.44,381.48],[507.62,381.56],[567.75,356.79],[575.34,352.55],[600.39,335.25],[614.72,322.21],[628.61,308.25],[662.51,275.0],[669.37,270.13],[676.82,266.47],[721.18,246.78],[724.52,243.52],[725.0,238.37],[724.1,234.28],[710.72,205.98],[707.6,203.31],[704.17,202.25],[699.36,202.05],[695.51,203.03],[635.89,225.67],[614.72,233.85],[603.2,238.01],[593.16,240.29],[586.39,241.51],[487.35,241.28]],"netherlands":[[154.39,346.12],[227.25,170.0],[254.94,105.36],[261.21,98.22],[269.7,94.21],[278.96,93.02],[287.54,94.8],[295.62,100.3],[301.24,107.22],[304.24,115.85],[304.47,125.44],[296.43,144.11],[273.33,200.34],[265.88,226.52],[262.89,253.82],[264.48,279.41],[262.07,289.82],[256.4,296.81],[245.05,306.03],[232.84,310.87],[199.11,324.03],[190.44,330.58],[188.08,340.25],[187.76,348.95],[191.25,357.8],[197.79,364.12],[205.96,367.47],[218.49,367.17],[280.27,347.46],[308.96,342.11],[333.7,341.29],[355.58,342.93],[376.28,346.42],[391.03,350.96],[415.18,356.09],[437.47,358.03],[453.27,354.75],[472.29,349.77],[495.17,338.24],[522.04,320.69],[540.25,312.06],[556.45,307.37],[577.83,304.99],[594.67,305.37],[664.9,309.68],[681.1,313.4],[696.13,320.91],[706.8,330.06],[713.65,339.8],[720.32,350.96],[723.87,363.83],[725.0,377.44],[723.73,390.75],[719.83,404.29],[711.38,419.02],[679.11,463.05],[667.21,482.61],[640.25,540.85],[627.31,545.38],[611.33,547.24],[596.03,546.5],[578.01,543.45],[559.31,537.05],[539.29,527.46],[519.45,513.33],[507.2,499.72],[504.97,491.39],[506.93,482.61],[514.55,471.6],[525.45,464.61],[541.47,458.73],[568.84,454.42],[595.22,447.8],[619.28,438.58],[632.58,429.21],[637.62,417.97],[638.3,405.7],[633.98,393.5],[622.86,382.42],[612.88,378.93],[560.99,372.6],[508.74,372.75],[453.22,379.45],[406.29,391.27],[377.23,400.42],[345.19,412.32],[314.55,425.34],[289.58,440.14],[280.41,444.08],[273.87,442.82],[267.74,434.34],[261.21,421.99],[252.22,416.41],[240.69,415.97],[229.43,421.25],[223.44,429.35],[220.67,438.06],[223.44,455.76],[248.59,602.58],[249.13,612.4],[246.36,622.44],[241.91,630.92],[237.6,636.35],[226.93,643.56],[215.54,646.17],[167.24,646.98],[157.39,646.46],[143.05,644.23],[128.2,639.4],[115.99,633.82],[99.74,621.03],[89.16,606.89],[81.95,594.77],[76.68,578.41],[75.0,564.05],[76.5,540.62],[80.95,523.96],[150.63,354.9],[154.39,346.12]],"saudi":[[433.46,545.5],[400.24,448.41],[398.34,446.76],[396.71,446.55],[389.12,449.02],[387.07,448.52],[385.24,447.6],[383.82,445.68],[383.04,443.0],[384.38,435.49],[389.97,418.03],[390.56,415.49],[390.68,410.45],[388.48,396.64],[381.04,353.05],[380.4,344.2],[378.84,341.29],[371.13,338.24],[367.49,335.96],[364.64,333.49],[360.76,327.32],[358.68,321.15],[358.34,313.64],[359.39,307.81],[361.03,304.43],[366.35,296.34],[368.27,291.93],[369.18,287.34],[368.62,280.33],[365.86,268.48],[362.51,263.23],[360.39,261.45],[355.29,257.9],[352.73,255.99],[350.82,253.86],[349.41,248.48],[349.82,225.71],[350.6,220.75],[355.51,214.45],[359.39,211.75],[368.54,208.49],[371.18,207.07],[374.35,201.98],[376.06,191.9],[377.62,183.89],[381.16,172.47],[383.8,165.38],[385.7,153.62],[386.33,145.66],[385.99,136.71],[384.8,101.4],[382.11,55.76],[381.06,52.82],[378.43,49.12],[375.06,46.81],[369.88,45.0],[364.69,45.81],[361.25,47.6],[357.73,49.99],[354.83,55.48],[353.39,63.01],[353.73,69.78],[355.07,75.25],[362.86,88.87],[367.03,95.3],[370.49,104.68],[371.84,110.59],[372.81,118.86],[372.54,125.26],[371.76,132.72],[369.18,140.54],[366.17,147.19],[362.07,155.14],[358.73,162.78],[357.27,171.16],[357.36,176.88],[357.36,181.29],[355.78,184.63],[353.39,187.49],[349.63,189.61],[341.53,192.0],[335.82,196.83],[333.15,201.19],[332.18,204.89],[330.86,212.27],[330.52,220.7],[330.52,226.42],[331.06,232.83],[332.08,239.66],[334.91,248.19],[342.23,263.92],[347.19,275.97],[349.77,286.21],[350.9,295.34],[350.53,304.14],[350.02,309.52],[350.12,321.07],[350.78,324.36],[351.53,329.66],[354.66,339.16],[357.46,345.18],[361.27,351.61],[367.47,361.48],[371.64,368.96],[374.79,376.92],[378.08,388.92],[379.13,397.79],[379.65,407.77],[379.38,416.9],[378.33,425.23],[376.38,436.33],[375.18,440.19],[374.08,443.71],[374.33,446.89],[375.23,450.12],[377.65,453.66],[380.26,456.0],[386.43,461.04],[389.48,464.79],[392.31,469.97],[396.44,488.98],[396.49,493.89],[394.63,499.56],[390.63,507.07],[377.43,532.87],[374.23,540.83],[371.67,550.05],[370.71,556.56],[370.32,562.44],[371.47,575.91],[374.91,589.3],[377.16,597.46],[379.43,605.31],[382.38,615.05],[386.92,625.4],[393.58,637.63],[398.29,644.33],[404.2,652.05],[412.47,661.58],[423.18,671.11],[433.24,677.88],[454.28,692.58],[460.08,695.0],[463.94,693.92],[467.33,691.77],[469.48,688.04],[469.29,684.1],[463.77,659.5],[453.2,608.67],[447.71,589.19],[442.61,573.1],[433.46,545.5]],"miami":[[395.78,312.89],[484.59,368.34],[486.1,372.43],[485.45,376.23],[482.81,381.29],[463.9,395.34],[458.01,401.7],[456.07,413.15],[458.01,425.28],[456.15,440.25],[451.61,449.83],[434.47,463.55],[414.95,470.29],[402.27,473.13],[383.58,473.56],[368.9,470.91],[351.72,463.21],[264.56,410.94],[252.05,403.38],[245.65,402.27],[238.29,401.7],[230.93,402.66],[221.58,405.6],[213.71,410.02],[205.66,416.52],[197.26,422.11],[186.27,423.93],[176.36,423.02],[165.71,417.87],[155.71,408.92],[146.63,399.92],[136.41,394.86],[125.9,392.74],[113.21,394.96],[101.57,398.62],[91.79,403.24],[84.56,409.93],[77.68,420.71],[75.0,432.17],[75.3,441.74],[77.42,448.19],[80.93,452.62],[88.07,456.52],[96.68,456.52],[107.33,454.16],[119.23,454.21],[143.77,459.41],[188.69,468.51],[235.13,467.16],[306.02,464.22],[325.63,470.43],[349.86,479.1],[369.38,485.98],[395.61,494.31],[422.87,498.88],[450.27,499.22],[479.05,494.5],[505.32,485.26],[565.35,463.36],[600.18,450.07],[616.98,442.61],[659.91,419.8],[683.02,405.02],[687.65,398.76],[686.14,393.56],[681.94,389.52],[671.33,383.12],[663.93,377.58],[659.91,369.49],[659.04,361.07],[661.42,350.82],[667.14,345.09],[673.84,342.39],[693.71,343.6],[703.62,342.25],[707.99,339.41],[714.66,332.91],[725.0,314.43],[724.31,310.39],[719.29,308.36],[714.74,304.99],[714.57,298.11],[722.79,271.59],[722.14,267.06],[718.42,264.03],[697.73,262.15],[398.98,251.57],[160.78,240.78],[153.81,242.61],[152.34,248.1],[154.72,254.93],[162.99,262.25],[175.84,272.02],[189.64,279.44],[200.9,282.28],[210.81,281.46],[222.93,277.08],[251.19,263.79],[267.03,259.56],[286.5,257.87],[305.72,260.57],[323.85,268.12],[395.78,312.89]],"qatar":[[221.33,438.43],[153.21,313.71],[126.48,265.3],[124.71,256.25],[125.86,246.85],[129.26,239.56],[134.61,234.22],[142.82,229.38],[152.23,227.91],[161.11,229.53],[229.11,270.79],[235.6,272.6],[244.17,272.89],[254.03,270.0],[261.98,262.56],[266.53,254.44],[267.63,246.22],[266.09,186.94],[267.06,178.87],[269.49,171.92],[272.76,165.26],[277.44,159.78],[374.42,52.29],[379.77,47.94],[388.03,45.64],[395.98,45.0],[404.06,47.1],[410.38,50.82],[439.19,78.33],[442.41,84.16],[443.87,92.13],[443.56,99.09],[441.62,105.89],[437.42,112.01],[374.42,181.22],[371.68,186.26],[371.5,191.74],[372.96,196.59],[376.05,200.16],[380.6,203.05],[386.88,203.88],[391.25,202.61],[396.95,200.01],[507.01,155.96],[514.21,155.18],[523.09,156.45],[530.55,159.83],[536.39,165.7],[539.96,173.14],[541.38,180.48],[541.25,186.94],[539.13,193.11],[534.62,200.26],[530.86,203.78],[522.29,210.78],[512.75,221.74],[504.8,232.76],[498.17,244.5],[492.82,258.26],[489.78,267.65],[486.51,284.15],[483.77,291.2],[479.08,297.17],[474.05,300.94],[467.29,303.97],[404.73,319.19],[399.25,322.42],[395.05,326.14],[392.62,332.31],[391.65,338.28],[392.75,347.29],[399.56,356.2],[411.22,367.99],[429.2,381.7],[447.98,392.37],[467.07,399.17],[486.15,403.23],[504.8,404.85],[525.16,402.89],[618.65,392.52],[627.22,394.33],[637.12,399.02],[644.72,404.85],[651.83,414.54],[673.52,454.87],[675.29,461.82],[675.29,468.14],[674.32,474.74],[669.81,483.16],[636.15,537.49],[631.9,541.55],[625.63,544.44],[619.14,546.4],[610.39,546.06],[502.9,524.37],[495.25,524.37],[487.65,526.63],[481.2,531.03],[476.65,536.66],[401.81,682.23],[395.8,689.18],[389.0,693.38],[379.15,695.0],[371.68,694.17],[364.39,691.08],[356.97,684.62],[221.33,438.43]],"azerbaijan":[[672.97,252.43],[720.55,232.04],[723.07,230.03],[724.68,227.08],[725.0,224.23],[724.2,220.11],[711.71,193.25],[698.18,163.4],[684.71,132.73],[682.48,131.26],[679.64,130.76],[634.13,148.98],[578.45,170.53],[502.5,204.68],[437.02,234.67],[431.4,237.87],[430.27,244.76],[454.6,304.23],[454.36,308.16],[437.75,315.76],[404.9,329.79],[382.59,343.22],[369.91,351.24],[364.45,357.96],[364.58,365.06],[367.88,373.53],[366.75,377.47],[362.55,381.66],[319.84,414.18],[289.86,437.25],[277.27,446.53],[273.09,449.8],[269.15,449.94],[265.91,446.01],[249.54,399.1],[246.94,391.75],[244.21,390.73],[240.14,392.1],[234.83,389.15],[230.52,387.11],[222.54,387.56],[217.74,386.93],[215.41,385.03],[214.21,380.29],[211.2,370.97],[208.04,366.4],[203.44,366.85],[184.55,373.64],[167.56,380.53],[129.92,398.25],[102.3,414.89],[95.44,420.09],[91.4,428.07],[84.06,453.04],[75.4,483.39],[75.0,489.12],[78.7,551.88],[78.32,557.83],[79.85,560.99],[143.34,594.36],[154.49,599.6],[166.89,605.79],[175.39,609.24],[179.83,608.22],[183.93,601.99],[192.24,586.8],[201.13,570.03],[209.49,554.06],[211.77,551.01],[257.77,509.13],[264.36,503.01],[268.3,493.76],[273.36,462.29],[275.02,455.43],[278.69,450.09],[286.54,444.25],[349.28,395.76],[360.8,387.39],[367.8,383.45],[388.32,373.96],[432.79,355.04],[475.63,336.26],[517.96,318.19],[550.73,304.12],[624.61,272.65],[672.97,252.43]],"vegas":[[562.25,622.07],[580.52,601.52],[584.4,597.2],[587.17,592.51],[588.1,586.94],[585.74,581.92],[581.9,578.71],[574.98,576.09],[568.39,575.02],[562.04,575.39],[556.11,577.16],[543.11,584.98],[531.09,596.9],[526.47,599.97],[516.36,602.22],[510.91,602.11],[501.04,598.78],[495.58,595.76],[490.52,591.44],[482.11,580.07],[478.71,570.44],[476.38,285.08],[478.14,280.76],[481.57,278.58],[540.42,279.69],[558.07,279.58],[567.29,277.44],[571.01,274.23],[581.42,264.08],[586.1,257.47],[589.68,250.35],[592.27,244.11],[593.82,235.99],[594.89,226.32],[594.6,220.64],[591.38,218.61],[582.85,217.65],[579.87,215.77],[577.3,211.82],[576.29,205.65],[576.77,201.15],[585.03,186.87],[586.46,183.07],[589.91,176.5],[588.66,169.6],[581.95,165.17],[569.49,163.77],[476.17,161.4],[441.71,156.38],[430.32,150.89],[417.74,137.93],[406.95,116.34],[390.43,77.51],[379.82,66.33],[368.81,58.77],[357.63,54.63],[340.13,48.99],[320.28,45.0],[317.56,45.66],[314.97,47.66],[312.94,54.45],[310.89,59.1],[290.28,99.36],[277.46,123.32],[270.79,135.46],[263.93,147.16],[252.09,167.71],[239.93,195.36],[233.49,216.25],[226.42,240.27],[221.68,257.47],[218.13,274.6],[215.3,291.94],[212.29,317.37],[211.55,332.21],[210.77,349.89],[211.1,397.75],[211.28,425.1],[211.37,445.84],[207.4,554.24],[206.21,609.86],[206.18,637.61],[205.11,671.05],[206.98,673.74],[209.55,674.63],[215.69,674.52],[220.22,676.25],[230.42,686.47],[239.33,691.57],[251.2,693.89],[302.87,695.0],[370.45,694.19],[426.06,694.52],[453.22,694.15],[475.46,691.05],[498.71,686.62],[504.77,683.85],[509.66,680.79],[513.56,677.1],[562.25,622.07]]};

return {TRACK_LAYOUTS};
}());

// ===== 文件: js/core/trackGeometry.js =====
modules['js/core/trackGeometry.js'] = (function () {
const { TRACK_LAYOUTS } = modules['js/data/track-layouts.js'];
const cache=new Map();
const SECTOR_ENDS=[.32,.68,1];
function geometry(id){
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
function trackPoint(id,progress){
  const g=geometry(id),p=((progress%1)+1)%1;let low=0,high=g.fractions.length-1;
  while(high-low>1){const mid=(low+high)>>1;if(g.fractions[mid]<=p)low=mid;else high=mid;}
  const f=(p-g.fractions[low])/(g.fractions[high]-g.fractions[low]||1),a=g.points[low],b=g.points[high];return [a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];
}
function sectorMotion(id,sector,f){
  const profile=geometry(id).profiles[sector];let low=0,high=profile.length-1;
  while(high-low>1){const mid=(low+high)>>1;if(profile[mid]<=f)low=mid;else high=mid;}
  const duration=profile[high]-profile[low]||1,inside=Math.max(0,Math.min(1,(f-profile[low])/duration));
  return {distance:(low+inside)/(profile.length-1),rate:1/(duration*(profile.length-1))};
}

return {SECTOR_ENDS, geometry, trackPoint, sectorMotion};
}());

// ===== 文件: js/core/realtime.js =====
modules['js/core/realtime.js'] = (function () {
// Continuous, serializable discrete-event simulation. All event times are seconds.
const { currentTrack } = modules['js/core/calendar.js'];
const { theoreticalLap, setupPenalty, tyreState } = modules['js/core/car.js'];
const { MODES, ENGINES, COMPOUNDS } = modules['js/data/parts.js'];
const { teamOf, driverOf, clamp, copy, requireCondition, news } = modules['js/core/helpers.js'];
const { between, chance } = modules['js/core/rng.js'];
const { eliminationSize, trackLimits } = modules['js/core/rules.js'];
const { aiRaceDecision } = modules['js/core/ai.js'];
const { startRace, finishRace, event, useTyre, pit, retire, reliability, controlEvents, resumeRed } = modules['js/core/race.js'];
const { SECTOR_ENDS, geometry, sectorMotion } = modules['js/core/trackGeometry.js'];
const NEVER=1e12,EPS=1e-7;
const PHASE_NAMES={GARAGE:'车库',OUT:'出场圈',FLY:'飞行圈',ABORT:'已放弃',IN:'回场圈',RACE:'比赛中',GRID:'等待出发',PIT:'维修区',FINISHED:'已冲线',ELIMINATED:'已淘汰'};
function initCar(c,time=0){
  Object.assign(c,{phase:'RACE',progress:0,sector:0,segmentStart:time,segmentEnd:time,segmentDuration:0,lapStart:time,
    sectorStart:time,currentLap:0,speed:0,sectors:[],sectorSpeeds:[],sectorTones:[],bestSectors:[9999,9999,9999],lastSectors:[],lastSectorSpeeds:[],lastSectorTones:[],lapValid:true,finished:false,usedWet:['I','W'].includes(c.compound),crossings:[],nextRelease:NEVER,pitUntil:0,totalDistance:c.lap||0});
}
function startSegment(s,c){
  const r=s.race,track=currentTrack(s),t=teamOf(s,c.teamId),d=driverOf(s,c.driverId),fraction=SECTOR_ENDS[c.sector]-(SECTOR_ENDS[c.sector-1]||0);
  const tyres=tyreState(c,track,d,r.wetness,c.mode,s.staff.some(x=>x.teamId===t.id&&x.trait==='tyre'));
  const base=theoreticalLap(s,t,d,c.slot,track,!!r.qualifying)+setupPenalty(s.calendar.weekend.setups[t.id][c.slot],s.calendar.weekend.ideal[t.id][c.slot])+c.fuel*.03+tyres.loss+MODES[c.mode].pace+ENGINES[c.engine].pace+r.wetness*(7+(100-d.attributes.wet)*.07);
  let duration=Math.max(12,base*geometry(track.id).sectorWeights[c.sector]+between(s,-.06,.06));
  if(r.qualifying&&c.phase!=='FLY')duration*=c.phase==='OUT'?1.25:1.3;
  if(r.qualifying&&c.phase==='FLY'&&c.consecutive)duration*=.998;
  const ahead=r.cars.filter(x=>x!==c&&!x.retired&&!x.finished&&x.phase==='RACE'&&x.totalDistance>c.totalDistance).sort((a,b)=>a.totalDistance-b.totalDistance)[0];
  c.drs=!!ahead&&!r.qualifying&&r.control==='GREEN'&&c.lap>=(s.season.year>=2024?1:2)&&r.wetness<.18&&!c.drsBroken&&(ahead.totalDistance-c.totalDistance)*track.baseTime<1;
  c.dirty=!!ahead&&(ahead.totalDistance-c.totalDistance)*track.baseTime<1.5;
  if(c.drs)duration-=.4*fraction;if(c.dirty)duration+=.22*fraction;
  if(r.control==='SC')duration*=1.45;else if(r.control==='VSC')duration*=1.35;
  if(ahead&&ahead.lap===c.lap&&ahead.sector===c.sector&&ahead.segmentEnd>r.time&&ahead.segmentEnd>r.time+duration){
    const rival=driverOf(s,ahead.driverId),prob=clamp((1-track.overtake)*.6+(d.attributes.racecraft-rival.attributes.defending)*.006+(c.drs?.2:0)+(c.mode==='attack'?.12:0)-(ahead.mode==='defend'?.1:0),.025,.95);
    if(r.control!=='GREEN'||!chance(s,prob))duration=ahead.segmentEnd-r.time+.25;
    else if(c.teamId===s.player.teamId||ahead.teamId===s.player.teamId)event(s,`${d.code} 获得超车机会，正在进攻 ${rival.code}`,'overtake');
  }
  if(c.phase==='FLY'&&chance(s,(100-d.attributes.consistency)*.00025*(c.mode==='push'?1.8:1))){
    duration+=between(s,.3,1.1);if(chance(s,.35)){c.lapValid=false;event(s,`${d.code} 超出赛道边界，本圈成绩删除`,'warning');}
  }
  c.segmentStart=r.time;c.sectorStart=r.time;c.segmentDuration=duration;c.segmentEnd=r.time+duration;
  c.segmentWear=tyres.wear*fraction*(r.control==='GREEN'?1:.45)*(r.qualifying&&c.phase!=='FLY'?.6:1);
  c.segmentFuel=r.fuelPerLap*fraction*MODES[c.mode].fuel*ENGINES[c.engine].fuel*(r.control==='GREEN'?1:.65)*(r.qualifying&&c.phase!=='FLY'?.65:1);
  c.tyreTemperature=tyres.temperature-(r.control==='GREEN'?0:20);
}
function refreshPositions(s){
  const r=s.race,track=currentTrack(s);
  for(const c of r.cars){
    if(['RACE','OUT','FLY','IN','ABORT'].includes(c.phase)&&!c.retired&&!c.finished){
      const f=clamp((r.time-c.segmentStart)/(c.segmentDuration||1),0,1),start=SECTOR_ENDS[c.sector-1]||0,width=SECTOR_ENDS[c.sector]-start;
      const motion=sectorMotion(track.id,c.sector,f);c.progress=start+width*motion.distance;c.speed=track.length*width/c.segmentDuration*3600*motion.rate;
      c.currentLap=Math.max(0,r.time-c.lapStart);c.totalDistance=c.lap+c.progress;
    }else{c.speed=0;if(c.phase==='PIT')c.currentLap=r.time-c.lapStart;}
  }
  if(r.qualifying)r.cars.sort((a,b)=>Number(a.phase==='ELIMINATED')-Number(b.phase==='ELIMINATED')||a.stageBest-b.stageBest||a.bestAt-b.bestAt||a.grid-b.grid);
  else r.cars.sort((a,b)=>Number(a.retired)-Number(b.retired)||(a.finished&&b.finished?b.lap-a.lap||a.time-b.time:b.totalDistance-a.totalDistance)||a.grid-b.grid);
  r.cars.forEach((c,i)=>{c.position=i+1;});
}
function startRealtimeRace(s){startRace(s);s.settings.speed=1;attachRealtimeRace(s);return '绿灯亮起 · 1× 对应真实时间';}
function attachRealtimeRace(s){
  const r=s.race;if(!r||r.realtime||r.finished)return;
  r.realtime=true;r.qualifying=false;r.time=r.lap?Math.min(...r.cars.filter(c=>!c.retired).map(c=>c.time),r.lap*currentTrack(s).baseTime):0;r.chequered=false;r.bestSectors=[9999,9999,9999];r.timeLimit=(r.sprint?1:2)*3600;
  for(const c of r.cars){const delay=r.lap?Math.max(0,c.time-r.time):(c.grid-1)*.15+(c.time>10?15:0);initCar(c,r.time);if(r.lap>0&&r.weatherWet)c.usedWet=true;if(c.retired){c.segmentEnd=NEVER;continue;}c.phase=delay?'GRID':'RACE';c.nextRelease=delay?r.time+delay:NEVER;c.segmentEnd=NEVER;if(!delay){prepareRaceLap(s,c);startSegment(s,c);}}
  refreshPositions(s);
}
function prepareRaceLap(s,c){
  const r=s.race,track=currentTrack(s);c.pitThisLap=false;
  if(c.teamId!==s.player.teamId||c.plan.auto)aiRaceDecision(s,c,track);
  else{
    [c.plan.pitLap,c.plan.secondLap].forEach((lap,i)=>{if(Number.isInteger(lap)&&lap>0&&lap===c.lap&&!c.planUsed.includes(i)){c.pitRequest=c.plan.next;c.planUsed.push(i);}});
    if(r.control!=='GREEN'&&c.plan.backup==='B'&&c.tyreAge>12&&r.totalLaps-c.lap>8)c.pitRequest=r.wetness>.23?c.plan.rain:'H';
    if(c.plan.backup==='C'&&r.wetness>.25&&!['I','W'].includes(c.compound))c.pitRequest=r.wetness>.7?'W':c.plan.rain;
  }
}
function completeSector(s,c){
  const r=s.race,track=currentTrack(s),sector=c.sector,dt=r.time-c.sectorStart,width=SECTOR_ENDS[sector]-(SECTOR_ENDS[sector-1]||0);
  c.tyreWear=clamp(c.tyreWear+c.segmentWear,0,130);c.fuel=Math.max(0,c.fuel-c.segmentFuel);
  c.sectors[sector]=dt;c.sectorSpeeds[sector]=track.length*width/dt*3600;
  const timing=!r.qualifying||c.phase==='FLY';
  c.sectorTones[sector]=!timing||!c.lapValid?'neutral':dt<r.bestSectors[sector]-EPS?'fastest':dt<c.bestSectors[sector]-EPS?'success':'warning';

  if(sector<2){c.sector++;startSegment(s,c);return;}
  c.progress=0;c.lap++;c.totalDistance=c.lap;c.tyreAge++;c.lastLap=r.time-c.lapStart;
  if(!c.lapValid)c.sectorTones=['neutral','neutral','neutral'];
  c.lastSectors=copy(c.sectors);c.lastSectorSpeeds=copy(c.sectorSpeeds);c.lastSectorTones=copy(c.sectorTones);
  if(timing&&c.lapValid&&r.control==='GREEN'){
    for(let i=0;i<3;i++){r.bestSectors[i]=Math.min(r.bestSectors[i],c.sectors[i]);c.bestSectors[i]=Math.min(c.bestSectors[i],c.sectors[i]);}
    c.best=Math.min(c.best,c.lastLap);
    if(c.lastLap<r.fastest.time)r.fastest={time:c.lastLap,driverId:c.driverId};
  }
  if(r.qualifying){qualCrossing(s,c);if(r.q.status==='RUNNING'&&oldFlying(c)&&chance(s,.0008))suspendQualifying(s);return;}
  c.time=r.time;c.crossings.push(r.time);if(c.crossings.length>100)c.crossings.shift();
  if(c.lap>r.lap){
    r.lap=c.lap;
    r.positions.push({lap:r.lap,positions:r.cars.map(x=>({id:x.driverId,position:x.position}))});
    if(r.lap%10===0)r.segments.push({lap:r.lap,leader:c.driverId,time:r.time});
    if(c.lap>=r.totalLaps||(r.limitFinishLap&&c.lap>=r.limitFinishLap)){r.chequered=true;event(s,'方格旗：领先车手完成比赛，其余车手在下一次过线结束','info');}
    if(!r.chequered){const old=r.control;controlEvents(s,track);if(old!==r.control)rescaleControl(s,old,r.control);}
  }
  if(r.chequered){c.finished=true;c.phase='FINISHED';c.segmentEnd=NEVER;return;}
  if(chance(s,(100-driverOf(s,c.driverId).attributes.consistency)*.000045*MODES[c.mode].risk)){c.penalty+=0;event(s,`${c.name} 锁死轮胎，下一段损失时间`,'warning');c.pendingDelay=between(s,1,3);}
  if(chance(s,.0015*MODES[c.mode].risk))trackLimits(s,c);
  if(c.tyreWear>102&&chance(s,(c.tyreWear-100)*.012))retire(s,c,'轮胎爆胎');
  if(chance(s,.015/r.totalLaps)){c.drsBroken=true;event(s,`${c.name} 的 DRS 发生故障`,'radio');}
  if(c.fuel<=0)retire(s,c,'燃油耗尽');
  reliability(s,c,track);if(c.retired){c.segmentEnd=NEVER;return;}
  prepareRaceLap(s,c);
  if(c.driveThrough&&r.control==='GREEN'){c.driveThrough=false;c.lapStart=r.time;c.phase='PIT';c.pitUntil=r.time+track.pitLoss;c.segmentEnd=NEVER;c.sectors=[];c.sectorTones=[];event(s,`${c.name} 执行穿越维修区罚则`,'penalty');return;}
  if(c.pitRequest){
    c.lapStart=r.time;const before=c.time;pit(s,c,track);const delay=c.time-before;c.time=before;
    if(delay>0){c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.phase='PIT';c.pitUntil=r.time+delay;c.segmentEnd=NEVER;c.usedWet=c.usedWet||['I','W'].includes(c.compound);return;}
  }
  c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.lapStart=r.time;c.lapValid=true;startSegment(s,c);
  if(c.pendingDelay){c.segmentDuration+=c.pendingDelay;c.segmentEnd+=c.pendingDelay;c.pendingDelay=0;}
}
function oldFlying(c){return c.phase==='FLY';}
function suspendQualifying(s){
  const r=s.race;requireCondition(r?.qualifying&&!r.finished,'当前不是排位赛');r.red=true;r.control='RED';
  for(const c of r.cars)if(!['ELIMINATED','GARAGE'].includes(c.phase)){c.phase='GARAGE';c.segmentEnd=NEVER;c.nextRelease=NEVER;c.lapValid=false;c.progress=0;c.speed=0;}
  event(s,'排位红旗：倒计时冻结，进行中的圈作废；赛车返回车库等待恢复','danger');
}
function stageDuration(r){return (r.kind==='SQ'?[12,10,8]:[18,15,12])[r.q.stage-1]*60;}
function startQualifying(s){
  const w=s.calendar.weekend,kind=w?.sessions[w.index];requireCondition(kind==='Q'||kind==='SQ','当前不是排位赛');requireCondition(!s.race||s.race.finished,'请先完成当前场次');
  const ids=s.teams.flatMap(t=>t.drivers),practiceOrder=w.practice.at(-1)?.rows.map(x=>x.id)||ids,q={kind,stage:1,active:ids,eliminated:[],stages:[],done:false,status:'RUNNING'};
  w.qualifying=q;
  const wet=w.weatherStart||0;
  s.race={realtime:true,qualifying:true,q,kind,sprint:false,totalLaps:0,lap:0,time:0,running:true,finished:false,red:false,control:'GREEN',controlLeft:0,sequence:0,events:[],penalties:[],cars:[],fastest:{time:9999,driverId:null},bestSectors:[9999,9999,9999],wetness:wet,rain:wet,fuelPerLap:currentTrack(s).length*.31,positions:[],segments:[],forecast:[],result:null};
  for(const t of s.teams)for(const [slot,id]of t.drivers.entries()){
    const c={driverId:id,name:driverOf(s,id).name,teamId:t.id,slot,grid:practiceOrder.indexOf(id)+1,position:practiceOrder.indexOf(id)+1,time:0,lastLap:0,best:9999,lap:0,compound:'S',tyreAge:0,tyreWear:0,tyreTemperature:80,fuel:0,mode:'push',engine:'normal',penalty:0,warnings:0,stops:0,retired:false,reason:'',usedDry:[],pitRequest:null,pitLog:[],drs:false,dirty:false,drsBroken:false,plan:{},planUsed:[],stageBest:9999,bestAt:NEVER,afterLap:'IN',autoQual:false};
    initCar(c);c.phase='GARAGE';s.race.cars.push(c);
  }
  s.settings.speed=1;beginQualStage(s);event(s,`${kind}1 开始，出场圈不计成绩，计时归零后仅允许完成已经开始的飞行圈`);
  return '排位开始 · 请下达出场指令';
}
function beginQualStage(s){
  const r=s.race,q=r.q;q.status='RUNNING';q.deadline=r.time+stageDuration(r);q.remaining=stageDuration(r);r.fastest={time:9999,driverId:null};r.bestSectors=[9999,9999,9999];
  for(const c of r.cars){
    c.phase=q.active.includes(c.driverId)?'GARAGE':'ELIMINATED';c.stageBest=9999;c.bestAt=NEVER;c.bestSectors=[9999,9999,9999];c.sectors=[];c.sectorSpeeds=[];c.lastSectors=[];c.lastSectorTones=[];c.sectorTones=[];c.currentLap=0;c.progress=0;c.sector=0;c.segmentEnd=NEVER;c.nextRelease=NEVER;c.stageTyre=null;c.hasSet=false;c.attempted=false;c.flyAttempted=false;
    if(c.phase==='GARAGE'&&(c.teamId!==s.player.teamId||c.autoQual))c.nextRelease=r.time+between(s,5,55);
  }
  refreshPositions(s);
}
function allowedQualTyres(s,c){
  const r=s.race;if(r.wetness>.15)return ['S','M','H','I','W'];
  if(r.kind==='Q'&&s.season.year===2023&&['hungary','italy'].includes(currentTrack(s).id))return [['H','M','S'][r.q.stage-1]];
  return r.kind==='SQ'?[r.q.stage<3?'M':'S']:['S','M','H'];
}
function sendQual(s,c,compound,fresh=true){
  const r=s.race;requireCondition(r.q.status==='RUNNING'&&r.time<r.q.deadline,'本段已结束，禁止出场');requireCondition(c.phase==='GARAGE','车手尚未回到车库');
  requireCondition(allowedQualTyres(s,c).includes(compound),'本段只允许配方：'+allowedQualTyres(s,c).join(' / '));
  const regulated=r.kind==='SQ'&&r.wetness<=.15;
  if(regulated&&c.stageTyre){requireCondition(compound===c.stageTyre,'同一段冲刺排位仅可使用一套指定轮胎');fresh=false;}
  if(!fresh)requireCondition(c.hasSet&&c.compound===compound,'没有可复用的这套轮胎，请选择新胎');
  if(fresh){requireCondition(useTyre(s,c,compound),'该配方没有新胎可用');c.hasSet=true;c.stageTyre=compound;}
  c.fuel=r.fuelPerLap*7;c.phase='OUT';c.sector=0;c.progress=0;c.lapStart=r.time;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.afterLap='IN';c.outChoice='FLY';c.lapValid=true;c.nextRelease=NEVER;c.consecutive=false;c.attempted=true;
  event(s,`${driverOf(s,c.driverId).code} 离开车库 · ${compound} 胎出场圈`,'pit');startSegment(s,c);
}
function qualCommand(s,id,command,value){
  const r=s.race,c=r?.cars.find(x=>x.driverId===id&&x.teamId===s.player.teamId);
  requireCondition(r?.qualifying&&!r.finished&&c&&!c.retired,'当前车手不能接收排位指令');
  if(command==='send')sendQual(s,c,value?.compound||allowedQualTyres(s,c)[0],value?.fresh!==false);
  else if(command==='auto'){
    c.autoQual=!c.autoQual;if(!c.autoQual)c.nextRelease=NEVER;if(c.autoQual&&c.phase==='GARAGE'&&r.q.status==='RUNNING')c.nextRelease=r.time+1;
  }
  else if(command==='fly'){requireCondition(c.phase==='OUT','仅在出场圈选择开始飞行圈');c.outChoice='FLY';}
  else if(command==='return'){
    requireCondition(['OUT','FLY','ABORT'].includes(c.phase),'当前阶段无法选择回站');
    if(c.phase==='OUT')c.outChoice='PIT';else c.afterLap='IN';
  }
  else if(command==='abort'){
    requireCondition(c.phase==='FLY','当前没有飞行圈');c.phase='ABORT';c.lapValid=false;c.afterLap='PIT';event(s,`${driverOf(s,id).code} 放弃本次飞行圈，圈末回 Pit`,'radio');
  }
  else if(command==='repeat'){requireCondition(c.phase==='FLY','当前没有飞行圈');c.afterLap='FLY';c.mode='push';}
  else throw new Error('排位指令无效');
  return '排位指令已确认';
}
function garage(s,c){
  const r=s.race;c.phase='GARAGE';c.progress=0;c.speed=0;c.segmentEnd=NEVER;c.currentLap=0;c.nextRelease=NEVER;
  if((c.teamId!==s.player.teamId||c.autoQual)&&r.time+currentTrack(s).baseTime*2.4<r.q.deadline)c.nextRelease=r.time+between(s,15,45);
}
function qualCrossing(s,c){
  const r=s.race,q=r.q,old=c.phase;
  if(old==='FLY'&&c.lapValid){
    if(c.lastLap<c.stageBest-EPS){c.stageBest=c.lastLap;c.bestAt=r.time;}
    event(s,`${driverOf(s,c.driverId).code} · ${c.lastLap.toFixed(3)} 秒${c.lastLap===r.fastest.time?' · 全场最快':''}`,c.lastLap===r.fastest.time?'fastest':'info');
  }
  if(old==='IN'||old==='ABORT'||(old==='OUT'&&c.outChoice==='PIT')){garage(s,c);return;}
  const canFly=r.time<q.deadline-EPS;
  if((old==='OUT'||(old==='FLY'&&c.afterLap==='FLY'))&&canFly&&c.fuel>r.fuelPerLap*2){
    c.phase='FLY';c.flyAttempted=true;c.consecutive=old==='FLY';c.afterLap=c.teamId!==s.player.teamId||c.autoQual?'FLY':'IN';
  }else c.phase='IN';
  c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];c.lapStart=r.time;c.lapValid=true;startSegment(s,c);
}
function endQualStage(s){
  const r=s.race,q=r.q,w=s.calendar.weekend;
  const rows=r.cars.filter(c=>q.active.includes(c.driverId)).sort((a,b)=>a.stageBest-b.stageBest||a.bestAt-b.bestAt||Number(b.flyAttempted)-Number(a.flyAttempted)||Number(b.attempted)-Number(a.attempted)||(a.qualRank||a.grid)-(b.qualRank||b.grid)).map(c=>({id:c.driverId,name:c.name,teamId:c.teamId,time:c.stageBest,stage:q.stage,compound:c.compound,noTime:c.stageBest>=9999,sectors:copy(c.bestSectors),achievedAt:c.bestAt}));
  q.stages.push(rows);
  // 107% is shown as a steward-review flag rather than inventing discretionary permission.
  if(q.stage===1&&r.wetness<=.15&&rows[0]?.time<9999)w.review107=rows.filter(x=>x.time>rows[0].time*1.07).map(x=>x.id);
  if(q.stage<3){
    rows.forEach((row,i)=>{const car=r.cars.find(c=>c.driverId===row.id);car.qualRank=i+1;});
    const n=eliminationSize(s.teams.length*2);q.eliminated=rows.slice(-n).concat(q.eliminated);q.active=rows.slice(0,-n).map(x=>x.id);q.status='BREAK';q.breakEnd=r.time+(r.kind==='Q'&&q.stage===2?480:420);q.remaining=q.breakEnd-r.time;
    for(const c of r.cars){c.phase=q.active.includes(c.driverId)?'GARAGE':'ELIMINATED';c.segmentEnd=NEVER;c.nextRelease=NEVER;c.progress=0;c.speed=0;}
    event(s,`${r.kind}${q.stage} 结束，${n} 台赛车淘汰；进入节间休息`,'info');
  }else{
    q.done=true;q.status='DONE';r.finished=true;r.running=false;w.grids[r.kind]=rows.concat(q.eliminated).map(x=>x.id);if(r.kind==='Q')w.q3=rows.map(x=>x.id);w.index++;
    for(const c of r.cars){c.phase='GARAGE';c.segmentEnd=NEVER;}
    news(s,`${r.kind} 排位结束：${rows[0]?.name||'无'} 获杆位`);
  }
}
function skipQualBreak(s){requireCondition(s.race?.qualifying&&s.race.q.status==='BREAK','当前没有节间休息');advanceRealtime(s,s.race.q.breakEnd-s.race.time,true);return '节间休息已快进';}
function rescaleControl(s,old,next){
  const rate=x=>x==='SC'?1.45:x==='VSC'?1.35:1,ratio=rate(next)/rate(old);
  for(const c of s.race.cars)if(c.segmentEnd<NEVER&&c.segmentEnd>s.race.time){c.segmentStart=s.race.time-(s.race.time-c.segmentStart)*ratio;c.segmentEnd=s.race.time+(c.segmentEnd-s.race.time)*ratio;c.segmentDuration*=ratio;}
}
function resumeRealtime(s){
  const r=s.race;if(r.qualifying){requireCondition(r.red,'当前没有红旗');r.red=false;r.control='GREEN';for(const c of r.cars)if(c.phase==='GARAGE'&&(c.teamId!==s.player.teamId||c.autoQual))c.nextRelease=r.time+between(s,5,25);return '排位恢复';}
  const old=r.control;resumeRed(s);rescaleControl(s,old,r.control);return '比赛恢复';
}
function advanceRealtime(s,seconds,force=false){
  const r=s.race;requireCondition(r?.realtime,'当前没有实时场次');requireCondition(Number.isFinite(seconds)&&seconds>=0&&seconds<=40000,'时间步长无效');
  if(r.finished||r.red||(!r.running&&!force))return '';
  const target=r.time+seconds;let guard=0;
  while(!r.finished&&!r.red&&r.time<target-EPS&&guard++<100000){
    let next=target;if(!r.qualifying&&r.time<r.timeLimit-EPS)next=Math.min(next,r.timeLimit);
    if(r.qualifying){const q=r.q;if(q.status==='BREAK')next=Math.min(next,q.breakEnd);else if(r.time<q.deadline-EPS)next=Math.min(next,q.deadline);}
    for(const c of r.cars){if(c.retired||c.finished)continue;next=Math.min(next,c.segmentEnd,c.nextRelease,c.phase==='PIT'?c.pitUntil:NEVER);}
    r.time=next;refreshPositions(s);
    if(!r.qualifying&&!r.limitFinishLap&&r.time>=r.timeLimit-EPS){r.limitFinishLap=r.lap+2;event(s,'比赛时限已到，领先者将在下一圈结束时收到方格旗','warning');}
    // Stable ID order makes results independent of rendering cadence and sorted tower order.
    for(const c of r.cars.slice().sort((a,b)=>a.driverId.localeCompare(b.driverId))){
      if(c.retired||c.finished)continue;
      if(c.nextRelease<=r.time+EPS){
        c.nextRelease=NEVER;
        if(r.qualifying){if(r.q.status==='RUNNING'&&r.time<r.q.deadline-EPS&&c.phase==='GARAGE'){
          const preferred=r.wetness>.65?'W':r.wetness>.2?'I':r.kind==='SQ'&&r.q.stage<3?'M':'S',stock=s.calendar.weekend.tyres[c.driverId];
          const type=allowedQualTyres(s,c).find(k=>k===preferred&&(stock[k]>0||c.stageTyre===k))||allowedQualTyres(s,c).find(k=>stock[k]>0||c.stageTyre===k);
          if(type)sendQual(s,c,type,stock[type]>0);
        }}else{c.phase='RACE';c.lapStart=r.time;prepareRaceLap(s,c);startSegment(s,c);}
      }
      if(c.phase==='PIT'&&c.pitUntil<=r.time+EPS){c.phase='RACE';c.sector=0;c.sectors=[];c.sectorSpeeds=[];c.sectorTones=[];startSegment(s,c);c.sectorStart=c.lapStart;}
      if(c.segmentEnd<=r.time+EPS&&['RACE','OUT','FLY','IN','ABORT'].includes(c.phase))completeSector(s,c);
    }
    if(r.qualifying){
      s.calendar.weekend.qualifying=r.q;const q=r.q;if(q.status==='BREAK'&&q.breakEnd<=r.time+EPS){q.stage++;beginQualStage(s);event(s,`${r.kind}${q.stage} 开始`);}
      else if(q.status==='RUNNING'&&r.time>=q.deadline-EPS&&!r.cars.some(c=>c.phase==='FLY'&&!c.retired))endQualStage(s);
      q.remaining=Math.max(0,(q.status==='BREAK'?q.breakEnd:q.deadline)-r.time);
    }else if(r.cars.every(c=>c.finished||c.retired))finishRace(s);
    refreshPositions(s);
  }
  requireCondition(guard<100000,'模拟事件上限已达到');return r.finished?'场次结束':r.red?'红旗暂停':'';
}
function fastForwardLap(s){
  const r=s.race;requireCondition(r?.realtime&&!r.finished,'当前没有实时场次');
  requireCondition(!r.red,'当前红旗暂停，请先恢复场次');
  const leader=r.qualifying?r.cars.find(c=>c.teamId===s.player.teamId&&['FLY','OUT','IN','ABORT'].includes(c.phase))||r.cars.find(c=>['FLY','OUT','IN','ABORT'].includes(c.phase)):r.cars.find(c=>!c.retired&&!c.finished);
  if(!leader){advanceRealtime(s,Math.min(90,r.qualifying?r.q.remaining:90),true);return '已推进比赛时间';}
  const lap=leader.lap;let guard=0;
  while(!r.finished&&!r.red&&!leader.retired&&leader.lap===lap&&guard++<1000){
    const seconds=Math.max(.001,Math.min(leader.phase==='PIT'?leader.pitUntil-r.time:leader.phase==='GRID'?leader.nextRelease-r.time:leader.segmentEnd-r.time,60));advanceRealtime(s,seconds,true);
  }
  return '已快进至本圈结束';
}
function finishRealtime(s){
  const r=s.race;requireCondition(r?.realtime,'当前没有实时场次');
  if(r.qualifying)for(const c of r.cars)if(c.teamId===s.player.teamId){c.autoQual=true;if(c.phase==='GARAGE')c.nextRelease=r.time+1;}
  let guard=0;while(!r.finished&&guard++<1000){if(r.red)resumeRealtime(s);advanceRealtime(s,60,true);}
  requireCondition(r.finished,'自动模拟未能结束');return '场次已模拟完毕';
}

return {PHASE_NAMES, initCar, refreshPositions, startRealtimeRace, attachRealtimeRace, suspendQualifying, startQualifying, allowedQualTyres, qualCommand, skipQualBreak, resumeRealtime, advanceRealtime, fastForwardLap, finishRealtime};
}());

// ===== 文件: js/core/season.js =====
modules['js/core/season.js'] = (function () {
// ===== 文件: js/core/season.js =====
const {
  currentEvent, advanceDays, makeCalendar
} = modules['js/core/calendar.js'];
const {
  income
} = modules['js/core/finance.js'];
const {
  checkBudget, seasonRules
} = modules['js/core/rules.js'];
const {
  aiTransfers
} = modules['js/core/ai.js'];
const {
  initParts
} = modules['js/core/car.js'];
const {
  PARTS
} = modules['js/data/parts.js'];
const {
  clamp, copy, teamOf, teamStandings, driverStandings, news, requireCondition, mutable
} = modules['js/core/helpers.js'];
const {
  chance, between
} = modules['js/core/rng.js'];
function closeWeekend(s) {
  mutable(s);
  const w=s.calendar.weekend;
  requireCondition(w&&w.index>=w.sessions.length,'比赛周末尚未结束');
  currentEvent(s).completed=true;
  s.calendar.round++;
  s.calendar.weekend=null;
  s.race=null;
  advanceDays(s,3);
  if(s.calendar.round>=s.calendar.events.length)settleSeason(s);
  return s.season.offseason?'赛季结算完成，转会窗已开启':'本站已结算，可安排工厂事务与下一站';
}
function settleSeason(s) {
  requireCondition(!s.season.offseason,'赛季已结算');
  const standings=teamStandings(s),drivers=driverStandings(s);
  s.history.seasons.push({
    year:s.season.year,teams:standings.map(t=>({
      id:t.id,name:t.name,points:t.points,rank:standings.indexOf(t)+1
    })),drivers:drivers.map(d=>({
      id:d.id,name:d.name,points:d.points
    })),playerRank:standings.findIndex(t=>t.id===s.player.teamId)+1
  });
  for(const [i,t]of standings.entries()) {
    income(s,t,Math.max(22,78-i*5.5),'赛季制造商奖金');
    checkBudget(s,t);
    t.previousRank=i+1;
    t.reputation=clamp(t.reputation+(i<4?3:i>=8?-2:0),25,99);
    const target=t.objectives.target;
    const met=i+1<=target||t.objectives.points>0&&t.custom;
    t.confidence=clamp(t.confidence+(met?10:-18));
    for(const id of t.drivers) {
      const d=s.drivers.find(x=>x.id===id);
      d.contract.years=Math.max(0,d.contract.years-1);
    }
    for(const e of s.staff.filter(x=>x.teamId===t.id))e.years=Math.max(0,e.years-1);
  }
  for(const d of s.drivers) {
    d.age++;
    if(d.age>=39&&chance(s,.2+(d.age-39)*.08)) {
      d.retired=true;
      news(s,`${d.name} 宣布赛季结束后退役`);
    }
  }
  aiTransfers(s);
  s.season.offseason=true;
  s.season.nextRules=s.season.year+1===2026?'2026 技术重置：气动收益保留 35%，电能部署权重上升、MGU-H 退出。提前研究以 150% 系数转化。后续赛历沿用 2025，属于架空生涯。':'渐进规则调整：旧规格增益保留 75%，下季研究转化为基础性能。';
  news(s,'赛季结束：奖金到账，转会窗开启。'+s.season.nextRules);
  const p=teamOf(s);
  if(p.confidence<=0&&!s.season.gameOver)s.season.gameOver='连续未达董事会目标，本次经理生涯结束。';
}
function nextSeason(s) {
  mutable(s);
  requireCondition(s.season.offseason,'请先完成当前赛季');
  const player=teamOf(s);
  for(const id of player.drivers) {
    const d=s.drivers.find(x=>x.id===id);
    requireCondition(!d.retired&&d.contract.years>0,'请在转会窗为两位主力续约或签入替代车手');
  }
  requireCondition(s.staff.some(x=>x.teamId===player.id&&x.role==='principal'&&x.years>0),'请为车队领队续约或聘用新领队');
  const year=s.season.year+1,major=year===2026;
  s.season={
    year,rules:seasonRules(year),offseason:false,nextRules:'',gameOver:null
  };
  const events=makeCalendar(year);
  s.calendar={
    events,round:0,weekend:null,day:0,date:`${year}-02-01`
  };
  for(const t of s.teams) {
    const carry={
      ...t.carry
    };
    for(const part of PARTS) {
      const avg=s.parts[t.id].cars.reduce((sum,c)=>sum+c[part.id].gain,0)/2;
      carry[part.dimension]=(carry[part.dimension]||0)+avg;
    }
    for(const key of Object.keys(carry))carry[key]*=major?.35:.75;
    for(const [key,gain]of Object.entries(t.research))carry[key]=(carry[key]||0)+gain*(major?1.5:1);
    t.carry=carry;
    t.research={
    };
    t.projects=[];
    t.points=0;
    t.wins=0;
    t.results=[];
    t.gridPenalties=[0,0];t.pitLaneNext=[false,false];
    t.wind={
      limit:Math.round(180+(t.previousRank-1)*14),used:0
    };
    t.cfd={
      limit:Math.round(240+(t.previousRank-1)*18),used:0
    };
    t.objectives={
      target:t.custom?Math.max(5,t.previousRank-1):Math.max(1,t.previousRank-1),points:0,finish:0,podiums:0
    };
    const f=s.finance[t.id];
    f.capUsed=0;
    f.capLimit=s.season.rules.cap*(s.settings.difficulty==='easy'?1.06:s.settings.difficulty==='hard'?.98:1);
    f.audited=false;
    f.disqualified=false;
    f.rescue=false;
    for(const sp of f.sponsors)sp.paid=0;
    initParts(s,t);
    for(const e of s.staff.filter(x=>x.teamId===t.id&&t.id!==s.player.teamId&&x.years===0))e.years=2;
  }
  for(const d of s.drivers) {
    d.points=0;
    d.results=[];
    d.wins=0;
    d.fastest=0;
    d.fatigue=0;
  }
  s.race=null;
  news(s,`${year} 赛季正式开启${year>2025?'（架空生涯，沿用 2025 赛道与冲刺站点）':''}`);
  return '新赛季已开启';
}

return {closeWeekend, settleSeason, nextSeason};
}());

// ===== 文件: js/core/state.js =====
modules['js/core/state.js'] = (function () {
const { assignDriverCodes, setDriverCode } = modules['js/core/driverCodes.js'];
const { startRealtimeRace, startQualifying, advanceRealtime, qualCommand, skipQualBreak, fastForwardLap, finishRealtime, resumeRealtime } = modules['js/core/realtime.js'];
// ===== 文件: js/core/state.js =====
const {
  seasonTeams
} = modules['js/data/teams.js'];
const {
  DRIVER_DATA, RESERVES
} = modules['js/data/drivers-data.js'];
const {
  STAFF_POOL
} = modules['js/data/staff-data.js'];
const {
  DEPARTMENTS, FACILITIES
} = modules['js/data/parts.js'];
const {
  DIFFICULTIES
} = modules['js/data/i18n.js'];
const {
  seedFrom, choose
} = modules['js/core/rng.js'];
const {
  copy, uid, clamp, teamOf, news, requireCondition
} = modules['js/core/helpers.js'];
const {
  seasonRules
} = modules['js/core/rules.js'];
const {
  makeCalendar, enterWeekend, changeSetup, setStrategy, waitDays
} = modules['js/core/calendar.js'];
const {
  initParts, replacePart, fitPart
} = modules['js/core/car.js'];
const {
  initFinance, signSponsor, spend, emergency
} = modules['js/core/finance.js'];
const {
  seedStaff, hireStaff, renewStaff, fireStaff
} = modules['js/core/staff.js'];
const {
  makeDriver, createCustomDriver, signDriver, renewDriver, releaseDriver, trainDriver, recruitYouth, sellYouth
} = modules['js/core/drivers.js'];
const {
  startProject, changeProject, upgradeFacility, upgradeDepartment, overrunTesting
} = modules['js/core/rnd.js'];
const {
  practice, qualifying, startRace, raceCommand, tick, resumeRed, simulateToEnd
} = modules['js/core/race.js'];
const {
  closeWeekend, nextSeason
} = modules['js/core/season.js'];
let state=null;
function getState() {
  return state;
}
function setState(value) {
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
function createGame(options={
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
function reduce(s,action,p={
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
    case'timingGap':requireCondition(['leader','interval'].includes(p.value),'时间差模式无效');s.settings.timingGap=p.value;return '时间差模式已切换';
    case'focusDriver':requireCondition(s.race?.cars.some(c=>c.driverId===p.id),'当前场次没有该车手');s.settings.focusDriver=p.id;return '已切换遥测车手';
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
function dispatch(action,p={
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

return {getState, setState, createGame, reduce, dispatch};
}());

// ===== 文件: js/core/save.js =====
modules['js/core/save.js'] = (function () {
const { assignDriverCodes } = modules['js/core/driverCodes.js'];
const { attachRealtimeRace } = modules['js/core/realtime.js'];
// ===== 文件: js/core/save.js =====
const {
  copy, requireCondition
} = modules['js/core/helpers.js'];
const {
  PARTS
} = modules['js/data/parts.js'];
const {
  TRACKS
} = modules['js/data/tracks.js'];
const PREFIX='apex-manager-v2-';
const SLOT_NAMES={
  auto:'自动存档',1:'手动槽位 1',2:'手动槽位 2',3:'手动槽位 3'
};
function migrate(raw) {
  let s=copy(raw);
  requireCondition(s&&typeof s==='object'&&!Array.isArray(s),'存档必须是对象');
  if(s.schemaVersion===1) {
    s.schemaVersion=2;
    s.history=s.history||{
      races:[],seasons:[]
    };
    s.settings.autosave=true;
    for(const t of s.teams||[])t.carry=t.carry||{
    };
  }
  if(s.schemaVersion===2){s.schemaVersion=3;assignDriverCodes(s);if(s.race&&!s.race.finished)attachRealtimeRace(s);}
  requireCondition(s.schemaVersion===3,'存档版本不受支持（本版本为 3）');
  // Repair the 2.0.0 disabled-second-stop request in saves made before lap one.
  if(s.race?.realtime&&!s.race.qualifying&&!s.race.finished&&Array.isArray(s.race.cars))for(const c of s.race.cars){
    if(c.lap===0&&c.plan?.secondLap===0&&Array.isArray(c.planUsed)&&c.planUsed.includes(1)){
      c.planUsed=c.planUsed.filter(i=>i!==1);
      const manual=Array.isArray(s.race.events)&&s.race.events.some(e=>e.type==='radio'&&e.text?.startsWith(c.name+'：收到进站指令'));
      if(!manual&&c.pitRequest===c.plan.next)c.pitRequest=null;
    }
  }
  return s;
}
function validate(raw) {
  const s=migrate(raw);
  requireCondition(Array.isArray(s.teams)&&s.teams.length>=10&&s.teams.length<=11,'车队数据损坏');
  requireCondition(Array.isArray(s.drivers)&&s.drivers.length>=20&&s.drivers.length<=500,'车手数据损坏');
  requireCondition(Array.isArray(s.staff)&&s.staff.length<=1000,'员工数据损坏');
  requireCondition(Number.isInteger(s.rng)&&s.rng>=0&&s.rng<=4294967295,'随机状态损坏');
  requireCondition(Number.isInteger(s.nextId)&&s.nextId>=0,'对象编号损坏');
  requireCondition(s.player&&s.settings&&s.season&&s.calendar&&s.history&&Array.isArray(s.news),'存档缺少必要字段');
  requireCondition(['easy','standard','hard'].includes(s.settings.difficulty),'难度数据损坏');
  requireCondition(Number.isInteger(s.season.year)&&s.season.year>=2022&&s.season.year<=2200&&s.season.rules,'赛季数据损坏');
  requireCondition(s.teams.some(t=>t.id===s.player.teamId),'玩家车队不存在');
  requireCondition(Array.isArray(s.calendar.events)&&s.calendar.events.length>=22&&s.calendar.events.length<=24&&s.calendar.events.every(e=>TRACKS[e.track]),'赛历损坏');
  requireCondition(Number.isInteger(s.calendar.round)&&s.calendar.round>=0&&s.calendar.round<=s.calendar.events.length&&/^\d{4}-\d{2}-\d{2}$/.test(s.calendar.date),'赛历进度损坏');
  requireCondition(new Set(s.teams.map(t=>t.id)).size===s.teams.length&&new Set(s.drivers.map(d=>d.id)).size===s.drivers.length,'对象编号重复');
  const active=[];
  for(const t of s.teams) {
    const f=s.finance?.[t.id],p=s.parts?.[t.id];
    requireCondition(f&&Number.isFinite(f.cash)&&Number.isFinite(f.capUsed)&&Number.isFinite(f.capLimit)&&f.capLimit>0&&Array.isArray(f.ledger)&&Array.isArray(f.sponsors),'财务数据损坏');
    requireCondition(t.departments&&t.facilities&&t.wind&&t.cfd&&Array.isArray(t.projects)&&Array.isArray(t.results)&&t.objectives&&Array.isArray(t.gridPenalties),'车队管理数据损坏');
    requireCondition(t.drivers?.length===2,'车手阵容损坏');
    for(const id of t.drivers) {
      requireCondition(s.drivers.some(d=>d.id===id&&d.teamId===t.id),'车手归属冲突');
      active.push(id);
    }
    requireCondition(p&&p.cars?.length===2&&Array.isArray(p.stock)&&Array.isArray(p.production),'部件数据损坏');
    for(const car of p.cars)for(const def of PARTS)requireCondition(car[def.id]&&Number.isFinite(car[def.id].wear)&&Number.isFinite(car[def.id].gain),'部件规格损坏');
  }
  requireCondition(new Set(active).size===active.length,'车手重复占位');
  for(const d of s.drivers)requireCondition(typeof d.name==='string'&&d.name.length<=100&&d.attributes&&Object.keys(d.attributes).length>=14&&Object.values(d.attributes).every(v=>Number.isFinite(v)&&v>=0&&v<=100)&&d.contract&&Number.isFinite(d.contract.salary)&&Array.isArray(d.results),'车手属性损坏');
  if(s.calendar.weekend) {
    const w=s.calendar.weekend;
    requireCondition(Array.isArray(w.sessions)&&Number.isInteger(w.index)&&w.index>=0&&w.index<=w.sessions.length&&w.setups&&w.ideal&&w.strategy&&w.confidence&&w.tyres&&w.grids,'周末数据损坏');
    for(const t of s.teams)requireCondition(w.setups[t.id]?.length===2&&w.ideal[t.id]?.length===2&&t.drivers.every(id=>w.tyres[id]&&w.strategy[id]),'周末赛车数据损坏');
  }
  if(s.race)requireCondition(s.calendar.weekend&&Array.isArray(s.race.cars)&&s.race.cars.length===active.length&&s.race.cars.every(c=>active.includes(c.driverId))&&Number.isFinite(s.race.lap)&&s.race.lap<=s.race.totalLaps&&Array.isArray(s.race.events)&&Array.isArray(s.race.penalties),'比赛数据损坏');
  if(s.race?.realtime){
    const r=s.race;requireCondition(Number.isFinite(r.time)&&r.time>=0&&r.cars.every(c=>Number.isFinite(c.segmentEnd)&&Number.isFinite(c.segmentDuration)&&Number.isFinite(c.progress)&&c.progress>=0&&c.progress<=1&&Number.isInteger(c.sector)&&c.sector>=0&&c.sector<=2),'实时计时数据损坏');
    requireCondition(r.cars.every(c=>['GRID','RACE','PIT','GARAGE','OUT','FLY','IN','ABORT','ELIMINATED','FINISHED'].includes(c.phase)&&['segmentStart','segmentEnd','segmentDuration','sectorStart','lapStart','currentLap','speed','progress','totalDistance','nextRelease','pitUntil'].every(k=>Number.isFinite(c[k]))&&c.segmentDuration>=0),'实时赛车状态损坏');
    if(r.qualifying){requireCondition(r.q&&[1,2,3].includes(r.q.stage)&&['RUNNING','BREAK','DONE'].includes(r.q.status),'排位阶段损坏');s.calendar.weekend.qualifying=r.q;}
  }
  requireCondition(s.drivers.every(d=>/^[A-Z]{3}$/.test(d.code))&&new Set(s.drivers.map(d=>d.code)).size===s.drivers.length,'车手缩写数据损坏');
  let nodes=0;
  const walk=(x,depth)=> {
    requireCondition(depth<45&&++nodes<1200000,'存档结构超出安全限制');
    if(typeof x==='number')requireCondition(Number.isFinite(x),'存档包含无效数值');
    if(typeof x==='string')requireCondition(x.length<10000,'存档文本异常');
    if(x&&typeof x==='object')for(const [k,v]of Object.entries(x)) {
      requireCondition(!['__proto__','constructor','prototype'].includes(k),'存档包含无效字段');
      walk(v,depth+1);
    }
  };
  walk(s,0);
  return s;
}
function exportText(s) {
  return JSON.stringify({
    format:'APEX_MANAGER',schemaVersion:3,state:s
  },null,2);
}
function importText(text) {
  requireCondition(typeof text==='string'&&text.length<=12*1024*1024,'存档为空或超过 12 MB');
  let data;
  try{
    data=JSON.parse(text);
  }
  catch(e) {
    throw new Error('JSON 无法解析，请检查是否复制完整');
  }
  return validate(data?.format==='APEX_MANAGER'?data.state:data);
}
function storage() {
  try{
    return globalThis.localStorage;
  }
  catch(e) {
    throw new Error('浏览器禁用本地存储，请使用 JSON 导出备份');
  }
}
function saveSlot(s,slot='auto') {
  requireCondition(Object.hasOwn(SLOT_NAMES,slot),'存档槽位无效');
  try{
    storage().setItem(PREFIX+slot,JSON.stringify({
      format:'APEX_MANAGER',savedAt:new Date().toISOString(),state:s
    }));
    return new Date().toLocaleTimeString('zh-CN',{
      hour12:false
    });
  }
  catch(e) {
    throw new Error('保存失败：存储空间不足或浏览器限制，请导出 JSON 备份');
  }
}
function loadSlot(slot='auto') {
  const text=storage().getItem(PREFIX+slot);
  requireCondition(text,'该槽位暂无存档');
  return importText(text);
}
function slotInfo(slot) {
  try{
    const text=storage().getItem(PREFIX+slot);
    if(!text)return null;
    const d=JSON.parse(text);
    return {
      savedAt:d.savedAt,year:d.state?.season?.year,team:d.state?.teams?.find(t=>t.id===d.state?.player?.teamId)?.name||'未知车队'
    };
  }
  catch(e) {
    return {
      broken:true
    };
  }
}
function deleteSlot(slot) {
  requireCondition(Object.hasOwn(SLOT_NAMES,slot),'槽位无效');
  storage().removeItem(PREFIX+slot);
}

return {SLOT_NAMES, migrate, validate, exportText, importText, saveSlot, loadSlot, slotInfo, deleteSlot};
}());

// ===== 文件: js/data/logos.js =====
modules['js/data/logos.js'] = (function () {
// ===== 文件: js/data/logos.js =====
const shapes = [ '<circle cx="32" cy="32" r="25"/><path d="M20 42 32 18 44 42Z" fill="var(--secondary)"/>', '<path d="M10 9H54V35L32 57 10 35Z"/><path d="m21 33 11-17 11 17-11 13Z" fill="var(--secondary)"/>', '<path d="m32 4 28 28-28 28L4 32Z"/><circle cx="32" cy="32" r="11" fill="var(--secondary)"/>', '<path d="m32 3 9 18 20 3-15 15 4 21-18-10-18 10 4-21L3 24l20-3Z"/>', '<path d="M4 23h24L45 9l15 23-15 23-17-14H4l16-9Z"/>', '<path d="M3 15 27 26V13h10v13L61 15 47 40 32 54 17 40Z"/>', '<path d="M10 11h44v42H10Z"/><path d="m17 43 15-26 15 26H35l-3-7-4 7Z" fill="var(--secondary)"/>', '<path d="m32 4 25 14v28L32 60 7 46V18Z"/><path d="m19 24 13 19 13-19Z" fill="var(--secondary)"/>', '<circle cx="32" cy="32" r="27"/><path d="M15 27h34v10H15Z" fill="var(--secondary)"/>', '<path d="M7 6h24L18 31h24L27 58H4l13-23H7Z M37 6h21L45 29H25Z"/>', '<path d="M32 4 60 54H4Z"/><path d="m32 22 10 22H22Z" fill="var(--secondary)"/>', '<path d="M7 13h50L47 50H17Z"/><path d="M18 23h28l-5 17H23Z" fill="var(--secondary)"/>', '<path d="M7 32 26 8h12l19 24-19 24H26Z"/><path d="M27 18h10v28H27Z" fill="var(--secondary)"/>', '<path d="M10 7h44v10H20v10h27v10H20v20H10Z"/>', '<path d="M5 16h54L48 29H34v27H20V29H5Z"/>', '<path d="m32 3 8 20 21 9-21 8-8 21-8-21-21-8 21-9Z"/>', '<path d="M7 7h18v50H7Zm32 0h18v50H39Z"/><path d="M25 25h14v14H25Z" fill="var(--secondary)"/>', '<circle cx="32" cy="32" r="25"/><path d="M19 18h26L29 46H17l12-18H19Z" fill="var(--secondary)"/>', '<path d="M4 45 19 15h13L20 45ZM29 45l15-30h16L45 45Z"/>', '<path d="M8 6h48L32 58Z"/><path d="m21 17 11 24 11-24Z" fill="var(--secondary)"/>', '<path d="m32 4 24 24-24 32L8 28Z"/><path d="m19 28 13-12 13 12Z" fill="var(--secondary)"/>', '<path d="M5 12h20v40H5Zm29 0h25L47 32l12 20H34L22 32Z"/>', '<path d="M8 8h48v48H8Z"/><circle cx="32" cy="32" r="16" fill="var(--secondary)"/><circle cx="32" cy="32" r="8"/>', '<path d="M6 28 27 7v17h31v13H27v20L6 36Z"/>' ];
const LOGOS = shapes;
function logo(index=0,color='#67e8c0',secondary='#0b0e13') {
  const valid=/^#[0-9a-f]{6}$/i;
  return `<svg viewBox="0 0 64 64" role="img" aria-label="几何队徽" style="fill:${valid.test(color)?color:'#67e8c0'};--secondary:${valid.test(secondary)?secondary:'#0b0e13'}">${shapes[Math.abs(Number(index)||0)%shapes.length]}</svg>`;
}

return {LOGOS, logo};
}());

// ===== 文件: js/ui/uiKit.js =====
modules['js/ui/uiKit.js'] = (function () {
// ===== 文件: js/ui/uiKit.js =====
const {
  logo
} = modules['js/data/logos.js'];
const h=value=>String(value??'').replace(/[&<>"']/g,c=>({
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}
[c]));
const money=n=>'$'+Number(n||0).toFixed(2)+'m';
const number=n=>Number(n||0).toFixed(1);
function time(n) {
  if(!Number.isFinite(n)||n>=9000)return '—';
  const ms=Math.round(n*1000),m=Math.floor(ms/60000);
  return `${m}:${((ms-m*60000)/1000).toFixed(3).padStart(6,'0')}`;
}
function icon(id) {
  return VISUAL_ICONS[id]?`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${VISUAL_ICONS[id]}</svg>`:`<svg class="icon" aria-hidden="true"><use href="#i-${h(id)}"></use></svg>`;
}
function badge(text,type='',symbol='') {
  const glyph=symbol||TONE_ICONS[type]||'';
  return `<span class="badge ${h(type)}">${glyph?icon(glyph):''}${h(text)}</span>`;
}
function button(label,action,payload={
},options={
}) {
  return `<button type="button" class="btn ${h(options.class||'')}" data-action="${h(action)}" data-payload="${h(JSON.stringify(payload))}" ${options.disabled?'disabled':''} ${options.reason?`title="${h(options.reason)}"`:''} ${options.confirm?`data-confirm="${h(options.confirm)}"`:''}>${h(label)}</button>${options.disabled&&options.reason?`<small class="disabled-reason">${h(options.reason)}</small>`:''}`;
}
function link(label,route,cls='') {
  return `<a class="btn ${h(cls)}" href="#${h(route)}">${h(label)}</a>`;
}
function header(eyebrow,title,subtitle='',actions='') {
  return `<div class="page-heading"><div><p class="eyebrow">${h(eyebrow)}</p><h1>${h(title)}</h1>${subtitle?`<p class="muted">${h(subtitle)}</p>`:''}</div><div class="actions">${actions}</div></div>`;
}
function panel(title,body,extra='',cls='') {
  const visual=visualCategory(title);
  return `<section class="panel ${h(cls)}"><div class="panel-heading"><h2><span class="section-icon tone-${visual.tone}">${icon(visual.symbol)}</span>${h(title)}</h2>${extra}</div>${body}</section>`;
}
function progress(value,max=100,label='',options={}) {
  const pct=Math.max(0,Math.min(100,Number(value)/Math.max(.001,Number(max))*100));
  const kind=options.kind||(/疲劳/.test(label)?'wear':/预算帽|已使用/.test(label)?'cap':/士气|信心/.test(label)?'confidence':'');
  const tone=kind?severity(kind==='cap'?pct:Number(value),kind):'accent';
  return `<div class="progress-block tone-${tone}">${label?`<div class="progress-label"><span>${h(label)}</span><strong>${pct.toFixed(0)}%</strong></div>`:''}<div class="progress" role="progressbar" aria-valuenow="${pct.toFixed(0)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div></div>`;
}
function stat(label,value,note='',cls='') {
  const visual=visualCategory(label);
  return `<div class="stat ${h(cls)}"><div class="stat-heading"><span class="label">${h(label)}</span><span class="stat-symbol tone-${cls==='danger'?'danger':visual.tone}">${icon(visual.symbol)}</span></div><strong>${h(value)}</strong><small>${h(note)}</small></div>`;
}
function teamBadge(t) {
  return `<span class="team-badge">${logo(t.logo,t.color,t.secondary)}<span>${h(t.name)}</span></span>`;
}
function tyre(c) {
  return `<span class="tyre tyre-${h(c)}" data-compound="${h(c)}" title="${h(TYRE_LABELS[c]||c)} ${h(c)}" aria-label="${h(TYRE_LABELS[c]||c)} ${h(c)}">${h(c)}</span>`;
}
function empty(text) {
  return `<div class="empty">${icon('flag')}<p>${h(text)}</p></div>`;
}
function table(headers,rows,id='',cls='',rowClasses=[]) {
  return `<div class="table-scroll"><table ${id?`id="${h(id)}"`:''} class="${h(cls)}"><thead><tr>${headers.map((x,i)=>`<th><button class="sort" data-sort="${i}" aria-label="按${h(x)}排序">${h(x)} <span>↕</span></button></th>`).join('')}</tr></thead><tbody>${rows.map((row,i)=>`<tr${rowClasses[i]?` class="${h(rowClasses[i])}"`:""}>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function field(label,control,note='') {
  return `<label class="field"><span>${h(label)}</span>${control}${note?`<small>${h(note)}</small>`:''}</label>`;
}
function select(name,items,value,attrs='') {
  return `<select name="${h(name)}" ${attrs}>${items.map(x=>{const [key,label,disabled]=Array.isArray(x)?x:[x,x,false];return `<option value="${h(key)}" ${String(key)===String(value)?'selected':''} ${disabled?'disabled':''}>${h(label)}</option>`;}).join('')}</select>`;
}
function carArt(color='#68e8b5') {
  return `<svg class="car-art" viewBox="0 0 600 200" aria-label="赛车俯视示意图" role="img"><defs><linearGradient id="car-shade" x2="0" y2="1"><stop stop-color="${h(color)}"/><stop offset="1" stop-color="#183b35"/></linearGradient></defs><g fill="#121b27" stroke="#526171" stroke-width="2"><rect x="128" y="22" width="66" height="43" rx="10"/><rect x="128" y="135" width="66" height="43" rx="10"/><rect x="402" y="18" width="72" height="48" rx="11"/><rect x="402" y="134" width="72" height="48" rx="11"/></g><g stroke="${h(color)}" fill="none" opacity=".6"><path d="m165 63 85 22m-85 52 85-22m189-50-83 25m83 45-83-25"/></g><g fill="url(#car-shade)" stroke="${h(color)}"><path d="M90 92 220 84 258 60 370 55 422 78 490 82v36l-68 4-52 23-112-5-38-24L90 108Z"/><rect x="76" y="40" width="22" height="120" rx="5"/><rect x="486" y="33" width="24" height="134" rx="4"/><path d="M211 88h78v24h-78Z"/></g><ellipse cx="315" cy="100" rx="35" ry="23" fill="#0b0e13" stroke="#c1f9e8" stroke-width="4"/><ellipse cx="322" cy="100" rx="10" ry="14" fill="#e9eef5"/><path d="M354 83h48m-48 34h48" stroke="#d3fff0" opacity=".5"/><text x="375" y="105" fill="#e6fff7" font-family="system-ui" font-size="15" font-weight="800">F1</text></svg>`;
}
let toastTimer;
function toast(text,type='info') {
  const el=document.querySelector('#toast');
  el.textContent=text;
  el.className='toast visible '+type;
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('visible'),4500);
}
function openDialog(title,content,onSubmit=null) {
  const d=document.querySelector('#modal');
  document.querySelector('#modal-title').textContent=title;
  document.querySelector('#modal-body').innerHTML=content;
  const form=d.querySelector('form');
  if(form&&onSubmit)form.addEventListener('submit',e=> {
    e.preventDefault(); onSubmit(new FormData(form));
  });
  d.showModal();
  const first=d.querySelector('input, select, button');
  first?.focus();
  return d;
}
function confirmDialog(message,callback) {
  openDialog('确认操作',`<p class="dialog-copy">${h(message)}</p><div class="actions"><button class="btn" data-close>取消</button><button class="btn primary" id="confirm-yes">确认执行</button></div>`);
  document.querySelector('#confirm-yes').onclick=()=> {
    document.querySelector('#modal').close();
    callback();
  };
} // 所有图表均由原生 Canvas 绘制，尺寸根据 devicePixelRatio 匹配设备像素。
function drawChart(canvas,{
  labels=[],values=[],series=[],colors=[],type='bar',color='#68e8b5'
}={
}) {
  const rect=canvas.getBoundingClientRect(),w=Math.max(240,rect.width),height=canvas.dataset.height?Number(canvas.dataset.height):220,dpr=window.devicePixelRatio||1;
  canvas.width=w*dpr;
  canvas.height=height*dpr;
  canvas.style.height=height+'px';
  const ctx=canvas.getContext('2d');
  ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,w,height);
  ctx.font='11px system-ui';
  ctx.lineWidth=1;
  ctx.strokeStyle='#283141';
  ctx.fillStyle='#8d9aaf';
  if(type==='radar') {
    const cx=w/2,cy=height/2,r=Math.min(w*.28,height*.34),n=labels.length;
    for(let ring=1; ring<=4; ring++) {
      ctx.beginPath();
      for(let i=0; i<n; i++) {
        const a=i/n*Math.PI*2-Math.PI/2,x=cx+Math.cos(a)*r*ring/4,y=cy+Math.sin(a)*r*ring/4;
        i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    ctx.beginPath();
    for(let i=0; i<n; i++) {
      const a=i/n*Math.PI*2-Math.PI/2,x=cx+Math.cos(a)*r*(values[i]||0)/100,y=cy+Math.sin(a)*r*(values[i]||0)/100;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.closePath();
    ctx.fillStyle=color+'30';
    ctx.fill();
    ctx.strokeStyle=color;
    ctx.stroke();
    ctx.fillStyle='#a9b6c8';
    ctx.textAlign='center';
    labels.forEach((l,i)=> {
      const a=i/n*Math.PI*2-Math.PI/2; ctx.fillText(l,cx+Math.cos(a)*(r+30),cy+Math.sin(a)*(r+23)+4);
    });
    return;
  }
  const left=36,bottom=height-30,top=14,right=w-12,max=Math.max(1,...values,...series.flatMap(s=>s.values));
  for(let i=0; i<=4; i++) {
    const y=bottom-(bottom-top)*i/4;
    ctx.beginPath();
    ctx.moveTo(left,y);
    ctx.lineTo(right,y);
    ctx.stroke();
    ctx.fillText((max*i/4).toFixed(0),2,y+4);
  }
  if(type==='line') {
    const lines=series.length?series:[{
      values,color
    }];
    for(const line of lines) {
      ctx.beginPath();
      line.values.forEach((v,i)=> {
        const x=left+i/Math.max(1,line.values.length-1)*(right-left),y=bottom-v/max*(bottom-top); i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      });
      ctx.strokeStyle=line.color||color;
      ctx.lineWidth=2;
      ctx.stroke();
    }
  }
  else values.forEach((v,i)=> {
    const width=(right-left)/Math.max(1,values.length),barHeight=v/max*(bottom-top); ctx.fillStyle=colors[i]||color; ctx.fillRect(left+i*width+5,bottom-barHeight,Math.max(2,width-10),barHeight);
  });
  ctx.fillStyle='#8d9aaf';
  ctx.textAlign='center';
  labels.forEach((l,i)=> {
    if(labels.length<16||i%Math.ceil(labels.length/8)===0)ctx.fillText(l,left+(type==='line'?i/Math.max(1,labels.length-1)*(right-left):(i+.5)/Math.max(1,labels.length)*(right-left)),height-9);
  });
}
// 图标均为项目内手绘 SVG；语义色不随车队主色变化。
const VISUAL_ICONS = {
  tyre:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m6 6 2 2m8 8 2 2M6 18l2-2m8-8 2-2"/>',
  stopwatch:'<circle cx="12" cy="14" r="8"/><path d="M9 2h6m-3 0v4m7-1 2 2m-9 3v5l3 2"/>',
  bolt:'<path d="m13 2-9 12h7l-1 8 10-13h-7Z"/>',
  fuel:'<path d="M4 21V4h10v17M2 21h14M6 7h6v5H6m8-5 4 4v7a2 2 0 0 0 4 0v-7l-3-3m0 0v4h3"/>',
  thermometer:'<path d="M9 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0Zm3-7v10"/><circle cx="12" cy="18" r="1"/>',
  rain:'<path d="M5 14a4 4 0 0 1 0-8 6 6 0 0 1 11-1 4.5 4.5 0 0 1 2 9M7 17l-1 3m6-3-1 3m6-3-1 3"/>',
  pit:'<path d="M3 21V8l9-6 9 6v13M7 21V11h10v10M9 15h6m-6 3h6"/>',
  warning:'<path d="M12 3 2 21h20ZM12 9v5m0 3v1"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  cross:'<circle cx="12" cy="12" r="9"/><path d="m8 8 8 8m-8 0 8-8"/>',
  up:'<path d="M12 21V3m-7 7 7-7 7 7"/>',
  down:'<path d="M12 3v18m-7-7 7 7 7-7"/>',
  coins:'<ellipse cx="10" cy="6" rx="7" ry="3"/><path d="M3 6v5c0 4 14 4 14 0V6M3 11v5c0 4 14 4 14 0m3-5v7c0 2-4 3-7 3"/>',
  shield:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z"/><path d="m8 12 3 3 5-6"/>',
  chart:'<path d="M3 3v18h18M7 16v-4m5 4V7m5 9v-7"/>',
  radio:'<path d="M4 8h16v13H4Zm3-5 12-2M8 12h8M7 17h2m6 0h2"/>',
  wrench:'<path d="M15 3a6 6 0 0 0-7 7l-6 7 5 5 7-7a6 6 0 0 0 7-7l-5 4-4-4Z"/>',
  wind:'<path d="M2 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M2 16h7a3 3 0 1 1-3 3"/>',
  heart:'<path d="M12 21 3 12a6 6 0 0 1 9-8 6 6 0 0 1 9 8Z"/>',
  battery:'<path d="M3 6h17v12H3Zm17 4h2v4h-2M7 9v6m-3-3h6m4 0h3"/>',
  layers:'<path d="m12 2 10 6-10 6L2 8Zm-10 10 10 6 10-6M2 16l10 6 10-6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v7l4 2"/>',
  star:'<path d="m12 2 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z"/>',
  play:'<path d="m7 3 14 9-14 9Z"/>',
  pause:'<path d="M6 3h4v18H6Zm8 0h4v18h-4Z"/>',
  forward:'<path d="m3 4 9 8-9 8Zm9 0 9 8-9 8Z"/>'
};
const TYRE_CODES = ['S','M','H','I','W'];
const TYRE_LABELS = {S:'软胎',M:'中性胎',H:'硬胎',I:'半雨胎',W:'全雨胎'};
const TONE_ICONS = {success:'check',warning:'warning',danger:'cross',info:'radio',fastest:'stopwatch',pit:'pit'};
function tyreTag(code,showName=true) {
  return `<span class="compound-tag" data-compound="${h(code)}">${tyre(code)}${showName?`<span>${h(TYRE_LABELS[code]||code)}</span>`:''}</span>`;
}
function tyreLegend(codes=TYRE_CODES) {
  return `<div class="tyre-legend" aria-label="轮胎配方颜色图例">${codes.map(code=>tyreTag(code)).join('')}</div>`;
}
function tyreInventory(stock) {
  return `<div class="tyre-inventory" aria-label="新胎库存">${TYRE_CODES.map(code=>`<span class="tyre-stock ${stock[code]>0?'':'depleted'}" data-compound="${code}" title="${TYRE_LABELS[code]}：${Number(stock[code]||0)} 套">${tyre(code)}<span><strong>${Number(stock[code]||0)}</strong><small>${stock[code]>0?'套新胎':'已用尽'}</small></span></span>`).join('')}</div>`;
}
function tyreField(label,name,value,{codes=TYRE_CODES,compact=false}={}) {
  return `<fieldset class="tyre-field ${compact?'compact':''}"><legend>${h(label)}</legend><div class="tyre-options">${codes.map(code=>`<label class="tyre-choice" data-compound="${code}"><input type="radio" name="${h(name)}" value="${code}" ${code===value?'checked':''} aria-label="${h(label+'：'+TYRE_LABELS[code]+' '+code)}" required><span class="tyre-choice-body">${tyre(code)}<span>${TYRE_LABELS[code]}</span>${icon('check')}</span></label>`).join('')}</div></fieldset>`;
}
function severity(value,kind='wear') {
  if(!Number.isFinite(Number(value)))return 'neutral';
  if(kind==='rating')return value>=85?'success':value>=70?'info':value>=55?'warning':'danger';
  if(kind==='confidence')return value<30?'danger':value<55?'warning':'success';
  if(kind==='cap')return value>=100?'danger':value>=85?'warning':'info';
  return value>=85?'danger':value>=65?'warning':'success';
}
function metric(text,tone='neutral',symbol='') {
  return `<span class="metric tone-${h(tone)}">${symbol?icon(symbol):''}<span>${h(text)}</span></span>`;
}
function wearMeter(value) {
  const tone=severity(value);
  return `<div class="wear-meter tone-${tone}">${progress(value,100,'',{kind:'wear'})}<strong>${number(value)}%</strong>${value>=65?icon('warning'):''}</div>`;
}
function lapDisplay(value,{fastest=false,personal=false,label=false}={}) {
  const valid=Number.isFinite(value)&&value>0&&value<9000;
  const tone=valid&&fastest?'fastest':valid&&personal?'success':'neutral';
  return `<span class="lap-value tone-${tone}" ${valid&&fastest?'title="本场全场最快圈"':valid&&personal?'title="个人最佳单圈"':''}>${valid&&fastest?icon('stopwatch'):''}<span>${valid?time(value):'—'}</span>${label&&valid&&fastest?'<small>全场最快</small>':''}</span>`;
}
function rankBadge(position) {
  return `<span class="rank-badge rank-${Number(position)}">${position<=3?icon('trophy'):''}<span>P${Number(position)}</span></span>`;
}
function positionChange(grid,position) {
  const change=Number(grid)-Number(position);
  return Number.isFinite(change)&&change?metric((change>0?'+':'')+change,change>0?'success':'danger',change>0?'up':'down'):metric('持平','neutral');
}
function raceStatus(car) {
  if(car.retired)return badge(car.reason||'已退赛','danger');
  if(car.pitRequest)return `<span class="badge pit">${icon('pit')}进站 ${tyre(car.pitRequest)}</span>`;
  if(car.drs)return badge('DRS 开启','info','bolt');
  if(car.dirty)return badge('脏空气','warning','wind');
  return badge('正常','subtle','check');
}
function flagState(race) {
  const code=race.red?'RED':race.control;
  const names={GREEN:'绿旗',SC:'安全车',VSC:'虚拟安全车',RED:'红旗暂停'};
  return `<span class="flag-state flag-${h(code)}" data-race="control" data-control="${h(code)}">${icon('flag')}<span>${h(names[code]||code)}</span></span>`;
}
function eventItem(event) {
  const types={weather:['rain','info','天气'],pit:['pit','pit','进站'],overtake:['up','success','超车'],radio:['radio','info','无线电'],danger:['cross','danger','事故 / 故障'],penalty:['warning','danger','处罚'],warning:['warning','warning','提醒'],info:['flag','neutral','赛况'],fastest:['stopwatch','fastest','最快圈']};
  const [symbol,tone,label]=types[event.type]||types.info;
  return `<div class="event-item tone-${tone}"><span class="event-symbol">${icon(symbol)}</span><div><div class="event-meta"><b>${event.at!==undefined?Math.floor(event.at/60)+':'+String(Math.floor(event.at%60)).padStart(2,'0'):'L'+h(event.lap)}</b><span>${label}</span></div><p>${h(event.text)}</p></div></div>`;
}
function fastestSummary(s,record,attrs='') {
  const driver=s.drivers.find(d=>d.id===record?.driverId);
  return `<div class="fastest-summary" ${attrs}>${icon('stopwatch')}<div><small>全场最快圈</small><strong>${record?.time<9000?time(record.time):'—'}</strong></div><span>${h(driver?.name||'等待有效圈速')}</span></div>`;
}
function visualCategory(label) {
  const rules=[[/轮胎|配方/,'tyre','cyan'],[/最快|圈速/,'stopwatch','fastest'],[/预算帽|合规/,'shield','info'],[/现金|收支|财务|流水|赞助/,'coins','success'],[/信心|士气|目标/,'heart','warning'],[/研发|技术|项目/,'flask','cyan'],[/工厂|设施|制造|部件|车辆/,'wrench','info'],[/天气|气象|雨/,'rain','info'],[/人员|员工|阵容|车手|青训/,'users','info'],[/积分|冠军|荣誉|档案/,'trophy','warning'],[/通讯|新闻|无线电/,'radio','info'],[/比赛|赛历|下一站/,'flag','cyan'],[/存档|备份/,'save','info']];
  const rule=rules.find(([pattern])=>pattern.test(label));
  return rule?{symbol:rule[1],tone:rule[2]}:{symbol:'chart',tone:'neutral'};
}

return {h, money, number, time, icon, badge, button, link, header, panel, progress, stat, teamBadge, tyre, empty, table, field, select, carArt, toast, openDialog, confirmDialog, drawChart, TYRE_CODES, tyreTag, tyreLegend, tyreInventory, tyreField, severity, metric, wearMeter, lapDisplay, rankBadge, positionChange, raceStatus, flagState, eventItem, fastestSummary};
}());

// ===== 文件: js/ui/dashboard.js =====
modules['js/ui/dashboard.js'] = (function () {
// ===== 文件: js/ui/dashboard.js =====
const {
  teamOf, driverOf, teamStandings
} = modules['js/core/helpers.js'];
const {
  currentEvent, currentTrack
} = modules['js/core/calendar.js'];
const {
  SESSION_NAMES
} = modules['js/data/i18n.js'];
const {
  h, header, panel, stat, money, badge, progress, link, button, carArt, number
} = modules['js/ui/uiKit.js'];
function dashboard(s) {
  const t=teamOf(s),f=s.finance[t.id],event=currentEvent(s),track=currentTrack(s),rank=teamStandings(s).findIndex(x=>x.id===t.id)+1,w=s.calendar.weekend;
  const active=t.projects.filter(p=>p.status==='researching');
  const objectives=t.objectives;
  return `${header('指挥中心 / '+s.season.year,'车队控制中心','从工厂到终点线，每一次决策都算数。',link(w?'进入比赛周末':'准备下一站','calendar','primary'))}
 <section class="hero"><div class="hero-copy"><p class="eyebrow">${h(t.abbr)} / ${h(t.type==='factory'?'厂商车队':'客户车队')}</p><h2>${h(t.name)}</h2><p>${h(t.hq)}</p><div class="hero-badges">${badge('制造商第 '+rank+' 名','accent')}${badge(t.points+' 积分')}${badge('声望 '+number(t.reputation))}</div></div><div class="hero-visual"><div class="telemetry-grid"></div>${carArt(t.color)}<span class="visual-label">本季赛车 · 规格 ${Math.max(...Object.values(s.parts[t.id].cars[0]).map(x=>x.level))}</span></div></section>
 <div class="stats-grid">${stat('可用现金',money(f.cash),'现金流决定车队生存')}${stat('预算帽余额',money(f.capLimit-f.capUsed),'支出与现金独立核算',f.capUsed>f.capLimit?'danger':'')}${stat('董事会信心',number(t.confidence)+' / 100',t.confidence<30?'董事会要求立即改善':'管理层持续评估赛季表现')}${stat('研发运行中',active.length+' 项',s.parts[t.id].stock.length+' 件新规格待装车')}</div>
 <div class="grid-2"><div>${panel('下一站',event?`<div class="next-race"><span class="round-mark">${String(event.round).padStart(2,'0')}</span><div><p class="eyebrow">${h(event.date)} ${event.sprint?' · 冲刺周末':''}</p><h3>${h(track.name)}大奖赛</h3><p class="muted">${h(track.city)} · ${track.length} km · ${track.laps} 圈</p></div></div><p class="muted">${h(track.notes)}</p><div class="actions">${badge(w?SESSION_NAMES[w.sessions[w.index]]||'等待结算':'赛前工厂阶段','accent')}${link('赛历与策略','calendar')}</div>`:`<p>本赛季已经结束。${h(s.season.nextRules)}</p>${link('前往转会窗','drivers','primary')}`)}
 ${panel('赛季目标',`<div class="objective"><span>制造商前 ${objectives.target}</span>${badge('当前 P'+rank,rank<=objectives.target?'success':'')}</div>${progress(objectives.points, t.custom?1:Math.max(10,150-rank*10),'赛季积分 '+objectives.points)}${progress(objectives.finish,s.calendar.events.length*2,'双车完赛记录 '+objectives.finish)}<p class="muted">${t.custom?'首季优先完成全年运营，争取首个积分。':'持续获得积分、控制现金与预算帽，保持董事会信任。'}</p>`)}
 ${panel('待办提醒',`<ul class="todo"><li>${active.length<2?'研发有空槽，技术中心可以启动新项目。':'研发部门正在执行项目。'}</li><li>${s.parts[t.id].stock.length?'有新规格部件可装车。':'当前没有等待装车的新规格。'}</li><li>${t.drivers.some(id=>driverOf(s,id).contract.years<=1)?'主力车手合同将到期，请安排续约。':'主力车手合同稳定。'}</li><li>${f.cash<20?'现金低于 $20m，可向董事会申请一次紧急注资。':'现金流维持正常。'}</li></ul>`)}</div>
 <div>${panel('性能轮廓',`<canvas data-chart="performance" data-type="radar" data-height="245" aria-label="赛车性能雷达图"></canvas><p class="chart-note">0—100 · 当前一号车装车性能 · 非官方评分</p>`)}${panel('主力阵容',t.drivers.map((id,i)=>{const d=driverOf(s,id);return `<article class="driver-mini"><span class="driver-number">${h(d.number)}</span><div><h3>${h(d.name)}</h3><p class="muted">${h(d.nationality)} · ${d.age} 岁 · 合同 ${d.contract.years} 年</p></div><strong>${number(d.attributes.pace)}</strong><div class="full">${progress(d.morale,100,'士气')}</div></article>`;}).join(''))}${panel('预算帽使用',`<div class="split"><strong>${money(f.capUsed)}</strong><span class="muted">/ ${money(f.capLimit)}</span></div>${progress(f.capUsed,f.capLimit)}<p class="muted">研发、制造、薪资、运营计入；设施与担保金不计入。</p>`)}</div></div>
 ${panel('车队通讯',`<div class="news-list">${s.news.slice(0,8).map(n=>`<div class="news-item"><span class="news-dot ${h(n.type)}"></span><time>${h(n.date)}</time><p>${h(n.text)}</p></div>`).join('')}</div>`,badge('最近 '+Math.min(8,s.news.length)+' 条'))}`;
}

return {dashboard};
}());

// ===== 文件: js/ui/carView.js =====
modules['js/ui/carView.js'] = (function () {
// ===== 文件: js/ui/carView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  performance, replacementCost
} = modules['js/core/car.js'];
const {
  DIMENSIONS, PARTS, partQuota
} = modules['js/data/parts.js'];
const {
  h, header, panel, number, progress, badge, table, money, button, empty, tyreLegend, wearMeter, icon, metric, severity
} = modules['js/ui/uiKit.js'];
function carView(s) {
  const t=teamOf(s),p=s.parts[t.id],blocked=!!s.calendar.weekend;
  return `${header('赛车工程','车辆与部件','磨损不会随新规格重置；部件配额按赛季累计。')}
 <div class="grid-2">${[0,1].map(slot=>{const v=performance(s,t,slot);return panel((slot+1)+' 号车 · '+s.drivers.find(d=>d.id===t.drivers[slot]).name,Object.entries(DIMENSIONS).map(([key,label])=>`<div class="attribute-row"><span>${icon({downforce:'wind',aero:'wind',grip:'tyre',suspension:'wrench',brakes:'shield',power:'bolt',ers:'battery',reliability:'shield',tyres:'tyre',weight:'layers'}[key])}${h(label)}</span>${progress(v[key])}<strong class="tone-${severity(v[key],'rating')}">${number(v[key])}</strong></div>`).join(''));}).join('')}</div>
 ${panel('轮胎磨损预测 · S / M / H',`${tyreLegend(['S','M','H'])}<canvas data-chart="tyres" data-height="220" aria-label="三种干胎的磨损预测曲线"></canvas><p class="muted">横轴：圈数；纵轴：磨损百分比。红 S / 黄 M / 白 H；正常驾驶、干地、当前赛道预测，不影响真实轮胎库存。</p>`)}${[0,1].map(slot=>panel((slot+1)+' 号车部件',table(['部件','规格','磨损','使用 / 配额','更换成本','操作'],PARTS.map(part=>{const item=p.cars[slot][part.id],quota=partQuota(part,s.season.year);return [h(part.name)+(s.season.year>=2026&&part.id==='mguh'?badge('已停用'):''),badge('V'+item.level),wearMeter(item.wear),item.used>quota?badge(item.used+' / '+quota+' · 超额','danger'):item.used===quota?badge(item.used+' / '+quota+' · 已满','warning'):item.used+' / '+(quota===99?'不限':quota),money(replacementCost(part)),button('更换', 'replace',{slot,id:part.id},{disabled:blocked,reason:blocked?'比赛周末内不可更换':'',confirm:`支付更换费用并启用新部件；超配额将使下站罚退 10 位。确认？`})];}),'car-parts-'+slot))).join('')}
 ${panel('升级库存与分配',p.stock.length?table(['部件','规格','性能增益','分配'],p.stock.map(item=>[h(PARTS.find(x=>x.id===item.part).name),badge('V'+item.level),metric('+'+number(item.gain),'success','up'),[0,1].map(slot=>button('装到 '+(slot+1)+' 号车','fit',{id:item.id,slot},{disabled:blocked||p.cars[slot][item.part].level>=item.level,reason:blocked?'请在周末之外装车':p.cars[slot][item.part].level>=item.level?'已装同级或更高规格':''})).join(' ')])):empty('完成研发与制造后，新规格将在这里出现。'))}
 ${panel('制造队列',p.production.length?table(['部件','规格','剩余产能日'],p.production.map(x=>[h(PARTS.find(p=>p.id===x.part).name),'V'+x.level,x.remaining.toFixed(1)+' 天'])):empty('没有生产中的部件。'))}`;
}

return {carView};
}());

// ===== 文件: js/ui/rndView.js =====
modules['js/ui/rndView.js'] = (function () {
// ===== 文件: js/ui/rndView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  projectQuote, factoryCapacity, projectCapacity, researchUnlocked, facilityCost, departmentCost
} = modules['js/core/rnd.js'];
const {
  PARTS, FACILITIES, DEPARTMENTS
} = modules['js/data/parts.js'];
const {
  h, header, panel, stat, money, number, badge, progress, button, field, select, empty
} = modules['js/ui/uiKit.js'];
function rndView(s) {
  const t=teamOf(s),researchOpen=researchUnlocked(s);
  return `${header('技术中心','把想法变成圈速','研发 → 验证 → 制造 → 单车装配。只生产一套时，升级只能先用于一台车。')}
 <div class="stats-grid">${stat('风洞额度',t.wind.used+' / '+t.wind.limit,'按上赛季排名分配')}${stat('CFD 额度',t.cfd.used+' / '+t.cfd.limit,'研发立项时扣除')}${stat('制造能力',factoryCapacity(t)+' 产能日 / 天','零件按队列依次生产')}${stat('下季研究',researchOpen?'已开放':'尚未开放','赛季进度达到 55% 后开放')}</div>
 <div class="actions test-overrun">${button('违规增加试验额度','overrun',{}, {disabled:!!t.wind.overrun,reason:t.wind.overrun?'本季已被处罚':'',confirm:'违规增加风洞 45 / CFD 60 额度，立即罚款 $5m（不计入预算帽），董事会信心 -10。确认承担处罚？'})}</div><div class="grid-2">${panel('研发项目库',`<form data-form="project" class="form-grid">${field('目标部件',select('part',PARTS.map(p=>[p.id,p.name+(t.type==='customer'&&p.department==='power'?' · 客户不可研制':''),t.type==='customer'&&p.department==='power'||s.season.year>=2026&&p.id==='mguh']),'floor'))}${field('项目方向',select('kind',[['development','本季升级'],['research','下赛季前期研究',!researchOpen]],'development'))}${field('生产套数',select('copies',[[2,'两套 · 双车装配'],[1,'一套 · 单车优先']],2))}<div class="field"><span>立项说明</span><p class="muted">同时运行 ${projectCapacity(t)} 项。费用包含制造预付，失败退还制造部分。</p></div><button class="btn primary" type="submit">核对报价并立项</button></form><div class="project-library">${PARTS.filter(p=>!(t.type==='customer'&&p.department==='power')&&!(s.season.year>=2026&&p.id==='mguh')).map(p=>{const q=projectQuote(s,t,p.id);return `<div class="project-row"><div><strong>${h(p.name)}</strong><small>${h(DEPARTMENTS[p.department])} · V${q.level}</small></div><span>${money(q.cost+q.manufacturing)}</span><span>${q.days} 天</span><span>+${number(q.gain)}</span></div>`;}).join('')}</div>`)}
 ${panel('进行中的项目',t.projects.length?t.projects.slice().reverse().slice(0,16).map(p=>`<article class="project-card"><div class="split"><h3>${h(PARTS.find(x=>x.id===p.part).name)} · V${p.level}</h3>${badge({researching:'研发中',complete:'完成',failed:'失败',cancelled:'已叫停'}[p.status],p.status==='complete'?'success':'')}</div><p class="muted">${p.kind==='research'?'下季研究':'本季升级'} · ${p.copies} 套 · 失败风险 ${number(p.risk*100)}%</p>${progress(p.progress)}<p>剩余 ${Math.max(0,p.remaining).toFixed(1)} 天</p>${p.status==='researching'?`<div class="actions">${button('追加投入','projectChange',{id:p.id,operation:'boost'},{disabled:p.boosted,confirm:'花费原研发费用的 30%，缩短剩余工期 30%，增加失败风险。确认？'})}${button('风险审查','projectChange',{id:p.id,operation:'safe'},{disabled:p.safer,confirm:'花费原研发费用的 15%，降低风险并延长剩余工期。确认？'})}${button('叫停','projectChange',{id:p.id,operation:'cancel'},{class:'danger',confirm:'终止该项目，只退回制造预付，研发支出不退。确认？'})}</div>`:''}</article>`).join(''):empty('选择一个部件，启动第一项研发。'))}</div>
 ${panel('工厂设施',`<div class="facility-grid">${Object.entries(FACILITIES).map(([id,def])=>{const f=t.facilities[id];return `<article class="facility"><div class="split"><h3>${h(def.name)}</h3>${badge('Lv.'+f.level)}</div><p class="muted">${h(def.effect)}</p><p>${money(facilityCost(t,id))} · 不计入预算帽</p>${f.building?`${progress(f.building.total-f.building.remaining,f.building.total)}<p>建造剩余 ${f.building.remaining} 天</p>`:button(f.level>=6?'已满级':'升级设施','facility',{id},{disabled:f.level>=6,confirm:`升级 ${def.name}，支出 ${money(facilityCost(t,id))}，不计入预算帽。确认？`})}</article>`;}).join('')}</div>`)}
 ${panel('研发部门',`<div class="facility-grid">${Object.entries(DEPARTMENTS).map(([id,label])=>{const d=t.departments[id];return `<article class="facility"><h3>${h(id==='power'&&t.type==='customer'?'引擎供应商支持':label)}</h3><p>等级 ${d.level} · ${d.people} 人 · ${h(d.supervisor)}</p>${button('扩编 '+money(departmentCost(t,id)),'department',{id},{disabled:d.level>=6,confirm:'部门扩编计入预算帽。确认支出？'})}</article>`;}).join('')}</div>`)}`;
}

return {rndView};
}());

// ===== 文件: js/ui/staffView.js =====
modules['js/ui/staffView.js'] = (function () {
// ===== 文件: js/ui/staffView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  ROLES, TRAITS
} = modules['js/data/staff-data.js'];
const {
  staffAbility
} = modules['js/core/staff.js'];
const {
  h, header, panel, table, money, number, badge, progress, button
} = modules['js/ui/uiKit.js'];
function contract(e,kind) {
  return `<button class="btn small" data-contract="${kind}" data-id="${h(e.id)}">${kind==='hireStaff'?'谈判签约':'续约'}</button>`;
}
function staffView(s) {
  const t=teamOf(s),own=s.staff.filter(e=>e.teamId===t.id),market=s.staff.filter(e=>e.teamId!==t.id);
  return `${header('组织与合同','人员管理','所有员工均为虚构人物；岗位能力与特质实际参与研发、设定、进站及成长计算。')}
 <div class="stats-grid">${[['technical','研发主管'],['engineer','比赛工程'],['mechanics','维修区'],['academy','青训']].map(([role,label])=>`<div class="stat"><span class="label">${label}</span><strong>${number(staffAbility(s,t.id,role))}</strong><small>缺编时以 45 能力应急运作</small></div>`).join('')}</div>
 ${panel('现任员工',table(['姓名 / 岗位','能力 / 士气','特质','年薪','合同','忠诚','操作'],own.map(e=>[`<strong>${h(e.name)}</strong><small>${h(ROLES[e.role])}</small>`,`<strong>${number(e.ability)}</strong><small>士气 ${number(e.morale)}</small>`,`<span title="${h(TRAITS[e.trait].description)}">${h(TRAITS[e.trait].name)}</span><small>${h(TRAITS[e.trait].description)}</small>`,money(e.salary),e.years+' 年',number(e.loyalty),contract(e,'renewStaff')+' '+button('解约','fireStaff',{id:e.id},{class:'small danger',confirm:`解约 ${e.name}，支付剩余薪资 50% 的补偿。缺编会降低对应效率。确认？`})]),'own-staff'))}
 ${panel('员工市场与挖角',`<div class="filter-row"><input type="search" data-filter="staff-market" aria-label="搜索员工" placeholder="搜索姓名、岗位、特质或所在车队"><span class="muted">有合同员工需支付 60% 剩余薪资作为违约金</span></div>${table(['姓名','岗位','能力','特质','现任车队','年薪','操作'],market.map(e=>[h(e.name),h(ROLES[e.role]),number(e.ability),`<span title="${h(TRAITS[e.trait].description)}">${h(TRAITS[e.trait].name)}</span>`,h(s.teams.find(t=>t.id===e.teamId)?.name||'自由员工'),money(e.salary),contract(e,'hireStaff')]),'staff-market')}`)}`;
}

return {staffView};
}());

// ===== 文件: js/ui/driversView.js =====
modules['js/ui/driversView.js'] = (function () {
// ===== 文件: js/ui/driversView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  ATTRS
} = modules['js/data/drivers-data.js'];
const {
  h, header, panel, number, money, badge, progress, button, table, select, field, empty
} = modules['js/ui/uiKit.js'];
function contract(d,kind) {
  return `<button class="btn small" data-contract="${kind}" data-id="${h(d.id)}">${kind==='signDriver'?'接洽 / 签约':'续约谈判'}</button>`;
}
function card(s,d) {
  return `<article class="driver-card"><div class="driver-top"><span class="driver-number">${h(d.number)}</span><div><p class="eyebrow">${h(d.nationality)} · ${d.age} 岁 ${d.academy?'· 青训':''}</p><h2>${h(d.name)} <small class="tone-info">${h(d.code)}</small></h2></div><span class="rating">${number(d.attributes.pace)}</span></div><form data-form="driverCode" class="inline-form"><input type="hidden" name="id" value="${h(d.id)}">${field('三字母缩写',`<input name="value" value="${h(d.code)}" pattern="[A-Za-z]{3}" minlength="3" maxlength="3" required aria-label="车手三字母缩写">`)}<button class="btn small" type="submit">保存缩写</button></form><div class="driver-attributes">${Object.entries(ATTRS).map(([key,label])=>`<div><span>${h(label)}</span><strong>${number(d.attributes[key])}</strong></div>`).join('')}</div><div class="stats-grid compact"><div><small>年薪</small><strong>${money(d.contract.salary)}</strong></div><div><small>剩余合同</small><strong>${d.contract.years} 年</strong></div><div><small>本季积分</small><strong>${d.points}</strong></div></div>${progress(d.morale,100,'士气')}${progress(d.fatigue,100,'疲劳')}<form data-form="train" class="inline-form"><input type="hidden" name="id" value="${h(d.id)}">${field('发展计划',select('plan',[['balanced','均衡发展'],['pace','单圈专项'],['tyres','轮胎管理'],['wet','湿地训练'],['rest','恢复体能']],d.plan))}<button class="btn small" type="submit">应用计划</button></form><p class="muted">专项训练 $0.008m/天，计入预算帽。绩效奖金 ${money(d.contract.bonus)}，转会条款 ${(d.contract.buyout*100).toFixed(0)}%。</p><div class="actions">${d.academy?contract(d,'signDriver')+button('出售青训','sellYouth',{id:d.id},{confirm:'出售培养权并让车手进入自由市场，确认？'}):contract(d,'renewDriver')+button('解约','releaseDriver',{id:d.id},{class:'small danger',confirm:'支付剩余合同薪资 50% 解约，由最佳自由替补接替席位。确认？'})}${d.retired?badge('已宣布退役','danger'):''}</div></article>`;
}
function driversView(s) {
  const t=teamOf(s),own=t.drivers.map(id=>s.drivers.find(d=>d.id===id)),youth=s.drivers.filter(d=>d.academy===t.id),market=s.drivers.filter(d=>d.teamId!==t.id&&!d.academy&&!d.retired);
  return `${header('阵容与转会','车手阵容',s.season.offseason?'转会窗已开启：进入下一赛季之前，请确保两位主力拥有有效合同。':'年轻车手通过比赛与训练成长，30 岁后逐步老化。')}
 <div class="grid-2">${own.map(d=>card(s,d)).join('')}</div>
 ${panel('青训学院',youth.length?`<div class="grid-2">${youth.map(d=>card(s,d)).join('')}</div>`:empty('从 F2 / F3 招募年轻车手，发展后提拔或出售。'),button('招募青训 · $1.00m','youth',{}, {disabled:youth.length>=4,reason:youth.length>=4?'青训名额已满':'',confirm:'花费 $1m 招募年轻车手，计入预算帽。确认？'}))}
 ${panel('车手市场',`<div class="filter-row"><input type="search" data-filter="driver-market" placeholder="搜索姓名、国籍或现任车队" aria-label="搜索车手"><span class="muted">有合同车手可挖角；薪资、声望与赛车竞争力影响意愿。</span></div>${table(['车手','国籍 / 年龄','速度','潜力','现任车队','年薪 / 合同','操作'],market.map(d=>[h(d.name),h(d.nationality)+' · '+d.age,number(d.attributes.pace),number(d.attributes.potential),h(s.teams.find(t=>t.id===d.teamId)?.name||'自由车手'),money(d.contract.salary)+' / '+d.contract.years+' 年',contract(d,'signDriver')]),'driver-market')}`)}`;
}

return {driversView};
}());

// ===== 文件: js/ui/financeView.js =====
modules['js/ui/financeView.js'] = (function () {
// ===== 文件: js/ui/financeView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  SPONSORS, SPONSOR_GOALS
} = modules['js/data/sponsors.js'];
const {
  h, header, panel, money, stat, progress, badge, button, table, empty, icon, metric
} = modules['js/ui/uiKit.js'];
function financeView(s) {
  const t=teamOf(s),f=s.finance[t.id];
  return `${header('财务办公室','现金流与预算帽','现金是银行账户；预算帽是合规累计支出。设施建设、罚款和担保金不计入预算帽。')}
 <div class="stats-grid">${stat('银行现金',money(f.cash),'现金小于零会终止本次生涯',f.cash<15?'danger':'')}${stat('计入预算帽',money(f.capUsed),'年度累计支出')}${stat('预算帽上限',money(f.capLimit),'含难度调整 · 非官方平衡值')}${stat('合规状态',f.disqualified?'取消积分资格':f.audited?'已受调查':'正常',f.audited?'风洞 / CFD 额度已削减':'超支将在正赛后接受调查')}</div>
 <div class="grid-2">${panel('预算帽监测',`${progress(f.capUsed,f.capLimit,'已使用')}<p>剩余额度 <strong>${money(f.capLimit-f.capUsed)}</strong></p><p class="muted">研发、生产、更换、人员与车手薪资、运营（含引擎供应 / 自研维护）、专项培养和违约金计入；资金收入不会恢复预算帽额度。</p>${button('申请 $15m 紧急注资','rescue',{}, {disabled:f.rescue||f.cash>=20,reason:f.rescue?'本季已使用援助':f.cash>=20?'现金低于 $20m 时可申请':'',confirm:'获得 $15m 紧急注资，董事会信心 -15，声望 -5。确认？'})}`)}${panel('最近现金收支',`<div class="finance-legend"><span class="tone-success">${icon('up')}收入</span><span class="tone-danger">${icon('down')}支出</span></div><canvas data-chart="finance" data-height="200" aria-label="现金收支图"></canvas>`)}</div>
 ${panel('已签赞助',f.sponsors.length?`<div class="facility-grid">${f.sponsors.map(sp=>`<article class="facility"><div class="split"><h3>${h(sp.name)}</h3>${badge(sp.kind)}</div><strong class="large-number">${money(sp.annual)} / 年</strong><p class="muted">${h(SPONSOR_GOALS[sp.goal])} +${money(sp.bonus)}</p><p>本年已付 ${money(sp.paid)}</p></article>`).join('')}</div>`:empty('没有赞助合同。'))}
 ${panel('赞助洽谈',`<div class="facility-grid">${SPONSORS.filter(sp=>!f.sponsors.some(x=>x.id===sp.id)).map(sp=>{const full=f.sponsors.filter(x=>x.kind===sp.kind).length>=(sp.kind==='主赞助'?1:3);return `<article class="facility"><div class="split"><h3>${h(sp.name)}</h3>${badge(sp.kind)}</div><p>基础年收入 ${money(sp.base)}</p><p class="muted">${h(SPONSOR_GOALS[sp.goal])} +${money(sp.bonus)}<br>声望要求 ${sp.min}，营销与员工特质提高实际报价。</p>${button('签署赞助','sponsor',{id:sp.id},{disabled:t.reputation<sp.min||full,reason:full?'该类赞助席位已满':t.reputation<sp.min?'声望不足':'',confirm:'签署本年度赞助合同，收入按日分期发放。确认？'})}</article>`;}).join('')}</div>`)}
 ${panel('财务流水',table(['模拟日','交易说明','金额','计入预算帽'],f.ledger.slice(0,100).map(item=>[item.day,h(item.label),`<strong class="metric ${item.amount>=0?'positive':'negative'}">${icon(item.amount>=0?'up':'down')}${item.amount>=0?'+':''}${money(item.amount)}</strong>`,badge(item.cap?'计入':'不计入',item.cap?'info':'subtle',item.cap?'shield':'')]),'finance-ledger'))}`;
}

return {financeView};
}());

// ===== 文件: js/ui/calendarView.js =====
modules['js/ui/calendarView.js'] = (function () {
// ===== 文件: js/ui/calendarView.js =====
const {
  teamOf
} = modules['js/core/helpers.js'];
const {
  currentEvent, currentTrack
} = modules['js/core/calendar.js'];
const {
  trackForYear
} = modules['js/data/tracks.js'];
const {
  SESSION_NAMES
} = modules['js/data/i18n.js'];
const {
  h, header, panel, badge, button, field, select, link, table, number, empty, tyreField, tyreInventory, tyreLegend, icon
} = modules['js/ui/uiKit.js'];
function calendarView(s) {
  const t=teamOf(s),event=currentEvent(s),track=currentTrack(s),w=s.calendar.weekend;
  let body='';
  if(s.season.offseason) {
    body=panel('转会窗与技术规则',`<p>${h(s.season.nextRules)}</p><p>请续约车手与领队，或签入替代人选。现金及研发技术储备延续，部件配额和预算帽在新赛季重置。</p><div class="actions">${link('车手转会','drivers')}${link('员工合同','staff')}${button('进入下一赛季','nextSeason',{}, {class:'primary',confirm:'确认阵容后进入下一赛季。未交付的本季项目将取消，不退回费用。确认？'})}</div>`);
  }
  else if(event) {
    body=panel('R'+String(event.round).padStart(2,'0')+' · '+track.name,`<div class="stats-grid compact"><div><small>比赛日期</small><strong>${h(event.date)}</strong></div><div><small>距离</small><strong>${track.length} km × ${track.laps} 圈</strong></div><div><small>维修区</small><strong>${track.pitSpeed} km/h · ${track.pitLength}m</strong></div><div><small>进站通行损失</small><strong>${track.pitLoss} 秒 + 停站</strong></div></div><p class="muted">${w?'发车路面积水预估 '+number((w.weatherStart||0)*100)+'% · ':''}${h(track.notes)} · DRS ${track.drs} 区 · 轮胎磨耗 ×${track.wear} · 降雨倾向 ${number(track.rain*100)}%</p>${w?`<div class="session-strip">${w.sessions.map((x,i)=>`<span class="${i<w.index?'done':i===w.index?'current':''}">${i<w.index?'✓ ':''}${h(SESSION_NAMES[x])}</span>`).join('')}</div><div class="actions">${w.index>=w.sessions.length?button('完成本站结算','closeWeekend',{}, {class:'primary'}):link('进入比赛指挥','race','primary')}</div>`:`<div class="actions">${button('进入比赛周末','enterWeekend',{}, {class:'primary'})}${button('推进工厂 7 天','wait',{days:7})}</div><p class="muted">进入周末会自动推进至赛前两天，并结算工厂、训练、薪资和赞助。期间阵容与新部件登记将锁定。</p>`}`);
    if(w) {
      const current=w.sessions[w.index];
      if(current?.startsWith('FP'))body+=panel('练习与设定采集',`<div class="grid-2">${t.drivers.map((id,slot)=>`<form data-form="setup" class="setup-form"><h3>${h(s.drivers.find(d=>d.id===id).name)}</h3><input type="hidden" name="slot" value="${slot}">${['前翼角度','尾翼角度','悬挂软硬','胎压 / 能量倾向'].map((label,i)=>{const c=w.confidence[t.id][slot][i];return field(label,`<div class="range-row"><input type="range" name="v${i}" min="0" max="100" value="${w.setups[t.id][slot][i]}" aria-label="${h(label)}"><output>${Math.round(w.setups[t.id][slot][i])}</output></div>`,`采集置信区间 ${number(c.low)}—${number(c.high)}，非精确最优值`);}).join('')}<button type="submit" class="btn">保存设定</button></form>`).join('')}</div><div class="actions">${button('执行 '+SESSION_NAMES[current],'practice',{}, {class:'primary'})}</div>`);
      body+=panel('策略工作台',`${tyreLegend()}<div class="grid-2">${t.drivers.map(id=>{const p=w.strategy[id];return `<form data-form="strategy" class="setup-form"><input type="hidden" name="id" value="${h(id)}"><h3>${h(s.drivers.find(d=>d.id===id).name)}</h3><div class="form-grid">${tyreField('起步轮胎','start',p.start)}${field('计划首停',`<input name="pitLap" type="number" min="1" max="${track.laps}" value="${p.pitLap}" required>`)}${field('第二次进站（0 为取消）',`<input name="secondLap" type="number" min="0" max="${track.laps}" value="${p.secondLap}" required>`)}${tyreField('进站新胎','next',p.next)}${field('备选方案',select('backup',[['A','A · 严格执行窗口'],['B','B · 安全车低价停站'],['C','C · 自动应对降雨']],p.backup))}${tyreField('雨胎预案','rain',p.rain,{codes:['I','W']})}</div><label class="check"><input type="checkbox" name="auto" ${p.auto?'checked':''}>工程师自动管理比赛策略</label><p class="muted">${s.season.year>=2025&&track.id==='monaco'?'摩纳哥要求至少两次停站。':'干燥正赛必须使用至少两种干胎；雨战豁免。'}</p><div class="inventory-heading">${icon('tyre')}新胎库存</div>${tyreInventory(w.tyres[id])}<button type="submit" class="btn">保存策略</button></form>`;}).join('')}</div>`);
    }
  }
  return `${header('赛历与准备','比赛周末',s.season.year>2025?'架空生涯使用 2025 赛历，技术规则在 2026 进入游戏化新规模型。':'按历史实际举行的赛历：2022 / 2023 共 22 站，2024 / 2025 共 24 站。')}${body}${panel('完整赛历',table(['站次','大奖赛','城市','日期','赛制','状态 / 冠军'],s.calendar.events.map((e,i)=>{const tr=trackForYear(e.track,Math.min(s.season.year,2025));return [String(i+1).padStart(2,'0'),h(tr.name),h(tr.city),h(e.date),badge(e.sprint?'冲刺':'标准',e.sprint?'accent':''),e.completed?'✓ '+h(e.result?.rows[0]?.name||'完成'):badge(i===s.calendar.round?'下一站':'待举行',i===s.calendar.round?'accent':'')];}),'season-calendar'))}`;
}

return {calendarView};
}());

// ===== 文件: js/ui/liveData.js =====
modules['js/ui/liveData.js'] = (function () {
// Pure display calculations. These never advance the simulation or consume RNG.
function timingGap(s,c,baseTime){
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
function layoutMapLabels(markers,previous={},reserved=[]){
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

return {timingGap, layoutMapLabels};
}());

// ===== 文件: js/ui/liveView.js =====
modules['js/ui/liveView.js'] = (function () {
const { timingGap, layoutMapLabels } = modules['js/ui/liveData.js'];
const { teamOf, driverOf } = modules['js/core/helpers.js'];
const { currentTrack } = modules['js/core/calendar.js'];
const { PHASE_NAMES, allowedQualTyres } = modules['js/core/realtime.js'];
const { geometry, trackPoint, SECTOR_ENDS } = modules['js/core/trackGeometry.js'];
const { MODES, ENGINES } = modules['js/data/parts.js'];
const { SESSION_NAMES } = modules['js/data/i18n.js'];
const { h, header, panel, badge, button, icon, time, number, tyre, tyreInventory, tyreField, select, lapDisplay, flagState, fastestSummary, eventItem, wearMeter, table } = modules['js/ui/uiKit.js'];
function clock(seconds,countdown=true){const n=Math.max(0,countdown?Math.ceil(seconds):Math.floor(seconds));return `${Math.floor(n/60).toString().padStart(2,'0')}:${(n%60).toString().padStart(2,'0')}`;}
function phase(c){return c.retired?'退赛':PHASE_NAMES[c.phase]||c.phase;}
function phaseTone(c){return c.retired?'danger':c.phase==='FLY'?'success':c.phase==='OUT'?'info':['PIT','IN','ABORT'].includes(c.phase)?'warning':'neutral';}
function focused(s){return s.race.cars.find(c=>c.driverId===(s.settings.focusDriver||teamOf(s).drivers[0]))||s.race.cars.find(c=>c.driverId===teamOf(s).drivers[0])||s.race.cars[0];}
function sectorTone(c,i){return c.phase==='ABORT'?'neutral':c.sectorTones[i]||c.lastSectorTones?.[i]||'neutral';}
function sectorValue(c,i){return c.sectors[i]||c.lastSectors[i]||0;}
function sectorSpeed(c,i){return c.sectorSpeeds[i]||c.lastSectorSpeeds[i]||0;}
function timingCells(s,c){
  const r=s.race,d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
  const code=`<div class="tower-driver"><span class="tower-position" aria-label="第 ${c.position} 名">${c.position}</span><button class="driver-code" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" style="--team:${h(t.color)}" title="${h(d.name)}" aria-label="聚焦 ${h(d.code+' '+d.name)}">${h(d.code)}</button></div>`;
  if(!r.qualifying)return {driver:code,gap:`<span class="tower-gap ${c.retired?'tone-danger':''}">${timingGap(s,c,currentTrack(s).baseTime)}</span>`,tyre:tyre(c.compound)};
  return {driver:code+`<small class="phase-label tone-${phaseTone(c)}">${h(phase(c))}</small>`,best:lapDisplay(c.stageBest,{fastest:r.fastest.driverId===c.driverId}),gap:`<span class="tower-gap">${timingGap(s,c,currentTrack(s).baseTime)}</span>`,tyre:tyre(c.compound)};
}
function timingRow(s,c){return `<tr data-car="${h(c.driverId)}" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" class="${c.teamId===s.player.teamId?'player-row':''}">${Object.entries(timingCells(s,c)).map(([k,v])=>`<td data-cell="${k}">${v}</td>`).join('')}</tr>`;}
function gapControls(s){return `<div class="gap-controls" role="group" aria-label="时间差显示模式">${['leader','interval'].map(value=>`<button class="btn small ${((s.settings.timingGap||'leader')===value)?'selected':''}" data-action="timingGap" data-payload="${h(JSON.stringify({value}))}" aria-pressed="${(s.settings.timingGap||'leader')===value}" title="${value==='leader'?'相对第一名的差距':'相对前一名的差距'}">${value.toUpperCase()}</button>`).join('')}</div>`;}
function weatherSummary(s){
  const r=s.race,track=currentTrack(s),rain=r.rain||0;
  const name=rain>.65?'大雨':rain>.2?'降雨':rain>.05?'小雨':r.wetness>.15?'雨停 · 路面湿滑':'晴朗 / 干燥';
  return `<div class="live-weather" aria-label="实时天气"><div class="weather-current">${icon(rain>.05?'rain':'thermometer')}<strong>${name}</strong></div><div class="weather-facts"><span>路面积水 <b>${number(r.wetness*100)}%</b></span><span>路温 <b>${track.temp}°C</b></span></div></div>`;
}
function controlBanner(s){
  const r=s.race,code=r.red?'RED':r.chequered?'CHEQUERED':r.control==='YELLOW'||r.yellow?'YELLOW':r.control;
  const labels={GREEN:['TRACK CLEAR','赛道开放'],YELLOW:['YELLOW FLAG','黄旗 · 注意减速，禁止超车'],SC:['SAFETY CAR','安全车出动 · 禁止超车'],VSC:['VIRTUAL SAFETY CAR','虚拟安全车 · 减速行驶'],RED:['RED FLAG','红旗暂停 · 等待恢复'],CHEQUERED:['CHEQUERED FLAG','方格旗 · 等待其余车手冲线']};
  const [title,description]=labels[code]||labels.GREEN;
  return `<div class="tower-control control-${h(code)}" role="status" aria-live="polite"><span class="control-symbol">${icon('flag')}</span><div><strong>${title}</strong><span>${description}</span></div></div>`;
}
function trackSvg(s){
  const track=currentTrack(s),g=geometry(track.id),start=trackPoint(track.id,0),end=trackPoint(track.id,.98),out=trackPoint(track.id,.02);
  return `<svg id="track-map" viewBox="0 0 800 740" aria-label="${h(track.name)}赛道实时位置，点击三字母缩写查看车手" role="group"><defs><pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#91a7bb" stroke-opacity=".035"/></pattern></defs><rect width="800" height="740" fill="url(#map-grid)"/><polyline points="${g.points.map(p=>p.join(',')).join(' ')}" class="circuit-shadow"/><polyline points="${g.points.map(p=>p.join(',')).join(' ')}" class="circuit-line"/>
    <path class="pit-lane" d="M${end.join(',')} Q${start[0]+40},${start[1]+40} ${out.join(',')}"/><text x="${start[0]+27}" y="${start[1]+48}" class="map-small">PIT</text><g transform="translate(${start.join(',')})"><rect x="-7" y="-9" width="14" height="18" fill="#e8eef6"/><path d="M-7-9H0V0H7V9H0V0H-7Z" fill="#121a25"/><text x="12" y="-13" class="map-small">START / FINISH</text></g>
    ${[.32,.68].map((f,i)=>{const p=trackPoint(track.id,f);return `<g transform="translate(${p.join(',')})"><circle r="7" fill="${i?'#67b9ff':'#d1a0ff'}"/><text x="12" y="-12" class="sector-label">S${i+1} / S${i+2}</text></g>`;}).join('')}
    ${s.race.cars.map(c=>{const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);return `<a data-dot="${h(c.driverId)}" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" tabindex="0" role="button" aria-label="${h(d.code+' '+d.name)}"><title>${h(d.name+' · '+t.name)}</title><circle class="dot-hit" r="18" fill="transparent"/><circle class="dot-halo" r="16"/><circle class="driver-dot" r="8" fill="${c.slot?'#101925':t.color}" stroke="${t.color}" stroke-width="${c.slot?4:2}"/><line class="dot-connector" stroke="${t.color}"/><g class="dot-label-wrap"><rect class="dot-label-bg" width="76" height="36" rx="5"/><text class="dot-label" x="38" y="18" text-anchor="middle" dominant-baseline="central" fill="${t.color}">${h(d.code)}</text></g></a>`;}).join('')}</svg>`;
}
function telemetry(s,c){
  const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId);
  return `<div class="map-telemetry" id="map-telemetry" data-focused-driver="${h(c.driverId)}" style="--team:${t.color}"><div class="telemetry-title"><strong data-focus="code">${h(d.code)}</strong><div><b data-focus="name">${h(d.name)}</b><small><span data-focus="team">${h(t.name)}</span> · <span data-focus="phase">${phase(c)}</span></small></div><span data-focus="tyre">${tyre(c.compound)}</span></div><div class="live-numbers"><div><small>当前圈计时</small><b data-focus="lap">${time(c.currentLap)}</b></div><div><small>模拟实时速度</small><b><span data-focus="speed">${number(c.speed)}</span><em> km/h</em></b></div></div><div class="sector-grid">${[0,1,2].map(i=>`<div data-sector="${i}" class="sector-box tone-${sectorTone(c,i)}"><small>S${i+1}<span data-sector-current="${i}"></span></small><b data-sector-time="${i}">${sectorValue(c,i)>0?time(sectorValue(c,i)):'—'}</b><span><strong data-sector-speed="${i}">${number(sectorSpeed(c,i))}</strong> km/h 均速</span></div>`).join('')}</div><div class="telemetry-foot"><span>上圈 <b data-focus="last">${time(c.lastLap)}</b></span><span>最佳 <b data-focus="best">${time(c.best)}</b></span><span>已完成 <b data-focus="completed">${c.lap}</b> 圈</span></div></div>`;
}
function command(s,c){
  const r=s.race,d=driverOf(s,c.driverId),q=r.qualifying,id=c.driverId;
  return `<article class="live-command" data-command-car="${h(id)}"><div class="split"><h3><span class="driver-chip">${h(d.code)}</span> ${h(d.name)}</h3><span data-live="phase">${badge(phase(c),phaseTone(c))}</span></div><div class="car-health"><span>${icon('fuel')}<b data-live="fuel">${number(c.fuel)}</b> kg</span><span>${icon('thermometer')}<b data-live="temp">${number(c.tyreTemperature)}</b>°C</span></div><div data-live="wear">${wearMeter(c.tyreWear)}</div>
    ${q?`<form data-form="qualSend"><input name="id" value="${h(id)}" type="hidden">${tyreField('出场配方','compound',allowedQualTyres(s,c)[0],{compact:true})}<div class="inline-form">${select('fresh',[['new','使用新胎'],['reuse','复用本段轮胎']],'new','aria-label="选择新胎或复用轮胎"')}<button class="btn primary" type="submit" data-q-send>驶出车库</button></div></form><div class="qual-commands">${button('出场圈后 → 飞行圈','qualCommand',{id,command:'fly'},{class:'small'})}${button('出场圈后 → 回 Pit','qualCommand',{id,command:'return'},{class:'small'})}${button('放弃飞行圈 → 回 Pit','qualCommand',{id,command:'abort'},{class:'small danger'})}${button('完成后 → 回场圈','qualCommand',{id,command:'return'},{class:'small'})}${button('完成后 → 再推一圈','qualCommand',{id,command:'repeat'},{class:'small'})}${button('自动出场：'+(c.autoQual?'开':'关'),'qualCommand',{id,command:'auto'},{class:'small'})}</div><p class="command-intent" data-live="intent"></p>`:
    `<label class="field"><span>驾驶指令</span>${select('mode',Object.entries(MODES).map(([k,v])=>[k,v.name]),c.mode,`data-live-command="mode" data-driver="${h(id)}"`)}</label><label class="field"><span>引擎模式</span>${select('engine',Object.entries(ENGINES).map(([k,v])=>[k,v.name]),c.engine,`data-live-command="engine" data-driver="${h(id)}"`)}</label><form data-form="pit"><input name="id" value="${h(id)}" type="hidden">${tyreField('下一次过线进站','value','H',{compact:true})}<div class="actions"><button class="btn primary small" type="submit">${icon('pit')}确认进站</button>${button('取消','command',{id,command:'cancelPit'},{class:'small'})}</div></form><p class="command-intent" data-live="intent"></p>`}
    <div data-live="inventory">${tyreInventory(s.calendar.weekend.tyres[id])}</div></article>`;
}
function liveView(s){
  const r=s.race,track=currentTrack(s),q=r.qualifying,c=focused(s);
  return `${header('LIVE TIMING / 比赛指挥',track.name+' · '+SESSION_NAMES[r.kind],q?'出场圈 → 飞行圈 → 回场圈。倒计时结束后，只能完成已开始的飞行圈。':'连续比赛时钟 · 车手独立计时 · 默认 1× 为现实时间',`<span class="live-indicator">LIVE</span>`)}
    <div class="live-toolbar"><div class="session-clock"><small>${q?r.kind+r.q.stage+' · '+(r.q.status==='BREAK'?'节间休息':'剩余时间'):'已用时间'}</small><strong data-live-clock>${clock(q?r.q.remaining:r.time,q)}</strong></div><div class="live-lap"><strong data-live-lap>${q?r.kind+r.q.stage:'LAP '+Math.min(r.lap+1,r.totalLaps)}</strong><small>${q?(r.kind==='SQ'?'12 / 10 / 8 MIN':'18 / 15 / 12 MIN'):' / '+r.totalLaps}</small></div>${flagState(r)}<div id="toolbar-weather">${weatherSummary(s)}</div><div class="speed-controls">${[1,2,4,8,16,32,64].map(v=>button(v+'×','speed',{value:v},{class:s.settings.speed===v?'selected':''})).join('')}</div><div class="actions">${button(r.running?'暂停':'继续','pause',{}, {class:'small'})}${button('快进一圈','tick',{}, {class:'small'})}${q?button('跳过节间休息','skipQualBreak',{}, {class:'small',disabled:r.q.status!=='BREAK'}):''}${button('自动完成','finishRace',{}, {class:'small',confirm:'按当前策略自动完成本场次；排位期间由 AI 安排本队出场。确认？'})}${button('红旗后恢复','resume',{}, {class:'small',disabled:!r.red})}</div></div>
    <div class="broadcast-grid"><section class="panel live-tower"><div id="tower-race-control">${controlBanner(s)}</div><div class="panel-heading"><h2>${icon('stopwatch')}实时排名</h2>${q?'<span class="muted">排位成绩</span>':gapControls(s)}</div><div class="table-scroll"><table class="broadcast-timing ${q?'qualifying-timing':'race-timing'}"><colgroup>${q?'<col style="width:32%"><col style="width:30%"><col style="width:24%"><col style="width:14%">':'<col style="width:41%"><col style="width:43%"><col style="width:16%">'}</colgroup><thead><tr>${q?'<th>车手</th><th>最佳圈</th><th>差距</th><th>轮胎</th>':`<th>车手</th><th data-gap-heading>${s.settings.timingGap==='interval'?'INTERVAL':'LEADER'}</th><th>轮胎</th>`}</tr></thead><tbody id="timing-body">${r.cars.map(x=>timingRow(s,x)).join('')}</tbody></table></div><p class="tower-note">${q?'点击车手查看遥测':'时间差 / 秒 · 点击任意一行聚焦车手'}</p></section>
    <section class="panel track-panel"><div class="map-heading"><div><p class="eyebrow">CIRCUIT TRACKER</p><h2>${h(track.city)}</h2></div><span>${track.length.toFixed(3)} KM · ${track.corners} TURNS</span></div>${trackSvg(s)}<div class="map-caption"><span>● 实心 / 空心：同队两台赛车</span><span>计时线示意 ${button('标注：'+(s.settings.mapLabels==='team'?'本队':'全场'),'mapLabels',{}, {class:'small map-label-toggle'})}</span></div>${telemetry(s,c)}</section>
    <aside class="live-commands"><h2>${icon('radio')}车队无线电</h2>${r.cars.filter(x=>x.teamId===s.player.teamId).sort((a,b)=>a.slot-b.slot).map(x=>command(s,x)).join('')}</aside></div>
    <div class="grid-2">${panel('赛事消息',`<div id="race-events" class="race-events">${r.events.slice(0,10).map(eventItem).join('')}</div>`)}${panel(q?'排位规则与状态':'比赛策略',q?`<p>${s.teams.length*2} 台赛车，前两段各淘汰 ${s.teams.length===11?6:5} 台，最后 10 台争夺杆位。无有效圈显示 NO TIME。</p><p>${r.kind==='SQ'?'干地 SQ1 / SQ2 每段只允许一套新中性胎，SQ3 一套软胎。':'成绩相同时，先做出该成绩者排名靠前。Q1 / Q2 之间休息 7 分钟，Q2 / Q3 之间休息 8 分钟。'}</p><p class="muted">${r.kind==='SQ'?'冲刺排位各段之间休息 7 分钟。':'107% 超时将标记为待裁判审查，游戏默认允许发车。'}飞行圈默认完成后回场；可提前选择连续推进。${r.q.status==='BREAK'?'本段已结束，可等待倒计时或跳过休息。':''}</p><details><summary>已完成各段成绩</summary>${r.q.stages.map((rows,i)=>`<h3>${r.kind}${i+1}</h3>${table(['名次','车手','时间'],rows.map((x,j)=>[j+1,h(driverOf(s,x.id).code),time(x.time)]))}`).join('')||'暂无'}</details>`:`<p>正赛干地须实际使用两种干胎；使用过雨胎可豁免。${track.id==='monaco'&&s.season.year>=2025?'摩纳哥至少两次停站。':''}</p><p class="muted">绿色旗帜下可使用 DRS；雨地、安全车与虚拟安全车期间禁用。出站损失计入连续比赛时间。离开此页面、切换到后台或打开对话框时暂停推进。</p>`)}</div>${raceDetails(s)}`;
}
const setText=(el,value)=>{if(el&&el.textContent!==String(value))el.textContent=value;};
const setHtml=(el,value)=>{if(el&&el._liveHTML!==value){el.innerHTML=value;el._liveHTML=value;}};
function patchLive(s){
  const r=s.race,track=currentTrack(s),body=document.querySelector('#timing-body');if(!body)return;
  setHtml(document.querySelector('#toolbar-weather'),weatherSummary(s));setHtml(document.querySelector('#tower-race-control'),controlBanner(s));
  setText(document.querySelector('[data-live-clock]'),clock(r.qualifying?r.q.remaining:r.time,r.qualifying));
  setText(document.querySelector('[data-live-lap]'),r.qualifying?r.kind+r.q.stage:'LAP '+Math.min(r.lap+1,r.totalLaps));
  const flag=document.querySelector('[data-race="control"]'),code=r.red?'RED':r.control;
  if(flag){flag.className='flag-state flag-'+code;setHtml(flag,`${icon('flag')}<span>${h({GREEN:'绿旗',SC:'安全车',VSC:'虚拟安全车',RED:'红旗暂停'}[code]||code)}</span>`);}
  const cells=new Map([...body.children].map(el=>[el.dataset.car,el])),markers=[];
  setText(document.querySelector('[data-gap-heading]'),s.settings.timingGap==='interval'?'INTERVAL':'LEADER');
  for(const btn of document.querySelectorAll('.gap-controls button')){const selected=JSON.parse(btn.dataset.payload).value===(s.settings.timingGap||'leader');btn.classList.toggle('selected',selected);btn.setAttribute('aria-pressed',String(selected));}
  for(const c of r.cars){
    const row=cells.get(c.driverId);for(const [k,v]of Object.entries(timingCells(s,c)))setHtml(row?.querySelector(`[data-cell="${k}"]`),v);
    if(row){row.classList.toggle('retired-row',c.retired);row.classList.toggle('focused-row',c.driverId===focused(s).driverId);const expected=body.children[c.position-1];if(expected!==row)body.insertBefore(row,expected||null);}
    const dot=document.querySelector(`[data-dot="${c.driverId}"]`);if(dot){
      const hidden=['GARAGE','ELIMINATED','GRID'].includes(c.phase)||c.retired;
      dot.style.display=hidden?'none':'';
      const p=trackPoint(track.id,c.progress);if(c.phase==='PIT'){p[0]+=25;p[1]+=25;}
      dot.setAttribute('transform',`translate(${p[0].toFixed(2)} ${p[1].toFixed(2)})`);
      const showLabel=!hidden&&(s.settings.mapLabels!=='team'||c.teamId===s.player.teamId||c.driverId===focused(s).driverId);
      dot.classList.toggle('hide-label',!showLabel);if(showLabel)markers.push({id:c.driverId,x:p[0],y:p[1]});
      dot.setAttribute('aria-pressed',String(c.driverId===focused(s).driverId));
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
  const svg=document.querySelector('#track-map');
  if(svg){const previous=svg._labelOffsets||{};const priority=markers.sort((a,b)=>Number(b.id===focused(s).driverId)-Number(a.id===focused(s).driverId)||a.id.localeCompare(b.id));
    const offsets={};for(const label of layoutMapLabels(priority,previous)){const dot=svg.querySelector(`[data-dot="${label.id}"]`);dot.querySelector('.dot-label-wrap').setAttribute('transform',`translate(${label.dx} ${label.dy})`);const line=dot.querySelector('.dot-connector');line.setAttribute('x2',label.dx+38);line.setAttribute('y2',label.dy+18);offsets[label.id]=[label.dx,label.dy];}svg._labelOffsets=offsets;
  }
  const c=focused(s),d=driverOf(s,c.driverId),t=teamOf(s,c.teamId),focus=document.querySelector('#map-telemetry');if(focus){
    focus.dataset.focusedDriver=c.driverId;focus.style.setProperty('--team',t.color);
    for(const [key,value]of Object.entries({code:d.code,name:d.name,team:t.name}))setText(focus.querySelector(`[data-focus="${key}"]`),value);
    for(const [k,v]of Object.entries({phase:phase(c),lap:time(c.currentLap),speed:number(c.speed),last:time(c.lastLap),best:time(r.qualifying?c.stageBest:c.best),completed:c.lap}))setText(focus.querySelector(`[data-focus="${k}"]`),v);
    setHtml(focus.querySelector('[data-focus="tyre"]'),tyre(c.compound));
    for(let i=0;i<3;i++){
      const box=focus.querySelector(`[data-sector="${i}"]`);box.className='sector-box tone-'+(sectorTone(c,i));const active=c.sector===i&&['RACE','OUT','FLY','IN','ABORT'].includes(c.phase);
      setText(focus.querySelector(`[data-sector-current="${i}"]`),active?'进行中':'');setText(focus.querySelector(`[data-sector-time="${i}"]`),active?time(Math.max(0,r.time-c.sectorStart)):sectorValue(c,i)>0?time(sectorValue(c,i)):'—');setText(focus.querySelector(`[data-sector-speed="${i}"]`),number(sectorSpeed(c,i)));
    }
  }
  patchDetails(s);
  setHtml(document.querySelector('#live-fastest'),fastestSummary(s,r.fastest));setHtml(document.querySelector('#race-events'),r.events.slice(0,10).map(eventItem).join(''));setText(document.querySelector('[data-live-wet]'),number(r.wetness*100)+'%');
}

function detailCells(s,c){
  const d=driverOf(s,c.driverId),t=teamOf(s,c.teamId),best=s.race.qualifying?c.stageBest:c.best;
  return {
    driver:`<button class="detail-driver" data-action="focusDriver" data-payload="${h(JSON.stringify({id:c.driverId}))}" style="--team:${h(t.color)}"><b>${h(d.code)}</b><span>${h(d.name)}</span></button>`,
    current:c.phase==='GARAGE'||c.phase==='ELIMINATED'?'—':time(c.currentLap),
    last:c.lastLap>0?lapDisplay(c.lastLap,{fastest:c.lastLap===s.race.fastest.time}):'—',
    best:lapDisplay(best,{fastest:s.race.fastest.driverId===c.driverId}),
    sectors:`<div class="detail-sectors">${[0,1,2].map(i=>`<span class="tone-${sectorTone(c,i)}"><small>S${i+1}</small>${sectorValue(c,i)>0?time(sectorValue(c,i)):'—'}</span>`).join('')}</div>`,
    age:`${c.tyreAge} 圈`,wear:wearMeter(c.tyreWear),fuel:number(c.fuel)+' kg',stops:c.stops,status:badge(phase(c),phaseTone(c))
  };
}
function pitHistory(s){
  const records=s.race.cars.flatMap(c=>(c.pitLog||[]).map((entry,i)=>({...entry,id:c.driverId,sequence:i+1}))).sort((a,b)=>(b.at??b.lap)-(a.at??a.lap)||a.id.localeCompare(b.id));
  if(!records.length)return '<p class="empty-pit-log">尚无进站换胎记录。</p>';
  return `<div class="table-scroll"><table class="pit-history-table"><thead><tr><th>比赛时间</th><th>车手</th><th>圈数</th><th>换胎</th><th>停站用时</th><th>总损失</th></tr></thead><tbody>${records.map(entry=>`<tr class="${s.race.cars.find(c=>c.driverId===entry.id)?.teamId===s.player.teamId?'player-row':''}"><td>${entry.at===undefined?'—':clock(entry.at,false)}</td><td><b>${h(driverOf(s,entry.id).code)}</b><small>${h(driverOf(s,entry.id).name)} · 第 ${entry.sequence} 停</small></td><td>L${entry.lap}</td><td><span class="pit-tyre-change">${entry.from?tyre(entry.from)+'<span>→</span>':''}${tyre(entry.compound)}</span></td><td>${Number(entry.stop).toFixed(2)} s</td><td>+${Number(entry.loss).toFixed(2)} s</td></tr>`).join('')}</tbody></table></div>`;
}
function raceDetails(s){
  return `<section class="panel live-race-details" id="race-details"><div class="panel-heading"><h2>${icon('chart')}圈速与进站数据</h2><span class="muted">全部车手 · 实时更新</span></div><div id="live-fastest">${fastestSummary(s,s.race.fastest)}</div><div class="table-scroll"><table class="race-detail-table"><thead><tr>${['车手','当前圈计时','上一圈','最佳圈','Sector 计时','胎龄','磨损','燃油','停站','状态'].map(label=>`<th>${label}</th>`).join('')}</tr></thead><tbody id="detail-timing-body">${s.race.cars.map(c=>`<tr data-detail-car="${h(c.driverId)}" class="${c.teamId===s.player.teamId?'player-row':''}">${Object.entries(detailCells(s,c)).map(([key,value])=>`<td data-detail-cell="${key}">${value}</td>`).join('')}</tr>`).join('')}</tbody></table></div><h3 class="pit-history-heading">${icon('pit')}进站换胎记录</h3><div id="pit-history">${pitHistory(s)}</div></section>`;
}
function patchDetails(s){
  const body=document.querySelector('#detail-timing-body');if(!body)return;
  const rows=new Map([...body.children].map(row=>[row.dataset.detailCar,row]));
  for(const c of s.race.cars){const row=rows.get(c.driverId);if(!row)continue;
    for(const [key,value]of Object.entries(detailCells(s,c)))setHtml(row.querySelector(`[data-detail-cell="${key}"]`),value);
    row.classList.toggle('focused-row',c.driverId===focused(s).driverId);
    const expected=body.children[c.position-1];if(expected!==row)body.insertBefore(row,expected||null);
  }
  setHtml(document.querySelector('#pit-history'),pitHistory(s));
}

return {clock, liveView, patchLive, raceDetails};
}());

// ===== 文件: js/ui/raceView.js =====
modules['js/ui/raceView.js'] = (function () {
const { liveView, patchLive, raceDetails } = modules['js/ui/liveView.js'];
// ===== 文件: js/ui/raceView.js =====
const { teamOf } = modules['js/core/helpers.js'];
const { currentTrack } = modules['js/core/calendar.js'];
const { SESSION_NAMES } = modules['js/data/i18n.js'];
const { MODES, ENGINES, COMPOUNDS } = modules['js/data/parts.js'];
const {
  h, header, panel, badge, button, link, table, time, number, icon, select, empty,
  tyre, tyreField, tyreInventory, tyreLegend, lapDisplay, wearMeter, severity,
  rankBadge, positionChange, raceStatus, flagState, eventItem, fastestSummary
} = modules['js/ui/uiKit.js'];

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
  ]),'race-result','',result.rows.map(row=>row.teamId===s.player.teamId?'player-row':''));
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
function renderRaceView(s) {
  const w=s.calendar.weekend,track=currentTrack(s),r=s.race;
  if(r?.realtime&&!r.finished)return liveView(s);
  if(!w)return `${header('比赛指挥','维修墙待命','先进入比赛周末，再执行练习、排位与比赛。')}${panel('下一站准备',`${empty(s.season.offseason?'当前处于转会窗。':'本站赛车尚未登记。')}${link('前往赛历','calendar','primary')}`)}`;
  if(!r||r.finished)return `${header('比赛指挥',track.name+' · '+(SESSION_NAMES[w.sessions[w.index]]||'周末结束'),'按对应年份的周末流程推进。')}${sessionControls(s)}${r?.qualifying&&r.finished?panel('排位赛各段成绩',r.q.stages.map((rows,i)=>`<details ${i===2?'open':''}><summary>${r.kind}${i+1}</summary>${table(['名次','车手','配方','成绩'],rows.map((x,j)=>[rankBadge(j+1),h(s.drivers.find(d=>d.id===x.id)?.code)+' · '+h(x.name),tyre(x.compound),lapDisplay(x.time,{fastest:j===0})]),'','',rows.map(x=>s.drivers.find(d=>d.id===x.id)?.teamId===s.player.teamId?'player-row':''))}</details>`).join('')):''}${r?.result?panel((r.sprint?'冲刺赛':'正赛')+'赛后报告',`${fastestSummary(s,r.fastest)}${timingLegend()}${resultTable(s,r.result)}<p class="muted">${s.season.rules.fastestLap?'正赛前十中的全场最快圈可获 1 分。':'本赛季最快圈不加分。'}</p><details><summary>罚则与事件记录</summary>${r.events.map(eventItem).join('')}</details><details><summary>分段成绩与位置轨迹</summary>${table(['圈数','领跑车手','累计时间'],r.segments.map(x=>[x.lap,h(s.drivers.find(d=>d.id===x.leader)?.name),time(x.time)]))}<canvas data-chart="positions" aria-label="本队位置变化图"></canvas></details>`):''}`;
  return `${header('比赛指挥 / 实时计时',track.name+' · '+SESSION_NAMES[r.kind],track.city+' · '+r.totalLaps+' 圈',`<span class="live-indicator">实时模拟</span>`)}
    <div class="race-toolbar"><div class="lap-count"><span data-race="lap">${r.lap}</span><small> / ${r.totalLaps} 圈</small></div>${flagState(r)}<div class="speed-controls">${[1,2,4,10].map(v=>button(v+'×','speed',{value:v},{class:s.settings.speed===v?'selected':''})).join('')}</div><div class="actions">${button(r.running?'暂停':'继续','pause',{}, {class:'small'})}${button('下一圈','tick',{count:1},{class:'small'})}${button('下一事件','tick',{count:1000,untilEvent:true},{class:'small'})}${button('模拟到底','finishRace',{}, {class:'small',confirm:'自动执行当前指令和策略直到终点，确认？'})}${button('红旗后恢复','resume',{}, {class:'small',disabled:!r.red})}</div></div>
    <div id="live-fastest">${fastestSummary(s,r.fastest)}</div>${timingLegend()}
    <div class="race-layout"><section class="panel tower"><div class="panel-heading"><h2>${icon('stopwatch')}实时计时塔</h2><span class="muted">差距相对领先者 / 秒</span></div><div class="table-scroll"><table class="timing-table"><thead><tr><th>位置</th><th>车手 / 车队</th><th>领先差距</th><th>上一圈</th><th>最佳圈</th><th>配方 / 胎龄</th><th>磨损</th><th>停站</th><th>状态</th></tr></thead><tbody id="timing-body">${r.cars.map(c=>liveRow(s,c)).join('')}</tbody></table></div></section><aside class="command-column">${r.cars.filter(c=>c.teamId===s.player.teamId).sort((a,b)=>a.slot-b.slot).map(c=>carControl(s,c)).join('')}</aside></div>
    <div class="grid-2">${panel('气象与雨带预报',`<div class="weather-overview"><strong data-race="weather">${icon('rain')}路面积水 ${number(r.wetness*100)}%</strong><span>${icon('thermometer')}${track.temp}°C 基准路温</span></div><div class="weather-radar">${r.forecast.map(cell=>`<div title="第 ${cell.lap} 圈，预报降雨强度 ${number(cell.rain*100)}%，可信度 ${number(cell.confidence)}%"><i style="height:${Math.max(6,cell.rain*75)}px"></i><small>L${cell.lap}</small></div>`).join('')}</div><p class="muted">阴影柱表示预报雨带强度；路面湿度滞后于降雨。DRS 在湿地与安全车期间禁用。</p>`)}${panel('车队无线电与事件',`<div class="race-events" id="race-events">${r.events.slice(0,12).map(eventItem).join('')}</div>`)}</div>`;
}
// 只替换改变的单元格内容与现有行顺序；不会重建行或驾驶 / 换胎控件。
function patchRace(s) {
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
function reportHtml(s,index) {
  const result=s.history.races[index];
  return result?`<p>${h(result.track)} · 第 ${result.round} 站 · ${result.kind==='SPRINT'?'冲刺':'正赛'}</p>${fastestSummary(s,result.fastest)}${resultTable(s,result)}<details><summary>罚则记录</summary>${result.penalties.map(p=>`<p>${badge('L'+p.lap,'warning','warning')} ${h(p.reason)} ${p.seconds?badge('+'+p.seconds+'s','danger'):''}</p>`).join('')||'<p>无罚则</p>'}</details>`:empty('该报告不存在。');
}

function raceView(s){
  const content=renderRaceView(s);
  return s.calendar.weekend&&s.race?.realtime&&s.race.finished?content+raceDetails(s):content;
}

return {patchRace, reportHtml, raceView};
}());

// ===== 文件: js/ui/standingsView.js =====
modules['js/ui/standingsView.js'] = (function () {
// ===== 文件: js/ui/standingsView.js =====
const {
  teamOf, teamStandings, driverStandings
} = modules['js/core/helpers.js'];
const {
  h, header, panel, table, badge, progress, time, empty, lapDisplay, rankBadge, icon
} = modules['js/ui/uiKit.js'];
function standingsView(s) {
  const teams=teamStandings(s),drivers=driverStandings(s),current=s.history.races.filter(r=>r.kind==='RACE'&&s.calendar.events.some(e=>e.result?.rows[0]?.driverId===r.rows[0]?.driverId&&e.result?.track===r.track));
  return `${header('锦标赛档案',s.season.year+' 赛季积分榜','同分按正赛最高名次次数逐级比较；同样成绩时按既有种子顺序排列。')}
 ${progress(s.calendar.round,s.calendar.events.length,'赛季进度 '+s.calendar.round+' / '+s.calendar.events.length)}
 <div class="grid-2">${panel('制造商积分',table(['名次','车队','积分','正赛冠军'],teams.map((t,i)=>[rankBadge(i+1)+(t.id===s.player.teamId?' '+badge('本队','info'):''),`<span class="team-line" style="--row-color:${h(t.color)}"></span>${h(t.name)}`,'<strong>'+t.points+'</strong>',t.wins]),'constructors','',teams.map(t=>t.id===s.player.teamId?'player-row':'')))}${panel('车手积分',table(['名次','车手','车队','积分','冠军','最快圈'],drivers.map((d,i)=>[rankBadge(i+1),h(d.name),h(s.teams.find(t=>t.id===d.teamId)?.abbr||'自由车手'),'<strong>'+d.points+'</strong>',d.wins,`<span class="metric tone-fastest">${icon('stopwatch')}${d.fastest}</span>`]),'drivers-standings','',drivers.map(d=>d.teamId===s.player.teamId?'player-row':'')))}</div>
 ${panel('车队积分走势',`<canvas data-chart="points" data-type="line" data-height="220" aria-label="本队积分走势"></canvas>`)}
 ${panel('每站积分明细',table(['车队',...s.calendar.events.map((e,i)=>'R'+(i+1))],teams.map(t=>[h(t.name),...s.calendar.events.map((e,i)=>t.results.filter(r=>r.round===i+1).reduce((a,r)=>a+r.points,0)||'—')]),'round-points','',teams.map(t=>t.id===s.player.teamId?'player-row':'')))}
 ${panel('分站档案',s.history.races.length?table(['站次','赛道','场次','冠军','最快圈','报告'],s.history.races.map((r,i)=>[r.round,h(r.track),r.kind==='SPRINT'?'冲刺':'正赛',h(r.rows[0]?.name||'无'),lapDisplay(r.fastest.time,{fastest:true}),`<button class="btn small" data-report="${i}">查看成绩</button>`]),'race-archive'):empty('比赛结束后，这里将保存分站冠军、最快圈与完整报告。'))}
 ${panel('荣誉室与历年记录',s.history.seasons.length?table(['赛季','制造商冠军','车手冠军','本队名次'],s.history.seasons.map(x=>[x.year,h(x.teams[0]?.name),h(x.drivers[0]?.name),'P'+x.playerRank])):empty('完成首个赛季后，年度排名与冠军将进入荣誉室。'))}`;
}

return {standingsView};
}());

// ===== 文件: js/ui/saveView.js =====
modules['js/ui/saveView.js'] = (function () {
// ===== 文件: js/ui/saveView.js =====
const {
  SLOT_NAMES, slotInfo
} = modules['js/core/save.js'];
const {
  h, header, panel, badge, field
} = modules['js/ui/uiKit.js'];
function saveView(s) {
  return `${header('生涯档案','存档与备份','三个手动槽位与独立自动存档。JSON 备份可跨浏览器、跨设备导入。')}
 ${panel('本地存档槽',`<div class="facility-grid">${Object.entries(SLOT_NAMES).map(([slot,label])=>{const info=slotInfo(slot);return `<article class="facility"><div class="split"><h3>${h(label)}</h3>${badge(info?.broken?'损坏':info?'可读取':'空')}</div><p>${info&&!info.broken?h(info.team)+' · '+info.year+' 赛季':'尚无有效数据'}</p><p class="muted">${info?.savedAt?h(new Date(info.savedAt).toLocaleString('zh-CN')):'—'}</p><div class="actions">${slot==='auto'?'':`<button class="btn" data-save="${slot}">写入此槽</button>`}<button class="btn" data-load="${slot}" ${info?'':'disabled'}>读取</button><button class="btn danger small" data-delete-save="${slot}" ${info?'':'disabled'}>删除</button></div></article>`;}).join('')}</div><label class="check"><input type="checkbox" data-autosave ${s.settings.autosave?'checked':''}>关键操作后自动保存（比赛中每 5 秒保存一次）</label>`)}
 <div class="grid-2">${panel('导出 JSON',`<p class="muted">下载完整存档，或复制文本框内容。导出包括随机状态与比赛中的全部指令。</p><div class="actions"><button class="btn primary" data-export>下载 JSON 文件</button><button class="btn" data-export-text>显示 JSON 文本</button></div><label class="field"><span>导出文本</span><textarea id="export-text" rows="10" readonly aria-label="导出存档 JSON"></textarea></label><button class="btn small" data-copy>复制到剪贴板</button>`)}${panel('导入 JSON',`<form data-form="import"><label class="field"><span>选择备份文件</span><input id="import-file" type="file" accept=".json,application/json"></label><label class="field"><span>或粘贴完整 JSON</span><textarea name="json" id="import-text" rows="10" required aria-label="导入存档 JSON"></textarea></label><button class="btn primary" type="submit">验证并导入</button><p class="muted">损坏或版本不兼容的存档会被拒绝，当前生涯保持不变。</p></form>`)}</div>
 ${panel('新生涯',`<p class="muted">重新选择赛季或创建第 11 支车队。建议先保存到手动槽或导出 JSON。</p><button class="btn danger" data-new-game>新建游戏</button>`)}`;
}

return {saveView};
}());

// ===== 文件: js/ui/setupWizard.js =====
modules['js/ui/setupWizard.js'] = (function () {
// ===== 文件: js/ui/setupWizard.js =====
const {
  seasonTeams, ALTERNATIVE_LINEUPS, SUPPLIERS
} = modules['js/data/teams.js'];
const {
  DRIVER_DATA, RESERVES
} = modules['js/data/drivers-data.js'];
const {
  LOGOS, logo
} = modules['js/data/logos.js'];
const {
  h, badge, field, select, money, carArt
} = modules['js/ui/uiKit.js'];
function setupWizard(draft={
},hasSave=false) {
  const year=Number(draft.year||2025),teams=seasonTeams(year,Number(draft.alternate??-1)),selected=teams.find(t=>t.id===draft.teamId)||teams[0],custom=draft.mode==='custom';
  const free=RESERVES[year].filter(id=>!teams.some(t=>t.drivers.includes(id)));
  return `<div class="wizard-shell"><aside class="wizard-cover"><a class="wordmark" href="#setup"><span class="brand-slashes">▰▰</span> 维修墙<span>车队经理</span></a><div class="cover-title"><p class="eyebrow">你的车队。你的决定。</p><h1>从维修墙，<br>指挥整个赛季。</h1><p>赛车研发、车手转会、进站窗口。<br>把每一个决策，变成赛道上的优势。</p></div><div class="cover-car">${carArt(selected.color)}</div><div class="cover-bottom"><span>2022 — 2025</span><span>离线可玩 · 本地存档</span></div><span class="cover-number" aria-hidden="true">${year}</span></aside>
 <main id="main-content" class="wizard-main"><div class="wizard-top"><div><p class="eyebrow">新经理生涯</p><h2>建立你的赛季</h2></div>${hasSave?'<button class="btn" data-load="auto">继续自动存档</button>':''}</div><form id="setup-form" data-form="newGame"><section class="wizard-section"><div class="step-heading"><span>01</span><h3>选择时代</h3><small>历史赛历与真实开季阵容</small></div><div class="form-grid">${field('赛季',select('year',[2022,2023,2024,2025],year,'data-wizard-change'))}${field('阵容快照',select('alternate',[[-1,'默认开季阵容'],...ALTERNATIVE_LINEUPS[year].map((a,i)=>[i,a.label])],draft.alternate??-1,'data-wizard-change'))}</div><p class="muted">${year<=2023?'22 站完整赛历':'24 站完整赛历'} · ${year<=2024?'前十最快圈加 1 分':'最快圈不再加分'} · ${year===2022?'冲刺结果决定正赛发车顺序':year===2023?'周五正赛排位，周六独立冲刺':'周五冲刺排位，周六冲刺后进行正赛排位'}</p></section>
 <section class="wizard-section"><div class="step-heading"><span>02</span><h3>选择挑战</h3></div><div class="mode-grid"><label class="mode-card ${custom?'':'active'}"><input type="radio" name="mode" value="existing" ${custom?'':'checked'} data-wizard-change><strong>接管现有车队</strong><span>继承阵容、员工与工厂，完成董事会目标。</span></label><label class="mode-card ${custom?'active':''}"><input type="radio" name="mode" value="custom" ${custom?'checked':''} data-wizard-change><strong>第 11 支车队</strong><span>从零起步，打造属于你的赛车品牌。</span></label></div>
 ${custom?`<div class="form-grid customization">${field('车队名称',`<input name="name" maxlength="32" required value="${h(draft.name||'Aurora Racing')}">`)}${field('三字母缩写',`<input name="abbr" maxlength="3" pattern="[A-Za-z]{3}" required value="${h(draft.abbr||'AUR')}">`)}${field('主色',`<input type="color" name="color" value="${h(draft.color||'#68e8b5')}">`)}${field('副色',`<input type="color" name="secondary" value="${h(draft.secondary||'#eff8ff')}">`)}${field('制造商类型',select('type',[['customer','客户车队 · 购买动力单元'],['factory','厂商车队 · 自研动力单元']],draft.type||'customer'))}${field('引擎供应商',select('supplier',['Mercedes','Ferrari','HondaRBPT','Renault'].map(k=>[k,SUPPLIERS[k].name+' · 年采购 '+money(SUPPLIERS[k].price)]),draft.supplier||'Mercedes'))}</div><p class="field-label">选择队徽 · 24 款原创几何标志</p><div class="logo-picker">${LOGOS.map((_,i)=>`<label class="logo-option"><input type="radio" name="logo" value="${i}" ${Number(draft.logo||0)===i?'checked':''} aria-label="几何队徽 ${i+1}">${logo(i,draft.color||'#68e8b5',draft.secondary||'#eff8ff')}</label>`).join('')}</div><div class="form-grid">${[0,1].map(i=>`<div class="setup-driver">${field((i+1)+' 号车手来源',select('driverId'+i,[['custom','自建车手'],...free.map(id=>[id,DRIVER_DATA[id].name])],draft['driverId'+i]||'custom'))}${field('自建车手姓名',`<input name="driverName${i}" maxlength="32" value="${h(draft['driverName'+i]||(i?'Alex Morgan':'Ren Aoki'))}">`)}</div>`).join('')}${field('自建车手初始年龄',`<input name="age" type="number" min="18" max="45" value="${h(draft.age||21)}" required>`)}${field('自建车手初始能力',`<input name="pace" type="number" min="60" max="80" value="${h(draft.pace||74)}" required>`,'60—80；年轻车手后续有更多成长空间')}</div><p class="notice">新车队须支付 $12m 入场担保金；客户初始现金 $55m，厂商 $48m（均未扣担保金）。初始工厂和声望低于现有车队。</p>`:`<input type="hidden" name="teamId" value="${h(selected.id)}"><div class="team-picker">${teams.map(t=>`<button type="button" class="team-option ${selected.id===t.id?'active':''}" data-choose-team="${h(t.id)}" style="--team:${h(t.color)}">${logo(t.logo,t.color)}<span><strong>${h(t.name)}</strong><small>${t.drivers.map(id=>h(DRIVER_DATA[id].name.split(' ').at(-1))).join(' / ')}</small></span><span class="team-rating">${t.performance}</span></button>`).join('')}</div><div class="selected-team"><strong>${h(selected.fullName)}</strong><p>${h(selected.hq)} · ${h(SUPPLIERS[selected.supplier].name)} · ${selected.type==='factory'?'厂商':'客户'}</p><span>起始现金 ${money(selected.cash)} ${badge('声望 '+selected.reputation)}</span></div>`}</section>
 <section class="wizard-section"><div class="step-heading"><span>03</span><h3>设定生涯</h3></div><div class="form-grid">${field('难度',select('difficulty',[['easy','简单 · 更多宽容'],['standard','标准 · 完整经营挑战'],['hard','硬核 · 更强 AI 与严格董事会']],draft.difficulty||'standard'))}${field('随机种子',`<input name="seed" maxlength="100" value="${h(draft.seed||'APEX-2025')}" required>`,'相同种子与相同决策，可复现模拟结果')}</div><div class="actions"><button type="button" class="btn small" data-generate-seed>随机生成新种子</button></div><p class="muted">非官方同人模拟。车手能力、车队性能与所有经营金额为游戏化平衡值。仅在浏览器本地保存，无账号、无网络请求。</p><button class="btn primary start-career" type="submit">开始经理生涯 <span>→</span></button></section></form></main></div>`;
}

return {setupWizard};
}());

// ===== 文件: js/main.js =====
modules['js/main.js'] = (function () {
const { generateSeed } = modules['js/core/rng.js'];
// ===== 文件: js/main.js =====
const {
  NAV, SESSION_NAMES
} = modules['js/data/i18n.js'];
const {
  seasonTeams
} = modules['js/data/teams.js'];
const {
  DIMENSIONS, COMPOUNDS
} = modules['js/data/parts.js'];
const {
  getState, setState, createGame, dispatch
} = modules['js/core/state.js'];
const {
  teamOf, copy
} = modules['js/core/helpers.js'];
const {
  currentEvent, currentTrack
} = modules['js/core/calendar.js'];
const {
  performance, tyreChartData
} = modules['js/core/car.js'];
const {
  projectQuote
} = modules['js/core/rnd.js'];
const {
  saveSlot, loadSlot, slotInfo, deleteSlot, exportText, importText
} = modules['js/core/save.js'];
const {
  dashboard
} = modules['js/ui/dashboard.js'];
const {
  carView
} = modules['js/ui/carView.js'];
const {
  rndView
} = modules['js/ui/rndView.js'];
const {
  staffView
} = modules['js/ui/staffView.js'];
const {
  driversView
} = modules['js/ui/driversView.js'];
const {
  financeView
} = modules['js/ui/financeView.js'];
const {
  calendarView
} = modules['js/ui/calendarView.js'];
const {
  raceView, patchRace, reportHtml
} = modules['js/ui/raceView.js'];
const {
  standingsView
} = modules['js/ui/standingsView.js'];
const {
  saveView
} = modules['js/ui/saveView.js'];
const {
  setupWizard
} = modules['js/ui/setupWizard.js'];
const {
  h, icon, teamBadge, money, progress, toast, openDialog, confirmDialog, field, select, drawChart
} = modules['js/ui/uiKit.js'];
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

return {};
}());
}());

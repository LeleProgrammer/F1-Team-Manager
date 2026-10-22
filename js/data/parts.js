// ===== 文件: js/data/parts.js =====
export const DIMENSIONS = {
  downforce:'下压力',aero:'气动效率',grip:'机械抓地',suspension:'路肩适应',brakes:'制动',power:'动力功率',ers:'能量部署',reliability:'可靠性',tyres:'轮胎友好',weight:'轻量化'
};
export const PARTS = [ ['front','前翼','aero','downforce',1.8,8,99],['rear','尾翼','aero','aero',1.8,8,99],['floor','底板','aero','downforce',3.8,14,99],['sidepod','侧箱','aero','aero',2.8,11,99],['suspension','悬挂','chassis','grip',2.1,10,99],['gearbox','变速箱','chassis','suspension',1.6,9,4],['ice','内燃机','power','power',4.8,18,3],['turbo','涡轮','power','power',3.1,14,3],['mguk','MGU-K','power','ers',2.8,14,3],['mguh','MGU-H','power','ers',2.6,14,3],['battery','电池','power','ers',2.2,12,2],['electronics','电子系统','power','ers',1.7,9,2],['brakes','制动系统','chassis','brakes',1.5,8,99],['cooling','散热','reliability','reliability',1.4,7,99] ].map(([id,name,department,dimension,cost,days,quota])=>({
  id,name,department,dimension,cost,days,quota
}));
export function partQuota(part,year) {
  return ['ice','turbo','mguk','mguh'].includes(part.id)&&year>=2023?4:part.quota;
}
export const DEPARTMENTS = {
  aero:'空气动力部',chassis:'底盘机械部',power:'动力单元部',reliability:'可靠性部',strategy:'策略赛道工程部',manufacturing:'制造生产部'
};
export const FACILITIES = {
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
export const COMPOUNDS = {
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
export const MODES = {
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
export const ENGINES = {
  high:{
    name:'高功率',pace:-0.2,wear:1.55,fuel:1.06
  },normal:{
    name:'常规',pace:0,wear:1,fuel:1
  },save:{
    name:'保寿命',pace:0.28,wear:0.7,fuel:0.94
  }
};

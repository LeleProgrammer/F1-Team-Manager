// ===== 文件: js/data/teams.js =====
// 基础史实字段与游戏数值分开：performance、cash、设施等级均非官方。
export const SUPPLIERS = {
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
export const LINEUPS = {
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
export const ALTERNATIVE_LINEUPS = {
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
export const PERFORMANCE = {
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
export const PREVIOUS_RANKS = {
  2022:['mercedes','redbull','ferrari','mclaren','alpine','junior','aston','williams','sauber','haas'],2023:['redbull','ferrari','mercedes','alpine','mclaren','sauber','aston','haas','junior','williams'],2024:['redbull','mercedes','ferrari','mclaren','aston','alpine','williams','junior','sauber','haas'],2025:['mclaren','ferrari','redbull','mercedes','aston','alpine','haas','junior','williams','sauber']
};
export function seasonTeams(year,alternate=-1) {
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

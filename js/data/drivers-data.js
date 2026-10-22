// ===== 文件: js/data/drivers-data.js =====
// 所有能力、薪资、潜力均为非官方游戏化平衡值；年龄按赛季年减出生年。
export const ATTRS = {
  pace:'总体速度',qualifying:'单圈速度',racePace:'正赛节奏',racecraft:'超车',defending:'防守',tyres:'轮胎管理',wet:'湿地能力',starts:'起步',consistency:'稳定性',feedback:'研发反馈',fitness:'体能',aggression:'攻击性',experience:'经验',potential:'潜力'
};
const rows = [ ['verstappen','Max Verstappen',1,'荷兰',1997,95,98,94,18], ['perez','Sergio Pérez',11,'墨西哥',1990,86,88,87,9], ['leclerc','Charles Leclerc',16,'摩纳哥',1997,92,97,94,13], ['sainz','Carlos Sainz',55,'西班牙',1994,89,91,91,10], ['hamilton','Lewis Hamilton',44,'英国',1985,93,94,94,20], ['russell','George Russell',63,'英国',1998,90,94,94,11], ['norris','Lando Norris',4,'英国',1999,91,94,96,12], ['ricciardo','Daniel Ricciardo',3,'澳大利亚',1989,83,86,86,7], ['alonso','Fernando Alonso',14,'西班牙',1981,91,91,92,14], ['ocon','Esteban Ocon',31,'法国',1996,84,86,88,6], ['gasly','Pierre Gasly',10,'法国',1996,85,88,89,7], ['tsunoda','Yuki Tsunoda',22,'日本',2000,81,86,88,3], ['vettel','Sebastian Vettel',5,'德国',1987,86,87,87,12], ['stroll','Lance Stroll',18,'加拿大',1998,78,79,81,4], ['albon','Alexander Albon',23,'泰国',1996,84,89,89,5], ['latifi','Nicholas Latifi',6,'加拿大',1995,69,72,73,1.5], ['bottas','Valtteri Bottas',77,'芬兰',1989,85,90,87,8], ['zhou','Zhou Guanyu',24,'中国',1999,76,79,83,2], ['magnussen','Kevin Magnussen',20,'丹麦',1992,81,85,83,4], ['schumacher','Mick Schumacher',47,'德国',1999,74,77,84,2], ['piastri','Oscar Piastri',81,'澳大利亚',2001,85,89,97,6], ['devries','Nyck de Vries',21,'荷兰',1995,72,75,80,1.5], ['sargeant','Logan Sargeant',2,'美国',2000,71,74,80,1], ['hulkenberg','Nico Hülkenberg',27,'德国',1987,84,90,86,6], ['lawson','Liam Lawson',30,'新西兰',2002,77,81,89,2], ['antonelli','Kimi Antonelli',12,'意大利',2006,78,83,97,3], ['doohan','Jack Doohan',7,'澳大利亚',2003,73,77,87,1.5], ['hadjar','Isack Hadjar',6,'法国',2004,77,82,93,2], ['bearman','Oliver Bearman',87,'英国',2005,77,82,94,2], ['bortoleto','Gabriel Bortoleto',5,'巴西',2004,76,80,94,2], ['colapinto','Franco Colapinto',43,'阿根廷',2003,76,80,89,2], ['drugovich','Felipe Drugovich',34,'巴西',2000,75,78,87,1.5], ['pourchaire','Théo Pourchaire',98,'法国',2003,74,78,90,1.3], ['iwasa','Ayumu Iwasa',40,'日本',2001,73,77,88,1.2], ['vandoorne','Stoffel Vandoorne',42,'比利时',1992,77,80,81,2], ['fittipaldi','Pietro Fittipaldi',51,'巴西',1996,69,72,77,1] ];
export const DRIVER_DATA = Object.fromEntries(rows.map(([id,name,number,nationality,birth,pace,qualifying,potential,salary],i)=>[id,{
  id,name,number,nationality,birth,salary,attributes:{
    pace,qualifying,racePace:pace+(i%3)-1,racecraft:Math.min(98,pace+2),defending:pace,tyres:Math.min(97,pace+3),wet:Math.max(60,pace+(i%5)-2),starts:pace-1,consistency:Math.min(98,pace+2),feedback:Math.min(97,pace+2),fitness:88-i%8,aggression:72+i%23,experience:Math.min(99,Math.max(10,(2025-birth-17)*4)),potential
  }
}]));
// 赛季初相对实力调整，避免把成熟期能力倒灌进新秀赛季。
export const YEAR_ADJUSTMENTS = {
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
export const RESERVES = {
  2022:['hulkenberg','piastri','vandoorne','fittipaldi'],2023:['ricciardo','lawson','drugovich','schumacher','pourchaire'],2024:['lawson','bearman','doohan','colapinto','drugovich','pourchaire'],2025:['perez','bottas','zhou','ricciardo','drugovich','colapinto','iwasa']
};

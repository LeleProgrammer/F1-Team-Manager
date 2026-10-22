// ===== 文件: js/data/tracks.js =====
// 长度/圈数取通常完整赛程；基准圈速、气象与策略系数是游戏化参数。
const raw = [ ['bahrain','巴林','巴林','Sakhir',5.412,57,15,92,1.3,.35,22,80,420,3,31,.06,.25,'traction','重刹与后轮牵引，夜间赛温度逐渐下降。'], ['saudi','沙特阿拉伯','沙特阿拉伯','Jeddah',6.174,50,27,91,0.8,.4,23,80,450,3,30,.05,.65,'fast','高速街道，墙边容错小，安全车概率较高。'], ['australia','澳大利亚','澳大利亚','Melbourne',5.278,58,14,81,1,.4,22,80,430,4,28,.25,.55,'fast','高速变向和路肩，轮胎温度需要管理。'], ['imola','艾米利亚-罗马涅','意大利','Imola',4.909,63,19,78,1,.78,27,80,550,1,28,.3,.45,'downforce','狭窄而难超车，进站损失大，强调排位。'], ['miami','迈阿密','美国','Miami',5.412,57,19,90,1.1,.48,21,80,410,3,38,.2,.4,'traction','炎热路面与低速组合弯，冷却和牵引关键。'], ['spain','西班牙','西班牙','Barcelona',4.657,66,14,79,1.5,.55,23,80,450,2,36,.15,.25,'downforce','高速长弯持续压迫轮胎，气动效率与耐久并重。'], ['monaco','摩纳哥','摩纳哥','Monte Carlo',3.337,78,19,75,.6,.98,20,60,310,1,27,.2,.75,'street','几乎无法超车，设定、排位与进站窗口决定比赛。'], ['azerbaijan','阿塞拜疆','阿塞拜疆','Baku',6.003,51,20,104,.75,.3,22,80,440,2,29,.1,.65,'low','超长直道与古城窄弯，低阻和制动同样重要。'], ['canada','加拿大','加拿大','Montreal',4.361,70,14,75,1,.38,19,80,360,3,26,.32,.6,'traction','重刹、路肩和墙边出口，制动系统压力大。'], ['britain','英国','英国','Silverstone',5.891,52,18,89,1.4,.45,23,80,460,2,26,.4,.35,'downforce','高速弯链与侧向载荷，风雨变化常影响策略。'], ['austria','奥地利','奥地利','Spielberg',4.318,71,10,68,1.1,.28,20,80,400,3,30,.32,.4,'fast','短圈、海拔与严格赛道限制，交通密集。'], ['france','法国','法国','Le Castellet',5.842,53,15,95,1.25,.48,24,80,460,2,39,.08,.2,'downforce','长直道和高速弯相连，前胎温度不容忽视。'], ['hungary','匈牙利','匈牙利','Budapest',4.381,70,14,82,1.2,.85,21,80,410,2,37,.25,.25,'downforce','连续中低速弯，高下压力；脏空气损失明显。'], ['belgium','比利时','比利时','Spa-Francorchamps',7.004,44,19,108,1.2,.3,23,80,470,2,23,.5,.5,'fast','单圈最长，气候多变，高速与低阻需要折中。'], ['netherlands','荷兰','荷兰','Zandvoort',4.259,72,14,75,1.3,.85,21,60,340,2,27,.35,.5,'downforce','倾斜弯与狭窄赛道，前轮负荷高。'], ['italy','意大利','意大利','Monza',5.793,53,11,83,.8,.22,24,80,470,2,31,.2,.35,'low','低下压力与长直道，DRS 和刹车效率突出。'], ['singapore','新加坡','新加坡','Singapore',4.94,62,19,97,1.15,.8,28,60,410,3,34,.4,.8,'street','闷热夜赛，慢弯频繁，安全车可能改写局面。'], ['japan','日本','日本','Suzuka',5.807,53,18,91,1.4,.65,23,80,460,2,27,.45,.4,'downforce','高速 S 弯，前轴响应、节奏与轮胎管理关键。'], ['usa','美国','美国','Austin',5.513,56,20,98,1.35,.4,22,80,420,2,33,.25,.4,'downforce','颠簸和连续变向，综合性能考验。'], ['mexico','墨西哥','墨西哥','Mexico City',4.304,71,17,79,.85,.45,22,80,430,3,32,.18,.45,'traction','高海拔冷却困难，低速抓地与动力部署重要。'], ['brazil','圣保罗','巴西','São Paulo',4.309,71,15,74,1.15,.25,21,80,410,2,29,.45,.6,'traction','短圈、起伏和常见阵雨，安全车窗口价值高。'], ['abudhabi','阿布扎比','阿联酋','Yas Island',5.281,58,16,89,.9,.4,22,80,420,2,30,.04,.25,'traction','黄昏到夜间，长直道与中低速弯相连。'], ['qatar','卡塔尔','卡塔尔','Lusail',5.419,57,16,85,1.5,.55,25,80,500,1,35,.06,.25,'downforce','高速长弯和高胎压负荷，轮胎过热风险大。'], ['vegas','拉斯维加斯','美国','Las Vegas',6.201,50,17,96,.65,.25,22,80,430,2,16,.08,.65,'low','低温夜赛与超长直道，暖胎困难。'], ['china','中国','中国','Shanghai',5.451,56,16,94,1.25,.38,23,80,460,2,25,.35,.35,'traction','大半径弯加超长后直道，左前胎和牵引力关键。'] ];
export const TRACKS = Object.fromEntries(raw.map(([id,name,country,city,length,laps,corners,baseTime,wear,overtake,pitLoss,pitSpeed,pitLength,drs,temp,rain,sc,type,notes])=>[id,{
  id,name,country,city,length,laps,corners,baseTime,wear,overtake,pitLoss,pitSpeed,pitLength,drs,temp,rain,sc,type,notes
}]));
export const SCHEDULES = {
  2022:'bahrain:03-20 saudi:03-27 australia:04-10 imola:04-24 miami:05-08 spain:05-22 monaco:05-29 azerbaijan:06-12 canada:06-19 britain:07-03 austria:07-10 france:07-24 hungary:07-31 belgium:08-28 netherlands:09-04 italy:09-11 singapore:10-02 japan:10-09 usa:10-23 mexico:10-30 brazil:11-13 abudhabi:11-20', 2023:'bahrain:03-05 saudi:03-19 australia:04-02 azerbaijan:04-30 miami:05-07 monaco:05-28 spain:06-04 canada:06-18 austria:07-02 britain:07-09 hungary:07-23 belgium:07-30 netherlands:08-27 italy:09-03 singapore:09-17 japan:09-24 qatar:10-08 usa:10-22 mexico:10-29 brazil:11-05 vegas:11-18 abudhabi:11-26', 2024:'bahrain:03-02 saudi:03-09 australia:03-24 japan:04-07 china:04-21 miami:05-05 imola:05-19 monaco:05-26 canada:06-09 spain:06-23 austria:06-30 britain:07-07 hungary:07-21 belgium:07-28 netherlands:08-25 italy:09-01 azerbaijan:09-15 singapore:09-22 usa:10-20 mexico:10-27 brazil:11-03 vegas:11-23 qatar:12-01 abudhabi:12-08', 2025:'australia:03-16 china:03-23 japan:04-06 bahrain:04-13 saudi:04-20 miami:05-04 imola:05-18 monaco:05-25 spain:06-01 canada:06-15 austria:06-29 britain:07-06 belgium:07-27 hungary:08-03 netherlands:08-31 italy:09-07 azerbaijan:09-21 singapore:10-05 usa:10-19 mexico:10-26 brazil:11-09 vegas:11-22 qatar:11-30 abudhabi:12-07'
};
export const SPRINTS = {
  2022:['imola','austria','brazil'],2023:['azerbaijan','austria','belgium','qatar','usa','brazil'],2024:['china','miami','austria','usa','brazil','qatar'],2025:['china','miami','belgium','usa','brazil','qatar']
};
export function trackForYear(id,year) {
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

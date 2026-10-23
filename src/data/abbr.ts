import type { Category } from './types';

/**
 * 英文缩写 —— 负责人：content-abbr
 * 内容规范见 CONTENT_SPEC.md。数据来源：规范 4.3 节已核对清单。
 */
export const abbr: Category = {
  id: 'abbr',
  name: '英文缩写',
  shortName: '缩写',
  en: 'ABBREVIATIONS',
  tagline: '仪表盘上的字母，都是保命配置。',
  intro: 'ABS、ESP、AEB……把英文缩写翻译成人话：它管什么、什么时候出手、别和谁搞混。',
  groups: ['制动与稳定', '驾驶辅助', '感知与预警', '车身与网联'],
  cards: [
    {
      id: 'ab-01',
      group: '制动与稳定',
      title: 'ABS · 防抱死制动',
      original:
        'ABS 即防抱死制动系统（Anti-lock Braking System）：紧急制动时以极高频率调节制动压力，防止车轮抱死拖滑，使轮胎保持滚动，从而保留转向避让能力。没有 ABS 时车轮一旦抱死，方向盘打了也没用。',
      memory:
        '联想「点刹高手」：一脚刹车踩死后它替你高频点刹，车轮不锁死，方向盘才能绕开障碍。',
    },
    {
      id: 'ab-02',
      group: '制动与稳定',
      title: 'EBD · 电子制动力分配',
      original:
        'EBD 即电子制动力分配系统（Electronic Brakeforce Distribution）：根据车辆载荷和前后轴荷变化，自动调节前后轮制动力分配比例，让后轮不易先于前轮抱死，从而保持制动稳定、缩短制动距离。',
      memory:
        '把制动力想成「分饭」：载重的一头多分、轻的一头少分，后轮就不容易先抱死甩尾。',
    },
    {
      id: 'ab-03',
      group: '制动与稳定',
      title: 'TCS · 牵引力控制',
      original:
        'TCS 即牵引力控制系统（Traction Control System），也写作 ASR：通过轮速传感器监测驱动轮是否打滑，在湿滑路面起步、加速时降低发动机输出或对打滑车轮施加制动，帮助车轮恢复抓地力。',
      memory:
        '驱动轮空转就是在「原地刨坑」，TCS 一发现就给打滑轮制动、收油门，把力气重新按回地面。',
    },
    {
      id: 'ab-04',
      group: '制动与稳定',
      title: 'ESP · 车身电子稳定',
      original:
        'ESP 即车身电子稳定系统（Electronic Stability Program），也写作 ESC：实时监测方向盘转角与车辆实际行驶轨迹，出现转向不足或转向过度时，自动对单个车轮制动并调节动力，主动修正车身姿态、防止侧滑。',
      memory:
        '把 ESP 想成「隐形的副驾」：车头不听话往外推、车尾往外甩，它就单边点刹，把车拽回你的路线。',
    },
    {
      id: 'ab-05',
      group: '制动与稳定',
      title: 'HDC · 陡坡缓降',
      original:
        'HDC 即陡坡缓降系统（Hill Descent Control）：下长陡坡时开启后，驾驶员无需踩制动踏板，系统自动对车轮施加制动，让车辆以低速匀速下坡，减轻制动负担、避免制动器长时间工作过热失效。',
      memory:
        '下坡口诀「下山让车自己走」：HDC 接管刹车把车速压住，你只管扶稳方向盘。',
    },
    {
      id: 'ab-06',
      group: '制动与稳定',
      title: 'HAC · 上坡辅助',
      original:
        'HAC 即上坡辅助系统（Hill-start Assist Control）：坡道起步时，驾驶员松开制动踏板后，系统短暂保持制动压力，防止车辆后溜，为右脚从刹车踏板移到油门踏板争取时间。',
      memory: '坡起怕溜车？HAC 帮你「多踩两秒刹车」，这两秒刚好够你把脚挪到油门上。',
    },
    {
      id: 'ab-07',
      group: '驾驶辅助',
      title: 'ACC · 自适应巡航',
      original:
        'ACC 即自适应巡航控制系统（Adaptive Cruise Control）：设定目标车速后，车辆自动加速、减速保持巡航；雷达或摄像头探测到前车时，自动调整车速并保持设定的跟车距离，减轻长途驾驶负担。',
      memory: '普通定速巡航只会「傻跑」，ACC 多了双眼睛：前车慢它也慢，前车走它再跟上。',
    },
    {
      id: 'ab-08',
      group: '驾驶辅助',
      title: 'AEB · 自动紧急制动',
      original:
        'AEB 即自动紧急制动系统（Autonomous Emergency Braking）：通过雷达和摄像头判断与前方车辆、行人的碰撞风险，驾驶员未及时反应时，系统先发出预警，继而主动施加制动，降低碰撞速度或避免碰撞。',
      memory: 'AEB 是「最后的代驾」：你先踩它不抢，你没踩它就替你一脚急刹。',
    },
    {
      id: 'ab-09',
      group: '驾驶辅助',
      title: 'LKA · 车道保持辅助',
      original:
        'LKA 即车道保持辅助系统（Lane Keeping Assist）：摄像头识别车道线，当车辆即将偏离车道且驾驶员未打转向灯时，系统主动向方向盘施加转向力，辅助车辆回到车道内行驶。',
      memory: 'LKA 会「轻轻拽方向盘」：没打灯却压线，它帮你回一把，但不等于自动驾驶。',
    },
    {
      id: 'ab-10',
      group: '驾驶辅助',
      title: 'AFS · 自适应前照灯',
      original:
        'AFS 即自适应前照灯系统（Adaptive Front-lighting System）：根据车速、转向角度和行车环境自动调整前照灯的照射方向与范围，转弯时灯光随车头偏转，提前照亮弯道内侧，减少夜间盲区。',
      memory: '夜里转弯，车灯像「手电筒跟着头转」：方向盘往哪打，光就往哪照。',
    },
    {
      id: 'ab-11',
      group: '驾驶辅助',
      title: 'EPB · 电子驻车制动',
      original:
        'EPB 即电子驻车制动系统（Electronic Parking Brake）：用电子按键代替传统机械手刹，通过电机驱动制动卡钳实现驻车制动，停车后自动拉起、起步时自动解除，节省车内空间。',
      memory: 'EPB 就是「电子手刹」：一个按键代替拉杆，停车自动上手刹，起步自动松。',
    },
    {
      id: 'ab-12',
      group: '感知与预警',
      title: 'FCW · 前碰撞预警',
      original:
        'FCW 即前碰撞预警系统（Forward Collision Warning）：通过雷达或摄像头监测与前车、行人的距离和相对速度，判断存在碰撞风险时发出声光报警，提醒驾驶员采取制动或避让措施，但系统本身不会主动刹车。',
      memory: 'FCW 是「副驾尖叫」：只负责提醒你快撞了，踩不踩刹车还是你的事。',
    },
    {
      id: 'ab-13',
      group: '感知与预警',
      title: 'LDW · 车道偏离预警',
      original:
        'LDW 即车道偏离预警系统（Lane Departure Warning）：通过摄像头识别车道线，在车辆无意识偏离车道（未打转向灯）时发出预警，提醒驾驶员修正方向，但不会主动干预转向。',
      memory: 'LDW 只「喊」不「拽」：偏离车道它报警，帮你回方向的是 LKA。',
    },
    {
      id: 'ab-14',
      group: '感知与预警',
      title: 'BSM · 盲区监测',
      original:
        'BSM 即盲区监测系统（Blind Spot Monitoring）：通过车身侧后方的雷达探测后视镜盲区内的车辆，有车进入盲区时点亮后视镜警示灯，驾驶员打转向灯准备变道时还会发出报警。',
      memory: '后视镜里看不见的那块「死角」，BSM 替你盯着：有车就亮灯，打灯变道就报警。',
    },
    {
      id: 'ab-15',
      group: '感知与预警',
      title: 'TSR · 交通标志识别',
      original:
        'TSR 即交通标志识别系统（Traffic Sign Recognition）：用车载摄像头识别道路上的限速、禁止超车、禁止驶入等交通标志，并在仪表盘或抬头显示上提示，帮助驾驶员及时获知限速等要求，避免违章。',
      memory: 'TSR 是「车上认字员」：看见限速牌、禁令牌就读给你看，但它只提醒，不管控车速。',
    },
    {
      id: 'ab-16',
      group: '感知与预警',
      title: 'DMS · 驾驶员监控',
      original:
        'DMS 即驾驶员监控系统（Driver Monitoring System）：通过车内摄像头和传感器监测驾驶员的疲劳状态、视线方向和头部姿态，发现疲劳、分心、接打电话等行为时及时报警提醒。',
      memory: 'TSR 看车外，DMS 看你：眼皮打架、低头看手机，它都会提醒你集中注意力。',
    },
    {
      id: 'ab-17',
      group: '车身与网联',
      title: 'TPMS · 胎压监测',
      original:
        'TPMS 即胎压监测系统（Tire Pressure Monitoring System）：通过安装在轮胎内的压力传感器实时监测各轮胎气压，气压低于标准值或发生快速漏气时在仪表盘报警，提醒驾驶员检查轮胎、预防爆胎。',
      memory: '轮胎没气就像鞋底漏气，TPMS 是「鞋垫上的气压计」：胎压一低就先报警。',
    },
    {
      id: 'ab-18',
      group: '车身与网联',
      title: 'GPS · 全球定位',
      original:
        'GPS 即全球定位系统（Global Positioning System）：由卫星向地面接收机发送信号，计算出车辆的经度、纬度和速度，是车载导航、定位和车队调度的基础。',
      memory: 'GPS 负责「我在哪」，导航软件负责「怎么走」，别把定位和路线规划混为一谈。',
    },
    {
      id: 'ab-19',
      group: '车身与网联',
      title: 'ETC · 电子不停车收费',
      original:
        'ETC 即电子不停车收费系统（Electronic Toll Collection）：车辆安装电子标签和通行卡，经过收费站 ETC 车道时，由路侧设备自动识别车辆、扣除通行费并抬杆放行，无需停车排队缴费。',
      memory: '过收费站不用停车掏钱：车上贴标签，栏杆自己抬，费用自动扣。',
    },
    {
      id: 'ab-20',
      group: '车身与网联',
      title: 'HUD · 抬头显示',
      original:
        'HUD 即抬头显示系统（Head-Up Display）：通过光学投影把车速、导航指引、限速提示等行车信息显示在前风挡玻璃上，驾驶员视线保持在前方路面，不必低头看仪表，减少分心。',
      memory: '把仪表盘「搬」到前风挡：眼睛不离开路面，车速和导航就能看见。',
    },
  ],
  questions: [
    {
      id: 'qab-01',
      cardId: 'ab-01',
      group: '制动与稳定',
      stem: '防抱死制动是下面哪个？',
      options: [
        'ABS',
        'EBD',
        'TCS',
        'ESP',
      ],
      answer: 0,
      explanation:
        '防抱死制动对应 ABS（Anti-lock Braking System）。',
    },
    {
      id: 'qab-02',
      cardId: 'ab-02',
      group: '制动与稳定',
      stem: '电子制动力分配是下面哪个？',
      options: [
        'ABS',
        'EBD',
        'ESP',
        'HDC',
      ],
      answer: 1,
      explanation:
        '电子制动力分配对应 EBD（Electronic Brakeforce Distribution）。',
    },
    {
      id: 'qab-03',
      cardId: 'ab-03',
      group: '制动与稳定',
      stem: '牵引力控制是下面哪个？',
      options: [
        'ABS',
        'EBD',
        'TCS',
        'ESP',
      ],
      answer: 2,
      explanation:
        '牵引力控制对应 TCS（Traction Control System）。',
    },
    {
      id: 'qab-04',
      cardId: 'ab-04',
      group: '制动与稳定',
      stem: '车身电子稳定是下面哪个？',
      options: [
        'EBD',
        'TCS',
        'HDC',
        'ESP',
      ],
      answer: 3,
      explanation:
        '车身电子稳定对应 ESP（Electronic Stability Program）。',
    },
    {
      id: 'qab-05',
      cardId: 'ab-05',
      group: '制动与稳定',
      stem: '陡坡缓降是下面哪个？',
      options: [
        'HDC',
        'HAC',
        'EPB',
        'ESP',
      ],
      answer: 0,
      explanation:
        '陡坡缓降对应 HDC（Hill Descent Control）。',
    },
    {
      id: 'qab-06',
      cardId: 'ab-06',
      group: '制动与稳定',
      stem: '上坡辅助是下面哪个？',
      options: [
        'HDC',
        'HAC',
        'EPB',
        'ESP',
      ],
      answer: 1,
      explanation:
        '上坡辅助对应 HAC（Hill-start Assist Control）。',
    },
    {
      id: 'qab-07',
      cardId: 'ab-07',
      group: '驾驶辅助',
      stem: '自适应巡航控制是下面哪个？',
      options: [
        'AEB',
        'FCW',
        'ACC',
        'LKA',
      ],
      answer: 2,
      explanation:
        '自适应巡航控制对应 ACC（Adaptive Cruise Control）。',
    },
    {
      id: 'qab-08',
      cardId: 'ab-08',
      group: '驾驶辅助',
      stem: '自动紧急制动是下面哪个？',
      options: [
        'FCW',
        'ACC',
        'LKA',
        'AEB',
      ],
      answer: 3,
      explanation:
        '自动紧急制动对应 AEB（Autonomous Emergency Braking）。',
    },
    {
      id: 'qab-09',
      cardId: 'ab-09',
      group: '驾驶辅助',
      stem: '车道保持辅助是下面哪个？',
      options: [
        'LKA',
        'LDW',
        'ACC',
        'BSM',
      ],
      answer: 0,
      explanation:
        '车道保持辅助对应 LKA（Lane Keeping Assist）。',
    },
    {
      id: 'qab-10',
      cardId: 'ab-10',
      group: '驾驶辅助',
      stem: '自适应前照灯是下面哪个？',
      options: [
        'HUD',
        'AFS',
        'TSR',
        'DMS',
      ],
      answer: 1,
      explanation:
        '自适应前照灯对应 AFS（Adaptive Front-lighting System）。',
    },
    {
      id: 'qab-11',
      cardId: 'ab-11',
      group: '驾驶辅助',
      stem: '电子驻车制动是下面哪个？',
      options: [
        'HAC',
        'ABS',
        'EPB',
        'ESP',
      ],
      answer: 2,
      explanation:
        '电子驻车制动对应 EPB（Electronic Parking Brake）。',
    },
    {
      id: 'qab-12',
      cardId: 'ab-12',
      group: '感知与预警',
      stem: '前碰撞预警是下面哪个？',
      options: [
        'AEB',
        'ACC',
        'BSM',
        'FCW',
      ],
      answer: 3,
      explanation:
        '前碰撞预警对应 FCW（Forward Collision Warning）。',
    },
    {
      id: 'qab-13',
      cardId: 'ab-13',
      group: '感知与预警',
      stem: '车道偏离预警是下面哪个？',
      options: [
        'LDW',
        'LKA',
        'ACC',
        'BSM',
      ],
      answer: 0,
      explanation:
        '车道偏离预警对应 LDW（Lane Departure Warning）。',
    },
    {
      id: 'qab-14',
      cardId: 'ab-14',
      group: '感知与预警',
      stem: '盲区监测是下面哪个？',
      options: [
        'TSR',
        'BSM',
        'LDW',
        'DMS',
      ],
      answer: 1,
      explanation:
        '盲区监测对应 BSM（Blind Spot Monitoring）。',
    },
    {
      id: 'qab-15',
      cardId: 'ab-15',
      group: '感知与预警',
      stem: '交通标志识别是下面哪个？',
      options: [
        'DMS',
        'HUD',
        'TSR',
        'BSM',
      ],
      answer: 2,
      explanation:
        '交通标志识别对应 TSR（Traffic Sign Recognition）。',
    },
    {
      id: 'qab-16',
      cardId: 'ab-16',
      group: '感知与预警',
      stem: '驾驶员监控是下面哪个？',
      options: [
        'TSR',
        'HUD',
        'BSM',
        'DMS',
      ],
      answer: 3,
      explanation:
        '驾驶员监控对应 DMS（Driver Monitoring System）。',
    },
    {
      id: 'qab-17',
      cardId: 'ab-17',
      group: '车身与网联',
      stem: '胎压监测是下面哪个？',
      options: [
        'TPMS',
        'ABS',
        'ETC',
        'HUD',
      ],
      answer: 0,
      explanation:
        '胎压监测对应 TPMS（Tire Pressure Monitoring System）。',
    },
    {
      id: 'qab-18',
      cardId: 'ab-18',
      group: '车身与网联',
      stem: '全球定位是下面哪个？',
      options: [
        'ETC',
        'GPS',
        'TPMS',
        'BSM',
      ],
      answer: 1,
      explanation:
        '全球定位对应 GPS（Global Positioning System）。',
    },
    {
      id: 'qab-19',
      cardId: 'ab-19',
      group: '车身与网联',
      stem: '电子不停车收费是下面哪个？',
      options: [
        'GPS',
        'TPMS',
        'ETC',
        'HUD',
      ],
      answer: 2,
      explanation:
        '电子不停车收费对应 ETC（Electronic Toll Collection）。',
    },
    {
      id: 'qab-20',
      cardId: 'ab-20',
      group: '车身与网联',
      stem: '抬头显示是下面哪个？',
      options: [
        'AFS',
        'TPMS',
        'DMS',
        'HUD',
      ],
      answer: 3,
      explanation:
        '抬头显示对应 HUD（Head-Up Display）。',
    },
    {
      id: 'qab-21',
      cardId: 'ab-01',
      group: '制动与稳定',
      stem: '防抱死刹车是下面哪个？',
      options: [
        'ABS',
        'EBD',
        'TCS',
        'ESP',
      ],
      answer: 0,
      explanation:
        '防抱死刹车同样对应 ABS（Anti-lock Braking System）。',
    },
    {
      id: 'qab-22',
      cardId: 'ab-02',
      group: '制动与稳定',
      stem: '电子制动力分配系统是下面哪个？',
      options: [
        'ABS',
        'EBD',
        'ESP',
        'HDC',
      ],
      answer: 1,
      explanation:
        '电子制动力分配系统对应 EBD（Electronic Brakeforce Distribution）。',
    },
    {
      id: 'qab-23',
      cardId: 'ab-07',
      group: '驾驶辅助',
      stem: '自适应巡航系统是下面哪个？',
      options: [
        'AEB',
        'FCW',
        'ACC',
        'LKA',
      ],
      answer: 2,
      explanation:
        '自适应巡航系统对应 ACC（Adaptive Cruise Control）。',
    },
    {
      id: 'qab-24',
      cardId: 'ab-17',
      group: '车身与网联',
      stem: '轮胎压力监测系统是下面哪个？',
      options: [
        'GPS',
        'ABS',
        'ETC',
        'TPMS',
      ],
      answer: 3,
      explanation:
        '轮胎压力监测系统对应 TPMS（Tire Pressure Monitoring System）。',
    },
  ],
  achievements: [
    {
      id: 'ab-a1',
      title: '字母新手',
      desc: '掌握第 1 张缩写卡片',
      icon: 'spark',
      metric: 'mastered',
      target: 1,
    },
    {
      id: 'ab-a2',
      title: '半程解码',
      desc: '掌握 10 张缩写卡片',
      icon: 'route',
      metric: 'mastered',
      target: 10,
    },
    {
      id: 'ab-a3',
      title: '缩写翻译官',
      desc: '掌握全部 20 张缩写卡片',
      icon: 'crown',
      metric: 'mastered',
      target: 20,
    },
    {
      id: 'ab-a4',
      title: '首战开张',
      desc: '完成第 1 次 10 题挑战',
      icon: 'bolt',
      metric: 'challenge',
      target: 1,
    },
    {
      id: 'ab-a5',
      title: '全对车手',
      desc: '挑战拿到 10/10 满分',
      icon: 'target',
      metric: 'perfect',
      target: 1,
    },
    {
      id: 'ab-a6',
      title: '三十题司机',
      desc: '累计答对 30 道题',
      icon: 'flag',
      metric: 'correct',
      target: 30,
    },
  ],
};

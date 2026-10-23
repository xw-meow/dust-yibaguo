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
      stem: '雨天紧急制动时，防止车轮抱死、让驾驶员仍能转动方向盘避让障碍物的系统是？',
      options: [
        'ABS',
        'EBD',
        'TCS',
        'ESP',
      ],
      answer: 0,
      explanation:
        'ABS 在紧急制动时高频调节制动压力，防止车轮抱死拖滑，车轮保持滚动才能保留转向能力。易错点：负责分配前后轮制动力的是 EBD。',
    },
    {
      id: 'qab-02',
      cardId: 'ab-02',
      group: '制动与稳定',
      stem: '能根据车辆空载、满载的载荷变化自动分配前后轮制动力，避免后轮先抱死的系统是？',
      options: [
        'ABS',
        'EBD',
        'ESP',
        'HDC',
      ],
      answer: 1,
      explanation:
        'EBD 依据车辆载荷和路面附着力自动调节前后轮制动力分配，让后轮不易先抱死、制动更平稳。易错点：ABS 管车轮不抱死，EBD 管制动力怎么分配。',
    },
    {
      id: 'qab-03',
      cardId: 'ab-03',
      group: '制动与稳定',
      stem: '牵引力控制系统也常写作下列哪个缩写？',
      options: [
        'ABS',
        'ASR',
        'EBD',
        'ESP',
      ],
      answer: 1,
      explanation:
        'TCS 即 Traction Control System，也写作 ASR；它负责抑制驱动轮打滑，帮助车辆恢复抓地力。易错点：ASR 和 TCS 是同一个系统的两种叫法。',
    },
    {
      id: 'qab-04',
      cardId: 'ab-03',
      group: '制动与稳定',
      stem: '冰雪路面起步时驱动轮空转打滑，主要依靠哪个系统抑制打滑、恢复抓地力？',
      options: [
        'ESP',
        'ABS',
        'EBD',
        'TCS',
      ],
      answer: 3,
      explanation:
        'TCS 监测驱动轮打滑，起步或加速时降低发动机输出、对打滑轮施加制动，帮车辆恢复抓地力。易错点：ESP 管车身侧滑，驱动轮打滑先找 TCS。',
    },
    {
      id: 'qab-05',
      cardId: 'ab-04',
      group: '制动与稳定',
      stem: '高速过弯时出现转向不足或转向过度、车身有侧滑趋势，主动修正车身姿态的系统是？',
      options: [
        'ESP',
        'TCS',
        'ABS',
        'HAC',
      ],
      answer: 0,
      explanation:
        'ESP 对比驾驶员的转向意图和车辆实际轨迹，出现转向不足或过度时对单个车轮制动并调节动力，把车身拉回路线。易错点：它治的是侧滑，不是驱动轮打滑。',
    },
    {
      id: 'qab-06',
      cardId: 'ab-04',
      group: '制动与稳定',
      stem: '车身电子稳定系统也常写作下列哪个缩写？',
      options: [
        'EBD',
        'TCS',
        'ESC',
        'ASR',
      ],
      answer: 2,
      explanation:
        'ESP 即 Electronic Stability Program，也写作 ESC；它通过单轮制动和动力调节修正车身姿态、防止侧滑。易错点：ESC 不是另一个系统。',
    },
    {
      id: 'qab-07',
      cardId: 'ab-05',
      group: '制动与稳定',
      stem: '下长陡坡时，能自动控制车速、减轻制动负担的系统是？',
      options: [
        'HAC',
        'HDC',
        'EPB',
        'ESP',
      ],
      answer: 1,
      explanation:
        'HDC 是陡坡缓降系统，下陡坡时自动施加制动、保持低速匀速；HAC 则是上坡起步防后溜。易错点：下坡找 HDC，上坡起步找 HAC。',
    },
    {
      id: 'qab-08',
      cardId: 'ab-07',
      group: '驾驶辅助',
      stem: '高速公路上设定车速后，车辆能自动调速并与前车保持设定距离的系统是？',
      options: [
        'AEB',
        'LKA',
        'EPB',
        'ACC',
      ],
      answer: 3,
      explanation:
        'ACC 按设定车速巡航，并根据前车距离自动加减速，减轻长途驾驶负担。易错点：ACC 是舒适性跟车，碰撞风险下的主动紧急制动由 AEB 负责。',
    },
    {
      id: 'qab-09',
      cardId: 'ab-08',
      group: '驾驶辅助',
      stem: '行人突然横穿，驾驶员来不及反应时，能主动施加制动降低碰撞速度的系统是？',
      options: [
        'AEB',
        'FCW',
        'ACC',
        'TSR',
      ],
      answer: 0,
      explanation:
        'AEB 判断碰撞风险后先预警，驾驶员未反应时主动制动，降低碰撞速度甚至避免碰撞。易错点：FCW 只报警不刹车，别把两者当成一套系统。',
    },
    {
      id: 'qab-10',
      cardId: 'ab-07',
      group: '驾驶辅助',
      stem: '在定速巡航基础上增加自动跟车、保持车距功能的系统是？',
      options: [
        'AEB',
        'FCW',
        'ACC',
        'LKA',
      ],
      answer: 2,
      explanation:
        'ACC 自适应巡航能按设定车速行驶，并根据前车自动加减速、保持跟车距离；AEB 是紧急制动，不负责日常跟车。',
    },
    {
      id: 'qab-11',
      cardId: 'ab-09',
      group: '驾驶辅助',
      stem: '车辆未打转向灯却偏离车道时，能主动向方向盘施力、辅助车辆回到车道内的系统是？',
      options: [
        'LDW',
        'ACC',
        'LKA',
        'BSM',
      ],
      answer: 2,
      explanation:
        'LKA 识别车道线，在车辆无意识偏离时主动施加转向力辅助回正，让车保持在车道内。易错点：LDW 只在偏离时报警，不会帮你打方向。',
    },
    {
      id: 'qab-12',
      cardId: 'ab-10',
      group: '驾驶辅助',
      stem: '夜间转弯时，前照灯能随转向角度和车速调整照射方向的系统是？',
      options: [
        'HUD',
        'TSR',
        'DMS',
        'AFS',
      ],
      answer: 3,
      explanation:
        'AFS 根据转向角度、车速和路况调整前照灯的照射方向与范围，转弯时提前照亮弯道内侧。易错点：它管的是灯光角度，不是识别交通标志。',
    },
    {
      id: 'qab-13',
      cardId: 'ab-11',
      group: '驾驶辅助',
      stem: '用电子按键代替传统机械手刹，停车后自动拉起、起步时自动解除的系统是？',
      options: [
        'EPB',
        'HAC',
        'ABS',
        'ESP',
      ],
      answer: 0,
      explanation:
        'EPB 用电机驱动卡钳实现驻车制动，取消机械手刹拉杆，停车或起步时可自动控制。易错点：HAC 只是起步时短暂防溜，不能代替驻车制动。',
    },
    {
      id: 'qab-14',
      cardId: 'ab-12',
      group: '感知与预警',
      stem: '能监测前方碰撞风险并发出声光报警，但不会主动刹车的系统是？',
      options: [
        'AEB',
        'ACC',
        'FCW',
        'BSM',
      ],
      answer: 2,
      explanation:
        'FCW 前碰撞预警只负责报警提醒，不会主动制动；AEB 才会在驾驶员来不及反应时主动刹车。易错点：预警和制动是两套系统。',
    },
    {
      id: 'qab-15',
      cardId: 'ab-13',
      group: '感知与预警',
      stem: '车辆未打转向灯偏离车道时，只发出预警、不会主动回正方向的系统是？',
      options: [
        'LKA',
        'LDW',
        'ACC',
        'BSM',
      ],
      answer: 1,
      explanation:
        'LDW 车道偏离预警只发出报警；LKA 车道保持辅助还会主动向方向盘施力、辅助回正。易错点：一个只“喊”，一个会“拽”。',
    },
    {
      id: 'qab-16',
      cardId: 'ab-14',
      group: '感知与预警',
      stem: '变道时，能监测后视镜盲区来车并点亮警示灯提醒的系统是？',
      options: [
        'TSR',
        'LDW',
        'DMS',
        'BSM',
      ],
      answer: 3,
      explanation:
        'BSM 用车身侧后方的雷达探测后视镜盲区，有车进入盲区时点亮警示灯，打转向灯变道时还会报警。易错点：盲区监测靠雷达，不是靠识别车道线。',
    },
    {
      id: 'qab-17',
      cardId: 'ab-15',
      group: '感知与预警',
      stem: '交通标志识别系统的英文缩写是？',
      options: ['TSR', 'TPMS', 'DMS', 'BSM'],
      answer: 0,
      explanation:
        'TSR 即 Traffic Sign Recognition，交通标志识别系统；TPMS 是胎压监测，DMS 是驾驶员监控，BSM 是盲区监测。易错点：把 TSR 与 TPMS 的字母看混。',
    },
    {
      id: 'qab-18',
      cardId: 'ab-16',
      group: '感知与预警',
      stem: '通过车内摄像头监测驾驶员疲劳、分心和接打电话等状态并报警的系统是？',
      options: [
        'BSM',
        'DMS',
        'TSR',
        'FCW',
      ],
      answer: 1,
      explanation:
        'DMS 面向车内驾驶员，监测疲劳、视线方向和头部姿态，发现分心或疲劳时提醒。易错点：TSR 看道路上的标志，DMS 看车里的人。',
    },
    {
      id: 'qab-19',
      cardId: 'ab-15',
      group: '感知与预警',
      stem: '能识别限速、禁止超车等道路标志并在车内提示的系统是？',
      options: [
        'DMS',
        'HUD',
        'TSR',
        'BSM',
      ],
      answer: 2,
      explanation:
        'TSR 交通标志识别用摄像头读取限速、禁止超车等标志并提示驾驶员；DMS 监测的是驾驶员状态，不识别车外标志。',
    },
    {
      id: 'qab-20',
      cardId: 'ab-17',
      group: '车身与网联',
      stem: '能实时监测轮胎气压、气压异常时在仪表盘报警的系统是？',
      options: [
        'ABS',
        'ETC',
        'HUD',
        'TPMS',
      ],
      answer: 3,
      explanation:
        'TPMS 通过轮胎内的压力传感器监测胎压，气压低于标准值或快速漏气时报警，提醒检查轮胎、防止爆胎。易错点：它监测的是胎压，不是制动。',
    },
    {
      id: 'qab-21',
      cardId: 'ab-18',
      group: '车身与网联',
      stem: '为导航和定位提供车辆经度、纬度与速度信息的卫星系统是？',
      options: [
        'GPS',
        'ETC',
        'BSM',
        'HDC',
      ],
      answer: 0,
      explanation:
        'GPS 即全球定位系统，靠卫星信号计算车辆位置和速度，是导航功能的基础。易错点：GPS 负责定位，导航软件负责规划路线，两者不是一回事。',
    },
    {
      id: 'qab-22',
      cardId: 'ab-19',
      group: '车身与网联',
      stem: '高速公路收费站不停车自动扣费、抬杆放行的系统是？',
      options: [
        'TPMS',
        'HUD',
        'GPS',
        'ETC',
      ],
      answer: 3,
      explanation:
        'ETC 即电子不停车收费系统，车辆装电子标签，经过 ETC 车道时由路侧设备自动识别扣费并抬杆。易错点：ETC 是收费系统，不是定位或导航系统。',
    },
    {
      id: 'qab-23',
      cardId: 'ab-20',
      group: '车身与网联',
      stem: '把车速、导航指引等信息投影到前风挡玻璃上，让驾驶员不用低头看仪表的系统是？',
      options: [
        'AFS',
        'HUD',
        'TPMS',
        'DMS',
      ],
      answer: 1,
      explanation:
        'HUD 通过光学投影把行车信息显示在前风挡上，驾驶员视线保持在前方路面，减少低头分心。易错点：它只是显示信息，不负责照明或监测。',
    },
    {
      id: 'qab-24',
      cardId: 'ab-19',
      group: '车身与网联',
      stem: '电子不停车收费系统的英文缩写是？',
      options: [
        'GPS',
        'TPMS',
        'ETC',
        'HUD',
      ],
      answer: 2,
      explanation:
        'ETC 即 Electronic Toll Collection，车辆经过收费站时自动识别、扣费并抬杆放行；TPMS 是胎压监测，GPS 是定位。',
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

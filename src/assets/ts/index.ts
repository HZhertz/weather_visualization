// 要素详情
export const ED = [
  {
    id: 0,
    index: 0,
    fastEle: 'TEM',
    type: '气温',
    name: '温度',
    unit: '℃',
  },
  {
    id: 1,
    index: 3,
    fastEle: 'PRS',
    type: '气压',
    name: '气压',
    unit: 'hPa',
  },
  {
    id: 2,
    index: 1,
    fastEle: 'RHU',
    type: '相对湿度',
    name: '湿度',
    unit: '%',
  },
  {
    id: 3,
    index: 4,
    fastEle: 'WINS',
    type: '极大风',
    name: '风速',
    unit: 'm/s',
  },
  {
    id: 4,
    index: 2,
    fastEle: 'PRE',
    type: '降水',
    name: '降水',
    unit: 'mm',
  },
]
// 空气指数类型
export const AQI = [
  {
    name: 'PM2.5',
    key: 'PM2p5_Densty',
  },
  {
    name: 'PM10',
    key: 'PM10_Densty_Fore',
  },
  {
    name: 'CO',
    key: 'V15823',
  },
  {
    name: 'NO2',
    key: 'V15817',
  },
  {
    name: 'SO2',
    key: 'V15810',
  },
  {
    name: 'O3',
    key: 'V15826_01',
  },
]
// 仪表盘基准色
export const BC: [number, string][] = [
  [0.1, '#08e508'],
  [0.2, '#ffff08'],
  [0.3, '#ff8208'],
  [0.4, '#ff0808'],
  [0.5, '#9c0852'],
  [1, '#8b2c47'],
]
// 颜色刻度
const CS = {
  DEG: {
    name: '摄氏度',
    unit: '°C',
    type: 'DEG',
    value: [-65, -30, -20, -10, 0, 10, 20, 25, 30],
    color: [
      '#844084',
      '#4063a3',
      '#5797db',
      '#98dbff',
      '#f5ffff',
      '#cefea9',
      '#ffe5be',
      '#ffc398',
      '#eb8184',
    ],
  },
  KEV: {
    name: '开尔文',
    unit: 'K',
    type: 'KEV',
    value: [200, 220, 240, 250, 255, 260, 270, 290, 310, 330],
    color: [
      '#491763',
      '#4E1378',
      '#446DA9',
      '#88A7C9',
      '#6CBCD4',
      '#87CADC',
      '#D2E9C8',
      '#EB702D',
      '#CC0000',
      '#990000',
    ],
  },
  HUM: {
    name: '湿度',
    unit: '%',
    type: 'HUM',
    value: [0, 20, 40, 60, 70, 80, 90, 100],
    color: ['#f56269', '#f3d269', '#90f769', '#5ef396', '#5ef3f6', '#5dd2f9', '#779bf8', '#5b5ef5'],
  },
  PRE: {
    name: '降水',
    unit: 'mm',
    type: 'PRE',
    value: [0, 20, 40, 60, 70, 80, 90, 100],
    color: ['#f56269', '#f3d269', '#90f769', '#5ef396', '#5ef3f6', '#5dd2f9', '#779bf8', '#5b5ef5'],
  },
}
// 菜单项
export const MT = [
  {
    type: 'tiles',
    name: '气温',
    unit: '°C',
    code: 'TA2',
    icon: 'tem',
    palette: '-65:844084;-30:4063a3;-20:5797db;-10:98dbff;0:f5ffff;10:cefea9;20:ffe5be;25:ffc398;30:eb8184',
  },
  {
    type: 'tiles',
    name: '露点温度',
    unit: '°C',
    code: 'TD2',
    icon: 'tem',
    palette: '-65:844084;-30:4063a3;-20:5797db;-10:98dbff;0:f5ffff;10:cefea9;20:ffe5be;25:ffc398;30:eb8184',
  },
  { type: 'tiles', name: '土壤温度', unit: 'K', code: 'TS0', icon: 'tem', palette: '' },
  {
    type: 'tiles',
    name: '相对湿度',
    unit: '%',
    code: 'HRD0',
    icon: 'hum',
    palette: '0:f56269;20:f3d269;40:90f769;60:5ef396;70:5ef3f6;80:5dd2f9;90:779bf8;100:5b5ef5;100.1:5b5ef5',
  },
  {
    type: 'tiles',
    name: '降水',
    unit: 'mm',
    code: 'PA0',
    icon: 'rain',
    palette:
      '1:9add96;5:9add96;10:84bc84;15:a8cffe;20:6c7cf3;30:5b5ddf;40:6949a9;50:cd6fab;100:de39aa;140:de39aa',
  },
  {
    type: 'tiles',
    name: '对流降水',
    unit: 'mm',
    code: 'PAC0',
    icon: 'rain',
    palette:
      '1:9add96;5:9add96;10:84bc84;15:a8cffe;20:6c7cf3;30:5b5ddf;40:6949a9;50:cd6fab;100:de39aa;140:de39aa',
  },
  {
    type: 'tiles',
    name: '降水强度',
    unit: 'mm/s',
    code: 'PR0',
    icon: 'rain',
    palette:
      '0.000005:b5f7a6;0.000009:6bc769;0.000014:7ac6ad;0.000023:88c5f9;0.000046:6180f9;0.000092:3a3bfa;0.000231:963dfa;0.000463:f33efa;0.000694:cc3fb5;0.023150:a4407a',
  },
  { type: 'tiles', name: '降雪', unit: 'mm', code: 'PAS0', icon: 'snow', palette: '' },
  { type: 'tiles', name: '积雪深度', unit: 'cm', code: 'SD0', icon: 'snow', palette: '' },
  {
    type: 'tiles',
    name: '风速',
    unit: 'm/s',
    code: 'WS10',
    icon: 'wins',
    palette: '5:f4f31e;15:ffb700;25:ff9118;50:f15e5b;100:c90c18;200:ad0255;250:9b0692',
  },
  {
    type: 'tiles',
    name: '风向',
    unit: '°',
    code: 'WND',
    icon: 'wind',
    palette: '5:f4f31e;15:ffb700;25:ff9118;50:f15e5b;100:c90c18;200:ad0255;250:9b0692',
  },
  { type: 'tiles', name: '云量', unit: '%', code: 'CL', icon: 'cloud', palette: '' },
  { type: 'tiles', name: '气压', unit: 'hPa', code: 'APM', icon: 'pressure', palette: '' },
	{ type: 'scatter', name: '空气质量', unit: '', code: 'AQI', icon: 'aqiValue', palette: '' },
]

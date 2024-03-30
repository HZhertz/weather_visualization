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
// 菜单项
export const MT = [
  {
    name: '气温',
    code: 'TA2',
    icon: 'tem',
    palette: '-65:844084;-30:4063a3;-20:5797db;-10:98dbff;0:f5ffff;10:cefea9;20:ffe5be;25:ffc398;30:eb8184',
  },
  {
    name: '露点温度',
    code: 'TD2',
    icon: 'tem',
    palette: '-65:844084;-30:4063a3;-20:5797db;-10:98dbff;0:f5ffff;10:cefea9;20:ffe5be;25:ffc398;30:eb8184',
  },
  { name: '土壤温度', code: 'TS0', icon: 'tem', palette: '' },
  { name: '相对湿度', code: 'HRD0', icon: 'hum', palette: '' },
  { name: '降水', code: 'PA0', icon: 'rain', palette: '' },
  { name: '对流降水', code: 'PAC0', icon: 'rain', palette: '' },
  { name: '降水强度', code: 'PR0', icon: 'rain', palette: '' },
  { name: '降雪', code: 'PAS0', icon: 'snow', palette: '' },
  { name: '积雪深度', code: 'SD0', icon: 'snow', palette: '' },
  { name: '风速', code: 'WS10', icon: 'wins', palette: '' },
  { name: '风向', code: 'WND', icon: 'wind', palette: '' },
  { name: '云量', code: 'CL', icon: 'cloud', palette: '' },
  { name: '气压', code: 'APM', icon: 'pressure', palette: '' },
]

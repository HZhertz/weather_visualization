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

export const BC: [number, string][] = [
  [0.1, '#08e508'],
  [0.2, '#ffff08'],
  [0.3, '#ff8208'],
  [0.4, '#ff0808'],
  [0.5, '#9c0852'],
  [1, '#8b2c47'],
]

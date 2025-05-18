export interface DataItem {
  key: string
  title: string
  value: number
  unit: string
}

export const RUN_DATA_LIST: DataItem[] = [
  {
    key: 'onlineTime',
    title: '系统上线时间',
    value: 40,
    unit: '天',
  },
  {
    key: 'energySaving',
    title: '累计节省电耗',
    value: 46944,
    unit: 'kwh/m³',
  },
  {
    key: 'drugSaving',
    title: '累计节省药耗',
    value: 97,
    unit: 'mg/m³',
  },
  {
    key: 'sludgeReduction',
    title: '累计减少污泥量',
    value: 10944,
    unit: 'kg',
  },
]

export const ONLINE_DATA_IN_LIST: DataItem[] = [
  {
    key: 'influent_COD',
    title: '进水COD',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'influent_TN',
    title: '进水TN',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'influent_TP',
    title: '进水TP',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'influent_NH',
    title: '进水氨氮',
    unit: 'mg/L',
    value: 0,
  },
]

export const ONLINE_DATA_OUT_LIST: DataItem[] = [
  {
    key: 'effluent_COD',
    title: '出水COD',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'effluent_TN',
    title: '出水TN',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'effluent_TP',
    title: '出水TP',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'effluent_NH',
    title: '出水氨氮',
    unit: 'mg/L',
    value: 0,
  },
]

export const ONLINE_DATA_OTHER_LIST: DataItem[] = [
  {
    key: 'Aerobic_DO',
    title: '生物池末端DO',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'Aerobic_MLSS',
    title: '生物池MLSS',
    unit: 'mg/L',
    value: 0,
  },
  {
    key: 'SV30',
    title: 'SV30',
    unit: '%',
    value: 0,
  },
]

export const ONLINE_DATA_IN_EXTRA_LIST = [
  ...ONLINE_DATA_IN_LIST,
  {
    key: 'influent_flow',
    title: '进水流量',
    value: 2.56,
    unit: 'm³/d',
  },
]

export const ONLINE_DATA_LIST = [ONLINE_DATA_IN_LIST, ONLINE_DATA_OUT_LIST, ONLINE_DATA_OTHER_LIST]

export const ADVICES_DATA_LIST: DataItem[] = [
  {
    key: 'do',
    title: 'DO控制建议',
    value: 2.56,
    unit: 'mg/L',
  },
  {
    key: 'c',
    title: '碳源投加',
    value: 2.56,
    unit: 'mg/L',
  },
  {
    key: 'nei',
    title: '内回流菌种投加',
    value: 2.56,
    unit: '-',
  },
  {
    key: 'Sludge_sieve',
    title: '污泥筛分时间',
    value: 2.56,
    unit: 'mg/L',
  },
]

export const CONSUME_DATA_LIST: DataItem[] = [
  {
    key: 'power_consumption',
    title: '电耗',
    value: 2.56,
    unit: 'kwh/m³',
  },
  {
    key: 'chemical_consumption',
    title: '药耗',
    value: 2.56,
    unit: 'mg/L',
  },
  {
    key: 'excess_sludge_reduction',
    title: '剩余污泥量',
    value: 2.56,
    unit: 'mg/L',
  },
]

export const RUN_STATUS_OPTIONS = [
  { label: '启动', value: 'open' },
  { label: '关闭', value: 'close' },
]

export const INFLUENT_TYPES = ['influent_COD', 'influent_TN', 'influent_TP', 'influent_NH']

export const EFFLUENT_TYPES = ['effluent_COD', 'effluent_TN', 'effluent_TP', 'effluent_NH']

export const AEROBIC_TYPES = ['Aerobic_DO', 'Aerobic_MLSS', 'SV30']

export const ONLINE_LIST = [INFLUENT_TYPES, EFFLUENT_TYPES, AEROBIC_TYPES]
import { get, post } from '@/request/https'

// 获取企业信息
export const getBrandInfo = (
  tenantId = '71627260-314f-11f0-859f-c724664784c1',
  assetId = 'eda30040-3151-11f0-859f-c724664784c1'
) => {
  return get<InfoItem[]>(`api/noauth/asset/brandinfo/${tenantId}/${assetId}`)
}

// 用户登录
export const login = (username: string, password: string) => {
  return post<LoginRes>('/api/auth/login', { username, password })
}

// 获取用户信息
export const authUser = () => {
  return get<User>('/api/auth/user')
}

// 获取设备运行状态
export const getDeviceInfo = (deviceToken = 'ezQAEoPxlgVUUTvkJ2R3', clientKeys = 'UpTime,Running') => {
  return get<DeviceInfo>(`/api/v1/${deviceToken}/attributes`, { clientKeys })
}

// 获取设备列表
export const getCustomerDevices = (data: PageParams<{ customerId: string }>) => {
  const { customerId, ...params } = data
  return get<PageList<Device>>(`/api/customer/${customerId}/devices`, params)
}

// 获取设备属性
export const getDeviceAttributes = (entityId: string, keys = '', entityType = 'DEVICE') => {
  return get<DeviceAttribute[]>(`/api/plugins/telemetry/${entityType}/${entityId}/values/attributes`, { keys })
}

// 获取系统运行能效分析信息
export const getRunEfficiencyInfo = (
  entityId = 'eda30040-3151-11f0-859f-c724664784c1',
  entityType = 'ASSET',
  scope = 'SERVER_SCOPE'
) => {
  return get<InfoItem[]>(`/api/plugins/telemetry/${entityType}/${entityId}/values/attributes/${scope}`)
}

// 查询指定区间的历史数据
export const getDeviceTimeseries = (entityId: string, params: DeviceTimeserieQuery, entityType = 'DEVICE') => {
  return get<DeviceTimeserie>(`/api/plugins/telemetry/${entityType}/${entityId}/values/timeseries`, params)
}

// 获取最新的历史数据
export const getLatestDeviceTimeseries = (
  entityId: string,
  params?: LatestDeviceTimeserieQuery,
  entityType = 'DEVICE'
) => {
  return get<DeviceTimeserie>(`/api/plugins/telemetry/${entityType}/${entityId}/values/timeseries`, params)
}

// 获取设备控制状态信息
export const getDeviceControlInfo = (deviceId = 'a3ef8120-315c-11f0-859f-c724664784c1', scope = 'SHARED_SCOPE') => {
  return get<DeviceTimeserie>(`/api/plugins/telemetry/${deviceId}/${scope}`)
}

// 写入设备数据
export const saveDeviceAttributes = (
  entityId: string,
  data: Record<string, unknown>,
  entityType = 'DEVICE',
  scope = 'ANY'
) => {
  return post(`/api/plugins/telemetry/${entityType}/${entityId}/timeseries/${scope}`, data)
}

// 获取设备运行状态
// export const getControlAdviceInfo = (entityId = '8665c900-3587-11f0-b7f4-a52c6a864e88', entityType = 'DEVICE') => {
//   return get<DeviceTimeserie>(`/api/plugins/telemetry/${entityType}/${entityId}/values/timeseries`)
// }

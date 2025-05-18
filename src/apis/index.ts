import { get, post } from '@/request/https'

// 用户登录
export const login = (username: string, password: string) => {
  return post<LoginRes>('/api/auth/login', { username, password })
}

// 获取用户信息
export const authUser = () => {
  return get<User>('/api/auth/user')
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

// 查询指定区间的历史数据
export const getDeviceTimeseries = (entityId: string, params: DeviceTimeserieQuery, entityType = 'DEVICE') => {
  return get<DeviceTimeserie[]>(`/api/plugins/telemetry/${entityType}/${entityId}/values/timeseries`, params)
}

// 获取最新的历史数据
export const getLatestDeviceTimeseries = (
  entityId: string,
  params?: LatestDeviceTimeserieQuery,
  entityType = 'DEVICE'
) => {
  return get<DeviceTimeserie>(`/api/plugins/telemetry/${entityType}/${entityId}/values/timeseries`, params)
}

// 写入设备数据
export const saveDeviceAttributes = (
  entityId: string,
  data: Record<string, unknown>,
  entityType = 'DEVICE',
  scope?: number
) => {
  return post(`/api/plugins/telemetry/${entityType}/${entityId}/timeseries/${scope}`, data)
}

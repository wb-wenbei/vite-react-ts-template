declare module '*.svg?react' {
  const content: React.FC<React.SVGAttributes<SVGElement>>
  export default content
}

interface ApiError {
  errorCode: number
  message: string
  status: number
  timestamp: number
}

interface LoginRes {
  token: string
  refreshToken: string
}

interface PageParams<T extends object> extends T {
  page: number
  pageSize: number
}

interface PageList<T> {
  data: T[]
  hasNext: boolean
  totalElements: number
  totalPage: number
}

interface DataId {
  id: string
  entityType: CustomerIdEntityType
}

interface User {
  id: DataId
  tenantId: DataId
  customerId: DataId
  name: string
  firstName?: string
  lastName?: string
  authority: string
  email: string
  phone: number
}

interface SystemInfo {
  company_name?: string
  background_image_url?: string
  icon_url?: string
  saved_energy?: number
  saved_chemical_medicine?: string
  sludge_reduction?: number
  up_time?: number
}

interface OptionItem {
  key: string
  title: string
  value: number
  unit: string
}

interface InfoItem {
  key: string
  value: string | number
}

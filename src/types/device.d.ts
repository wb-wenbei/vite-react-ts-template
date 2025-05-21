enum AuthenticationProtocol {
  Md5 = 'MD5',
  SHA1 = 'SHA_1',
  SHA224 = 'SHA_224',
  SHA256 = 'SHA_256',
  SHA384 = 'SHA_384',
  SHA512 = 'SHA_512',
}

enum PowerMode {
  Drx = 'DRX',
  EDrx = 'E_DRX',
  PSM = 'PSM',
}

enum PrivacyProtocol {
  AES128 = 'AES_128',
  AES192 = 'AES_192',
  AES256 = 'AES_256',
  DES = 'DES',
}

enum ProtocolVersion {
  V1 = 'V1',
  V2C = 'V2C',
  V3 = 'V3',
}

interface Device {
  name: string
  id?: DataId
  tenantId?: DataId
  customerId?: DataId
  softwareId?: DataId
  deviceProfileId: DataId
  firmwareId?: DataId
  deviceData?: DeviceData
  createdTime?: number
  label?: string
  type?: string
  version?: number
  additionalInfo?: Record<string, unknown>
  attributeList?: DeviceAttribute[]
  latestTimeserie?: DeviceTimeserie
  hisTimeserieList?: DeviceTimeserie[]
}

interface DeviceData {
  configuration?: Configuration
  transportConfiguration?: TransportConfiguration
}

interface Configuration {
  type: string
}

interface TransportConfiguration {
  type: string
  edrxCycle?: number
  pagingTransmissionWindow?: number
  powerMode?: PowerMode
  psmActivityTimer?: number
  authenticationPassphrase?: string
  authenticationProtocol?: AuthenticationProtocol
  community?: string
  contextName?: string
  engineId?: string
  host?: string
  port?: number
  privacyPassphrase?: string
  privacyProtocol?: PrivacyProtocol
  protocolVersion?: ProtocolVersion
  securityName?: string
  username?: string
}

interface DeviceAttribute {
  key: string
  lastUpdateTs: number
  value: number | string | boolean
}

interface DeviceTimeserie {
  [key: string]: {
    ts: number
    value: string | number | boolean
  }[]
}

enum Agg {
  Avg = 'AVG',
  Count = 'COUNT',
  Max = 'MAX',
  Min = 'MIN',
  None = 'NONE',
  Sum = 'SUM',
}

enum IntervalType {
  Milliseconds = 'MILLISECONDS',
  Month = 'MONTH',
  Quarter = 'QUARTER',
  Week = 'WEEK',
  WeekISO = 'WEEK_ISO',
}

enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC',
}

interface DeviceTimeserieQuery {
  agg?: Agg
  endTs: number
  interval?: number
  intervalType?: IntervalType
  keys: string
  limit?: number
  orderBy?: OrderBy
  startTs: number
  timeZone?: string
  useStrictDataTypes?: boolean
}

interface LatestDeviceTimeserieQuery {
  keys?: string
  useStrictDataTypes?: boolean
}

interface DeviceInfo {
  client: {
    UpTime: number
    Running: boolean
  }
}

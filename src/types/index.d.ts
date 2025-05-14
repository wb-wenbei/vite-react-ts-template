interface ApiRes<T> {
  code: number
  msg: string
  data: T
}

interface User {
  id: number
  name: string
  email: string
  roles: string[]
}

interface CompanyInfo {
  title: string
  logo: string
  bgImg: string
}

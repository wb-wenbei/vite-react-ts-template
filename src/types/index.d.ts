declare module '*.svg?react' {
  const content: React.FC<React.SVGAttributes<SVGElement>>
  export default content
}

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

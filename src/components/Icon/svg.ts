import { lazy } from 'react'

const SVG: Record<string, React.FC> = {
  manual: lazy(() => import('@/assets/svgs/manual.svg?react')),
  auto: lazy(() => import('@/assets/svgs/auto.svg?react')),
  running: lazy(() => import('@/assets/svgs/running.svg?react')),
  user: lazy(() => import('@/assets/svgs/user.svg?react')),
}

export default SVG

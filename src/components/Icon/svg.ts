import { lazy } from 'react'

const SVG: Record<string, React.FC> = {
  manage: lazy(() => import('@/assets/icons/manage.svg?react')),
}

export default SVG

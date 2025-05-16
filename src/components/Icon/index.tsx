import { Suspense } from 'react'
import type { SVGProps } from 'react'
import SVG from './svg'

interface SvgWrapperProps {
  size?: number
  style?: React.CSSProperties
  name: string
  className?: string
  onClick?: () => void
}

const SvgIcon: React.FC<SvgWrapperProps> = function ({ name, size = 14, style, className, onClick }) {
  const Icon = SVG[name]
  return (
    <span
      role="img"
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyItems: 'center',
        textRendering: 'optimizeLegibility',
        textTransform: 'none',
        verticalAlign: '-0.185em',
        fontStyle: 'normal',
        // color: 'inherit',
        fontSize: size,
        WebkitFontSmoothing: 'antialiased',
        ...style,
      }}
      onClick={onClick}
    >
      <Suspense fallback={<div style={{ width: size ?? '1em', height: size ?? '1em' }}></div>}>
        <Icon />
      </Suspense>
    </span>
  )
}

interface IconWrapperProps {
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

const IconWrapper: React.FC<IconWrapperProps> = function (props) {
  return (
    <span
      role="img"
      className={props.className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyItems: 'center',
        textRendering: 'optimizeLegibility',
        textTransform: 'none',
        verticalAlign: '-0.185em',
        fontStyle: 'normal',
        color: 'inherit',
        ...props.style,
      }}
    >
      {props.children}
    </span>
  )
}

export function FreshFailureOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <IconWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <path d="m11 9l2-.5l.5 2"></path>
          <path d="M13 8.5A6.6 6.6 0 0 1 7 13h0a6 6 0 0 1-5.64-3.95M3 5l-2 .5l-.5-2"></path>
          <path d="M1 5.5A6.79 6.79 0 0 1 7 1h0a6 6 0 0 1 5.64 4M7 3.5v4"></path>
          <circle cx="7" cy="10" r=".5"></circle>
        </g>
      </svg>
    </IconWrapper>
  )
}

export default SvgIcon

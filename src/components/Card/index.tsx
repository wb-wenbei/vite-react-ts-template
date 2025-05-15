import React from 'react'
import style from './index.module.less'

type Props = {
  title?: string
  children?: React.ReactNode
}

const App: React.FC<Props> = (props) => {
  const { title, children } = props
  return (
    <div className={style.card}>
      <div className={style.header}>
        icon
        <div>{title}</div>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  )
}

export default App

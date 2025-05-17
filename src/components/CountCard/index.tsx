import React from 'react'
import style from './index.module.less'

type Props = {
  title: string
  value: number
  unit: string
  type: string
}

const App: React.FC<Props> = (props) => {
  const { title, value, unit, type } = props
  return (
    <div className={`${style.countCard} ${style[type]}`}>
      <div className={style.content}>
        <span className={style.value}>{value}</span>
        <span>{unit}</span>
      </div>
      <div className={style.title}>{title}</div>
    </div>
  )
}

export default App

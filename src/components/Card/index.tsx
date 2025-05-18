import React from 'react'
import style from './index.module.less'
import manage from '@/assets/icons/manage.png'

type Props = {
  title?: string
  children?: React.ReactNode
}

const Card: React.FC<Props> = (props) => {
  const { title, children } = props
  return (
    <div className={style.card}>
      <div className={style.header}>
        <img src={manage} alt="" />
        <div>{title}</div>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  )
}

export default Card

import React from 'react'
import copy from 'copy-to-clipboard'
import { Button, message } from 'antd'
import { CopyOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import Chart from '@/components/Chart'
import type { OptionType } from '@/components/Chart'
import style from './index.module.less'

type Props = {
  title?: string
  option?: OptionType
}

const App: React.FC<Props> = (props) => {
  const { title, option } = props
  const [fullScreen, setFullScreen] = React.useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const onCopy = () => {
    if (option) {
      copy(JSON.stringify(option))
      messageApi.open({
        type: 'success',
        content: '复制成功',
      })
    }
  }

  return (
    <>
      {contextHolder}
      <div className={[style.chartCard, fullScreen ? style.fullScreen : ''].join(' ')}>
        <div className={style.header}>
          <div className={style.title}>{title}</div>
          <div className={style.actions}>
            <Button type="primary" size="small" ghost icon={<CopyOutlined />} onClick={onCopy} />
            <Button
              type="primary"
              ghost
              size="small"
              icon={fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
              onClick={() => setFullScreen((prev) => !prev)}
            />
          </div>
        </div>
        <div className={style.chart}>{option && <Chart option={option} />}</div>
      </div>
    </>
  )
}

export default App

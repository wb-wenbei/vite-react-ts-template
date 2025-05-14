import React from 'react'
import { Outlet } from 'react-router'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'

const App: React.FC = () => {
  const items1: MenuProps['items'] = [
    {
      key: 'home',
      label: `首页`,
    },
    {
      key: 'analysis',
      label: `效果分析`,
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div>icon</div>
          <div>系统名称</div>
          <div>系统子名称</div>
        </div>
        <div className={styles.menus}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default App

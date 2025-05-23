import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { Avatar, Dropdown, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import useUserStore from '@/stores/user'
import useSystemStore from '@/stores/system'

let loaded = false

const App: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { clear, userInfo, customerId } = useUserStore()
  const { systemInfo, updateDeviceInfo, updateDeviceList } = useSystemStore()

  const activeMenu = location.pathname

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      label: `首页`,
    },
    {
      key: '/analysis',
      label: `效果分析`,
    },
    {
      key: '/quota',
      label: `指标数据`,
    },
  ]

  const menuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  const actionClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      clear()
      window.location.href = '/login'
    }
  }

  const userItems: MenuProps['items'] = [
    {
      key: 'user',
      label: userInfo?.name || '用户',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
    },
  ]

  useEffect(() => {
    updateDeviceInfo()
  }, [updateDeviceInfo])

  // useEffect(() => {
  //   updateRunEfficiencyInfo()
  // }, [updateRunEfficiencyInfo])

  useEffect(() => {
    if (loaded) return
    loaded = true
    updateDeviceList(customerId)
  }, [customerId, updateDeviceList])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {systemInfo?.icon_url && <img src={systemInfo?.icon_url} alt="" />}
          <div>{systemInfo?.company_name}</div>
          <div></div>
          <div>测流式生物倍增反应系统</div>
        </div>
        <div className={styles.actions}>
          <Menu selectedKeys={[activeMenu]} theme="dark" mode="horizontal" items={menuItems} onClick={menuClick} />
          <Dropdown menu={{ items: userItems, onClick: actionClick }} trigger={['click']}>
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default App

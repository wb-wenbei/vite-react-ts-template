import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { Avatar, Dropdown, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import useUserStore from '@/stores/user'
import useSystemStore from '@/stores/system'
import { getCustomerDevices, getDeviceAttributes, getLatestDeviceTimeseries } from '@/apis'

let loading = false

const App: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { clear, userInfo, customerId } = useUserStore()
  const { systemInfo } = useSystemStore()
  const { setDeviceList } = useSystemStore()
  const [devices, setDevices] = useState<Device[]>([])
  
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
    if (loading) return
    loading = true

    const loadDevices = (customerId?: string) => {
      if (!customerId) return

      getCustomerDevices({ page: 0, pageSize: 50, customerId: customerId }).then((res) => {
        loading = false
        setDevices(res.data)
        setDeviceList(res.data)
        console.log('设备列表', res.data)

        res.data.forEach((device) => {
          loadAttributes(device.id?.id)
          loadTimeseries(device.id?.id)
        })
      })
    }

    const loadAttributes = (deviceId?: string) => {
      if (!deviceId) return

      getDeviceAttributes(deviceId).then((res) => {
        setDevices((prev) => {
          const current = [...prev]
          const device = current.find((item) => item.id?.id === deviceId)

          if (device) device.attributeList = res

          return current
        })
      })
    }

    const loadTimeseries = (deviceId?: string) => {
      if (!deviceId) return

      getLatestDeviceTimeseries(deviceId).then((res) => {
        setDevices((prev) => {
          const current = [...prev]
          const device = current.find((item) => item.id?.id === deviceId)

          if (device) device.latestTimeserie = res

          return current
        })
      })
    }

    loadDevices(customerId)
  }, [customerId, setDeviceList])

  useEffect(() => {
    setDeviceList(devices)
  }, [devices, setDeviceList])

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

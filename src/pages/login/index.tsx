import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Button, Checkbox, Form, Input } from 'antd'
import { authUser, login } from '@/apis'
import useUserStore from '@/stores/user'
import { useNavigate } from 'react-router'
import useSystemStore from '@/stores/system'

interface LoginInfo {
  username: string
  password: string
  remember: boolean
}

const App: React.FC = () => {
  const { token, setToken, setUserInfo, setCustomerId, clear } = useUserStore()
  const { systemInfo, updateDeviceInfo } = useSystemStore()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const remember = localStorage.getItem('remember') === 'true'

  const onLogin = async (values: LoginInfo) => {
    const { username, password, remember } = values
    localStorage.setItem('remember', remember ? 'true' : 'false')
    setLoading(true)

    login(username, password)
      .then((res) => {
        setToken(res.token)

        authUser().then((res) => {
          setUserInfo(res)
          setCustomerId(res.customerId.id)
        })

        navigate('/')
      })
      .catch(() => {
        clear()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    updateDeviceInfo()

    if (token) navigate('/')
  }, [token, navigate, updateDeviceInfo])

  return (
    <div
      className={styles.container}
      style={{
        background: systemInfo?.background_image_url
          ? `url(${systemInfo?.background_image_url}) center / cover no-repeat`
          : '',
      }}
    >
      <div className={styles.login}>
        <div className={styles.title}>
          {systemInfo?.icon_url && <img src={systemInfo?.icon_url} alt="" />}
          {systemInfo?.company_name}
        </div>
        <div className={styles.subTitle}>测流式生物倍增反应系统</div>
        <Form layout="vertical" size="large" onFinish={onLogin}>
          <Form.Item<LoginInfo> label="账户" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input allowClear size="large" />
          </Form.Item>

          <Form.Item<LoginInfo> label="密码" name="password" rules={[{ required: true, message: '请输入用密码!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item<LoginInfo> name="remember" valuePropName="checked" label={null}>
            <Checkbox defaultChecked={remember}>自动登录</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading} disabled={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Button, Checkbox, Form, Input } from 'antd'
import { authUser, login } from '@/apis'
import useUserStore from '@/stores/user'
import { useNavigate } from 'react-router'

interface LoginInfo {
  username: string
  password: string
  remember: boolean
}

const App: React.FC = () => {
  const { token, setToken, setUserInfo, setCustomerId, clear } = useUserStore()
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
    if (token) navigate('/')
  }, [token, navigate])

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.title}>
          <img
            src="data:image/png;base64,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"
            alt=""
          />
          企业名称
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

import React from 'react'
import styles from './index.module.less'
import useSystemStore from '@/stores/system'
import { Button, Checkbox, Form, Input } from 'antd'

interface LoginInfo {
  username: string
  password: string
  remember: boolean
}

const App: React.FC = () => {
  const { companyInfo } = useSystemStore((state) => state)
  return (
    <div className={styles.container} style={{ background: `url(${companyInfo?.bgImg}) center / cover no-repeat` }}>
      <div className={styles.login}>
        <div className={styles.title}></div>
        <div className={styles.subTitle}></div>
        <Form>
          <Form.Item<LoginInfo> label="用户" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<LoginInfo> label="密码" name="password" rules={[{ required: true, message: '请输入用密码!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item<LoginInfo> name="remember" valuePropName="checked" label={null}>
            <Checkbox>自动登录</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default App

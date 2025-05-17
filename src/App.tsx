import React from 'react'
import { BrowserRouter } from 'react-router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Routes from './routes'

const App: React.FC = () => {
  return (
    <React.Suspense>
      <ConfigProvider locale={zhCN} componentSize="middle" theme={{ token: { colorPrimary: '#165DFF' } }}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ConfigProvider>
    </React.Suspense>
  )
}

export default App

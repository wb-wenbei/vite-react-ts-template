import React, { useEffect, useState } from 'react'
import ThreeModel from '@/components/ThreeModel'
import Card from '@/components/Card'
import CountCard from '@/components/CountCard'
import style from './index.module.less'
import { getCustomerDevices } from '@/apis'
import useUserStore from '@/stores/user'

const App: React.FC = () => {
  const { customerId } = useUserStore()

  const [list, setList] = useState([
    {
      title: '系统上线时间',
      value: 40,
      unit: '天',
      type: 'success',
    },
    {
      title: '累计节省电耗',
      value: 46944,
      unit: 'kwh/m³',
      type: 'warning',
    },
    {
      title: '累计节省药耗',
      value: 97,
      unit: 'mg/m³',
      type: 'info',
    },
    {
      title: '累计减少污泥量',
      value: 10944,
      unit: 'kg',
      type: 'error',
    },
  ])

  useEffect(() => {
    const loadData = () => {
      getCustomerDevices({ page: 1, pageSize: 10, customerId: customerId }).then((res) => {
        console.log('getCustomerDevices', res)
        setList((prev) => prev)
      })
    }

    loadData()
  }, [customerId])

  return (
    <div className={style.home}>
      <Card title="运行能效分析">
        <div className={style.analysis}>
          {list.map((item, index) => (
            <CountCard key={index} title={item.title} value={item.value} unit={item.unit} type={item.type} />
          ))}
        </div>
      </Card>
      <Card title="在线数据"></Card>
      <Card title="运行概览">
        <ThreeModel />
      </Card>
      <Card title="控制建议"></Card>
      <Card title="筛分控制"></Card>
    </div>
  )
}

export default App

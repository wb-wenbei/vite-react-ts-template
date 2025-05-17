import React, { useEffect, useState } from 'react'
import { Button, Checkbox, InputNumber, Table } from 'antd'
import style from './index.module.less'

type DataItem = {
  key: string
  metric: string
  manual: boolean
  manualInput?: boolean
  value: number
  valueInput?: number | null
  unit: string
}

type Props = {
  data?: DataItem[]
}

const ControlTable: React.FC<Props> = ({ data }) => {
  const [dataSource, setDataSource] = useState<DataItem[]>([])

  const columns = [
    {
      title: '指标',
      dataIndex: 'metric',
      minWidth: 160,
    },
    {
      title: '人工输入',
      dataIndex: 'manual',
      render: (_: boolean, record: DataItem) => (
        <Checkbox checked={record.manualInput} onChange={(e) => manualChange(record, e.target.checked)} />
      ),
    },
    {
      title: '数值',
      dataIndex: 'value',
      render: (_: number, record: DataItem) => (
        <InputNumber
          value={!record.manualInput ? record.value : record.valueInput}
          disabled={!record.manualInput}
          onChange={(e) => valueChange(record, e)}
        />
      ),
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      dataIndex: 'action',
      width: 100,
      render: (_: string, record: DataItem) => (
        <Button
          type="primary"
          disabled={!record.manualInput || record.value === record.valueInput}
          onClick={() => onSubmit(record)}
        >
          确认
        </Button>
      ),
    },
  ]

  const manualChange = (record: DataItem, e: boolean) => {
    setDataSource((prev) => {
      return prev.map((item) => {
        if (item.metric === record.metric) {
          return { ...item, manualInput: e }
        }
        return item
      })
    })
  }

  const valueChange = (record: DataItem, e: number | null) => {
    setDataSource((prev) => {
      return prev.map((item) => {
        if (item.metric === record.metric) {
          return { ...item, valueInput: e }
        }
        return item
      })
    })
  }

  const onSubmit = (record: DataItem) => {
    console.log('提交数据:', record)
  }

  useEffect(() => {
    setDataSource(data || [])
  }, [data])

  return (
    <div className={style.controlTable}>
      <Table rowKey="metric" dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  )
}

export default ControlTable

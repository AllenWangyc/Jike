import { Link } from "react-router-dom"
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from "antd"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

// import snicizing package
import locale from "antd/es/date-picker/locale/zh_CN"

import { Table, Tag, Space } from 'antd'
import img404 from '@/assets/error.png'
import { useChannel } from "@/hooks/useChannel"
import { useEffect, useState } from "react"
import { getArticleListAPI } from "@/apis/user"

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const { channelList } = useChannel()
  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'Status',
      dataIndex: 'status',
      // data - 后端返回的状态status 根据它做条件渲染
      // data === 1 => 待审核
      // data === 2 => 审核通过
      render: data => <Tag color="green">Passed</Tag>
    },
    {
      title: 'Publish Date',
      dataIndex: 'pubdate'
    },
    {
      title: 'Read count',
      dataIndex: 'read_count'
    },
    {
      title: 'Comment count',
      dataIndex: 'comment_count'
    },
    {
      title: 'Like count',
      dataIndex: 'like_count'
    },
    {
      title: 'Action',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'off-line loading strategy'
    }
  ]

  const [list, setList] = useState([])

  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI()
      setList(res.data.results)
    }
    getList()
  }, [])

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>Home</Link> },
              { title: 'Article' }
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          initialValues={{ status: null }}
          labelCol={{ span: 1 }}
          labelAlign="left"
        >
          <Form.Item label='Status' name='status'>
            <Radio.Group>
              <Radio value={null}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={2}>Passed</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label='Channel' name='channel_id'>
            <Select
              placeholder='Select a channel'
              defaultValue=''
              style={{ width: 120 }}
            >
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label='Date' name='date'>
            {/* pass locale prop */}
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`${list.length} of results are filted according to conditions:`}>
        <Table rowKey='id' columns={columns} dataSource={list} />
      </Card>
    </div>
  )
}

export default Article
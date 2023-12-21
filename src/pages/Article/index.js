import { Link } from "react-router-dom"
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from "antd"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

// import snicizing package
import locale from "antd/es/date-picker/locale/zh_CN"

import { Table, Tag, Space } from 'antd'
import img404 from '@/assets/error.png'
import { useChannel } from "@/hooks/useChannel"
import { useEffect, useState } from "react"
import { delArticleAPI, getArticleListAPI } from "@/apis/user"

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const { channelList } = useChannel()

  //  @parameter {object} reqDate: filter conditions 
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page: 4
  })

  // get article list from backend
  const [list, setList] = useState([])
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData)
      setList(res.data.results)
    }
    getList()
  }, [reqData]) // invoke once reqData updated

  const onFinish = (formValue) => {
    console.log(formValue)
    console.log(formValue.date[0].format('YYYY-MM-DD'))
    setReqData({
      ...reqData,
      status: formValue.status,
      channel_id: formValue.channel_id,
      begin_pubdate: formValue.date[0].format('YYYY-MM-DD'),
      end_pubdate: formValue.date[1].format('YYYY-MM-DD')
    })
  }

  const onPageChange = (page) => {
    setReqData({
      ...reqData,
      page
    })
  }

  const onConfirm = async (data) => {
    await delArticleAPI(data.id)
    setReqData({
      ...reqData // do have to change reqData, just trigger useEffect to re-render
    })
  }

  // enum for rendering multi tags
  const status = {
    1: <Tag color="warning">Await assessing</Tag>,
    2: <Tag color="green">Passed</Tag>
  }
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
      // data - status from backend
      // data === 1 => await assessing
      // data === 2 => passed
      render: data => status[data]
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
            <Popconfirm
              title="Delete the result"
              description="Are you sure to delete the result?"
              onConfirm={() => onConfirm(data)}
              okText='Yes'
              cancelText='No'
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

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
        <Form onFinish={onFinish}
          initialValues={{ status: '' }}
          labelCol={{ span: 1 }}
          labelAlign="left"
        >
          <Form.Item label='Status' name='status'>
            <Radio.Group>
              <Radio value={''}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={2}>Passed</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label='Channel' name='channel_id'>
            <Select
              placeholder='Select a channel'
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
        <Table rowKey='id' columns={columns} dataSource={list} pagination={{
          total: list.length,
          pageSize: reqData.per_page,
          onChange: onPageChange
        }} />
      </Card>
    </div>
  )
}

export default Article
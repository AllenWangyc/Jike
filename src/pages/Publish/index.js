import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import React, { useEffect, useState } from 'react'
import { getChannelAPI } from '@/apis/user'

const { Option } = Select

const Publish = () => {
  const [channelList, setChannelList] = useState([])

  useEffect(() => {
    // 1. encapsulate a function, using interface
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    // 2. invoke function
    getChannelList()
  }, [])

  return (
    <div className='publish'>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: 'Publish' }
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{
              required: true,
              message: 'Please enter the title'
            }]}
          >
            <Input placeholder='Enter the article title' style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[{
              required: true,
              message: 'Please select a channel'
            }]}
          >
            <Select placeholder='Select a channel' style={{ width: 400 }}>
              {/* value prop would be passed to backend when selected by user */}
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{
              required: true,
              message: 'Please enter the content'
            }]}
          >
            {/* rich text editor with react-quill@2.0.0-beta.2 */}
            <ReactQuill
              className='publish-quill'
              theme='snow'
              placeholder='Enter the content...'
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size='large' type='primary' htmlType='submit'>
                Publish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
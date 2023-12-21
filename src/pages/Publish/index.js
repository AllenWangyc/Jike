import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import React, { useEffect, useState } from 'react'
import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/user'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
  // get article id
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [imageList, setImageList] = useState([])
  const navigate = useNavigate()

  /**
   * @param {number} imageType: 0 -- non pic, 1 -- one-pic, 3 -- three-pic 
   */
  const [imageType, setImageType] = useState(0)

  const { channelList } = useChannel()

  const onFinish = async (value) => {
    const { title, content, channel_id } = value
    const reqData = {
      title,
      content,
      cover: {
        type: imageType,
        // compatible process publish/edit
        images: imageList.map(item => {
          if (item.response) {
            return item.response.data.url
          } else {
            return item.url
          }

        }) // [imageList: {response: {data: {url: string}}}]
      },
      channel_id
    }
    if (imageType !== reqData.cover.images.length) return message.warning('The numberof over pictures do not match with type')

    // invoke different interface (publish/edit)
    if (articleId) {
      await updateArticleAPI({ ...reqData, id: articleId })
      message.success('Update successfully!')
    } else {
      await createArticleAPI(reqData)
      message.success('Publish successfully!')
    }
    navigate('/article')
  }

  // upload callback
  const onChange = (value) => {
    setImageList(value.fileList)
  }

  const onTypeChange = (e) => {
    setImageType(e.target.value)
  }

  // get form instance
  const [form] = Form.useForm()
  useEffect(() => {
    async function getArticleDetail() {
      const res = await getArticleById(articleId)
      const data = res.data
      const { cover } = data

      /**
       * form.setFieldsValue(res.data) 
       * Refill basic information of article (title, channel, content)
       * Notice: cannot refill cover type and image
       * Reason: param res.data {cover: {type: 3} }
       * .setFieldsValue() needs {type}, data are not matched
       */

      form.setFieldsValue({
        ...data,
        type: cover.type
      })

      // refill image list
      setImageType(cover.type)
      // refill images
      setImageList(cover.images.map(url => {
        return { url }
      }))
    }
    // invoke function if acricleId exist
    if (articleId) {
      getArticleDetail()
    }
  }, [articleId, form])

  return (
    <div className='publish'>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: `${articleId ? 'Edit' : 'Publish'}` }
          ]}
          />
        }
      >
        <Form onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          form={form}
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
          <Form.Item label="Cover">
            <Form.Item name='type'>
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>One-pic</Radio>
                <Radio value={3}>Three-pic</Radio>
                <Radio value={0}>None</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && <Upload
              listType='picture-card'
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name='image'
              onChange={onChange}
              maxCount={imageType}
              fileList={imageList} // use for refill images
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
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
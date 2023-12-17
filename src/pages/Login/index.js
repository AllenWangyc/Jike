import './index.scss'
import { Card, Input, Button, Form, message } from 'antd'
import logo from '@/assets/logo.png'
import { fetchLogin } from '@/store/modules/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    await dispatch(fetchLogin(values))
    navigate('/')
    message.success('Login successfully!')
  }

  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt='' />
        {/* login form */}
        <Form validateTrigger='onBlur' onFinish={onFinish}>
          <Form.Item
            name='mobile'
            rules={[
              {
                required: true,
                message: "Please enter your phone number"
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "Please check your 11-digit validated phone number"
              }
            ]}
          >
            <Input size='large' placeholder='Enter phone number' />
          </Form.Item>
          <Form.Item
            name='code'
            rules={[
              {
                required: true,
                message: "Please enter virificaion code"
              },
            ]}
          >
            <Input size='large' placeholder='Enter verification code' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large' block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
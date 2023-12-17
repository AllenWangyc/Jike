import './index.scss'
import { Card, Input, Button, Form } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {

  const onFinish = (values) => {
    console.log(values);
  }
  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt='' />
        {/* login form */}
        <Form validateTrigger='onBlur' onFinish={onFinish}>
          <Form.Item
            name='phone'
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
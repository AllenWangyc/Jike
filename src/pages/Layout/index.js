import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo } from '@/store/modules/user'

const { Header, Sider } = Layout
const items = [
  {
    label: 'Home',
    key: '/',
    icon: <HomeOutlined />
  },
  {
    label: 'Article',
    key: '/article',
    icon: <DiffOutlined />
  },
  {
    label: 'Publish',
    key: '/publish',
    icon: <EditOutlined />
  },
]
const GeekLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedKey = location.pathname

  // trigger action of userInfo
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  const name = useSelector(state => state.user.userInfo.name)

  /**
   * 
   * @param {object} route an object that contain all information of the clicked item
   */
  const onMenuClick = (route) => {
    navigate(route.key)
  }

  return (
    <Layout>
      <Header className='header'>
        <div className='logo' />
        <div className='user-info'>
          <span className='user-name'>{name}</span>
          <span className='user-logout'>
            <Popconfirm title="Do you confirm to exit?" okText='Yes' cancelText='No'>
              <LogoutOutlined /> Exit
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className='site-layout-background'>
          <Menu
            mode='inline'
            theme='dark'
            selectedKeys={selectedKey}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={onMenuClick}
          ></Menu>
        </Sider>
        <Layout className='layout-content' style={{ padding: 20 }}>
          {/* 2nd route exit */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout
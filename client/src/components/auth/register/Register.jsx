/* eslint-disable react/prop-types */
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { useDispatch } from 'react-redux'
import { Button, Flex, Form, Input } from 'antd'
import { LockOutlined, UserOutlined, CheckSquareOutlined } from '@ant-design/icons'

import {
  fetchRegisterUser,
} from '../../../redux/slices/authSlice'
import styles from './Register.module.css'

const Register = ({ showLogin, setShowForm }) => {
  const dispatch = useDispatch()
  const routeNavigator = useRouteNavigator()


  const onFinish = (values) => {
    console.log(values)
    dispatch(fetchRegisterUser(values))
    routeNavigator.push('/')
    setShowForm(false)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  
  return (
    <div className="page_form">
      <h3 className={styles.heading}>Зарегистрироваться</h3>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 370 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

         <Form.Item
          name="secretCode"
          rules={[
            {
              required: true,
              message: 'Please input your secret code!',
            },
          ]}
        >
          <Input
            prefix={<CheckSquareOutlined /> }
            type="text"
            placeholder="secret code"
          />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center" vertical>
            <Button
              block={true}
              className={styles.btn}
              type="primary"
              htmlType="submit"
              size="medium"
            >
              Отправить
            </Button>
            <a onClick={() => showLogin('login')} className={styles.link}>авторизация!</a>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register

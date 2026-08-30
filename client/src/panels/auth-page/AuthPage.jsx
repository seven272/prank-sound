import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from 'antd'
import { FiUser } from 'react-icons/fi'

import styles from './AuthPage.module.css'
import Auth from '../../components/auth/Auth'
import { checkIsAuth } from '../../redux/slices/authSlice'

const AuthPage = () => {
  const isAuth = useSelector(checkIsAuth)
  const user = useSelector((state) => state.auth.user)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className={styles.main}>
      <div className={styles.wrap}>
        {isAuth ? ( 
          <Avatar
            size={50}
            className={styles.avatar}
            onClick={() => setShowForm(true)}
          >
            {user?.username}
          </Avatar>
        ) : (
          <Avatar
            icon={<FiUser size={30} />}
            size={50}
            className={styles.avatar}
            onClick={() => setShowForm(true)}
          />
        )}
        <Auth showForm={showForm} setShowForm={setShowForm}/>
      </div>
    </div>
  )
}

export default AuthPage

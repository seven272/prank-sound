import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoMdClose } from 'react-icons/io'

import Login from './login/Login'
import Register from './register/Register'
import Logout from './logout/Logout'
import styles from './Auth.module.css'
import { checkIsAuth } from '../../redux/slices/authSlice'

const Auth = ({ showForm, setShowForm }) => {
  const isAuth = useSelector(checkIsAuth)
  const [showComponent, setShowComponent] = useState('login')

  return ( 
    <>
      {showForm && !isAuth && (
        <div className={styles.section}>
          <IoMdClose
            size={30}
            className={styles.icon_close}
            onClick={() => setShowForm(false)}
          />
          {showComponent === 'login' && (
            <Login showRegister={setShowComponent} setShowForm={setShowForm} />
          )}
          {showComponent === 'register' && (
            <Register showLogin={setShowComponent}  setShowForm={setShowForm} />
          )}
        </div>
      )}
      {isAuth && showForm && (
        <div className={styles.section}>
          <IoMdClose
            size={30}
            className={styles.icon_close}
            onClick={() => setShowForm(false)}
          />
          {showForm && <Logout setShowForm={setShowForm} />}
          
        </div>
      )}
    </>
  )
}

export default Auth

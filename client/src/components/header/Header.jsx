import { useSelector } from 'react-redux'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { RiHomeSmileLine } from 'react-icons/ri'
import { useState } from 'react'
import { Avatar } from 'antd'
import { FiUser } from 'react-icons/fi'

import styles from './Header.module.css'
import { checkIsAuth } from '../../redux/slices/authSlice'
import Auth from '../auth/Auth'
import logoImg from '../../assets/images/logo.png'
// import DropdownMenu from '../dropdown-menu/DropdownMenu'

const Header = () => {
  const routerNavigator = useRouteNavigator()
  const isAuth = useSelector(checkIsAuth)
  const user = useSelector((state) => state.auth.user)
  const { vk_id, vk_avatar } = useSelector((state) => state.vkUser)
  const [showForm, setShowForm] = useState(false)

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.home_wrapper}>
          <RiHomeSmileLine
            size={50}
            className={styles.icon_home}
            onClick={() => routerNavigator.push('/')}
          />
          {/* <DropdownMenu /> */}
        </div>

        <div className={styles.logo_wrapper}>
          <img src={logoImg} alt="логотип" className={styles.logo} />
        </div>

        {/* авторизация вконтакте */}
        {vk_id !== '' ? (
          <Avatar
            size={50}
            className={styles.avatar}
            src={vk_avatar}
          >Михаил</Avatar>
        ) : (
          <Avatar
            icon={<FiUser size={30} />}
            size={50}
            className={styles.avatar}
          />
        )}

        {/* авторизация обычная */}
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

        <Auth showForm={showForm} setShowForm={setShowForm} />
      </div>
    </div>
  )
}

export default Header

import { useSelector } from 'react-redux'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Avatar } from 'antd'
import { FiUser } from 'react-icons/fi'

import styles from './Header.module.css'
import logoImg from '../../assets/images/logo.png'
import DropdownMenu from '../dropdown-menu/DropdownMenu.jsx'

const Header = () => {
  const routerNavigator = useRouteNavigator()
  const { vk_id, vk_avatar, isPaid } = useSelector(
    (state) => state.vkUser,
  )

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.home_wrapper}>
          <DropdownMenu />
        </div>

        <div className={styles.logo_wrapper}>
          <img
            src={logoImg}
            alt="логотип"
            className={styles.logo}
            onClick={() => routerNavigator.push('/')}
          />
        </div>

        {/* авторизация вконтакте */}
        {vk_id !== '' ? (
          <div className={styles.avatar_wrapper}>
            <Avatar
              size={50}
              className={styles.avatar}
              src={vk_avatar}
            />
            {isPaid && (
              <span className={styles.text_avatar}>VIP</span>
            )}
          </div>
        ) : (
          <Avatar
            icon={<FiUser size={30} />}
            size={50}
            className={styles.avatar}
          />
        )}
      </div>
    </div>
  )
}

export default Header

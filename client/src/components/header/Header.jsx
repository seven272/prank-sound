import { useSelector, useDispatch } from 'react-redux'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { RiHomeSmileLine } from 'react-icons/ri'
import { Avatar } from 'antd'
import { FiUser } from 'react-icons/fi'

import styles from './Header.module.css'
import logoImg from '../../assets/images/logo.png'
import { deleteVkUser, fetchGetAllVkUsers } from '../../redux/slices/vkUserSlice'


const Header = () => {
  const dispatch = useDispatch()
  const routerNavigator = useRouteNavigator()
  const { vk_id, vk_avatar } = useSelector((state) => state.vkUser)

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.home_wrapper}>
          <RiHomeSmileLine
            size={50}
            className={styles.icon_home}
            onClick={() => routerNavigator.push('/')}
          />
          <div className={styles.test_btns}>
            <button className={styles.test_btn} onClick={()=> dispatch(deleteVkUser())} >del</button>
            <button className={styles.test_btn} onClick={()=> dispatch(fetchGetAllVkUsers()) }>all</button>
            <button className={styles.test_btn} onClick={()=> dispatch(fetchGetAllVkUsers()) }>pay</button>
          </div>
         
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
          ></Avatar>
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

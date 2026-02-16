import React, { useEffect, useState } from 'react'
import {
  useRouteNavigator,
  RouterLink,
} from '@vkontakte/vk-mini-apps-router'
import { AiOutlineHome } from 'react-icons/ai'
import { IoShareSocialOutline } from 'react-icons/io5'
import { AiOutlineLike } from 'react-icons/ai'
import { TiStarOutline } from 'react-icons/ti'

import styles from './Footer.module.css'
import {
  shareApp,
  recommendApp,
  addFavoriteApp,
} from '../../utils/vkAppShare'
import Logo from '../../assets/images/logo.png'

const Footer = () => {
  const [year, setYear] = useState('')
  const routerNavigator = useRouteNavigator()
  const VK_URL = import.meta.env.VK_URL
  //Получаем текущий год
  useEffect(() => {
    const dateObj = new Date()
    const yearNow = dateObj.getUTCFullYear()
    setYear(yearNow)
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <ul className={styles.items}>
          <li className={styles.item}>
            <AiOutlineHome
              className={styles.icon}
              onClick={() => routerNavigator.push('/')}
            />
          </li>
          <li className={styles.item}>
            <TiStarOutline
              className={styles.icon}
              onClick={addFavoriteApp}
            />
          </li>
          <li className={styles.item_logo}>
            <RouterLink to="https://vk.com/app54436091">
              <div className={styles.logo_wrapper}>
                <img
                  src={Logo}
                  alt="логотип"
                  className={styles.logo}
                />
              </div>
            </RouterLink>

            {/* <span className={styles.text}>{year}</span> */}
          </li>
          <li className={styles.item}>
            <AiOutlineLike
              className={styles.icon}
              onClick={recommendApp}
            />
          </li>
          <li className={styles.item}>
            <IoShareSocialOutline
              className={styles.icon}
              onClick={() => shareApp(VK_URL)}
            />
          </li>
        </ul>
        {/* <span className={styles.text}>&#169; {year}</span> */}
      </div>
    </footer>
  )
}

export default Footer

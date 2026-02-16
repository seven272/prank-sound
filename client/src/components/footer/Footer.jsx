import React, { useEffect, useState } from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { AiOutlineHome } from 'react-icons/ai'
import { IoShareSocialOutline } from 'react-icons/io5'
import { AiOutlineLike } from 'react-icons/ai'
import { TiStarOutline } from "react-icons/ti";

import styles from './Footer.module.css'
import { shareApp, recommendApp, addFavoriteApp } from '../../utils/vkAppShare'
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
           <AiOutlineHome className={styles.icon} onClick={() => routerNavigator.push('/')}/>
            {/* <span className={styles.title}>Поиск</span> */}
          </li>
          <li className={styles.item}>
            <TiStarOutline className={styles.icon} onClick={addFavoriteApp}/>
            {/* <span className={styles.title}>Поиск</span> */}
          </li>
          <li className={styles.item}>
            <div className={styles.logo_wrapper}>
              <img src={Logo} alt="логотип" className={styles.logo}/>
            </div>
           <span className={styles.text}>{year}</span>
           <span className={styles.text}>vk mini apps</span>
          </li>
          <li className={styles.item}>
            <AiOutlineLike
              className={styles.icon}
              onClick={recommendApp}
            />
            {/* <span className={styles.title}>Избранное</span> */}
          </li>
          <li className={styles.item}>
            <IoShareSocialOutline
              className={styles.icon}
              onClick={() => shareApp(VK_URL)}
            />
            {/* <span className={styles.title}>Поделиться</span> */}
          </li>
        </ul>
        {/* <span className={styles.text}>&#169; {year}</span> */}
      </div>
    </footer>
  )
}

export default Footer

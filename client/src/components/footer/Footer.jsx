import React, { useEffect, useState } from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { AiOutlineHome } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdFavoriteBorder } from 'react-icons/md'
import { IoShareSocialOutline } from 'react-icons/io5'
import { AiOutlineLike } from 'react-icons/ai'

import styles from './Footer.module.css'
import { shareApp, recommendApp, addFavoriteApp } from '../../utils/vkAppShare'

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
            <IoSettingsOutline className={styles.icon} onClick={() => routerNavigator.push('/admin')} />
            {/* <span className={styles.title}>Поиск</span> */}
          </li>
          <li className={styles.item}>
            <MdFavoriteBorder className={styles.icon} onClick={addFavoriteApp}/>
            {/* <span className={styles.title}>Поиск</span> */}
          </li>
          <li className={styles.item}>
            <AiOutlineHome className={styles.icon} onClick={() => routerNavigator.push('/')}/>
            {/* <span className={styles.title}>Домой</span> */}
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

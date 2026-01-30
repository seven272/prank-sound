import React from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import styles from './ButtonsAdmin.module.css'

const ButtonsAdmin = () => {
  const routerNavigator = useRouteNavigator()

  const clickCategories = () => {
    routerNavigator.push('/admin/categories')
  }

  const clickSounds = () => {
    routerNavigator.go('/admin/sounds')
  }
  return (
    <div className={styles.btn_wrap}>
      <button className={styles.btn} onClick={clickCategories}>
        Управление категориями
      </button>
      <button className={styles.btn} onClick={clickSounds}>
        Управление звуками
      </button>
    </div>
  )
}

export default ButtonsAdmin

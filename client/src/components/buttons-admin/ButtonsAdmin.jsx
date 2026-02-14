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

  const clickUsers = () => {
    routerNavigator.go(`/admin/statistic/users`)
  }

  const clickOrders = () => {
    routerNavigator.go(`/admin/statistic/orders`)
  }

  return (
    <div className={styles.main}>
      <div className={styles.btn_wrap}>
        <button className={styles.btn} onClick={clickCategories}>
          Управление категориями
        </button>
        <button className={styles.btn} onClick={clickSounds}>
          Управление звуками
        </button>
      </div>

      <div className={styles.btn_wrap}>
        <button className={styles.btn} onClick={clickUsers}>
          Статистика VK юзеров
        </button>
        <button className={styles.btn} onClick={clickOrders}>
          Статистика VK подписок
        </button>
      </div>
    </div>
  )
}

export default ButtonsAdmin

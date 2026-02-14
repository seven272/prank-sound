import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from '@vkontakte/vk-mini-apps-router'

import styles from './Statistic.module.css'
import { fetchGetAllVkUsers } from '../../../redux/slices/vkUserSlice'
import { fetchGetAllOrders } from '../../../redux/slices/orderSlice'

const Statistic = () => {
  const { type } = useParams()
  const dispatch = useDispatch()
  const { vk_users } = useSelector((state) => state.vkUser)
  const { orders } = useSelector((state) => state.order)

  useEffect(() => {
    if (type === 'users') {
      dispatch(fetchGetAllVkUsers())
    } else if (type === 'orders') {
      dispatch(fetchGetAllOrders())
    }
  }, [type, dispatch])

  console.log('Кол-во orders: ', orders.length)

  return (
    <div className={styles.main}>
      <h3 className={styles.title}>Статистика VK {type}</h3>
      <span className={styles.subtitle}>
        общее колличество{' '}
        {type === 'users' ? 'пользователей' : 'заказов'} :
        {type === 'users' ? `${vk_users.length}` : `${orders.length}`}
      </span>
      <ul className={styles.items}>
        {type === 'users'
          ? vk_users.map((user, inx) => {
              return (
                <li key={inx} className={styles.item}>
                  <span className={styles.text}>{inx + 1}</span>
                  <span className={styles.text}>{user}</span>
                </li>
              )
            })
          : orders.map((order, inx) => {
              return (
                <li key={inx} className={styles.item}>
                  <span className={styles.text}>{inx + 1}</span>
                  <span className={styles.text}>{order}</span>
                </li>
              )
            })}
      </ul>
    </div>
  )
}

export default Statistic

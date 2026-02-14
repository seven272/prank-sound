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
      console.log('users')
      dispatch(fetchGetAllVkUsers())
    } else if (type === 'orders') {
      console.log('orders')
      dispatch(fetchGetAllOrders())
    }
  }, [type, dispatch])

  return (
    <div className={styles.main}>
      <h3>Статистика VK {type}</h3>
      <span>
        общее колличество{' '}
        {type === 'users' ? 'пользователей' : 'заказов'} :
        {type === `users' ? ${vk_users.length} : ${orders.length}`}
      </span>
      <ul>
        <li></li>
      </ul>
    </div>
  )
}

export default Statistic

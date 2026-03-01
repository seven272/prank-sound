import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from '@vkontakte/vk-mini-apps-router'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'

import styles from './Statistic.module.css'
import { fetchGetAllVkUsers } from '../../../redux/slices/vkUserSlice'
import { fetchGetAllOrders } from '../../../redux/slices/orderSlice'
import Error403 from '../../../components/error-403/Error403'

const Statistic = () => {
  const { type } = useParams()
  const dispatch = useDispatch()
  const routerNavigator = useRouteNavigator()
  const { vk_users } = useSelector((state) => state.vkUser)
  const { orders } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (type === 'users') {
      dispatch(fetchGetAllVkUsers())
    } else if (type === 'orders') {
      dispatch(fetchGetAllOrders())
    }
  }, [type, dispatch])

  if (!user || !user.isAdmin) {
    return <Error403 />
  }

  return (
    <div className={styles.main}>
      <h3 className={styles.title}>Статистика VK {type}</h3>
      <span className={styles.subtitle}>
        общее колличество{' '}
        {type === 'users' ? 'пользователей' : 'заказов'} :
        {type === 'users' ? `${vk_users.length}` : `${orders.length}`}
      </span>

      <button
        className={styles.btn_back}
        onClick={() => routerNavigator.back()}
      >
        <MdOutlineArrowBackIos />
        <span>назад</span>
      </button>
      <ul className={styles.items}>
        <li className={styles.item}>
          <span className={styles.text}>№</span>
          <span className={styles.text_center}>_id database</span>
          <span className={styles.text}>id user vk</span>
        </li>
        {type === 'users'
          ? vk_users.map((user, inx) => {
              return (
                <li key={inx} className={styles.item}>
                  <span className={styles.text}>{inx + 1}</span>
                  <span className={styles.text_center}>
                    {user._id}
                  </span>
                  <span className={styles.text}>{user.vk_id}</span>
                </li>
              )
            })
          : orders.map((order, inx) => {
              return (
                <li key={inx} className={styles.item}>
                  <span className={styles.text}>{inx + 1}</span>
                  <span className={styles.text_center}>
                    {order._id}
                  </span>
                  <span className={styles.text}>{order.userId}</span>
                </li>
              )
            })}
      </ul>
    </div>
  )
}

export default Statistic

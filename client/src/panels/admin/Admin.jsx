import { Panel } from '@vkontakte/vkui'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import styles from './Admin.module.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ButtonsAdmin from '../../components/buttons-admin/ButtonsAdmin'
import Loader from '../../UI/loader/Loader'
import { fetchGetMe } from '../../redux/slices/authSlice'

const Admin = ({ id }) => {
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchGetMe())
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (!user || !user.isAdmin) {
    return (
      <Panel id={id}>
        <Header />
        <div className={styles.section}>
          <div className={styles.section_wrap}>
            <h1 className={styles.title}>Доступ запрещен!</h1>
          </div>
        </div>
        <Footer />
      </Panel>
    )
  }
  return (
    <Panel id={id}>
      <Header />
      <div className={styles.section}>
        <div className={styles.section_wrap}>
          <h1 className={styles.title}>Панель администратора</h1>
          <ButtonsAdmin />
        </div>
      </div>
      <Footer />
    </Panel>
  )
}

export default Admin

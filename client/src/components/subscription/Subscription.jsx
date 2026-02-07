import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { TbBellPlusFilled } from 'react-icons/tb'

import styles from './Subscription.module.css'
import { checkIsAuthVk, fetchSubscribe } from '../../redux/slices/vkUserSlice'

const Subscription = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuthVk)
  const { isPaid, vk_id} = useSelector((state) => state.vkUser)
  const [openModal, setOpenModal] = useState(false)

  console.log('оплачена подписка ' + isPaid)


  const showModal = () => {
    setOpenModal(true)
  }

  const handleOk = () => {
    dispatch(fetchSubscribe())
    setOpenModal(false)
  }

  const handleCancel = () => {
    setOpenModal(false)
  }
  return (
    <div className={styles.section}>
      <button onClick={showModal} className={styles.btn_subscr} disabled={isAuth === false}>
        <TbBellPlusFilled className={styles.btn_icon} />
        <span className={styles.btn_text}>подписка</span>
      </button>

      <Modal
        open={openModal}
        title="оформление подписки..."
        onOk={handleOk}
        onCancel={handleCancel}
        footer={() => (
          <>
            <button
              className={styles.btn_cancel}
              onClick={handleCancel}
              disabled={false}
            >
              Отменить
            </button>

            <button
              className={styles.btn_ok}
              onClick={handleOk}
              disabled={false}
            >
              Оформить
            </button>
          </>
        )}
      >
        <div className={styles.content}>
          оформив подписку вы сможете разблокировать доступ ко всем
          звукам во всех категориях навсегда
        </div>
      </Modal>
    </div>
  )
}

export default Subscription

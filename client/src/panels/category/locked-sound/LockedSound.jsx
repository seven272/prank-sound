import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RiVipFill } from 'react-icons/ri'
import { BsPatchQuestion } from 'react-icons/bs'

import styles from './LockedSound.module.css'
import { checkIsAuthVk } from '../../../redux/slices/vkUserSlice'
import { useVkPay } from '../../../utils/useVkPay'
import Loader from '../../../UI/loader/Loader'
import Modal from '../../../UI/modal/Modal'

const LockedSound = () => {
  const isAuth = useSelector(checkIsAuthVk)
  const { loading, payVirtualMoney } = useVkPay()
  const [ openModal, setOpenModal ] = useState(false)

  const handlePay = () => {
    payVirtualMoney()
  }
 
  const handleClick = () => {
    setOpenModal(true)
  }
  return (
    <div className={styles.section}>
      <span className={styles.text}>
        нужен премиум-доступ
        <BsPatchQuestion
          size={15}
          className={styles.btn_quiestion}
          onClick={handleClick}
        />
      </span>

      <button
        onClick={handlePay}
        className={styles.btn_subscr}
        disabled={isAuth === false}
      >
        <RiVipFill className={styles.btn_icon} size={25} />
        <span className={styles.btn_text}>оформить</span>
      </button>
      {loading && <Loader />}
      <Modal active={openModal} setActive={setOpenModal}>
        Премиум подписка открывает доступ ко всем звукам во всех
        категориях бессрочно. Все будущие новые звуки
        также будут доступны бесплатно. Стоимость 10 голосов ВКонтакте.
      </Modal>
    </div>
  )
}

export default LockedSound

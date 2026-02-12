import { useSelector } from 'react-redux'
import { RiVipLine } from 'react-icons/ri'
import { RiVipFill } from "react-icons/ri";


import styles from './LockedSound.module.css'
import { checkIsAuthVk } from '../../../redux/slices/vkUserSlice'
import { useVkPay } from '../../../utils/useVkPay'

const LockedSound = () => {
  const isAuth = useSelector(checkIsAuthVk)
  const { loading, payVirtualMoney } = useVkPay()

  const handlePay = () => {
    payVirtualMoney()
  }

  return (
    <div className={styles.section}>
      <span className={styles.text}>
        доступен после покупки премиум статуса
      </span>

      <button
        onClick={handlePay}
        className={styles.btn_subscr}
        disabled={isAuth === false}
      >
        <RiVipFill className={styles.btn_icon} size={25} />
        <span className={styles.btn_text}>оформить</span>
      </button>
    </div>
  )
}

export default LockedSound

import { useSelector } from 'react-redux'
import { RiVipFill } from 'react-icons/ri'
import { BsPatchQuestion } from 'react-icons/bs'

import styles from './LockedSound.module.css'
import { checkIsAuthVk } from '../../../redux/slices/vkUserSlice'
import { useVkPay } from '../../../utils/useVkPay'
import Loader from '../../../UI/loader/Loader'

const LockedSound = () => {
  const isAuth = useSelector(checkIsAuthVk)
  const { loading, payVirtualMoney } = useVkPay()

  const handlePay = () => {
    payVirtualMoney()
  }

  return (
    <div className={styles.section}>
      <span className={styles.text}>
        доступен c премиум доступом
        <BsPatchQuestion size={15} style={{ marginLeft: '7px', cursor:'pointer' }} />
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
    </div>
  )
}

export default LockedSound

import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineVpnKey } from 'react-icons/md'
import { GiPadlock } from 'react-icons/gi'

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
        доступен после покупки VIP статуса{' '}
        <MdOutlineVpnKey size={15} className={styles.icon} />
      </span>

      <button
        onClick={handlePay}
        className={styles.btn_subscr}
        disabled={isAuth === false}
      >
        <GiPadlock className={styles.btn_icon} size={25} />
        <span className={styles.btn_text}>оформить vip</span>
      </button>

    </div>
  )
}

export default LockedSound

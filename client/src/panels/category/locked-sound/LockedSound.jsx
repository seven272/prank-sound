import React from 'react'
import { MdOutlineVpnKey } from "react-icons/md";

import styles from './LockedSound.module.css'
import Subscription from '../../../components/subscription/Subscription'

const LockedSound = () => {
  return (
    <div className={styles.section}>
      <span className={styles.text}>
        доступен после покупки <MdOutlineVpnKey size={15} className={styles.icon}/>
      </span>

      <Subscription />
    </div>
  )
}

export default LockedSound

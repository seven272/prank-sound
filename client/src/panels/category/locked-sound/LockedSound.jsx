import React from 'react'
import { FiKey } from 'react-icons/fi'

import styles from './LockedSound.module.css'
import Subscription from '../../../components/subscription/Subscription'

const LockedSound = () => {
  return (
    <div className={styles.section}>
      <span className={styles.text}>
        будет доступен после покупки <FiKey size={12} />
      </span>

      <Subscription />
    </div>
  )
}

export default LockedSound

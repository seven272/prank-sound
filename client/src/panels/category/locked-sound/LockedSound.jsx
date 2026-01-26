import React from 'react'

import styles from './LockedSound.module.css'
import Subscription from '../../../components/subscription/Subscription'

const LockedSound = () => {
  return (
    <div className={styles.section}>
      <span className={styles.text}>
        будет доступен после подписки
      </span>

      <Subscription />
    </div>
  )
}

export default LockedSound

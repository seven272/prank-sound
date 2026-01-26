import React from 'react'

import styles from './ButtonsList.module.css'

const ButtonsList = ({ getTime }) => {
  return (
    <div className={styles.items}>
      <span className={styles.item} onClick={() => getTime(5)}>
        5 cек
      </span>
      <span className={styles.item} onClick={() => getTime(10)}>
        10 cек
      </span>
      <span className={styles.item} onClick={() => getTime(20)}>
        20 cек
      </span>
      <span className={styles.item} onClick={() => getTime(30)}>
        30 cек
      </span>
    </div>
  )
}

export default ButtonsList

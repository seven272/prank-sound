import React from 'react'

import styles from './Error403.module.css'
import errorImg from '../../assets/images/403.jpg'

const Error403 = () => {
  return (
    <div className={styles.section}>
      <div className={styles.section_wrap}>
        <h1 className={styles.title}>Ошибка 403. Нет прав доступа</h1>
        <div className={styles.img_error_wrap}>
          <img
            src={errorImg}
            alt="ошибка доступа"
            className={styles.img_error}
          />
        </div>
      </div>
    </div>
  )
}

export default Error403

import React from 'react'

import styles from './Error404.module.css'
import errorImg from '../../assets/images/404.jpg'

const Error404 = () => {
  return (
    <div className={styles.section}>
      <div className={styles.section_wrap}>
        <h1 className={styles.title}>Ошибка 404. Страница не найдена</h1>
        <div className={styles.img_error_wrap}>
          <img
            src={errorImg}
            alt="ошибка 404"
            className={styles.img_error}
          />
        </div>
      </div>
    </div>
  )
}

export default Error404

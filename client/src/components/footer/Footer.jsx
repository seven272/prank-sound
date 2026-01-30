import React, { useEffect, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdFavoriteBorder } from 'react-icons/md'
import { FaShareAlt } from 'react-icons/fa'
import styles from './Footer.module.css'

const Footer = () => {
  const [year, setYear] = useState('')
  //Получаем текущий год
  useEffect(() => {
    const dateObj = new Date()
    const yearNow = dateObj.getUTCFullYear()
    setYear(yearNow)
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <ul className={styles.items}>
          <li className={styles.item}>
            <FaSearch className={styles.icon} />
            {/* <span className={styles.title}>Поиск</span> */}
          </li>
          <li className={styles.item}>
            <IoSettingsOutline className={styles.icon} />
            {/* <span className={styles.title}>Поиск</span> */}
          </li>
          <li className={styles.item}>
            <AiOutlineHome className={styles.icon} />
            {/* <span className={styles.title}>Домой</span> */}
          </li>
          <li className={styles.item}>
            <MdFavoriteBorder className={styles.icon} />
            {/* <span className={styles.title}>Избранное</span> */}
          </li>
          <li className={styles.item}>
            <FaShareAlt className={styles.icon} />
            {/* <span className={styles.title}>Поделиться</span> */}
          </li>
        </ul>
        {/* <span className={styles.text}>&#169; {year}</span> */}
      </div>
    </footer>
  )
}

export default Footer

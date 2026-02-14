import React from 'react'
import { useParams } from '@vkontakte/vk-mini-apps-router'

import styles from './Statistic.module.css'

const Statistic = () => {
  const {type} = useParams()


  return (
    <div className={styles.main}>Statistics
    
    <h3>{type}</h3>
    </div>
  )
}

export default Statistic
import { useSelector } from 'react-redux'

import styles from './SoundCard.module.css'
import PrankImg from '../../../assets/images/prank.png'

const SoundCard = () => {
  const { currentSound } = useSelector((state) => state.sound)
  const URL = import.meta.env.VITE_PUBLIC_URL
  
  return (
    <section className={styles.section}>
      <span className={styles.title}>
        {currentSound.title || 'какой-то звук'}
      </span>
      <div className={styles.img_wrap}>
        <img
          src={`${URL}/${currentSound?.imageUrl}` || PrankImg}
          alt="изображение карточки звука"
          className={styles.img}
        />
      </div>
    </section>
  )
}

export default SoundCard

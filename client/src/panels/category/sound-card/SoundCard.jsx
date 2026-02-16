import { useSelector } from 'react-redux'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

import styles from './SoundCard.module.css'
import PrankImg from '../../../assets/images/prank.png'

const SoundCard = () => {
  const { currentSound, categorySounds } = useSelector((state) => state.sound)
  const URL = import.meta.env.VITE_PUBLIC_URL
  console.log(currentSound)
  console.log(categorySounds)

  return (
    <section className={styles.section}>
      <span className={styles.title}>
        {currentSound.title || 'какой-то звук'}
      </span>
      <div className={styles.content_wpap}>
        <MdOutlineArrowBackIos className={styles.arrow}/>
        <div className={styles.img_wrap}>
          <img
            src={`${URL}/${currentSound?.imageUrl}` || PrankImg}
            alt="изображение карточки звука"
            className={styles.img}
          />
        </div>
        <MdOutlineArrowForwardIos className={styles.arrow}/>
      </div>
    </section>
  )
}

export default SoundCard

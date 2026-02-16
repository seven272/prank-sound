import { useSelector, useDispatch } from 'react-redux'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

import styles from './SoundCard.module.css'
import PrankImg from '../../../assets/images/prank.png'
import { setSound } from '../../../redux/slices/soundSlice'

const SoundCard = () => {
  const dispatch = useDispatch()
  const { currentSound, categorySounds } = useSelector(
    (state) => state.sound,
  )
  const URL = import.meta.env.VITE_PUBLIC_URL
  console.log(currentSound)
  console.log(categorySounds)

  const handleClickPrev = () => {
    const currentNumber = currentSound.number
    if (currentNumber > 1) {
      const prevNumber = currentNumber - 1
      const sound = categorySounds.find((elem) => {
        return elem.number === prevNumber
      })
      console.log(sound)
      dispatch(setSound(sound))
    }
  }

  const handleClickNext = () => {
    const currentNumber = currentSound.number
    if (currentNumber < categorySounds.length) {
      const nextNumber = currentNumber + 1
      const sound = categorySounds.find((elem) => {
        return elem.number === nextNumber
      })
      console.log(sound)
      dispatch(setSound(sound))
    }
  }

  return (
    <section className={styles.section}>
      <span className={styles.title}>
        {currentSound.title || 'какой-то звук'}
      </span>
      <div className={styles.content_wpap}>
        <MdOutlineArrowBackIos
          className={styles.arrow}
          onClick={handleClickPrev}
        />
        <div className={styles.img_wrap}>
          <img
            src={`${URL}/${currentSound?.imageUrl}` || PrankImg}
            alt="изображение карточки звука"
            className={styles.img}
          />
        </div>
        <MdOutlineArrowForwardIos
          className={styles.arrow}
          onClick={handleClickNext}
        />
      </div>
    </section>
  )
}

export default SoundCard

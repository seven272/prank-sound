import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Slider from 'react-slick'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './SoundCarousel.module.css'
import { setSound } from '../../../redux/slices/soundSlice'

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className={styles.next_arrow} onClick={onClick}>
      <SlArrowRight size={50} />
    </div>
  )
}

const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className={styles.prev_arrow} onClick={onClick}>
      <SlArrowLeft size={50} />
    </div>
  )
}

const SoundCarousel = ({ arrSounds }) => {
  const dispatch = useDispatch()
  const URL = import.meta.env.VITE_PUBLIC_URL
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  const selectSound = (sound) => {
    dispatch(setSound(sound))
  }

  useEffect(() => {
    dispatch(setSound(arrSounds[0]))
  }, [])

  return (
    <section className={styles.section}>
      <Slider {...settings}>
        {arrSounds.map((item) => {
          return (
            <div
              className={styles.element}
              key={item._id}
              onClick={() => selectSound(item)}
            >
              <div className={styles.element_img_wrap}>
                <img
                  className={styles.element_img}
                  src={`${URL}/${item?.imageUrl}`}
                  alt="изображение слайдера"
                />
              </div>
              <span className={styles.element_title}>
                {item.title}
              </span>
            </div>
          )
        })}
      </Slider>
    </section>
  )
}

export default SoundCarousel

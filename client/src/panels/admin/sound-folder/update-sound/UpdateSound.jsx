import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './UpdateSound.module.css'
import UploadImageSound from '../upload-image-sound/UploadImageSound'
import UploadSound from '../upload-sound/UploadSound'
import { fetchGetAllCategories } from '../../../../redux/slices/categorySlice'
import { fetchUpdateSound } from '../../../../redux/slices/soundSlice'

const UpdateSound = ({
  soundId,
  propsNumber,
  propsTitle,
  propsCategoryAlias,
  propsImage,
  propsSound,
  propsIsFree,
}) => {
  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.category)
  const [selectedCategory, setSelectedCategory] = useState(
    propsCategoryAlias
  )
  const [title, setTitle] = useState(propsTitle)
  const [number, setNumber] = useState(propsNumber)
  const [imageUrl, setImageUrl] = useState(propsImage)
  const [soundUrl, setSoundUrl] = useState(propsSound)
  const [isFree, setIsFree] = useState(false)
  const [isDisable, setIsDisable] = useState(true)

  const handleSelectCategory = (evt) => {
    setSelectedCategory(evt.target.value)
  }
  const handleTitle = (evt) => {
    // автоматичкая валидация на символы и длину
    evt.target.value = evt.target.value.substr(0, 30)

    setTitle(evt.target.value)
  }

  const handleNumber = (evt) => {
    // автоматичкая валидация на символы и длину
    evt.target.value = evt.target.value
      //   .replace(/^\D/gi, '')
      .replace(/^\s+|[^0-9\s]/gi, '')
      .substr(0, 3)

    setNumber(Number(evt.target.value))
  }

  const handleIsFree = (evt) => {
    const val = evt.target.value
    if (val === 'TRUE') {
      setIsFree(true)
    } else if (val === 'FALSE') {
      setIsFree(false)
    }
  }

  const handleSubmit = () => {
    const soundData = {
      category: selectedCategory,
      title,
      number,
      imageUrl,
      soundUrl,
      isFree,
    }
    dispatch(fetchUpdateSound({ soundId, soundData }))
    setSelectedCategory('')
    setTitle('')
    setNumber('')
    setImageUrl('')
    setSoundUrl('')
  }

  useEffect(() => {
    if (title === '' || number === 0 || selectedCategory === '') {
      setIsDisable(true)
    } else {
      setIsDisable(false)
    }
  }, [title, number, selectedCategory])

  useEffect(() => {
    dispatch(fetchGetAllCategories())
  }, [])

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Обновить данные мелодии</h3>
      <div className={styles.form}>
        <label className={styles.label}>
          <span className={styles.header}>название:</span>
          <input
            type="text"
            className={styles.input}
            placeholder="введите название"
            value={title}
            onChange={handleTitle}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.header}>номер:</span>
          <input
            type="text"
            className={styles.input}
            placeholder="введите число"
            value={number}
            onChange={handleNumber}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.header}>выбрать категорию: </span>
          <select
            className={styles.select}
            name="selectedCategory"
            onChange={handleSelectCategory}
            value={selectedCategory}
          >
            <option value="" disabled>
              выбрать
            </option>
            {categories?.map((elem) => {
              return (
                <option key={elem._id} value={elem.alias}>
                  {elem.title}
                </option>
              )
            })}
          </select>
        </label>

        <label className={styles.label}>
          <span className={styles.header}>Тип стоимости:</span>
          <input
            type="radio"
            className={styles.input}
            value="TRUE"
            name="isfree"
            onChange={handleIsFree}
          />
          Бесплатно
          <input
            type="radio"
            className={styles.input}
            value="FALSE"
            name="isfree"
            onChange={handleIsFree}
          />
          Платно
        </label>

        <div className={styles.upload_form_wrap}>
          <span className={styles.header}>изображение:</span>
          <UploadImageSound
            setImageUrl={setImageUrl}
            haveUrl={imageUrl}
          />
        </div>

        <div className={styles.upload_form_wrap}>
          <span className={styles.header}>аудиофайл:</span>
          <UploadSound setSoundUrl={setSoundUrl} haveUrl={soundUrl} />
        </div>

        <button
          className={styles.btn}
          disabled={isDisable}
          onClick={handleSubmit}
        >
          Обновить
        </button>
      </div>
    </div>
  )
}

export default UpdateSound

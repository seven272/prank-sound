import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchCreateCategory } from '../../../../redux/slices/categorySlice'
import styles from './AddCategory.module.css'
import UploadImageCategory from '../upload-image-category/UploadImageCategory'

const AddCategory = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [alias, setAlias] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isDisable, setIsDisable] = useState(true)

  const handleTitle = (evt) => {
    // автоматичкая валидация на символы и длину
    evt.target.value = evt.target.value
      .replace(/^\s+|[^A-ZА-ЯЁ\s]/gi, '')
      .substr(0, 30)

    setTitle(evt.target.value)
  }

  const handleAlias = (evt) => {
    // автоматичкая валидация на символы и длину
    evt.target.value = evt.target.value
      .replace(/^\s+|[^A-ZА-ЯЁ\s]/gi, '')
      .substr(0, 30)

    setAlias(evt.target.value)
  }

  const handleSubmit = () => {
    dispatch(fetchCreateCategory({ title, alias, imageUrl }))
    setAlias('')
    setTitle('')
    setImageUrl('')
  }

  useEffect(() => {
    if (alias !== '' && title !== '') {
      setIsDisable(false)
    } else {
      setIsDisable(true)
    }
  }, [title, alias])

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>Добавить новую категорию</h3>
      <div className={styles.form_wrap}>
        <label className={styles.label}>
          <span className={styles.subtitle}>Название:</span>
          <input
            type="text"
            className={styles.input}
            placeholder="введите название" 
            value={title}
            onChange={handleTitle}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.subtitle}>Алиас:</span>
          <input
            type="text"
            className={styles.input}
            placeholder="введите алиас"
            value={alias}
            onChange={handleAlias}
          />
        </label>
        <div className={styles.upload_form_wrap}>
          <span className={styles.subtitle}>Изображение:</span>
          <UploadImageCategory setImageUrl={setImageUrl} haveUrl={imageUrl}/>
        </div>

        <button
          className={styles.btn}
          disabled={isDisable}
          onClick={handleSubmit}
        >
          Создать
        </button>
      </div>
    </div>
  )
}

export default AddCategory

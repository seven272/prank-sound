import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, message } from 'antd'
import { FaRegEdit } from 'react-icons/fa'

import styles from './UpdateCategory.module.css'
import { fetchUpdateCategory } from '../../../../redux/slices/categorySlice'
import UploadImageCategory from '../upload-image-category/UploadImageCategory'

const UpdateCategory = ({
  propsTitle,
  propsAlias,
  propsImage,
  categoryId,
}) => {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [title, setTitle] = useState(propsTitle)
  const [alias, setAlias] = useState(propsAlias)
  const [imageUrl, setImageUrl] = useState(propsImage)

  const showModal = () => {
    setOpenModal(true)
  }

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
    if (title !== '' && alias !== '') {
      dispatch(
        fetchUpdateCategory({ title, alias, imageUrl, categoryId })
      )
    } else {
      message.error('Необходимо запонить все поля')
    }
  }

  const handleOk = () => {
    handleSubmit()
    setOpenModal(false)
    setTitle('')
    setAlias('')
  }

  const handleCancel = () => {
    setTitle('')
    setAlias('')
    setOpenModal(false)
  }

  return (
    <>
      <FaRegEdit
        size={25}
        className={styles.icon}
        onClick={showModal}
      />
      <Modal
        open={openModal}
        title="Редактировать категорию..."
        onOk={handleOk}
        onCancel={handleCancel}
        footer={() => (
          <>
            <button
              className={styles.btn_cancel}
              onClick={handleCancel}
              disabled={false}
            >
              Отменить
            </button>

            <button
              className={styles.btn_ok}
              onClick={handleOk}
              disabled={false}
            >
              Сохранить
            </button>
          </>
        )}
      >
        <div className={styles.form}>
          <div className={styles.inputs_wrapper}>
            <label className={styles.label}>
              <span className={styles.text}>Название</span>
              <input
                className={styles.input}
                type="text"
                value={title}
                onChange={handleTitle}
              />
            </label>
            <label className={styles.label}>
              <span className={styles.text}>Алиас</span>
              <input
                className={styles.input}
                type="text"
                value={alias}
                onChange={handleAlias}
              />
            </label>

            <label className={styles.label}>
              <span className={styles.text_img}>Изображение</span>
              <UploadImageCategory
                setImageUrl={setImageUrl}
                haveUrl={imageUrl}
              />
            </label>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UpdateCategory

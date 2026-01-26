import { useRef } from 'react'
import { message } from 'antd'
import { MdOutlineFileUpload, MdOutlineImage } from 'react-icons/md'

import styles from './UploadImageCategory.module.css'
import axiosInstance from '../../../../utils/axios'
import usePreviewImg from '../../../../utils/usePreviewImg'

const UploadImageCategory = ({ setImageUrl, haveUrl }) => {
  const fileInputRef = useRef(null)
  const { handleImageChange, imgUrl } = usePreviewImg()

  const uploadImage = async (evt) => {
    const fileData = evt.target.files[0]
    try {
      const formData = new FormData()
      formData.append('category', fileData)
      const { data } = await axiosInstance.post(
        '/categories/upload-image',
        formData
      )
      const url = data.url

      if (url) {
        handleImageChange(evt)
      }
      setImageUrl(url)
      message.success('Изображение загружено')
    } catch (error) {
      console.warn(error)
      message.error('Ошибка при загрузке изображения')
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={styles.form}>
      <form
        action="/upload"
        method="POST"
        encType="multipart/form-data"
        className={styles.input_field}
        onSubmit={(evt) => evt.preventDefault()}
        hidden
      >
        <input
          type="file"
          name="category"
          required
          className={styles.input_field_text}
          ref={fileInputRef}
          onChange={uploadImage}
        />
      </form>
      <div className={styles.btns_wrap}>
        <button className={styles.btn_upload} onClick={handleClick}>
          <MdOutlineFileUpload
            size={15}
            className={styles.icon_upload}
          />
          <span>загрузить</span>
        </button>
        <div className={styles.preview}>
          {haveUrl === '' && (
            <>
              <MdOutlineImage
                size={15}
                className={styles.icon_preview}
              />
              <span>превью</span>
            </>
          )}

          {haveUrl !== '' && (
            <img
              src={imgUrl}
              alt="&nbsp; &nbsp; превью"
              className={styles.img}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadImageCategory

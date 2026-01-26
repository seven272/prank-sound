import { useRef } from 'react'
import { message } from 'antd'
import { MdOutlineAudioFile } from "react-icons/md";

import styles from './UploadSound.module.css'
import axiosInstance from '../../../../utils/axios'


const UploadSound = ({ setSoundUrl }) => {
  const fileInputRef = useRef(null)
  

  const uploadSound = async (evt) => {
    const fileData = evt.target.files[0]
    try {
      const formData = new FormData()
      formData.append('sound', fileData)
      const { data } = await axiosInstance.post(
        '/sounds/upload-sound',
        formData
      )
      const url = data.url
      setSoundUrl(url)
      message.success('Мелодия загруженa')
    } catch (error) {
      console.warn(error)
      message.error('Ошибка при загрузке мелодии')
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
        accept="audio/*"
        encType="multipart/form-data"
        className={styles.input_field}
        onSubmit={(evt) => evt.preventDefault()}
        hidden
      >
        <input
          type="file"
          name="cover"
          required
          className={styles.input_field_text}
          ref={fileInputRef}
          onChange={uploadSound}
        />
      </form>
      <div className={styles.btns_wrap}>
        <button className={styles.btn_upload} onClick={handleClick}>
          <MdOutlineAudioFile
            size={15}
            className={styles.icon_upload}
          />
          <span>загрузить</span>
        </button>
      
      </div>
    </div>
  )
}

export default UploadSound

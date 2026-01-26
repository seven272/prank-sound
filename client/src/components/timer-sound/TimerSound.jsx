import { useEffect, useState, useRef } from 'react'
import { Modal, message } from 'antd'
import { RxTimer } from 'react-icons/rx'

import styles from './TimerSound.module.css'
import ButtonsList from './buttons-list/ButtonsList'

const TimerSound = ({ playingSound }) => { 
  const [seconds, setSeconds] = useState('')
  const [minutes, setMinutes] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const timeoutRef = useRef()

  const showModal = () => {
    setOpenModal(true)
  }

  const handleSecInput = (evt) => {
    evt.target.value = evt.target.value
      .replace(/\D/g, '')
      .substr(0, 2)

    let val = Number(evt.target.value)
    setSeconds(val)
  }

  const handleMinInput = (evt) => {
    evt.target.value = evt.target.value
      .replace(/\D/g, '')
      .substr(0, 2)

    let val = Number(evt.target.value)
    setMinutes(val)
  }

  const handleSubmit = () => {
    if (seconds + minutes > 0) {
      const updateTime = parseInt(
        seconds * 1000 + minutes * 60 * 1000
      )
      timeoutRef.current = setTimeout(() => {
        playingSound()
      }, updateTime)
      message.success('Таймер активирован. Ждем!')
    } else {
      message.error('Не удалось запустить таймер')
    }
  }

  const handleOk = () => {
    handleSubmit()
    setOpenModal(false)
    setMinutes('')
    setSeconds('')
  }

  const handleCancel = () => {
    setMinutes('')
    setSeconds('')
    setOpenModal(false)
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <>
      <RxTimer
        size={40}
        className={styles.icon}
        onClick={showModal}
      />
      <Modal
        open={openModal}
        title="Воспроизвести звук через..."
        okText="Установить"
        cancelText="Отменить"
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
              Установить
            </button>
          </>
        )}
      >
        <div className={styles.form}>
          <ButtonsList getTime={setSeconds} />
          <div className={styles.inputs_wrapper}>
            <label className={styles.label}>
              <span className={styles.text}>секунды</span>
              <input
                className={styles.input}
                type="text"
                value={seconds}
                onChange={handleSecInput}
              />
            </label>
            <label className={styles.label}>
              <span className={styles.text}>минуты</span>
              <input
                className={styles.input}
                type="text"
                value={minutes}
                onChange={handleMinInput}
              />
            </label>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TimerSound

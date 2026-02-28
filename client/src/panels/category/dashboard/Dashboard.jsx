import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { CgPlayButtonO, CgPlayStopO } from 'react-icons/cg'
import { TbRepeat, TbRepeatOff } from 'react-icons/tb'

import TimerSound from '../../../components/timer-sound/TimerSound'
import styles from './Dashboard.module.css'


const Dashboard = () => {
  const { currentSound } = useSelector((state) => state.sound)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const pleerRef = useRef()
  const URL = import.meta.env.VITE_PUBLIC_URL

  const handlePlay = () => {
    const duration = pleerRef.current.duration * 1000
    pleerRef.current.play()
    setIsPlaying(true)

    setTimeout(() => {
      setIsPlaying(false)
    }, duration)
  }

  const handleStop = () => {
    pleerRef.current.pause()
    pleerRef.current.currentTime = 0
    setIsPlaying(false)
  }

  const handleRepeat = () => {
    setIsRepeat((prev) => !prev)
  }

  useEffect(() => {
    const duration = pleerRef.current.duration * 1000 
    let intervalId
    if (isRepeat) {
      setIsPlaying(true)
      pleerRef.current.play() // Start playing the sound
      intervalId = setInterval(() => {
        pleerRef.current.play() // Re-trigger the sound every interval
      }, duration) // продолжительность мелодии
    } else {
      setIsPlaying(false)
      pleerRef.current.pause()
      pleerRef.current.currentTime = 0
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId) // Cleanup on component unmount
  }, [isRepeat])

  useEffect(() => {
    setIsRepeat(false)
  }, [])

  return (
    <section className={styles.section} onMouseEnter={() => {}}>
      <audio
        src={`${URL}/${currentSound?.soundUrl}`}
        controls
        ref={pleerRef}
        hidden={true}
      >
        Ваш браузер не поддерживает audio на HTML5.
      </audio>
      <div
        className={styles.btn_wrap}
        title="повтор"
        onClick={handleRepeat}
      >
        {isRepeat ? (
          <TbRepeatOff className={styles.btn_repeat} size={40} />
        ) : (
          <TbRepeat className={styles.btn_repeat} size={40} />
        )}
      </div>
      <div className={styles.btn_wrap} title="играть">
        {isPlaying ? (
          <CgPlayStopO
            size={50}
            className={styles.btn_play}
            onClick={handleStop}
          />
        ) : (
          <CgPlayButtonO
            size={50}
            className={styles.btn_play}
            onClick={handlePlay}
          />
        )}
      </div>
      <div className={styles.btn_wrap} title="таймер">
        <TimerSound
          playingSound={handlePlay}
        />
      </div>
    </section>
  )
}

export default Dashboard

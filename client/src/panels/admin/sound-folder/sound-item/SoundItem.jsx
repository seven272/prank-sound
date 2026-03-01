import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useRouteNavigator,
  useParams,
} from '@vkontakte/vk-mini-apps-router'
import { BiSolidLeftArrowSquare } from 'react-icons/bi'

import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaRegPlayCircle, FaRegStopCircle } from 'react-icons/fa'

import styles from './SoundItem.module.css'
import Loader from '../../../../UI/loader/Loader'
import UpdateSound from '../update-sound/UpdateSound'
import {
  fetchGetOneSound,
  fetchDeleteSound,
} from '../../../../redux/slices/soundSlice'
import Error403 from '../../../../components/error-403/Error403'

const SoundItem = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const routerNavigator = useRouteNavigator()
  const { currentSound } = useSelector((state) => state.sound)
  const { user } = useSelector((state) => state.auth)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const pleerRef = useRef()
  const URL = import.meta.env.VITE_PUBLIC_URL

  const handlePlay = () => {
    pleerRef.current.play()
  }
  const handleStop = () => {
    pleerRef.current.pause()
    pleerRef.current.currentTime = 0
  }

  const handleDelete = () => {
    dispatch(fetchDeleteSound(id))
    routerNavigator.back()
  }
  const handleUpdate = () => {
    setShowUpdateForm((prev) => !prev)
    // dispatch(fetchDeleteSound(id))
  }

  useEffect(() => {
    dispatch(fetchGetOneSound(id))
  }, [])

  if (!user || !user.isAdmin) {
    return <Error403 />
  }

  if ('_id' in currentSound === false) {
    return <Loader />
  }
  return (
    <div className={styles.section}>
      <div className={styles.wrapper}>
        <button
          className={styles.btn_back}
          onClick={() => routerNavigator.back()}
        >
          <BiSolidLeftArrowSquare
            size={25}
            className={styles.btn_back_icon}
          />
          <span className={styles.btn_back_text}>назад</span>
        </button>
        <h2 className={styles.title}>Карточка звука</h2>
        {currentSound && (
          <ul className={styles.items}>
            <li className={styles.item}>
              <span className={styles.subtitle}>ID:</span>
              {currentSound._id}
            </li>
            <li className={styles.item}>
              <span className={styles.subtitle}>
                Порядковый номер:{' '}
              </span>
              {currentSound.number}
            </li>
            <li className={styles.item}>
              <span className={styles.subtitle}>Название: </span>
              {currentSound.title}
            </li>
            <li className={styles.item}>
              <span className={styles.subtitle}> Категория: </span>
              {currentSound.category.title}
            </li>

            <li className={styles.item}>
              <span className={styles.subtitle}>
                Url изображения:{' '}
              </span>
              {currentSound?.imageUrl}
            </li>
            <li className={styles.item}>
              <span className={styles.subtitle}> Url мелодии: </span>
              {currentSound?.soundUrl}
            </li>
            <li className={styles.item}>
              <span className={styles.subtitle}>Тип стоимости:</span>
              {currentSound.isFree === true ? 'Бесплатно' : 'Платно'}
            </li>
            <li className={styles.item}>
              <span className={styles.subtitle}>Превью:</span>

              <div className={styles.img_wrap}>
                <img
                  src={`${URL}/${currentSound?.imageUrl}`}
                  alt="фото звука"
                  className={styles.img}
                />
              </div>
            </li>
            <li className={styles.item}>
              <div className={styles.icons_wrap}>
                <FaRegPlayCircle
                  className={styles.icon}
                  onClick={handlePlay}
                />
                <FaRegStopCircle
                  className={styles.icon}
                  onClick={handleStop}
                />
                <FaRegEdit
                  className={styles.icon}
                  onClick={handleUpdate}
                />
                <RiDeleteBin5Line
                  className={styles.icon}
                  onClick={handleDelete}
                />
              </div>
            </li>
          </ul>
        )}
        {showUpdateForm && (
          <UpdateSound
            soundId={id}
            propsNumber={currentSound.number}
            propsTitle={currentSound.title}
            propsCategoryAlias={currentSound.category.alias}
            propsImage={currentSound.imageUrl}
            propsSound={currentSound.soundUrl}
            propsIsFree={currentSound.isFree}
          />
        )}
      </div>
      <audio
        src={`${URL}/${currentSound?.soundUrl}`}
        controls
        ref={pleerRef}
        hidden={true}
      >
        Ваш браузер не поддерживает audio на HTML5.
      </audio>
    </div>
  )
}

export default SoundItem

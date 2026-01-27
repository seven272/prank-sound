import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { FaRegFileAudio } from 'react-icons/fa'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'

import styles from './SoundList.module.css'
import Loader from '../../../../UI/loader/Loader'
import AddSound from '../add-sound/AddSound'
import { fetchGetAllSounds } from '../../../../redux/slices/soundSlice'


const SoundList = () => {
  const dispatch = useDispatch()
  const routerNavigator = useRouteNavigator()
  const [showAddForm, setShowAddForm] = useState(false)
  const { allSounds, isLoading } = useSelector((state) => state.sound)
  
  const handleShowAddForm = () => {
    setShowAddForm((prev) => !prev)
  }

  useEffect(() => {
    console.log('загружаю звуки при первом рендере станицы')
    dispatch(fetchGetAllSounds())
  }, [])

  if (isLoading) {
    return <Loader />
  } else if (allSounds.length === 0 && !isLoading) {
    return (
      <div className={styles.warning}>
        <h3 className={styles.text}>
          Список звуков пуст или произошла ошибка при загрузке
        </h3>
        <div className={styles.add}>
          <div
            className={styles.add_btn_wrap}
            onClick={handleShowAddForm}
          >
            {showAddForm ? (
              <>
                <CiCircleMinus
                  size={25}
                  className={styles.add_btn_icon}
                />
                <span className={styles.add_btn_text}>
                  Скрыть форму
                </span>
              </>
            ) : (
              <>
                <CiCirclePlus
                  size={25}
                  className={styles.add_btn_icon}
                />
                <span className={styles.add_btn_text}>
                  Добавить новый звук
                </span>
              </>
            )}
          </div>
          {showAddForm && <AddSound />}
        </div>
      </div>
    )
  }
  return (
    <div className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.add}>
          <div
            className={styles.add_btn_wrap}
            onClick={handleShowAddForm}
          >
            {showAddForm ? (
              <>
                <CiCircleMinus
                  size={25}
                  className={styles.add_btn_icon}
                />
                <span className={styles.add_btn_text}>
                  Скрыть форму
                </span>
              </>
            ) : (
              <>
                <CiCirclePlus
                  size={25}
                  className={styles.add_btn_icon}
                />
                <span className={styles.add_btn_text}>
                  Добавить новый звук
                </span>
              </>
            )}
          </div>
          {showAddForm && <AddSound />}
        </div>
        <ul className={styles.header_items}>
          <li className={styles.header_item}>
            <span className={styles.header_title}>№</span>
            <span className={styles.header_title}>Название</span>
            <span className={styles.header_title}>Категория</span>
            <span className={styles.header_title}>Детали</span>
          </li>
        </ul>

        <ul className={styles.items}>
          {allSounds?.map((elem, inx) => {
            return (
              <li className={styles.item} key={elem._id}>
                <span className={styles.title}>{inx + 1}</span>
                <span className={styles.title}>{elem?.title}</span>
                <span className={styles.title}>
                  {elem.category.title} | {elem.category.alias}
                </span>

                <div className={styles.icons}>
                  <FaRegFileAudio
                    size={20}
                    className={styles.icon}
                    onClick={() =>
                      routerNavigator.push(`./${elem._id}`)
                    }
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SoundList

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'


import Loader from '../../../UI/loader/Loader'
import { fetchGetAllCategories } from '../../../redux/slices/categorySlice'
import styles from './CategoriesList.module.css'


const CategoriesList = () => {
  const routeNavigator = useRouteNavigator()
  const dispatch = useDispatch()
  const { categories, isLoading } = useSelector(
    (state) => state.category
  )
  const URL = import.meta.env.VITE_PUBLIC_URL

  const clickCategory = (alias) => {
    routeNavigator.go(`/category/${alias}`)
  }

  useEffect(() => {
    dispatch(fetchGetAllCategories())
  }, [])

  if (isLoading) {
    return <Loader />
  } else if (categories.length === 0 && !isLoading) {
    return (
      <h3 className={styles.text}>
        Произошла ошибка при загрузке страницы
      </h3>
    )
  }

  return (
    <div className={styles.container}>
      {categories.map((elem) => {
        return (
          <div
            key={elem._id}
            className={styles.element}
            onClick={() => clickCategory(elem.alias)}
          >
            <div className={styles.wrap_img_wrap}>
              <div className={styles.img_wrap}>
                <img
                
                  src={`${URL}/${elem?.imageUrl}`}
                  alt="фото категории"
                  className={styles.img}
                />
              </div>
            </div>

            <span className={styles.name}>{elem.title}</span>
          </div>
        )
      })}
    </div>
  )
}

export default CategoriesList

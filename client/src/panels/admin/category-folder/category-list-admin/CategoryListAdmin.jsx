import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'


import {
  fetchGetAllCategories,
  fetchDeleteCategory,
} from '../../../../redux/slices/categorySlice'
import styles from './CategoryListAdmin.module.css'
import Loader from '../../../../UI/loader/Loader'
import UpdateCategory from '../update-category/UpdateCategory'



const CategoryListAdmin = () => {
  const dispatch = useDispatch()
  const { categories, isLoading } = useSelector(
    (state) => state.category
  )
  const URL = import.meta.env.VITE_PUBLIC_URL

  const deleteCategory = (categoryId) => {
    dispatch(fetchDeleteCategory(categoryId))
  }

  useEffect(() => {
    dispatch(fetchGetAllCategories())
  }, [])

  if (isLoading) {
    return <Loader />
  } else if (categories.length === 0 && !isLoading) {
    return (
      <h3 className={styles.text}>
        Список категорий пуст или произошла ошибка при загрузке
      </h3>
    )
  }
  return (
    <div className={styles.section}>
      <ul className={styles.header_items}>
        <li className={styles.header_item}>
          <span className={styles.header_title}>№</span>
          <span className={styles.header_title}>Название</span>
          <span className={styles.header_title}>Алиас</span>
          <span className={styles.header_title}>Фото</span>
          <span className={styles.header_title}>Действия</span>
        </li>
      </ul>

      <ul className={styles.items}>
        {categories?.map((elem, inx) => {
          return (
            <li className={styles.item} key={elem._id}>
              <span className={styles.title}>{inx + 1}</span>
              <span className={styles.title}>{elem.title}</span>
              <span className={styles.title}>{elem.alias}</span>
              <div className={styles.img_wrap}>
                <img
                  src={`${URL}/${elem?.imageUrl}`}
                  alt="фото категории"
                  className={styles.img}
                />
              </div>
              <div className={styles.icons}>
                <UpdateCategory
                  propsTitle={elem.title}
                  propsAlias={elem.alias}
                  propsImage={elem.imageUrl}
                  categoryId={elem._id}
                />
                <RiDeleteBin5Line
                  size={25}
                  className={styles.icon}
                  onClick={() => deleteCategory(elem._id)}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default CategoryListAdmin

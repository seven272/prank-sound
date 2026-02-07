import bridge from '@vkontakte/vk-bridge'
import { useDispatch } from 'react-redux'
import { setVkUser, fetchFindVkUser } from '../redux/slices/vkUserSlice'


const useVkUser = () => {
  const dispatch = useDispatch()

  const getUserInfo = async () => {
    return await bridge
      .send('VKWebAppGetUserInfo')
      .then((data) => {
        if (data.id) {
          // Данные пользователя получены
          dispatch(setVkUser(data))
          dispatch(fetchFindVkUser(data.id))
          console.log(data)
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error)
      })
  }
  return {
    getUserInfo,
  }
}
export { useVkUser }

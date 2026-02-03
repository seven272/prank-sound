import bridge from '@vkontakte/vk-bridge'
import { useDispatch } from 'react-redux'
import { setVkUser } from '../redux/slices/vkUserSlice'

const useVkUser = async () => {
  const dispatch = useDispatch()

  const getUserInfo = async () => {
    return await bridge
      .send('VKWebAppGetUserInfo')
      .then((data) => {
        if (data.id) {
          dispatch(setVkUser(data))
          // Данные пользователя получены
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

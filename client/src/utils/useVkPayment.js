import bridge from '@vkontakte/vk-bridge'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCreateVkUser } from '../redux/slices/vkUserSlice'

const useVkPayment = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const vkPay = async () => {
    try {
      // 1. Вызываем нативное окно оплаты VK
      const data = await bridge.send('VKWebAppShowOrderBox', {
        type: 'item', // Всегда должно быть 'item'
        item: 'premium_pass', // Идентификатор товара
      })

      if (data.success) {
        // 2. Если VK вернул success, значит пользователь нажал "Оплатить"
        // и деньги (голоса) списались.

        // ВАЖНО: В этот момент твой бэкенд ПАРАЛЛЕЛЬНО получает callback от VK.
        // Нужно подождать секунду или обновить данные пользователя вручную.

        alert(
          'Оплата прошла успешно! Изумруды скоро появятся на счету.',
        )

        // Здесь можно вызвать функцию обновления баланса с твоего сервера
        setLoading(true)

        setTimeout(() => {
          dispatch(fetchCreateVkUser())
          setLoading(false)
        }, 1500)
      }
    } catch (error) {
      // Пользователь закрыл окно или произошла ошибка (например, ошибка 13)
      console.error('Ошибка при оплате:', error)

      if (error.error_data && error.error_data.error_code === 4) {
        alert('Покупка отменена пользователем')
      } else {
        alert('Произошла ошибка при связи с сервером VK')
      }
    }
  }

  return {
    vkPay,
    loading,
  }
}

export { useVkPayment }

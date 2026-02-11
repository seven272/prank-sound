import bridge from '@vkontakte/vk-bridge'

const vkPay = async () => {
  return await bridge
    .send('VKWebAppShowOrderBox', {
      type: 'item', // Всегда должно быть 'item'
      item: 'sale_key', // Идентификатор товара
    })
    .then((data) => {
      console.log('Покупка состоялась.', data)
    })
    .catch((error) => {
      console.log('Ошибка платежа!', error)
    })
}

const vkSubscription = async () => {
  return bridge
    .send('VKWebAppShowSubscriptionBox', {
      action: 'create',
      item: 'sale_subscr_1', // Идентификатор подписки в приложении
    })
    .then((data) => {
      console.log('Полписка прошла успешно', data)
    })
    .catch((e) => {
      console.log('Ошибка подписки!', e)
    })
}

export { vkPay, vkSubscription }

import bridge from '@vkontakte/vk-bridge'

const vkPay = async () => {
  return bridge
    .send('VKWebAppShowOrderBox', {
      type: 'item', // Всегда должно быть 'item'
      item: 'sale_item_id_1', // Идентификатор товара
    })
    .then((data) => {
      console.log('Покупка состоялась.', data)
    })
    .catch((error) => {
      console.log('Ошибка!', error)
    })
}

export { vkPay }

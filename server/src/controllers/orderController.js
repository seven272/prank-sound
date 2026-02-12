import User from '../models/User.js'
import Order from '../models/Order.js'

const makePurchaseVk = async (req, res) => {
  console.log('Запрос от VK:', req.body)

  const ITEMS_STORE = {
    premium_pass: {
      title: 'Премиум доступ',
      price: 5,
      photo_url: 'https://prank-sound.ru/public/key.jpeg',
    },
    sale_key: {
      title: 'Музыкальный ключ',
      price: 2,
      photo_url: 'https://prank-sound.ru/.../...jpeg',
    },
  }
  const { notification_type, item, user_id, order_id, status } =
    req.body
  try {
    // ЗАПРОС ИНФОРМАЦИИ О ТОВАРЕ
    if (
      notification_type === 'get_item' ||
      notification_type === 'get_item_test'
    ) {
      const product = ITEMS_STORE[item]

      console.log('продукт', product)

      if (!product)
        return res
          .status(404)
          .json({ error: 'Товара нет в списке ITEMS_STORE' })

      return res.json({
        response: {
          item_id: item,
          title: product.title,
          price: product.price,
          photo_url: product.photo_url,
        },
      })
    }

    // НАЧИСЛЕНИЕ ПОСЛЕ ОПЛАТЫ
    //notification_type === 'order_status_change' 
    if (
      notification_type === 'order_status_change_test' &&
      status === 'chargeable'
    ) {
      console.log('НАЧИСЛЕНИЕ ПОСЛЕ ОПЛАТЫ')
      const orderId = String(order_id)
      const vkId = String(user_id)

      // Проверка на дубликаты
      const existing = await Order.findOne({ orderId })
      if (existing) {
        return res.json({
          response: { order_id: orderId, app_order_id: existing._id },
        })
      }

      // Создаем заказ и создаем нового пользователя в БД
      const newOrder = await Order.create({
        orderId,
        userId: vkId,
        item,
      })

      const user = await User.create({ vk_id: vkId, isPaid: true })
      console.log(user)

      return res.json({
        response: { order_id: orderId, app_order_id: newOrder._id },
        newUser: user,
      })
    }

    // На все остальные типы уведомлений (например, критические ошибки платежа)
    res.json({ response: 'ok' })
  } catch (error) {
    console.error('Ошибка в обработке платежа:', error)
    return res.status(500).json({
      error: 'Внутренняя ошибка сервера при покупке товара',
    })
  }
}

export { makePurchaseVk }

import User from '../models/User.js'
import Order from '../models/Order.js'

const makePurchaseVk = async (req, res) => {

  const ITEMS_STORE = {
    premium_pass: {
      title: 'Премиум доступ',
      price: 10,
      photo_url: 'https://prank-sound.ru/static/other/vip-2.jpeg',
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
    if (
      (notification_type === 'order_status_change' ||
        notification_type === 'order_status_change_test') &&
      status === 'chargeable'
    ) {
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

      // Проверка на уже созданного пользователя
      const existingUser = await User.findOne({ vk_id: vkId })

      if (existingUser) {
        console.log('Такой пользователья уже есть в БД')
      } else {
        const user = await User.create({ vk_id: vkId, isPaid: true })
        console.log(user)
      }

      return res.json({
        response: { order_id: orderId, app_order_id: newOrder._id },
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

const getAllOrdersVk =  async (req, res) => {
  try {
    const all = await Order.find({})
    res.status(200).json(all)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Внутренняя ошибка сервера при загрузке ззаказов ВК',
    })
  }
}

export { makePurchaseVk, getAllOrdersVk }

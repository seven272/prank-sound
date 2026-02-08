import { response } from 'express'
import User from '../models/User.js'

const createVkUser = async (req, res) => {
  try {
    const { vk_id, isPaid } = req.body
    if (!vk_id) {
      return res.status(400).json({
        error:
          'Произошла ошибка при получении данных о пользователе из ВК',
      })
    }

    const existingValues = await User.find({ vk_id })

    if (existingValues.length > 0) {
      return res.status(400).json({
        error: 'Такой пользователь уже существует',
      })
    }

    const user = await User.create({ vk_id, isPaid })
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

const getVkUser = async (req, res) => {
  const { vkId } = req.params

  try {
    const user = await User.findOne({ vk_id: vkId })
    if (!user) {
      return res
        .status(402)
        .json({ message: 'пользователь не найден в БД' })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.json({
      message:
        'Ошибка сервера при получении данных о пользователе ВК',
    })
  }
}

const listVkUsers = async (req, res) => {
  try {
    const all = await User.find({})
    res.status(200).json(all)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Внутренняя ошибка сервера при загрузке категорий',
    })
  }
}
const purchase = async (req, res) => {
  console.log('Запрос от VK:', req.body)

  const { notification_type, item } = req.body
  // const objRes = {
  //   title: '300 изумрудов',
  //   price: 27,
  //   photo_url: 'https://my-app.example.com/sale-item-1.png',
  //   discount: 3,
  //   item_id: 'sale_item_id_1',
  //   expiration: 660,
  // }
  try {
    if (
      notification_type === 'get_item_test' ||
      notification_type === 'get_item'
    ) {
      // ВАЖНО: Никаких лишних полей, только response
      return res.status(200).json({
        response: {
          item_id: String(item), // "sale_key"
          title: '300 изумрудов',
          price: 2, // СТРОГО ЧИСЛО
          photo_url: 'https://i.pinimg.com',
        },
      })
    }

    // Для подтверждения заказа (финализация)
    if (
      notification_type === 'order_status_change_test' ||
      notification_type === 'order_status_change'
    ) {
      return res.status(200).json({
        response: {
          order_id: Number(req.body.order_id),
          app_order_id: Date.now(),
        },
      })
    }

    res.status(200).json({ response: { status: 'ok' } })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'Внутренняя ошибка сервера при покупке товара',
    })
  }
}

export { createVkUser, listVkUsers, getVkUser, purchase }

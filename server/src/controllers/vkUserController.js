import VkUser from '../models/VkUser.js'

const createVkUser = async (req, res) => {
  try {
    const { vk_id, isPaid } = req.body

    if (!vk_id) {
      return res.status(400).json({
        error:
          'Произошла ошибка при получении данных о пользователе из ВК',
      })
    }

    const existingValues = await VkUser.find({ vk_id })

    if (existingValues.length > 0) {
      return res.status(400).json({
        error: 'Такой пользователь уже существует',
      })
    }

    const user = await VkUser.create({ vk_id, isPaid })
    console.log(user)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

const getVkUser = async (req, res) => {
  const { vk_id } = req.body
  try {
    const user = await VkUser.findOne({ vk_id: vk_id })
    if (!user) {
      return res
        .status(402)
        .json({ message: 'пользователь  не существует' })
    }

    return res.status(200).json({
      user,
    })
  } catch (error) {
    console.log(error)
    res.json({
      message:
        'Ошибка сеервера при получении данных о пользователе ВК',
    })
  }
}

const listVkUsers = async (req, res) => {
  try {
    const all = await VkUser.find({})
    res.status(200).json(all)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Внутренняя ошибка сервера при загрузке категорий',
    })
  }
}

export { createVkUser, listVkUsers, getVkUser }

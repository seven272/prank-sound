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
    console.log('user create vk')
    console.log(user)
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
    console.log(user)

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

export { createVkUser, listVkUsers, getVkUser }

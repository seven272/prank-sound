import Auth from '../models/Auth.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import createToken from '../utils/createToken.js'

dotenv.config()

//register user
const register = async (req, res) => {
  const registerCode = process.env.REGISTRATION_CODE
  const { username, password, secretCode } = req.body
  console.log('1 -', secretCode)
  console.log('2 -', registerCode)

  // Проверяем соответствие кода
  if (secretCode !== process.env.REGISTRATION_CODE) {
    return res.status(403).json({
      message: 'Регистрация запрещена. Неверный код',
    })
  }

  try {
    const userExists = await Auth.findOne({ username })

    if (userExists) {
      return res
        .status(402)
        .json({ message: 'данный username уже занят' })
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = await Auth.create({
      username,
      password: hashedPassword,
      isAdmin: false,
    })

    createToken(res, newUser._id)

    res.json({
      newUser,
      message: 'Регистрация прошла успешно',
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Ошибка при регистрации пользователя',
    })
  }
}
//login user
const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await Auth.findOne({ username })

    if (!user) {
      return res.status(404).json({
        message: 'такого пользователя не существует',
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password,
    )

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'неверный пароль' })
    }

    createToken(res, user._id)

    res.json({
      user,
      message: 'Вы вошли в систему',
    })
  } catch (error) {
    console.log(error)
    res.status(501).json({
      message: 'Ошибка сервера при авторизации',
    })
  }
}

const logout = async (req, res) => {
  res.cookie('jwt-prank-sound', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  return res.json({
    message: 'Вы вышли из системы',
  })
}

//get me
const getMe = async (req, res) => {
  try {
    const user = await Auth.findById(req.userId)
    if (!user) {
      return res
        .status(402)
        .json({ message: 'такого пользователя  не существует' })
    }

    createToken(res, user._id)

    return res.status(200).json({
      user,
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Нет доступа',
    })
  }
}

const subscribing = async (req, res) => {
  try {
    const { user } = req.body
    const id = req.userId
    const updateData = { ...user, isSubscription: true }
    const options = { new: true }

    const updatedUser = await Auth.findByIdAndUpdate(
      id,
      updateData,
      options,
    )

    if (!updatedUser) {
      return res.status(404).json({ error: 'Пользователь не найден' })
    }

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    res.json({
      message: 'Нет доступа',
    })
  }
}

export { register, login, logout, getMe, subscribing }

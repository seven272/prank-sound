import Category from '../models/Category.js'
import Sound from '../models/Sound.js'



const createSound = async (req, res) => {
  try {
    const { category, title, number, imageUrl, soundUrl, isFree } =
      req.body

    if (!title || !category || !number || !soundUrl) {
      return res.status(400).json({
        error:
          'Следует указать все обязательные данные при создании звука',
      })
    }

    const findedCategory = await Category.findOne({
      alias: category,
    })

    if (!findedCategory) {
      return res
        .status(404)
        .json({ message: 'Отправленная категория не найдена в БД' })
    }

    const sound = await Sound.create({
      category: findedCategory,
      title,
      number,
      imageUrl,
      soundUrl,
      isFree,
    })

    res.status(200).json(sound)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

const updateSound = async (req, res) => {
  try {
    const { soundId } = req.params
    const { title, number, category, imageUrl, soundUrl, isFree } =
      req.body

    const findedCategory = await Category.findOne({
      alias: category,
    })

    if (!findedCategory) {
      return res
        .status(404)
        .json({ message: 'Отправленная категория не найдена в БД' })
    }

    const updateData = {
      title,
      number,
      category: findedCategory,
      imageUrl,
      soundUrl,
      isFree,
    }
    const options = { new: true }

    const updatedSound = await Sound.findByIdAndUpdate(
      { _id: soundId },
      updateData,
      options
    )

    if (!updatedSound) {
      return res.status(404).json({ error: 'Звук не найден' })
    }

    res.json(updatedSound)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

const removeSound = async (req, res) => {
  try {
    const { soundId } = req.params
    const removed = await Sound.findByIdAndDelete(soundId)
    res.json(removed)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

const listSound = async (req, res) => {
  try {
    const all = await Sound.find({}).populate('category')
    res.status(201).json(all)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Внутренняя ошибка сервера при загрузке категорий',
    })
  }
}

const listSoundCategory = async (req, res) => {
  const { alias } = req.params
  try {
    //в начале ищем категорию по алиасу, а затем по ИД категории получаем все звуки с ней
    const findedCategory = await Category.findOne({ alias: alias })
    const list = await Sound.find({
      category: findedCategory._id,
    })
    res.status(201).json(list)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error:
        'Внутренняя ошибка сервера при загрузке мелодий категорий',
    })
  }
}

const readSound = async (req, res) => {
  const { id } = req.params
  const sound = await Sound.findOne({ _id: id }).populate('category')
  res.json(sound)
  try {
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

export {
  createSound,
  updateSound,
  listSound,
  removeSound,
  readSound,
  listSoundCategory,
}

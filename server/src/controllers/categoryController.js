import Category from '../models/Category.js'

const createCategory = async (req, res) => {
  try {
    const { title, alias, imageUrl } = req.body
    console.log(imageUrl)
    if (!title || !alias) {
      return res.status(400).json({
        error: 'Следует указать название категории ии алиас',
      })
    }

    const existingValues = await Category.find({
      $or: [{ title: title }, { alias: alias }],
    })

    if (existingValues.length > 0) {
      return res.status(400).json({
        error: 'Такое название или алиас уже существует',
      })
    }

    const category = await Category.create({ title, alias, imageUrl })

    res.status(200).json(category)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

const updateCategory = async (req, res) => {
  try {
    const { title, alias, imageUrl } = req.body
    const { categoryId } = req.params

    const updateData = {
      title: title,
      alias: alias,
      imageUrl: imageUrl,
    }
    const options = { new: true }

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      updateData,
      options
    )

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Категория не найдена' })
    }

    res.json(updatedCategory)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

const removeCategory = async (req, res) => {
  try {
    const { categoryId } = req.params
    const removed = await Category.findByIdAndDelete(categoryId)
    res.json(removed)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Внутренняя ошибка сервера' })
  }
}

const listCategory = async (req, res) => {
  try {
    const all = await Category.find({})
    res.json(all)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({
        error: 'Внутренняя ошибка сервера при загрузке категорий',
      })
  }
}

export {
  createCategory,
  updateCategory,
  listCategory,
  removeCategory,
}

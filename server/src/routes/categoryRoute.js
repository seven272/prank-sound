import express from 'express'
import {
  createCategory,
  updateCategory,
  listCategory,
  removeCategory,
} from '../controllers/categoryController.js'

import {
  checkAdmin,
  checkAuth,
} from '../middlewares/authMiddleware.js'

import upload from '../middlewares/upload.js'

// import {
//   authenticate,
//   authorizeAdmin,
// } from '../middlewares/authMiddleware.js'

const router = express.Router()

//роут загрузки изображения
router.post(
  '/upload-image',
  checkAuth,
  checkAdmin,
  upload.single('category'),
  (req, res) => {
    try {
      res.status(201).json({
        message: 'Изображение категории успешно загружено',
        url: `static/categories/${req.file.filename}`,
      })
    } catch (error) {
      console.log(
        'Ошибка сервера при загрузке изображения категории',
        error
      )
    }
  }
)

router.post('/new', checkAuth, checkAdmin, createCategory)
router
  .route('/:categoryId')
  .put(checkAuth, checkAdmin, updateCategory)
  .delete(checkAuth, checkAdmin, removeCategory)

router.get('/all', listCategory)

export default router

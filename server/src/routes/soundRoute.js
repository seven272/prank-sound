import express from 'express'
import {
  createSound,
  updateSound,
  listSound,
  removeSound,
  readSound,
  listSoundCategory,
} from '../controllers/soundController.js'

import {
  checkAuth,
  checkAdmin,
} from '../middlewares/authMiddleware.js'
import upload from '../middlewares/upload.js'



const router = express.Router()

//роут загрузки изображения
router.post(
  '/upload-image',
  checkAuth,
  checkAdmin,
  upload.single('cover'),
  (req, res) => {
    try {
      res.status(201).json({
        message: 'Изображение мелодии успешно загружено',
        url: `static/covers/${req.file.filename}`,
      })
    } catch (error) {
      console.log(
        'Ошибка сервера при загрузке изображения мелодии',
        error
      )
    }
  }
)

//роут загрузки аудиофайла
router.post(
  '/upload-sound',
  checkAuth,
  checkAdmin,
  upload.single('sound'),
  (req, res) => {
    try {
      res.status(201).json({
        message: 'Аудиофайл успешно загружено',
        url: `static/sounds/${req.file.filename}`,
      })
    } catch (error) {
      console.log('Ошибка сервера при загрузке аудиофайла', error)
    }
  }
)

router.post('/new', checkAuth, checkAdmin, createSound)
router
  .route('/:soundId')
  .put(checkAuth, checkAdmin, updateSound)
  .delete(checkAuth, checkAdmin, removeSound)

router.get('/all', listSound)
router.get(
  '/category/:alias',
  listSoundCategory
)
router.get('/:id', readSound)

export default router

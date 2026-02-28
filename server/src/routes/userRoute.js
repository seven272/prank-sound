import express from 'express'
import {
  listVkUsers,
  getVkUser,
} from '../controllers/userController.js'
import {
  checkAuth,
  checkAdmin,
} from '../middlewares/authMiddleware.js'

const router = express.Router()

// router.post('/create', createVkUser)
router.get('/all', checkAuth, checkAdmin, listVkUsers)
router.get('/user/:vkId', getVkUser)

export default router

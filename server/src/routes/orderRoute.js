import express from 'express'
import {
  makePurchaseVk,
  getAllOrdersVk,
} from '../controllers/orderController.js'
import vkAuthMiddleware from '../middlewares/vkAuthMiddleware.js'
import {
  checkAuth,
  checkAdmin,
} from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/pay', vkAuthMiddleware, makePurchaseVk)
router.get('/pay', makePurchaseVk)
router.get('/all', checkAuth, checkAdmin, getAllOrdersVk)

export default router

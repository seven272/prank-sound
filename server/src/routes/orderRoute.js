import express from 'express'
import { makePurchaseVk } from '../controllers/orderController.js'
import vkAuthMiddleware from '../middlewares/vkAuthMiddleware.js'
const router = express.Router()

router.post('/pay', vkAuthMiddleware, makePurchaseVk)
router.get('/pay', makePurchaseVk)

export default router

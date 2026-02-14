import express from 'express'
import { makePurchaseVk, getAllOrdersVk } from '../controllers/orderController.js'
import vkAuthMiddleware from '../middlewares/vkAuthMiddleware.js'
const router = express.Router()

router.post('/pay', vkAuthMiddleware, makePurchaseVk)
router.get('/pay', makePurchaseVk)
router.get('/all', getAllOrdersVk)

export default router

import express from 'express'
import { makePurchaseVk } from '../controllers/orderController.js'

const router = express.Router()

router.post('/pay', makePurchaseVk)
router.get('/pay', makePurchaseVk)

export default router

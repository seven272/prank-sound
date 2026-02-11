import express from 'express'
import { makePurchaseVk } from '../controllers/щквукController.js'

const router = express.Router()

router.post('/pay', makePurchaseVk)
router.get('/pay', makePurchaseVk)

export default router

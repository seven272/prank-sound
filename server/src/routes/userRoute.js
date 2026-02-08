import express from 'express'
import {
  createVkUser,
  listVkUsers,
  getVkUser,
  purchase
} from '../controllers/userController.js'


const router = express.Router()

router.post('/create', createVkUser)
router.get('/all', listVkUsers)
router.get('/:vkId', getVkUser)
router.get('/pay', purchase)



export default router
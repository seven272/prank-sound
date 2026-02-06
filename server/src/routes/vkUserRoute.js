import express from 'express'
import {
  createVkUser,
  listVkUsers,
  getVkUser,
} from '../controllers/vkUserController.js'


const router = express.Router()

router.post('/create', createVkUser)
router.get('/all', listVkUsers)
router.get('/one', getVkUser)



export default router
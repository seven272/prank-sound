import express from 'express'
import {
  createVkUser,
  listVkUsers,
  getVkUser,
} from '../controllers/userController.js'


const router = express.Router()

router.post('/create', createVkUser)
router.get('/all', listVkUsers)
router.get('/:vkId', getVkUser)



export default router
import express from 'express'
import { getProfile, updateProfile } from '../controller/profileController'
import { changePassword } from '../services/profileService'
import protect from '../middlewares/authMiddleware'

const router =express.Router()

router.get('/profile',protect,getProfile)
router.get('/update',protect,updateProfile)
router.get('/change-password',protect,changePassword)
export default router
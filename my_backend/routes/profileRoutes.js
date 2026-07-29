import express from 'express'
import { getProfile, updatePassword, updateProfile } from '../controller/profileController.js'
import upload from "../middlewares/upload.js";
import protect from '../middlewares/authMiddleware.js'

const router =express.Router()

router.get('/profile',protect,getProfile)
router.put('/update',protect, upload.single("image"),updateProfile)
router.put('/change-password',protect,updatePassword)

export default router
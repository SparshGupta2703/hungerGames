import express from 'express'
import upload from "../middlewares/upload.js";
import protect from '../middlewares/authMiddleware.js'
import { createPost, getGroupPosts, getLeaderboard } from '../controller/postController.js';


const router =express.Router()

router.post("/create",protect,upload.single("image"),createPost);
router.get("/:groupId",protect,getGroupPosts);

router.get("/leaderboard/:groupId",protect,getLeaderboard);
export default router
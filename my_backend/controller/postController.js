import {
    createPostService,
    getGroupPostsService,
    getLeaderboardService
} from "../services/postService.js";

export const createPost = async (req, res) => {
    try {
        const post = await createPostService(req);

        res.status(201).json({
            success: true,
            post
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const getGroupPosts = async (req, res) => {
    try {
        const posts = await getGroupPostsService(req.params.groupId);

        res.status(200).json({
            success: true,
            posts
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await getLeaderboardService(req.params.groupId);

        res.status(200).json({
            success: true,
            leaderboard
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
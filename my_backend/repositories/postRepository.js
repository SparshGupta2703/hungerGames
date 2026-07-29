import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const createPostRepo = async (postData) => {
    return await Post.create(postData);
};

export const getGroupPostsRepo = async (groupId) => {
    return await Post.find({ group: groupId })
        .populate("user", "name userImg")
        .sort({ createdAt: -1 });
};

export const getLeaderboardRepo = async (groupId) => {
    const leaderboard = await Post.aggregate([
        {
            $match: {
                group: new mongoose.Types.ObjectId(groupId)
            }
        },
        {
            $group: {
                _id: "$user",
                totalPoints: { $sum: "$groupPoints" },
                totalPosts: { $sum: 1 }
            }
        },
        {
            $sort: {
                totalPoints: -1
            }
        }
    ]);

    await User.populate(leaderboard, {
        path: "_id",
        select: "name userImg"
    });

    return leaderboard;
};
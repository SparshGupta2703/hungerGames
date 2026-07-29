import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import ai from "../config/gemini.js";
import Post from "../models/Post.js";
import mongoose from "mongoose";
import User from "../models/User.js"

export const createPost = async (req, res) => {
    try {

        // Upload image
        const uploadResult = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "hungergames"
            }
        );

        const imageUrl = uploadResult.secure_url;

        // Convert image to Base64
        const imageBuffer = fs.readFileSync(req.file.path);

        const base64Image = imageBuffer.toString("base64");

        // Ask Gemini
        const result = await ai.models.generateContent({

            model: "gemini-3.6-flash",

            contents: [

                {
                    inlineData: {
                        mimeType: req.file.mimetype,
                        data: base64Image
                    }
                },

                {
                    text: `
You are a nutrition expert.

Analyze the food image.

Return ONLY JSON.

{
"foodName":"",
"calories":0,
"protein":0,
"carbs":0,
"fat":0,
"healthyScore":0,
"groupPoints":0,
"comment":"",
"suggestion":""
}
`
                }

            ]

        });

        console.log(result.text);
        let response = result.text.trim();

      if (response.startsWith("```")) {
      response = response
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/, "")
        .trim();
        }

const aiResponse = JSON.parse(response);
        

 
        const post = await Post.create({
                user: req.id,          // from your auth middleware
                group: req.body.groupId,

                image: imageUrl,

                foodName: aiResponse.foodName,
                calories: aiResponse.calories,
                protein: aiResponse.protein,
                carbs: aiResponse.carbs,
                fat: aiResponse.fat,
                healthyScore: aiResponse.healthyScore,
                groupPoints: aiResponse.groupPoints,
                comment: aiResponse.comment,
                suggestion: aiResponse.suggestion
            });

       res.json({
       success: true,
       post
     });
    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const getGroupPosts = async (req, res) => {
    try {
        const posts = await Post.find({
            group: req.params.groupId
        })
        .populate("user", "name userImg")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            posts
        });
        console.log("Requested:", req.params.groupId);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getLeaderboard = async (req, res) => {
    try {

        const leaderboard = await Post.aggregate([
            {
                $match: {
                    group: new mongoose.Types.ObjectId(req.params.groupId)
                }
            },
            {
                $group: {
                    _id: "$user",
                    totalPoints: {
                        $sum: "$groupPoints"
                    },
                    totalPosts: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    totalPoints: -1
                }
            }
        ]);
        console.log(leaderboard);

        await User.populate(leaderboard, {
            path: "_id",
            select: "name userImg"
        });
        console.log(JSON.stringify(leaderboard, null, 2));

        res.json({
            success: true,
            leaderboard
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
}
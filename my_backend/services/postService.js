import fs from "fs";
import cloudinary from "../config/Cloudinary.js";
import ai from "../config/gemini.js";
import {
    createPostRepo,
    getGroupPostsRepo,
    getLeaderboardRepo
} from "../repositories/postRepository.js";

export const createPostService = async (req) => {

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "hungergames"
    });

    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");

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

    let response = result.text.trim();

    if (response.startsWith("```")) {
        response = response
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/```$/, "")
            .trim();
    }

    const aiResponse = JSON.parse(response);

    return await createPostRepo({
        user: req.id,
        group: req.body.groupId,
        image: uploadResult.secure_url,
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
};

export const getGroupPostsService = async (groupId) => {
    return await getGroupPostsRepo(groupId);
};

export const getLeaderboardService = async (groupId) => {
    return await getLeaderboardRepo(groupId);
};
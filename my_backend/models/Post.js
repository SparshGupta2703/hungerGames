import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true
        },

        image: {
            type: String,
            required: true
        },

        foodName: {
            type: String
        },

        calories: {
            type: Number
        },

        protein: {
            type: Number
        },

        carbs: {
            type: Number
        },

        fat: {
            type: Number
        },

        healthyScore: {
            type: Number
        },

        groupPoints: {
            type: Number
        },

        comment: {
            type: String
        },

        suggestion: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Post", postSchema);
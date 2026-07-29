import { changePassword, getUserProfile, updateUserProfile } from "../services/profileService.js"
import cloudinary from "../config/cloudinary.js";


export const getProfile=async(req,res)=>{
    try {
        console.log("request",req)
        const user=await getUserProfile(req.id)
        res.status(200).json({
            success:true,
            message:'profile fetched successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}
export const updateProfile = async (req, res) => {
    try {

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const updates = {
            name: req.body.name,
            userDesc: req.body.userDesc,
        };

        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "hungergames/profile"
                }
            );

            updates.userImg = uploadResult.secure_url;
        }

        console.log("UPDATES:", updates);

        const updatedUser = await updateUserProfile(req.id, updates);

        console.log("UPDATED USER:", updatedUser);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUser
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
export const updatePassword=async(req,res)=>{
    try {
        const {oldPassword,newPassword}=req.body
        const updatedUser=await changePassword(req.id,oldPassword,newPassword)   
        res.status(200).json({
            success:true,
            message:'profile updated successfully',
            updatedUser
        })
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
        
    }
}

import { findUserById, findUserByIdAndUpdate, findUserByIdWithPassword } from "../repositories/userRepository.js"
import bcrypt,{hash} from 'bcrypt'
export const getUserProfile =async(userId)=>{
    const user=await findUserById(userId)

    if(!user){
        throw new Error("user not found")
    }
    console.log("profile service:",user);
     return user

}
export const updateUserProfile = async (userId, updates) => {
    const allowedUpdates = {};

    if (updates.name !== undefined)
        allowedUpdates.name = updates.name;

    if (updates.userImg !== undefined)
        allowedUpdates.userImg = updates.userImg;

    if (updates.userDesc !== undefined)
        allowedUpdates.userDesc = updates.userDesc;

    const updatedUser = await findUserByIdAndUpdate(
        userId,
        allowedUpdates
    );

    if (!updatedUser) {
        throw new Error("User not found");
    }

    return updatedUser;
};
export const changePassword =async(userId ,oldPassword ,newPassword)=>{
    const user=await findUserByIdWithPassword(userId)
    if(!user){
        throw new Error("user not found")
    }
    const isMatch=await bcrypt.compare(oldPassword,user.password)
    if(!isMatch){
        throw new Error("incorrect password")
    }
    const hashedPassword=await bcrypt.hash(newPassword,10)
    const updateUser =await findUserByIdAndUpdate(userId,{password:hashedPassword})
    return updateUser
}



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
export const updateUserProfile=async(userId,updates)=>{
    const allowedUpdates={}
    if(updates.userName) allowedUpdates.name=updates.name
    if(updates.userImg) allowedUpdates.userImg= updates.userImg
    if(updates.userDesc) allowedUpdates.userDesc=updates.userDesc

    const updateUser = await findUserByIdAndUpdate(userId,allowedUpdates,{new:true})

    if(!updateUser){
        throw new Error('user not found')
    }
    return updateUser
}
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



import { findUserById, findUserByIdAndUpdate, findUserByIdWithPassword } from "../repositories/userRepository"
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
    if(updates.name) allowedUpdates.name=updates.name
    if(updates.logo) allowedUpdates.logo= updates.logo
    if(updates.address) allowedUpdates.bio= updates.address
    if(updates.businessName) allowedUpdates.businessName=updates.businessName
    if(updates.businessDesc) allowedUpdates.businessDesc=updates.businessDesc

    const updateUser = await findUserByIdAndUpdate(userId,allowedUpdates)

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

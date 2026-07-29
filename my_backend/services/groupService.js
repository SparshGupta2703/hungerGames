import Group from "../models/Group.js"
import User from "../models/User.js"
import { createGroup, findGroupById, findGroupByIdAndUpdate, findPendingInvites } from "../repositories/groupRepository.js"
import { findUserById } from "../repositories/userRepository.js"

export const  createNewGroup=async(data)=>{
    createGroup(data)
}

export const  GetGroup=async(id)=>{
    findGroupById(id)
}



export const  updateGroup=async(id,updates)=>{
        const allowedUpdates={}
            if(updates.name) allowedUpdates.name=updates.name
            if(updates.owner) allowedUpdates.owner= updates.owner
        const updateUser=await findGroupByIdAndUpdate(id,allowedUpdates,{new:true})
            if(!updateUser){
                throw new Error('user not found')
            }
            return updateUser
        }



export const inviteToGroup = async (groupId, userId) => {

    const user = await findUserById(userId);
    const group = await findGroupById(groupId);

    if (!user) throw new Error("User not found");
    if (!group) throw new Error("Group not found");

    const alreadyInvited = group.invited.some(
        invite => invite.user.toString() === userId
    );

    const alreadyMember = group.members.some(
        member => member.toString() === userId
    );

    if (alreadyInvited)
        throw new Error("User already invited");

    if (alreadyMember)
        throw new Error("User already a member");

    return await findGroupByIdAndUpdate(
        groupId,
        {
            $push: {
                invited: {
                    user: userId,
                    status: "pending"
                }
            }
        },
        { new: true }
    );
};
export const getPendingInvites = async (userId) => {
    return await findPendingInvites(userId);
};

export const EligibleMembers = async (groupId) => {
    const group = await findGroupById(groupId);

    const exclude = [
        group.owner,
        ...group.members,
        ...group.invited.map(invite => invite.user)
    ];

    const users = await User.find({
        _id: { $nin: exclude }
    }).select("name email profileImg");

    return users;
}
export const acceptReq =async(GroupId,userId)=>{
    await Group.findByIdAndUpdate(GroupId, {
    $pull: {
        invited: {
            user: userId
        }
    },
    $addToSet: {
        members: userId
    }
},{ new: true });
}
export const rejectReq =async(GroupId,userId)=>{
   await Group.findByIdAndUpdate(GroupId, {
    $pull: {
        invited: {
            user: userId
        }
    }
},{ new: true });
}
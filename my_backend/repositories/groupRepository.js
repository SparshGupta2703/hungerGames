import Group from "../models/Group.js";

export const findGroupById = async (id) => {
    return await Group.findById(id);
};
export const createGroup=async(data)=>{
    console.log(data);
    return await Group.create(data)
}
export const findGroupByIdAndUpdate=async(id,data)=>{
    return await Group.findByIdAndUpdate(id,data,{new:true})
}
export const findPendingInvites=async(id)=>{
    return await Group.find({  invited: {
            $elemMatch: {
                user: id,
                status: "pending"
            }
        }
    })
    .populate("owner", "name")
    .select("name owner");
};

export const findJoinedGroupsById = async (userId) => {
    return await Group.find({
        members: userId
    })
    .populate("owner", "name")
    .select("name owner");
};


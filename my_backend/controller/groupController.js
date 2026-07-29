import { findJoinedGroupsById } from "../repositories/groupRepository.js"
import { acceptReq, createNewGroup, EligibleMembers, GetGroup, getPendingInvites, inviteToGroup, rejectReq, updateGroup } from "../services/groupService.js"

export const CreateGroup=async(req,res)=>{
    try {
       
        const user=await createNewGroup(({
    name: req.body.name,
    owner:req.id,
    members: [req.id]  
}))
        res.status(200).json({
            success:true,
            message:'group created successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}

export const updateExistingGroup=async(req,res)=>{
    try {
        
        const user=await updateGroup(req.id,req.body)
        res.status(200).json({
            success:true,
            message:'group updated successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}

export const inviteUserToGroup=async(req,res)=>{
    try {
        
       const { groupId, userId } = req.body;

       const user = await inviteToGroup(groupId, userId);       
        res.status(200).json({
            success:true,
            message:'invited  successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}

export const pendingInvites=async(req,res)=>{
    try {
        
        const user=await getPendingInvites(req.id)
        res.status(200).json({
            success:true,
            message:'invites fetched successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}
export const getEligibleMembers=async(req,res)=>{
    try {
       
        const user=await EligibleMembers(req.params.groupId)
        res.status(200).json({
            success:true,
            message:'eligible members fetched successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}

export const Accept=async(req,res)=>{
    try {
        
        const { groupId } = req.body;

        const user = await acceptReq(groupId, req.id);
        res.status(200).json({
            success:true,
            message:'request accepted',
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}

export const Reject=async(req,res)=>{
    try {
        
        const { groupId } = req.body;

        const user = await rejectReq(groupId, req.id);
        res.status(200).json({
            success:true,
            message:'request rejected',
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}

export const findJoinedGroups=async(req,res)=>{
    try {
       
        const user=await findJoinedGroupsById(req.id)
        res.status(200).json({
            success:true,
            message:'groups fetched successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}

export const findGroup=async(req,res)=>{
    try {
        
        const user=await GetGroup(req.id)
        res.status(200).json({
            success:true,
            message:'group fetched successfully',
            user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}
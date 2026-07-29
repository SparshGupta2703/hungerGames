import { useAuthStore } from "../stores/AuthStore";



export const createGroup=async(data)=>{
  const {token}=useAuthStore.getState()
  const result = await fetch(`${import.meta.env.VITE_API_URL}/api/group/createGroup`,{
    method:'POST',
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return await result.json();
}

export const acceptInvite=async(data)=>{
  const {token}=useAuthStore.getState()
  const result = await fetch(`${import.meta.env.VITE_API_URL}/api/group/accept`,{
    method:'POST',
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return await result.json();
}

export const rejectInvite=async(data)=>{
  const {token}=useAuthStore.getState()
  const result = await fetch(`${import.meta.env.VITE_API_URL}/api/group/reject`,{
    method:'POST',
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return await result.json();
}
export const invite=async(data)=>{
  const {token}=useAuthStore.getState()
  const result = await fetch(`${import.meta.env.VITE_API_URL}/api/group/invite`,{
    method:'POST',
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return await result.json();
}
// Get requests
export const pendingInvites=async()=>{
  const {token}=useAuthStore.getState()
  const result = await fetch(`${import.meta.env.VITE_API_URL}/api/group/pendingInvites`,{
    method:'GET',
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    
  })
  return await result.json();
}
export const eligibleMembers=async(groupId)=>{
  const {token}=useAuthStore.getState()
  const result = await fetch(`${import.meta.env.VITE_API_URL}/api/group/eligible/${groupId}`,{
    method:'GET',
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
   
  })
  return await result.json();
}
export const findGroup=async()=>{
  const {token}=useAuthStore.getState()
  const result = await fetch(`${import.meta.env.VITE_API_URL}/api/group/findGroup`,{
    method:'GET',
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
   
  })
  return await result.json();
}

export const findJoinedGroups=async()=>{
  const {token}=useAuthStore.getState()
  const result = await fetch(`${import.meta.env.VITE_API_URL}/api/group/findJoinedGroups`,{
    method:'GET',
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    
  })
  return await result.json();
}
// put request

export const updateGroup=async(data)=>{
  const {token}=useAuthStore.getState()
  const result = await fetch(`${import.meta.env.VITE_API_URL}/api/group/updateGroup`,{
    method:'PUT',
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return await result.json();
}
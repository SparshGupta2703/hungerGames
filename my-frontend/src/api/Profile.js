import { useAuthStore } from "../stores/AuthStore";

const {token}=useAuthStore.getState()

export const getProfile=async(data)=>{
  const result = await fetch("http://localhost:5000/api/profile/profile",{
    method:'GET',
    headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return await result.json;
}


export const updateProfile=async(data)=>{
  console.log(data);
     const result = await fetch("http://localhost:5000/api/profile/update",{
    method:'PUT',
    headers:{
        "Content-Type":"application/json",
         Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  return await result.json;
}


export const changePassword=async(data)=>{
     const result = await fetch("http://localhost:5000/api/profile/change-password",{
    method:'PUT',
    headers:{
        "Content-Type":"application/json",
         Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
          ...data,
     })
  })
  return await result.json;
}
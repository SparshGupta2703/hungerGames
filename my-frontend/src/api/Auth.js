

export const signup=async(data)=>{

   const res=await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body: JSON.stringify(data)
   })
   return await res.json();

}

export const login=async(data)=>{
   

   const res=await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body: JSON.stringify(data)
   })
   const loginInfo = await res.json()
   
     
   return await loginInfo

}
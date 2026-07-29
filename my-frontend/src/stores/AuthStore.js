import { create } from 'zustand'
import{ persist } from 'zustand/middleware'


export const useAuthStore = create(
    persist(
    (set)=>({
    user:null,
    token:null,
    isAuthenticated: false,

    loginAuth:(user,token)=> 
     set((state)=>({
        user:user,
        token:token,
        isAuthenticated:true
       })),
       
    logout:()=>set((state)=>({
         user:null,
         token:null,
         isAuthenticated: false,
    })),
    updateUser:(updatedUser)=>set((state)=>({
      user:updatedUser
      
    }))
})
   ,{name:'loginStorage'}
)
)


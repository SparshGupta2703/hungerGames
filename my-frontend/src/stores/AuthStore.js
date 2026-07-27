import { create } from 'zustand'
import{ persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
    (set)=>({
    user:null,
    token:null,
    isAuthenticated: false,

    login:(user,token)=> 
     set((state)=>({
        user:user,
        token:token,
        isAuthenticated:true
       })),
       
    logout:()=>set((state)=>({
         user:null,
         token:null,
         isAuthenticated: false,
    }))
})
   ,{name:'loginStorage'}
)
)


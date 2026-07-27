import { loginUser, signupUser } from "../services/authService.js"

export const signup =async(req,res)=>{
 try{
    const user =await signupUser(req.body)
 res.status(201).json({
    success:true,
    message:'user registered successfully',
    ...user
   })  

 }
 catch(err){
    console.log("error while signing up:",err)
    res.status(400).json({
        success:false,
        message:err.message
    })
 }
}
export const login=async(req,res)=>{
   try {
      const userData =await loginUser(req.body)
      res.status(200).json({
         success:true,
         message:'user login success',
         ...userData
      })
      
   } catch (err) {
      res.status(400).json({
         success:false,
         message:err.message
      })
      
   }
}
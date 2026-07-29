import { useEffect, useState } from "react"

import { useAuthStore } from "../stores/AuthStore"
import { updateProfile } from "../api/Profile"


const Profile=()=>{
  const[isEditing,setIsEditing]=useState(false)
  //  const[updateData,setUpdateData]=useState({})
   const[userData,setUserData]=useState({
            userId:"",
            name:"",
            userImg:"",
            userDesc:""
  })
  
  const {token,user,updateUser}=useAuthStore()
  
  
  
 
  useEffect(()=>{
     if(user){
        setUserData(user)
     }
    
  },[user])

  const handleSave=async()=>{
    updateProfile(userData)
    await updateUser(userData)
    setIsEditing(false)

  
  }

  const handleChange=(e)=>{
       setUserData({...userData,[e.target.name]:e.target.value})}
 
 
  

    return (
     isEditing
     ?
     <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={userData.userImg} alt="Profile"
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">Profile</h1>
      <label className="label">Name</label>
      <p><input  type="text" className="input"  name="name" value={userData.name} onChange={handleChange}/></p>
      <label className="label">Desc</label>
      <input  type="text" className="input"  name="userDesc" value={userData.userDesc} onChange={handleChange}/>
      
      <button className="btn btn-primary" onClick={() => handleSave(userData)}>Save</button>
      
    </div>
  </div>
</div>
     
     :
     <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src={user.userImg} alt="Profile"
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">Profile</h1>
      <label className="label">Name</label>
     <p><span>{userData.name}</span></p>
     <label className="label">Desc</label>
    <p><span>{userData.userDesc}</span></p> 
     <button className="btn btn-primary" onClick={()=>setIsEditing(true)}>update</button>

      
    </div>
  </div>
</div>
   
  
      
       
    )
}
export default Profile
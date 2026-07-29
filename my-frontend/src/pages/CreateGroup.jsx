import {  useState } from "react"
import { useAuthStore } from "../stores/AuthStore"
import { createGroup } from "../api/Group"
import { useNavigate } from "react-router-dom"

const CreateGroup=()=>{
const[loading,setLoading]=useState(false)
 const[groupData,setGroupData]=useState({
    name:'',
   
 })
const {user}=useAuthStore()
console.log("use rin creategroupjsx", user)
const handleChange=(e)=>{
   
       setGroupData({...groupData,[e.target.name]:e.target.value})
}
const navigate=useNavigate()
const handleSubmit = async () => {
  console.log(groupData);

  try {
    setLoading(true)
    const res = await createGroup(groupData);
   
    console.log(res);
    // await navigate('/GroupFeed')

  } catch (err) {
    console.error(err);
  }
  finally{
    setLoading(false)
    await navigate('/GroupFeed')
  }
};
// useEffect(() => {
//   if (user) {
//     setGroupData(prev => ({
//       ...prev,
//       owner: user.name,
//     }));
//   }
// }, [user]);



    return (
        <a href="#" className="hover-3d my-12 mx-2 cursor-pointer">
  
  {/* content */}
  <div className="card w-96 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
    <div className="card-body">
      <div className="flex justify-between mb-10">
        <div className="font-bold">Create Group</div>
        <div className="text-5xl opacity-10">❁</div>
      </div>
      <div className="text-lg mb-4 opacity-40"><label>group name   </label>
      <input type="text" name="name" value={groupData.name} placeholder="enter here" onChange={handleChange}/></div>
      <div className="flex justify-between">
        <div>
          <div className="text-xs opacity-20">GROUP MALIK</div>
          <div><span>{user.name}</span></div>
        </div>
        <div>
          
          <div>29/08</div>
        </div>
      </div>
    </div>
  </div>
  
  {/* 8 empty divs needed for the 3D effect */}
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div className=""><button className="btn btn-soft btn-secondary " disabled={loading} onClick={handleSubmit}>Create</button></div>
</a>
    )
}
export default CreateGroup
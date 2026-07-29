import { useState } from "react"
import { signup } from "../api/Auth"
import { useNavigate } from "react-router-dom"

const Signup=()=>{
    const [formData , setFormdata]=useState({
        name:'',
        email:'',
        password:''
    })
    const[loading,setLoading]=useState(false)


    const handleChange =(e)=>{
        setFormdata({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        const Navigate=useNavigate
        e.preventDefault()
        try {
            setLoading(true)
            signup(formData)
            Navigate('/login')
        } catch (error) {
            console.log('error while signup:',error.message)
        }
        finally{setLoading(false)
                setFormdata({
        name:'',
        email:'',
        password:''
    })
        }
    }
    return (
        
        <>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Signup</legend>
   <label className="label">Name</label>
  <input type="text" className="input" placeholder="Name" name="name" value={formData.name} onChange={handleChange}/>

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />

  <button className="btn btn-neutral mt-4" onClick={handleSubmit}  disabled={loading}>Login</button>
</fieldset>
        </>
    )
}
export default Signup
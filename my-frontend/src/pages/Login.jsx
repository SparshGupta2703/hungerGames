import { useState } from "react"
import { login } from "../api/Auth"
import { useAuthStore } from "../stores/AuthStore"


const Login=()=>{
    const {loginAuth} = useAuthStore()
    const [loading,setLoading]=useState(false)
    const [formData,setFormData]=useState({
        email:'',
        password:'',
    })

    const handleChange=(e)=>{
       setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const loginInfo=login(formData)
            loginAuth(loginInfo.user,loginInfo.token)
            
        }
        catch (error) {
            console.log('error while login:',error.message)  
            setFormData({
        email:'',
        password:'',
    })
        }
        finally{
            setLoading(false)


        }

    }
    return (
        <>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>

  <button className="btn btn-neutral mt-4" onClick={handleSubmit} disabled={loading}>Login</button>
</fieldset>
        </>
    )
}
export default Login
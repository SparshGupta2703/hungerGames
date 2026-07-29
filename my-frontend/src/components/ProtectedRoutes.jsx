import { Navigate } from "react-router-dom"
import { useAuthStore } from "../stores/AuthStore"

const ProtectedRoutes=({children})=>{
  const {token}=useAuthStore()
  if(!token){
    return<Navigate to='/login'/>
  }
  return children;
  
}
export default ProtectedRoutes 
import { Navigate } from "react-router-dom"
import { useAuthStore } from "../stores/AuthStore"

const PublicRoutes=({children})=>{
  const {token}=useAuthStore()
  if(token){
    return<Navigate to='/'/>
  }
  return children;
  
}
export default PublicRoutes 
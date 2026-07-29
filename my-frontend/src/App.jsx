import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import CreateGroup from "./pages/CreateGroup"
import JoinGroup from "./pages/JoinGroup"
import GroupFeed from "./pages/GroupFeed"
import ProtectedRoutes from "./components/ProtectedRoutes"
import PublicRoutes from "./components/PublicRoutes"


const App=()=>{
    return (
        <>
        <Routes>
            <Route  path="/landing" element={<PublicRoutes><Landing/></PublicRoutes>}/>
            <Route path="/" element={<Layout/>}>
                
                <Route path="/Home" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
                <Route path="/Signup" element={<PublicRoutes><Signup/></PublicRoutes>}/>
                <Route path="/Login" element={<PublicRoutes><Login/></PublicRoutes>}/>
                <Route path="/Profile" element={<ProtectedRoutes><Profile/></ProtectedRoutes>}/>
                <Route path="/CreateGroup" element={<ProtectedRoutes><CreateGroup/></ProtectedRoutes>}/>
                <Route path="/JoinGroup" element={<ProtectedRoutes><JoinGroup/></ProtectedRoutes>}/>
                <Route path="/GroupFeed" element={<ProtectedRoutes><GroupFeed/></ProtectedRoutes>}/>
              
               
            
            </Route>

        </Routes>
        </>
    )
}
export default App
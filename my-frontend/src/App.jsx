import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import MemeLibrary from "./pages/MemeLibrary"
import MemeToBeGen from "./pages/MemeToBeGen"
import MemeGenerated from "./pages/MemeGenerated"
import MyLibrary from "./pages/MyLibrary"

const App=()=>{
    return (
        <>
        <Routes>
            <Route path="/landing" element={<Landing/>}/>
            <Route path="/" element={<Layout/>}>
                
                <Route path="/Home" element={<Home/>}/>
                <Route path="/Signup" element={<Signup/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Profile" element={<Profile/>}/>
                <Route path="/MemeLibrary" element={<MemeLibrary/>}/>
                <Route path="/MemeToBeGen" element={<MemeToBeGen/>}/>
                <Route path="/MemeGenerated" element={<MemeGenerated/>}/>
                <Route path="/MyLibrary" element={<MyLibrary/>}/>
                {/* <Route path="/" element={<Layout/>}></Route> */}
            
            </Route>

        </Routes>
        </>
    )
}
export default App
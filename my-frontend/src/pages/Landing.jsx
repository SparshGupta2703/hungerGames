import { Link, } from 'react-router-dom'
const Landing=()=>{
    return (
        <>
        LAnding
                    <div className="hover-3d">
                    {/* content */}
                    <figure className="w-100% rounded-2xl">
                        <img src="https://img.daisyui.com/images/stock/creditcard.webp" alt="3D card" />
                    </figure>
                    {/* 8 empty divs needed for the 3D effect */}
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    </div>
         <Link to="/signup" className="btn btn-soft" >Signup</Link>
         <Link to="/login" className="btn btn-soft" >Login</Link>
       
        </>
    )
}
export default Landing

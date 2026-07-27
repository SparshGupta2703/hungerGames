const Profile=()=>{


    return (
        
        <div className="flex w-52 flex-col gap-4">
  <div className="flex items-center gap-4">
    <div className="skeleton h-16 w-16 shrink-0 rounded-full">
        <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" />
    </div>
    <div className="flex flex-col gap-4">
      <div className="skeleton h-4 w-20"><input type="text" className="input" placeholder="Name" name="name" /></div>
      <div className="skeleton h-4 w-28"><input type="text" className="input" placeholder="Name" name="name" /></div>
    </div>
  </div>
  <div className="skeleton h-32 w-full"><input type="text" className="input" placeholder="Name" name="name" /></div>
  <button className="btn btn-primary">Get Started</button>
</div>
      
       
    )
}
export default Profile
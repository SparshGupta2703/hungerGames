import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
   userDesc:{
        type: String,
        default:""
    },
    userImg:{
        type: String,
        default:"https://imgs.search.brave.com/f0wiRdzbNVwe-pIfn-yPNOWhxJ7nsBoDGUd9gNHh-2M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzI3LzQ1LzE3/LzM2MF9GXzYyNzQ1/MTc5MF84M2NJYk4y/U3l0RjIxMmI0VkFy/alJGaDZuVXd5WVpQ/Ty5qcGc"
    },
},{timestamps:true})

const User = mongoose.model('User',userSchema)

export default User;
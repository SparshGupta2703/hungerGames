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
    address:{
        type: String,
        default:""
    },
    businessName:{
        type: String,
        default:""
    },
    businessDesc:{
        type: String,
        default:""
    },
    logo:{
        type: String,
        default:""
    },
},{timestamps:true})

const User = mongoose.model('User',userSchema)

export default User;
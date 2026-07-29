
import mongoose from "mongoose";
const groupSchema=new mongoose.Schema({
     name:{
        type: String,
        required: true
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    invited: [{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
}],
    joinCode:{
        type:String,
        
    },
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   
}

},{timestamps:true})

const Group = mongoose.model('Group',groupSchema)
export default Group
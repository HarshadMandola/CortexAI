import mongoose from "mongoose"

const messageSchema=new mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        required:true
    },
    role:{
        type:String,
        enum:["user","assistant"]
    },
    content:String,
    images:[String],
    artifact:{
        title:String,
        language:String,
        code:String
    }
},
{timestamps:true})

const Message=mongoose.model("Message",messageSchema);
export default Message

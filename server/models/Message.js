import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    email :{type :String,required:true , unique : true},
     senderId :{type :mongoose.Schema.Types.ObjectId , ref :"User" ,required :true},
      receiverId :{type :mongoose.Schema.Types.ObjectId , ref :"User" ,required :true},
      text : {type : String},
      image : {type : String},
      seen : {type : Boolean , default : false}

    
},{timestamps : true});


const Message = mongoose.model("Message",messageSchema);
export default Message;
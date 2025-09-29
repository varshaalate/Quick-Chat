import { Message } from "../models/Message.js";
import { User } from "../models/User.js";

//get all users expect logged in user
export const geyUsersForSideBar = async (req, res) => {
  try {
    const userId = req.user._id;
    //$ne = not equal to
    //select("-password") = lt will remove password form data
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    //count no. messages not seen
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        sendweId: user._id,
        receiverId: userId,
        seen: false,
      });

      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    await Promise.all(promises);
    res.json({ success: true, users: filteredUsers, unseenMessages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}



//Get All messeges for  selected  user controller
export const getMessages = async (req,res) =>{
  try{
    const {id : selectedUserId} = req.params;
    const myId = req.User._id; 

    const messages = await Message.find({
      $or : [
        {senderId : myId , receiverId : selectedUserId},
        {senderId : selectedUserId , receiverId : myId}
      ]
    })

    //mark mesageg as read
    await Message.updateMany({senderId : selectedUserId , receiverId :myId}, {seen :true})

    res.json({success : true ,messages})
  }
  catch(error){
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}

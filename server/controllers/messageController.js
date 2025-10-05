import { Message } from "../models/Message.js";
import { User } from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io ,userSocketMap} from "../server.js";

//get all users expect logged in user
export const getUsersForSideBar = async (req, res) => {
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
};

//Get All messeges for  selected  user controller
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.User._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });

    //mark mesageg as read
    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true }
    );

    res.json({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//API to make mark meassage as seen using message id
export const markMessageAsSeen = async (req, res) => {
  try {
    const {id} = req.params;
    await Message.findByIdAndUpdate(id , {seen : true})
    res.json({success: true})
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


//send message to selected user
export const sendMessage =  async (req, res) =>{
  try{
    const {text , image} = req.body;

    const receiverId = req.params.id;
    const senderId = req.User._id

    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image : imageUrl
    })

    //emit the new meassage to the receiver socket
    const receiverSocketId = userSocketMap[receiverId];
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMeassage" , newMessage);
    }

    res.json({success : true , newMessage});
  }
  catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
}
import mongoose from "mongoose";

//function to crete DB
export const connectDB = async () =>{
    try{

        mongoose.connection.on("connected",
        ()=>console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}`)
    }catch(error){
        console.log(error)
    }
}
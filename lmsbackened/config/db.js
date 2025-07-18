const dotenv=require("dotenv")
const mongoose=require("mongoose")
dotenv.config()
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connection established")
    }
    catch(err){
        console.log("MongoDB connection failed")
    }

}
module.exports=connectDb
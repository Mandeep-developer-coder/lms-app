const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    _id:String,
    userName:{
        type:String,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
   
    semester:{
        type:String,
        required:true
    },
     rollNumber:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }},{timestamps:true}


)
module.exports=mongoose.model("user",userSchema)
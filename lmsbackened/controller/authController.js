const User=require("../model/user")
const bcrypt=require("bcrypt")
const generateToken=require("../utils/generateToken")

//signup

exports.signup = async(req,res)=>{
    const {userName,fatherName,email,address,batch,course,semester,rollNumber,number,password}=req.body
    try{
        const firstName=userName.trim().split(" ")[0].toLowerCase()
        const customId=`${rollNumber}.${firstName}`
        const exist=await User.findById(customId)
        if(exist){
            return res.status(400).json({message:"User already exist",success:false})
        }
        const hashPassword=await bcrypt.hash(password,10)
        const user=new User({_id:customId,userName,fatherName,email,address,batch,course,semester,rollNumber,number,password:hashPassword})
        await user.save()
        res.status(201).json({message:"Signup successful",token:generateToken(user),user:{ id: user._id,
    userName: user.userName,
    email: user.email,
    course: user.course,
    semester: user.semester,
    role: user.role},success:true})
    }
    catch(err){
        if(err.code==11000){
            const duplicateField=Object.keys(err.keyPattern)[0];
             return res.status(400).json({
        message: `User already exists with this ${duplicateField}`,
        success: false
      });
        }
         res.status(500).json({ message: "Server error",  error: err.message,success:false });
    }
   
}

//login


exports.login = async (req, res) => {
  try {
    const { id, email, password } = req.body;

   
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User  not found",
        success: false,
      });
    }


    if (user.email !== email) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

   
    return res.status(200).json({
      message: "Login Successfully",
      token: generateToken(user),
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        course: user.course,
        semester: user.semester,
        role: user.role,
      },
      success: true,
    });

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
// protect student pannel
// exports.studentPage = (req, res) => {
//   res.sendStatus(200); 
// };
// protect admin 
// exports.adminDashboard = (req, res) => {
//   res.sendStatus(200); 
// };

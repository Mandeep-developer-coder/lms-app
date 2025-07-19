const User=require("../model/User")
const bcrypt=require("bcrypt")
const generateToken=require("../utils/generateToken")
const Otp = require("../model/Otp");
const sendOtp = require("../utils/sendMail");

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

    // Special hardcoded check for admin
    if (
      id === process.env.ADMIN_ID &&
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const adminUser = await User.findById(id);

      if (!adminUser) {
        return res.status(404).json({
          message: "Admin user not found in database",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Admin login successful",
        token: generateToken(adminUser),
        user: {
          id: adminUser._id,
          userName: adminUser.userName,
          email: adminUser.email,
          role: adminUser.role,
        },
        success: true,
      });
    }

    // Otherwise, normal user login
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
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
      message: "Login successful",
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

//verify email
exports.verifyEmail = async(req,res)=>
{
  try{
const {email} = req.body;
const exist = await User.findOne({email});
if(!exist)
{
  return res.status(404).json({message:"User not found"});
}
const otp = Math.floor(100000 + Math.random()*900000).toString();
await  new Otp({email , otp , createdAt: new Date() }).save();
await sendOtp(email , otp);
return res.status(200).json({message:"Otp send to mail"})
}
  catch(error)
  {
 console.error(error.message);
 res.status(500).json({ message: "Failed to send OTP" , error: error.message,});

  }
}

//verify otp

exports.verifyOtp = async(req,res)=>
{
   try {
    const { email, otp } = req.body;
    const validOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!validOtp) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    if (String(validOtp.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verify error:", error);
    res.status(500).json({ message: "Error verifying OTP" , error: error.message});
  }
}

//Reset password

exports.resetPassword = async(req,res)=>
{
 try
  {
  const {email , newPassword} = req.body;
  const hashPassword = await bcrypt.hash(newPassword,10);
const updated = await User.findOneAndUpdate({ email }, { password: hashPassword });
if (!updated) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ message: "Password reset successful" });
  }
  catch(error)
  {
    res.status(500).json({ message: "Failed to reset password" });
  }

}
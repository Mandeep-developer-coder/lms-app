const jwt=require("jsonwebtoken")
const verifyToken=(req,res,next)=>{
    try{
    const authHeader=req.headers["authorization"];
    if(!authHeader || !authHeader.startsWith("Bearer ")){
  return res.status(401).json({ message: "Unauthorized: Token not provided" });
    }
    const token=authHeader.split(" ")[1]
    if(!token){
 return res.status(401).json({ message: "Unauthorized: Token missing" });
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decode;
    next()}
    catch(err){
   res.status(403).json({ message: "Invalid token" });
    }

}
module.exports=verifyToken
const jwt= require("jsonwebtoken");
jwtkay="dtdtdtdtdtdtdtdtdtdt";
module.exports=(req,res,next)=>{

   try {    const token =req.headers.authorization.split(' ')[1];
   const decode =jwt.verify(token,jwtkay)
   req.userData = decode
  //return res.json(decode);
  next(); }
   catch(error){
res.json({success:false, message:"Auth Faild"})
   }
};
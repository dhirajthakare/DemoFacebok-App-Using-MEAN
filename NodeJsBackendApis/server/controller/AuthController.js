
// All modal imported
var usermodal = require('../model/users');
var commanService = require("../services/CommanService");
var createAccvalid = require("../validation/CreateAccontValidaton");


const crypto = require("crypto");
const key = "password";
const algo = "aes256";

// Create Account 
exports.createAcc = async (req,res)=>{
     
    try{
        createAccvalid.AccontValid(req.body);
        useravailable  = await usermodal.findOne({email:req.body.email});
        if(!useravailable){
            cipher = crypto.createCipher(algo,key);
        const encryptedPass = cipher.update(req.body.password,'utf8','hex')+cipher.final('hex');
    
        const send  = await new usermodal({
        name:req.body.fname+'  '+req.body.lname,
        email:req.body.email,
        password:encryptedPass,
        birthOfDate:req.body.birthOfDate,
        gender:req.body.gender,
        profileUrl:req.body.profileUrl,
        userToken:req.body.fname +'.'+req.body.lname+commanService.randomNum(100000, 999999),
        
        }).save();
        if(send){
            res.json("Account Created Successfully");
        }else{
            res.status.json("Something wrong while Create Account");
        }
        }else{
            res.status(400).json("User Already Avilable ");
        }
    }
    catch(err){
        res.status(400).json(err);
        // console.log(err);
    }
}


// Updated Account 
exports.updateAccount =(req,res)=>{
    var file = req.file;
    var filename;
    if(file){
        filename = "/assets/profileupload/"+file.filename;
    }
    
    
    usermodal.updateOne({_id:req.params.id} , {$set:{
        name:req.body.fname+"  "+req.body.lname,
        birthOfDate:req.body.birthOfDate,
        profileUrl:filename,
        gender: req.body.gender

    }} ).then(responce=>{
        usermodal.findOne({_id:req.params.id}).then(data=>{
            res.json(data);
        })
    }).catch(err=>{
        res.status(400).json("Somthing Wrong Please try Again "+err);
    })

   }



   //Login Account 
exports.loginUser = (req,res)=>{
     
   usermodal.findOne({email:req.body.email}).then((responce)=>{

         decipher = crypto.createDecipher(algo,key);
         decryptedPass = decipher.update(responce.password,'hex','utf8')+decipher.final('utf8');
        
        if(decryptedPass == req.body.password){
            res.json(responce);
        }else{
            res.status(400).json("Password Is Invalid Please Try Agin");
        }
        // res.json(responce);

   }).catch(err=>{
       res.status(400).json("Username Is Invalid ");
   })
}


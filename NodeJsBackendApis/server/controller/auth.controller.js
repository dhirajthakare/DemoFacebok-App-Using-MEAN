
// All modal imported
var userModel = require('../model/users');
var commandService = require("../services/common.Service");
var accountValidation = require("../validation/create-account-validator");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = "dtdtdtdtdtdtdtdtdtdt";


// Create Account 
exports.createAcc = async (req,res)=>{
     
    try{
        accountValidation.accountValidation(req.body);
        userAvailable  = await userModel.findOne({email:req.body.email});
        if(!userAvailable){
        let salt = await bcrypt.genSalt(10);
        hashPassword = await bcrypt.hash(req.body.password,salt);
    
        const send  = await new userModel({
        name:req.body.fname+'  '+req.body.lname,
        email:req.body.email,
        password:hashPassword,
        birthOfDate:req.body.birthOfDate,
        gender:req.body.gender,
        profileUrl:req.body.profileUrl,
        userToken:req.body.fname +'.'+req.body.lname+commandService.randomNum(100000, 999999),
        
        }).save();
        if(send){
            res.json("Account Created Successfully");
        }else{
            res.status.json("Something wrong while Create Account");
        }
        }else{
            res.status(400).json("User Already Available ");
        }
    }
    catch(err){
        res.status(400).json(err);
        // console.log(err);
    }
}


// Updated Account 
exports.updateAccount = async (req,res)=>{
    try{
        var file = req.file;
        var filename;
        if(file){
            filename = "/assets/profileUpload/"+file.filename;
        }
        
        
          var updatedAcc = await userModel.updateOne({_id:req.params.id} , {$set:{
            name:req.body.fname+"  "+req.body.lname,
            birthOfDate:req.body.birthOfDate,
            profileUrl:filename,
            gender: req.body.gender
    
        }} );
    
        if(updatedAcc){
            var data = await userModel.findOne({ _id:req.params.id })
            res.json(data);
        }
    }
    catch(err){
        res.status(400).json(err);

    }

   }



   //Login Account 
exports.loginUser = async (req,res)=>{
     
    try{
        var data = await userModel.findOne({email:req.body.email});

        if(data){

         if(await bcrypt.compare(req.body.password,data.password)){
            
            let payload = {
                "userToken":data.userToken,
                "_id":data._id
            }
            let jwtToken = jwt.sign(payload,jwtKey,{expiresIn:'48h'});

            res.json(jwtToken);

            // res.json(data);
        }else{
            throw " Password Is Invalid Please Try Agin ";
        }
        }else{
            throw " Username Is Invalid ";
        }
 
    }
    catch(err){
        res.status(400).json(err);
    }

   
}

exports.getUserProfile =  async (req,res)=>{
    const userData = req.userData;
    userModel.findOne({userToken:userData.userToken}). then(response=>{
        userModel.findOne({userToken:response.userToken}).populate({path:"user_info" }).populate({path:"user_Friends" ,match:{user_id:response._id ,friendStatus:'Accepted'}, populate:([{path:"friend_id"},{path:"user_id"}]) }).populate({path:"user_post" , populate:([{path:"getlikes" , match:{likeStatus:"like"}, populate:([{path:"user_id"},{path:"userclick_id"}]) },{path:"postcomment" ,populate:([{path:"usercomment_id"}])}]) }). then(response1=>{
            res.json(response1);
        }).catch(err=>{
            res.status(400).json(" something wrong "+err);
        })
    }).catch(err=>{
        res.status(400).json(" something wrong "+err);
    })

}


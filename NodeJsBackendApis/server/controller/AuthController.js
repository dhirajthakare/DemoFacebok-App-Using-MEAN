
// All modal imported
var usermodal = require('../model/users');
var commanService = require("../services/CommanService");
var createAccvalid = require("../validation/CreateAccontValidaton");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = "dtdtdtdtdtdtdtdtdtdt";


// Create Account 
exports.createAcc = async (req,res)=>{
     
    try{
        createAccvalid.AccontValid(req.body);
        useravailable  = await usermodal.findOne({email:req.body.email});
        if(!useravailable){
        let salt = await bcrypt.genSalt(10);
        hashpassword = await bcrypt.hash(req.body.password,salt);
    
        const send  = await new usermodal({
        name:req.body.fname+'  '+req.body.lname,
        email:req.body.email,
        password:hashpassword,
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
exports.updateAccount = async (req,res)=>{
    try{
        var file = req.file;
        var filename;
        if(file){
            filename = "/assets/profileupload/"+file.filename;
        }
        
        
          var updatedAcc = await usermodal.updateOne({_id:req.params.id} , {$set:{
            name:req.body.fname+"  "+req.body.lname,
            birthOfDate:req.body.birthOfDate,
            profileUrl:filename,
            gender: req.body.gender
    
        }} );
    
        if(updatedAcc){
            var data = await usermodal.findOne({ _id:req.params.id })
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
        var data = await usermodal.findOne({email:req.body.email});

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
    usermodal.findOne({userToken:userData.userToken}). then(responce=>{
        usermodal.findOne({userToken:responce.userToken}).populate({path:"user_info" }).populate({path:"user_Friends" ,match:{user_id:responce._id ,friendStatus:'Accepted'}, populate:([{path:"friend_id"},{path:"user_id"}]) }).populate({path:"user_post" , populate:([{path:"getlikes" , match:{likeStatus:"like"}, populate:([{path:"user_id"},{path:"userclick_id"}]) },{path:"postcomment" ,populate:([{path:"usercomment_id"}])}]) }). then(responce1=>{
            res.json(responce1);
        }).catch(err=>{
            res.status(400).json(" somthing wrong "+err);
        })
    }).catch(err=>{
        res.status(400).json(" somthing wrong "+err);
    })

}


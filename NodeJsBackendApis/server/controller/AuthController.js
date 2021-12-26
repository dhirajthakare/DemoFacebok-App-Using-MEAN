
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

         decipher = crypto.createDecipher(algo,key);
         decryptedPass = decipher.update(data.password,'hex','utf8')+decipher.final('utf8');
         if(decryptedPass == req.body.password){
            res.json(data);
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





// All modal imported
var userModel = require('../model/users');
var userInfoModal = require('../model/user-information');
var postModal = require("../model/post-photos");

const userInformationModel = require('../model/user-information');

// Add User More Information  Information
exports.addUserInfo = (req,res)=>{

    var file = req.file;
    var filename;
    if(file){
        filename = "/assets/profileCoverStorage/"+file.filename;
    }
    // console.log(req.body.user_id);
    userInformationModel.findOne({user:req.body.user_id}).then(resInfo=>{
        if(resInfo){

            userInfoModal.updateOne({user:req.body.user_id},{$set:{
                workplace:req.body.workplace,
                highSchool:req.body.highSchool,
                university:req.body.university,
                currentCity:req.body.currentCity,
                homeTown:req.body.homeTown,
                CoverPhoto:filename,
                relation:req.body.relation,
                website:req.body.website,
                Sociallinks:req.body.Sociallinks,
                user : req.body.user_id
            }}).then(updateRes=>{
                res.json("Profile Information Updated Successfully ");
            }).catch(err=>{
                res.status(400).json("something Wrong While Update Information ")
            })

        }else{
            userinfo = new userInfoModal({
                workplace:req.body.workplace,
                highSchool:req.body.highSchool,
                university:req.body.university,
                currentCity:req.body.currentCity,
                homeTown:req.body.homeTown,
                CoverPhoto:filename,
                relation:req.body.relation,
                website:req.body.website,
                Sociallinks:req.body.Sociallinks,
                user : req.body.user_id
    
            });
    
            userinfo.save().then((data)=>{
    
                userModel.updateOne({_id:req.body.user_id},{
                    $set:{
                        user_info:data._id
                    }
                }).then(updateRes=>{
                    res.json("Information Added Successfully");
                })
    
            }).catch(err=>{
                res.json("something problem with Information "+err);
            })
    
        }
    })

      
}

// get Current  User
exports.getCurrentUser =(req,res)=>{

    userModel.findOne({userToken:req.params.token}). then(response=>{
        userModel.findOne({userToken:response.userToken}).populate({path:"user_info" }).populate({path:"user_Friends" ,match:{user_id:response._id ,friendStatus:'Accepted'}, populate:([{path:"friend_id"},{path:"user_id"}]) }).populate({path:"user_post" , populate:([{path:"getLikes" , match:{likeStatus:"like"}, populate:([{path:"user_id"},{path:"userClickId"}]) },{path:"postComments" ,populate:([{path:"user_commented_id"}])}]) }). then(response1=>{
            res.json(response1);
        }).catch(err=>{
            res.status(400).json(" something wrong "+err);
        })
    }).catch(err=>{
        res.status(400).json(" something wrong "+err);
    })

}


//get Current login  User Post
exports.getCurrentUserPost =(req,res)=>{
    postModal.find({postUser:req.params.cid}).sort({createdAt:-1}).populate([{path:"postUser"},{path:"getLikes" , match:{likeStatus:"like"}, populate:([{path:"userClickId"}]) },{path:"postComments" , populate:("user_commented_id")}]).then(response=>{
        res.json(response);
    }).catch(err=>{
        res.json("something wrong "+err);
    })
}

exports.findAllUsers = (req,res)=>{

    userModel.find().populate(
        { path:"user_post" , populate :[
            { path:"getLikes" ,populate:[
                {path:"userClickId"},{path:"user_id"}
            ] },
            
            {path:"postComments"}
            
        ]}) .then(response=>{
        res.json(response);
    }).catch(err=>{
        res.status(400).send(err);
    })
}

exports.allUserinfo = (req,res)=>{
    userInformationModel.find().populate("user").then(response=>{
        res.json(response);
    })
}
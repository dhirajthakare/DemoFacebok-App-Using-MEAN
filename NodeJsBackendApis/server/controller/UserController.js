


// All modal imported
var usermodal = require('../model/users');
var userInfoModal = require('../model/userinformations');
var postModal = require("../model/post_photos");

const userinformations = require('../model/userinformations');

// Add User More Information  Information
exports.addUserInfo = (req,res)=>{

    var file = req.file;
    var filename;
    if(file){
        filename = "/assets/profileCoverStorage/"+file.filename;
    }
    // console.log(req.body.user_id);
    userinformations.findOne({user:req.body.user_id}).then(resinfo=>{
        if(resinfo){

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
            }}).then(updsteres=>{
                res.json("Profile Information Updated Successfully ");
            }).catch(err=>{
                res.status(400).json("somthing Wrong While Update Information ")
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
    
                usermodal.updateOne({_id:req.body.user_id},{
                    $set:{
                        user_info:data._id
                    }
                }).then(updateres=>{
                    res.json("Information Added Successfully");
                })
    
            }).catch(err=>{
                res.json("somthing problem with Information "+err);
            })
    
        }
    })

      
}

// get Current  User
exports.getCurrentUser =(req,res)=>{

    usermodal.findOne({userToken:req.params.token}). then(responce=>{
        usermodal.findOne({userToken:responce.userToken}).populate({path:"user_info" }).populate({path:"user_Friends" ,match:{user_id:responce._id ,friendStatus:'Accepted'}, populate:([{path:"friend_id"},{path:"user_id"}]) }).populate({path:"user_post" , populate:([{path:"getlikes" , match:{likeStatus:"like"}, populate:([{path:"user_id"},{path:"userclick_id"}]) },{path:"postcomment" ,populate:([{path:"usercomment_id"}])}]) }). then(responce1=>{
            res.json(responce1);
        }).catch(err=>{
            res.status(400).json(" somthing wrong "+err);
        })
    }).catch(err=>{
        res.status(400).json(" somthing wrong "+err);
    })

}


//get Current login  User Post
exports.getCurrentUserPost =(req,res)=>{
    postModal.find({postUser:req.params.cid}).sort({createdAt:-1}).populate([{path:"postUser"},{path:"getlikes" , match:{likeStatus:"like"}, populate:([{path:"userclick_id"}]) },{path:"postcomment" , populate:("usercomment_id")}]).then(responce=>{
        res.json(responce);
    }).catch(err=>{
        res.json("somthing wrong "+err);
    })
}

exports.findAllUsers = (req,res)=>{

    usermodal.find().populate(
        { path:"user_post" , populate :[
            { path:"getlikes" ,populate:[
                {path:"userclick_id"},{path:"user_id"}
            ] },
            
            {path:"postcomment"}
            
        ]}) .then(responce=>{
        res.json(responce);
    }).catch(err=>{
        res.status(400).send(err);
    })
}

exports.alluserinfo = (req,res)=>{
    userinformations.find().populate("user").then(responce=>{
        res.json(responce);
    })
}
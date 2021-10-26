
// All modal imported
var usermodal = require('../model/users');
var userInfoModal = require('../model/userinformations');
var postModal = require("../model/post_photos");
var likeModal = require('../model/likes');
var commentModal = require('../model/comments');
var storyModal = require('../model/stories');
var friendsModal = require('../model/friends_users');
var MessangerModal = require('../model/messnger');




const crypto = require("crypto");
const jwtToken = require("jsonwebtoken");
const { rmdirSync } = require('fs');
const userinformations = require('../model/userinformations');
const { model } = require('mongoose');
const { populate } = require('../model/users');
const { json } = require('body-parser');
const { send } = require('process');
const messnger = require('../model/messnger');
const path = require('path');
const key = "password";
const algo = "aes256";


// welcome api
exports.home = (req,res)=>{
    res.send("hello bro");
}


// Create Account 
exports.createAcc = (req,res)=>{
     
    cipher = crypto.createCipher(algo,key);
    const encryptedPass = cipher.update(req.body.password,'utf8','hex')+cipher.final('hex');

    const send  = new usermodal({
    name:req.body.fname+'  '+req.body.lname,
    email:req.body.email,
    password:encryptedPass,
    birthOfDate:req.body.birthOfDate,
    gender:req.body.gender,
    profileUrl:req.body.profileUrl,
    userToken:req.body.fname +'.'+req.body.lname+randomNum(100000, 999999),
    
    });
    send.save(). then((responce)=>{
        res.json("Data Inserted Successfully");
     }).catch((err)=>{
         res.status(400).json("Somthing Wrong Please try Again"+err);
     })
}


// Updated Account 
exports.updateAccount =(req,res)=>{
    const file = req.file;
    
    if(!file){
        const error = new error('no file')
        error.httpStatusCode=400
        return next(error)
    }
    
    
    usermodal.updateOne({_id:req.params.id} , {$set:{
        name:req.body.fname+"  "+req.body.lname,
        birthOfDate:req.body.birthOfDate,
        profileUrl: "/assets/profileupload/"+file.filename,
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


//create Post 
exports.createPost = (req,res)=>{
    var file = req.file

    var send = new postModal({
        status:req.body.status,
        postUrl:"/assets/postStorage/"+file.filename,
        postUser:req.body.user_id
    });

    send.save().then(responce=>{
        usermodal.update({_id:req.body.user_id},{$push:{
            user_post:responce._id
        }}).then(userres => {
            res.json("Post Created  Successfully")
        }).catch(err=>{
            res.json("somthing wrong while update User Post");
        })
    }).catch(err=>{
        res.status(400).json(err+"Post Updated Failed ");
    })
}

//Update Post
exports.updatePost= (req,res)=>{

    var file = req.file;

    postModal.updateOne({_id:req.body.id} , {$set:{
        status:req.body.status,
        postUrl:"/assets/postStorage/"+file.filename,
    }}).then(responce=>{
        res.json(" Post Updated Successfully ");
    }).catch(err=>{
        res.status(400).json(" Post Updation Failed ");
    })
}


//Get Posts
exports.getPost = (req ,res)=>{
    postModal.find().sort({createdAt:-1}).populate([{path:"postUser"},
    {path:"getlikes" , match:{likeStatus:"like"} ,populate:([{path:"userclick_id"}]) },
    {path:"postcomment",populate:("usercomment_id")}]).then(responce=>{
        res.json(responce);
    }).catch(err=>{
        res.status(400).json("somthing wrong");
    })
}


//Delete Posts
exports.deletePost = (req,res)=>{
    postModal.deleteOne({_id:req.params.id}).then(responce=>{
        res.json("deleted successfuly ");
    }).catch(err=>{
        res.status(400).json("Somthing Wrong Please try again "+err);
    })
}




//search Post
exports.searchPost = (req,res)=>{

    regex = new RegExp(req.params.search , 'i');
    postModal.find({ $or:[{status:regex}] }).populate('postUser') .then(responce=>{
        res.json(responce);
    }).catch(err=>{
        res.status(400).json(" not found ");
    });


}


//like and dislike

exports.like = (req,res)=>{

    likeModal.findOne({post_photo_id:req.body.post_photo_id ,user_id:req.body.user_id,userclick_id:req.body.userclick_id }). then(checklike=>{
        if(checklike){

            if(checklike.likeStatus == "like"){

                likeModal.updateOne({post_photo_id:req.body.post_photo_id ,user_id:req.body.user_id,userclick_id:req.body.userclick_id },{$set:{
                    likeStatus:'unlike'
                }}).then(updatelike=>{
                    postModal.updateOne({_id:req.body.post_photo_id},{$inc:{
                        likeCounts:-1
                    }}).then(responce=>{
                        res.json("update to unlike");
                    }).catch(err =>{
                        res.status(400).json("error comes while update like count");
                    })
                    
                }).catch(err=>{
                    res.status(400).json("error come while remove like ");
                })

            }else if(checklike.likeStatus == "unlike"){
                likeModal.updateOne({post_photo_id:req.body.post_photo_id ,user_id:req.body.user_id,userclick_id:req.body.userclick_id },{$set:{
                    likeStatus:'like'
                }}).then(updatelike=>{
                    postModal.updateOne({_id:req.body.post_photo_id},{$inc:{
                        likeCounts:1
                    }}).then(responce=>{
                        res.json("update to like");
                    }).catch(err =>{
                        res.status(400).json("error comes while update like count");
                    })
                }).catch(err=>{
                    res.status(400).json("error come while add like ");
                })

            }else {
                res.status(400).json("Somthing Wrong")
            }

        }else{

            var send  = new likeModal({
                likeStatus:'like',
                post_photo_id:req.body.post_photo_id,
                user_id:req.body.user_id,
                userclick_id:req.body.userclick_id
        
            })
        
            send.save().then(responce=>{

                postModal.updateOne({_id:req.body.post_photo_id},{ $push:{
                    getlikes:responce._id
                } ,$inc:{
                    likeCounts:1
                }} ).then(like=>{
                    res.json("Creted like ");
                }).catch(err=>{
                    res.status(400).json("Somthing Wrong While Update Post Like");
                })
                
            }).catch(err=>{
                res.status(400).json("somthing wrong Please try Again");
            })

        }

    }).catch(err=>{
        res.status(400).json("wrong data ");
    })


}

// create Comments
exports.createComment = (req,res)=>{

    var send  = new commentModal({
        comment:req.body.comment,
        post_photo_id:req.body.post_photo_id,
        user_id:req.body.user_id,
        usercomment_id:req.body.usercomment_id

    })

    send.save().then(responce=>{

        postModal.updateOne({_id:req.body.post_photo_id},{$push:{
            postcomment:responce._id
        },$inc:{
            commentCounts:1
        }}).then(Comment=>{
            res.json(" Comment Added Successfully ");
        }).catch(err=>{
            res.status(400).json("Somthing Wrong While Update Post Like");
        })
    }).catch(err=>{
        res.status(400).json("somthing wrong Please try Again");
    })
}


//deleteComments
exports.deleteComment =(req , res)=>{

    commentModal.deleteOne({_id:req.params.cid}).then(responce=>{
        postModal.updateOne({_id:req.params.pid},{$inc:{
            commentCounts:-1
        }}).then(responce=>{
            res.json("Deleted Comment")
        }).catch(err =>{
            res.status(400).json("error comes while update comment count");
        })
    }).catch(err=>{
        res.status(400).json("Somthing wrong while delete Comment");
    })

}


// create Sories 
exports.createstory = (req,res)=>{
    
    var file = req.file;
    var send  = new storyModal({
        storyText:req.body.status,
        user_id:req.body.user_id,
        storyUrl:"/storyStorage/"+file.filename

    })

    send.save().then(responce=>{

        usermodal.updateOne({_id:req.body.user_id},{$push:{
            user_stories:responce._id
        }}).then(userstory=>{
            res.json("Story Updated Successfully");

        }).catch(err=>{
            res.status(400).json("Somthing Wrong While Update Post Like");
        })
    }).catch(err=>{
        res.status(400).json("Story Updated Faild "+err);
    })
}


// get stories
exports.getStory = (req,res)=>{

    storyModal.find({createdAt:{$gt:new Date(Date.now() - 24*60*60 * 1000)}}).then(responce1=>{
        
        storyModal.find({user_id:req.params.id ,createdAt:{$gt:new Date(Date.now() - 24*60*60 * 1000)}}).populate('user_id') .then(responce2 =>{

            storyModal.find({user_id:req.body}).then(responce3=>{
                res.json(Array({"allStories":responce1},{"userstories":responce2},{"userFriendStories":responce3}));

            })
        })
    })
    
}



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


// Add friends 
exports.addFriend = (req,res)=>{

friendsModal.findOne({user_id:req.params.uid,friend_id:req.params.fid,friendStatus:'Pending'}).then(responce=>{
    if(responce){
        res.json(" AllReady send request  ");
    }else{
        // res.json("worng")
        var send = new friendsModal({
            user_id :req.params.uid,
            friend_id:req.params.fid,
            friendStatus:"Pending"
        })

        send.save().then(reqSend=>{
            
            usermodal.updateMany({$or:[{_id:req.params.uid},{_id:req.params.fid}]},{$push:{
                user_Friends : reqSend._id
            }}).then(updateuser=>{
                res.json(" request send successfully ");
            }).catch(err=>{
                res.status(400).json(" Somthing wrong while update friends "+err);
            })
        }).catch(err=>{
            res.status(400).json(" Somthing wrong while send request "+err);
        })
    }
}).catch(err=>{
    res.status(400).json(" Somthing wrong while fetch request "+err);
})
}


//Accept Friend Request
exports.acceptFriendRequest = (req,res)=>{

     var finduser = friendsModal.findOne({user_id:req.params.uid,friend_id:req.params.fid , friendStatus:'Accepted'}).then(responce=>{
            // res.json(responce);

            if(responce){
                friendsModal.deleteOne({user_id:req.params.uid,friend_id:req.params.fid , $or:[{friendStatus:'Pending'},{friendStatus:'Rejected'}]}).then(responce1=>{
                    res.json("You are Already Friend ");
                })
            }else{

                var send = new friendsModal({
                    user_id:req.params.uid,
                    friend_id:req.params.fid,
                    friendStatus:"Accepted"
                })

                send.save().then(createdfriend=>{
                    usermodal.updateMany({$or:[{_id:req.params.fid},{_id:req.params.uid}]},{$push:{
                        user_Friends:createdfriend._id
                    }}).then(updateuser=>{

                    })

                friendsModal.updateOne({user_id:req.params.fid,friend_id:req.params.uid},{$set:{
                    friendStatus:'Accepted'
                }}).then(updatefriend=>{
                    res.json("request confirmed");
                }).catch(err=>{
                    res.status(400).json("some thing wrong while accept request from both end "+err);
                })
                }).catch(err=>{
                    res.status(400).json("some thing wrong while create request  "+err);
                })
                
            }
     }).catch(err=>{
        res.status(400).json("some thing wrong  "+err);
     })

}


//reject Friend Request  
exports.rejectRequest = (req,res)=>{
    console.log(req.params.uid);
    console.log(req.params.fid);

    friendsModal.deleteMany({user_id:req.params.fid,friend_id:req.params.uid}).then(responce=>{
        res.json("request Rejected");
    }).catch(err=>{
        res.status(400).json("Somthing wrong while request Rejected "+err);
    })
}


// Remove friend 
exports.unFriend = (req,res)=>{

    friendsModal.deleteMany({$or:[{user_id:req.params.fid,friend_id:req.params.uid},{user_id:req.params.uid,friend_id:req.params.fid}]}).then(responce=>{
        res.json("Successfully Remove From Your Friend List");
    }).catch(err=>{
        res.status(400).json("Some thing wrong while remove from Your friend List "+err);
    })
}


// Search Friends 
exports.findFriends =(req,res)=>{
    regext = new RegExp(req.params.name,'i');
    usermodal.find({$or:[{name:regext},{email:regext}]}).then(responce=>{
        res.json(responce);
    }).catch(err=>{
        res.status(400).json("somthing wrong "+err);
    })
}

// All friends of visited user
exports.allfriends = (req,res)=>{
    
    usermodal.findOne({_id:req.params.id}).populate([{path:"user_info"}]).populate({path:"user_Friends",match:{user_id:req.params.id ,friendStatus:"Accepted"} , populate:([{path:"friend_id"} , {path:'user_id'}]) }).then(responce=>{
        res.json(responce);
    }).catch(err=>{
        res.status(400).json("Somthing wrong ")
    })
}
exports.allRequest = (req,res)=>{

    usermodal.findOne({_id:req.params.id}).populate("user_info").populate({path:"user_Friends",match:{friend_id:req.params.id , friendStatus:"Pending"} , populate:([{path:"user_id"},{path:"friend_id"}]) }).then(responce=>{
        res.json(responce);
    }).catch(err=>{
        res.status(400).json("Somthing wrong ")
    })
}


// all login  user friends Posts 
exports.allFriendsPosts = (req,res)=>{
    postModal.find({postUser:req.body}).populate([{path:"postUser"},{path:"getlikes" , match:{likeStatus:"like"}, populate:([{path:"userclick_id"}]) },{path:"postcomment",populate:("usercomment_id") }]).sort({createdAt:-1}).then(responce=>{
        res.json(responce);
    })
}


//send message
exports.sendmsg = (req,res)=>{
//  console.log(req.body);
    var send = new messnger({
        message:req.body.message,
        sender_id:req.body.sender_id,
        receiver_id:req.body.receiver_id

    });
    send.save().then(responce=>{
        res.json("Successfuly sended message");
    }).catch(err=>{
        res.status(400).json("Somthing wrong Please try again");
    })
    
}



//get messages
exports.getusermessage = (req,res)=>{  

MessangerModal.find({$or:[{sender_id:req.params.fid,receiver_id:req.params.uid},{sender_id:req.params.uid,receiver_id:req.params.fid }]}).then(responce=>{
    
    res.json(responce);
}).catch(err=>{
    res.json("Somthing wrong "+err);
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


// randomFunction 
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
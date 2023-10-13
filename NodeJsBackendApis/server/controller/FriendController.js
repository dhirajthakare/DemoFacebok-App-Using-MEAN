// All modal imported
var userModel = require('../model/users');
var postModal = require("../model/post_photos");
var friendsModal = require('../model/friends_users');


// Add friends 
exports.addFriend = (req,res)=>{

    friendsModal.findOne({user_id:req.params.uid,friend_id:req.params.fid,friendStatus:'Pending'}).then(responce=>{
        if(responce){
            res.json(" Already send request  ");
        }else{
            // res.json("wrong")
            var send = new friendsModal({
                user_id :req.params.uid,
                friend_id:req.params.fid,
                friendStatus:"Pending"
            })
    
            send.save().then(reqSend=>{
                
                userModel.updateMany({$or:[{_id:req.params.uid},{_id:req.params.fid}]},{$push:{
                    user_Friends : reqSend._id
                }}).then(updateUser=>{
                    res.json(" Request send successfully ");
                }).catch(err=>{
                    res.status(400).json(" Something wrong while update friends "+err);
                })
            }).catch(err=>{
                res.status(400).json(" Something wrong while send request "+err);
            })
        }
    }).catch(err=>{
        res.status(400).json(" Something wrong while fetch request "+err);
    })
    }
    
    
    //Accept Friend Request
    exports.acceptFriendRequest = (req,res)=>{
    
         var finduser = friendsModal.findOne({user_id:req.params.uid,friend_id:req.params.fid , friendStatus:'Accepted'}).then(response=>{
                // res.json(response);
    
                if(response){
                    friendsModal.deleteOne({user_id:req.params.uid,friend_id:req.params.fid , $or:[{friendStatus:'Pending'},{friendStatus:'Rejected'}]}).then(response1=>{
                        res.json("You are Already Friend ");
                    })
                }else{
    
                    var send = new friendsModal({
                        user_id:req.params.uid,
                        friend_id:req.params.fid,
                        friendStatus:"Accepted"
                    })
    
                    send.save().then(createdFriend=>{
                        userModel.updateMany({$or:[{_id:req.params.fid},{_id:req.params.uid}]},{$push:{
                            user_Friends:createdFriend._id
                        }}).then(updateUser=>{
    
                        })
    
                    friendsModal.updateOne({user_id:req.params.fid,friend_id:req.params.uid},{$set:{
                        friendStatus:'Accepted'
                    }}).then(updateFriend=>{
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
    
        friendsModal.deleteMany({user_id:req.params.fid,friend_id:req.params.uid}).then(response=>{
            res.json("request Rejected");
        }).catch(err=>{
            res.status(400).json("Something wrong while request Rejected "+err);
        })
    }
    
    
    // Remove friend 
    exports.unFriend = (req,res)=>{
    
        friendsModal.deleteMany({$or:[{user_id:req.params.fid,friend_id:req.params.uid},{user_id:req.params.uid,friend_id:req.params.fid}]}).then(response=>{
            res.json("Successfully Remove From Your Friend List");
        }).catch(err=>{
            res.status(400).json("Some thing wrong while remove from Your friend List "+err);
        })
    }
    
    
    // Search Friends 
    exports.findFriends =(req,res)=>{
        if(req.body.name){
        regExp = new RegExp(req.body.name,'i');
        userModel.find({$or:[{name:regExp},{email:regExp}]}).then(response=>{
            res.json(response);
        }).catch(err=>{
            res.status(400).json("something wrong "+err);
        })
        }else{
            res.json();
        }
    }
    
    // All friends of visited user
    exports.allFriends = (req,res)=>{
        
        userModel.findOne({_id:req.params.id}).populate([{path:"user_info"}]).populate({path:"user_Friends",match:{user_id:req.params.id ,friendStatus:"Accepted"} , populate:([{path:"friend_id"} , {path:'user_id'}]) }).then(response=>{
            res.json(response);
        }).catch(err=>{
            res.status(400).json("Something wrong ")
        })
    }

    // All friends of visited user wth search 
    exports.allFriendSearch = (req,res)=>{
        regExp = new RegExp(req.params.name,'i');
        userModel.findOne({_id:req.params.id}).populate([{path:"user_info"}]).populate({path:"user_Friends",match:{user_id:req.params.id ,friendStatus:"Accepted"} , populate:([{path:"friend_id" ,match:{name:regExp}} , {path:'user_id'}]) }).then(response=>{
            res.json(response);
        }).catch(err=>{
            res.status(400).json("Something wrong ")
        })
    }
    exports.allRequest = (req,res)=>{
    
        userModel.findOne({_id:req.params.id}).populate("user_info").populate({path:"user_Friends",match:{friend_id:req.params.id , friendStatus:"Pending"} , populate:([{path:"user_id"},{path:"friend_id"}]) }).then(response=>{
            res.json(response);
        }).catch(err=>{
            res.status(400).json("Something wrong ")
        })
    }
    
    
    // all login  user friends Posts 
    exports.allFriendsPosts = (req,res)=>{
        postModal.find({postUser:req.body}).populate([{path:"postUser"},{path:"getlikes" , match:{likeStatus:"like"}, populate:([{path:"userclick_id"}]) },{path:"postcomment",populate:("usercomment_id") }]).sort({createdAt:-1}).then(response=>{
            res.json(response);
        })
    }
    
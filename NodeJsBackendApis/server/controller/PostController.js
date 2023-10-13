
// All modal imported
var usermodal = require('../model/users');
var postModal = require("../model/post_photos");
var likeModal = require('../model/likes');
var commentModal = require('../model/comments');



//create Post 
exports.createPost = (req,res)=>{
    var file = req.file

    if(!file){
        res.status(400).json("Photo Should be selected");
       }

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
        var filename;
        if(file){
            filename = "/assets/postStorage/"+file.filename;
        }

    postModal.updateOne({_id:req.body.id} , {$set:{
        status:req.body.status,
        postUrl:filename,
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

    if(req.body.search){
    regex = new RegExp(req.body.search , 'i');
    postModal.find({ $or:[{status:regex}] }).populate('postUser') .then(responce=>{
        res.json(responce);
    }).catch(err=>{
        res.status(400).json(" not found ");
    });
    }else{
        res.json();
    }


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




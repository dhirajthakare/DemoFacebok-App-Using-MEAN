

// All modal imported
var userModel = require('../model/users');
var storyModal = require('../model/stories');


// create stories 
exports.createStory = (req,res)=>{
    
    var file = req.file;
    var send  = new storyModal({
        storyText:req.body.status,
        user_id:req.body.user_id,
        storyUrl:"/assets/storyStorage/"+file.filename

    })

    send.save().then(response=>{

        userModel.updateOne({_id:req.body.user_id},{$push:{
            user_stories:response._id
        }}).then(userStory=>{
            res.json("Story Updated Successfully");

        }).catch(err=>{
            res.status(400).json("Something Wrong While Update Post Like");
        })
    }).catch(err=>{
        res.status(400).json("Story Updated Fails "+err);
    })
}


// get stories
exports.getStory = (req,res)=>{
  
        storyModal.find({user_id:req.params.id ,createdAt:{$gt:new Date(Date.now() - 24*60*60 * 1000)}}).populate('user_id').then(response2 =>{
            storyModal.find({user_id:req.body,createdAt:{$gt:new Date(Date.now() - 24*60*60 * 1000)}}).populate('user_id').then(response3=>{
                res.json(Array({"userstories":response2},{"userFriendStories":response3}));
            })
        })
    
}


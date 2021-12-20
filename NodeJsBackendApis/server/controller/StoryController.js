

// All modal imported
var usermodal = require('../model/users');
var storyModal = require('../model/stories');


// create Sories 
exports.createstory = (req,res)=>{
    
    var file = req.file;
    var send  = new storyModal({
        storyText:req.body.status,
        user_id:req.body.user_id,
        storyUrl:"/assets/storyStorage/"+file.filename

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


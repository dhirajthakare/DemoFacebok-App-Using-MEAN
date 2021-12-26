
var MessangerModal = require('../model/messnger');

const messnger = require('../model/messnger');

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
    

var messengerModel = require('../model/messnger');

const messenger = require('../model/messnger');

//send message
exports.sendMsg = (req,res)=>{
    //  console.log(req.body);
        var send = new messenger({
            message:req.body.message,
            sender_id:req.body.sender_id,
            receiver_id:req.body.receiver_id
    
        });
        send.save().then(response=>{
            res.json("Successfully sended message");
        }).catch(err=>{
            res.status(400).json("Something wrong Please try again");
        })
        
    }
    
    
    
    //get messages
    exports.getUserMessage = (req,res)=>{  
    
    messengerModel.find({$or:[{sender_id:req.params.fid,receiver_id:req.params.uid},{sender_id:req.params.uid,receiver_id:req.params.fid }]}).then(response=>{
        
        res.json(response);
    }).catch(err=>{
        res.json("Something wrong "+err);
    })
    }
    
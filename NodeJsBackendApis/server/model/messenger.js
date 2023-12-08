const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    message:{type:String},
    sender_id:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' },
    receiver_id:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' },
},{ timestamps: true 
})

module.exports = mongoose.model('messengers',messageSchema);
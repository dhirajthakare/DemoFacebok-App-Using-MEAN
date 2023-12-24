const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    friendStatus:{type:String},
    user_id:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' },
    friend_id:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' },
},{ timestamps: true 
})

module.exports = mongoose.model('user_friend_mapping',userSchema);
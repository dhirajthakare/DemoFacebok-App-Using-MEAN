const mongoose = require('mongoose');
const likeSchema = mongoose.Schema({
    likeStatus:{type:String},
    post_photo_id:
    { type:mongoose.Schema.Types.ObjectId , ref:'post_photos' },
    user_id:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' },
    userClickId:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' },
},{ timestamps: true 
})

module.exports = mongoose.model('likes',likeSchema);
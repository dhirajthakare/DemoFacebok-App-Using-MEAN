const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    comment:{type:String},
    post_photo_id:
    { type:mongoose.Schema.Types.ObjectId , ref:'post_photos' },
    user_id:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' },
    user_commented_id:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' },
},{ timestamps: true 
})

module.exports = mongoose.model('comments',commentSchema);
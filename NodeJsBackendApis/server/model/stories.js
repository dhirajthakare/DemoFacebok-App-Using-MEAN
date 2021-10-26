const mongoose = require('mongoose');
const usersechma = mongoose.Schema({
    storyText:{type:String},
    viewsCount:{type:Number,default:0},
    storyCommentCounts:{type:Number,default:0},
    storyUrl:{type:String,default:0},
    user_id:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' },

},{ timestamps: true})

module.exports = mongoose.model('stories',usersechma);
const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    status:{type:String},
    likeCounts:{type:Number,default:0},
    commentCounts:{type:Number,default:0},
    postUrl:{type:String},
    postUser:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' },
    getLikes:[
    { type:mongoose.Schema.Types.ObjectId , ref:'likes' } ],
    postComments:[
    { type:mongoose.Schema.Types.ObjectId , ref:'comments' } ],


},{ timestamps: true 
})

module.exports = mongoose.model('post_photos',postSchema);
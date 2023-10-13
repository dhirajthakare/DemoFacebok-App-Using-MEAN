const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    status:{type:String},
    likeCounts:{type:Number,default:0},
    commentCounts:{type:Number,default:0},
    postUrl:{type:String},
    postUser:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' },
    getlikes:[
    { type:mongoose.Schema.Types.ObjectId , ref:'likes' } ],
    postcomment:[
    { type:mongoose.Schema.Types.ObjectId , ref:'comments' } ],


},{ timestamps: true 
})

module.exports = mongoose.model('post_photos',postSchema);
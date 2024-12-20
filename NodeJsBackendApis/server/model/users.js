const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    birthOfDate:{type:String},
    gender:{type:String},
    profileUrl:{type:String},
    userToken:{type:String},
    user_info:
    { type:mongoose.Schema.Types.ObjectId , ref:'user-details' },
    user_post:[
    { type:mongoose.Schema.Types.ObjectId , ref:'post_photos' }],
    user_stories:[
        { type:mongoose.Schema.Types.ObjectId , ref:'stories' }],
    user_Friends:[
        { type:mongoose.Schema.Types.ObjectId , ref:'user_friend_mapping' }],

},{ timestamps: true 
})

module.exports = mongoose.model('users',userSchema);
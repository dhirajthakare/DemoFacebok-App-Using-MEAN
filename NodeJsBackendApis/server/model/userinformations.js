const mongoose = require('mongoose');
const userInfoSchema = mongoose.Schema({
    workplace:{type:String},
    highSchool:{type:String},
    university:{type:String},
    CoverPhoto:{type:String},
    currentCity:{type:String},
    homeTown:{type:String},
    relation:{type:String},
    website:{type:String},
    Sociallinks:{type:String},
    user:
    { type:mongoose.Schema.Types.ObjectId , ref:'users' }

},{ timestamps: true });

module.exports = mongoose.model('userinformations',userInfoSchema);
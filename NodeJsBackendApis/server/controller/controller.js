
// All modal imported
var userModal = require('../model/users');
var userInfoModal = require('../model/userinformations');
var postModal = require("../model/post_photos");
var likeModal = require('../model/likes');
var commentModal = require('../model/comments');
var storyModal = require('../model/stories');
var friendsModal = require('../model/friends_users');
var messengerModal = require('../model/messnger');
var transport = require('../database/mailConnection')


// welcome api
exports.home = async (req,res)=>{
    res.send("hello bro");
}


// All modal imported
var userModal = require('../model/users');
var userInfoModal = require('../model/user-information');
var postModal = require("../model/post-photos");
var likeModal = require('../model/likes');
var commentModal = require('../model/comments');
var storyModal = require('../model/stories');
var friendsModal = require('../model/friends-users');
var messengerModal = require('../model/messenger');
var transport = require('../database/mail-connection')


// welcome api
exports.home = async (req,res)=>{
    res.send("hello bro");
}

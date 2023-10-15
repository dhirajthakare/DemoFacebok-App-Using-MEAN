const express = require('express');
const route = express.Router();
const service = require('../services/service');
const controller = require('../controller/controller')
const AuthController = require('../controller/auth.controller')
const FriendController = require('../controller/friend.controller')
const MessageController = require('../controller/messenger.controller')
const PostController = require('../controller/post.controller')
const SendMailController = require('../controller/send-mail.controller')
const StoryController = require('../controller/Story.controller')
const UserController = require('../controller/user.controller')
const verify = require('../middleware/verify-user.middleware')


const fileUploadController = require('../controller/file-upload.controller');

route.get('/api/',controller.home);

// Authentication
route.post('/api/createAccount',AuthController.createAcc);
route.post('/api/login',AuthController.loginUser);
route.get('/api/getprofile' ,verify ,AuthController.getUserProfile);
route.post('/api/updateAccount/:id' ,verify ,fileUploadController.ProfilePhotoUpload,AuthController.updateAccount)


// Forget Poassword
route.post('/api/testmail' ,service.sendTestMail);
route.post('/api/sendmail' ,SendMailController.sendTestMail);
route.post('/api/checkopt' ,SendMailController.checkOtpCode);
route.post('/api/changepassword' ,SendMailController.changePassword);


//Post mangement 
route.post('/api/createpost',verify ,fileUploadController.postPhotoUpload , PostController.createPost);
route.post('/api/updatepost',verify ,fileUploadController.postPhotoUpload , PostController.updatePost);
route.get('/api/getpostdata/:id' ,verify ,PostController.getPost);
route.get('/api/deletepost/:id' ,verify ,PostController.deletePost);
route.post('/api/findpost/',verify ,PostController.searchPost);

// Post =>Like And Comment 
route.post('/api/likedislike',verify ,PostController.like);
route.post('/api/createcomment',verify ,PostController.createComment);
route.get('/api/deletecomment/:cid/:pid',verify ,PostController.deleteComment);

// Story Management 
route.post('/api/createstory',fileUploadController.StoryPhotoUpload ,verify , StoryController.createStory);
route.post('/api/getstory/:id' ,verify ,StoryController.getStory);


route.post('/api/createuserinformation' , fileUploadController.ProfileCoverPhotoUpload ,verify ,UserController.addUserInfo);

// Visited User
route.get('/api/getcurrentloginuser/:token' ,verify ,UserController.getCurrentUser);
route.get('/api/getcurrentuserposts/:cid/:id' ,verify ,UserController.getCurrentUserPost);

route.get('/api/addfriend/:uid/:fid' ,verify ,FriendController.addFriend);
route.get('/api/acceptfriendrequest/:uid/:fid' ,verify ,FriendController.acceptFriendRequest);
route.get('/api/rejectfriendrequest/:uid/:fid' ,verify ,FriendController.rejectRequest);
route.get('/api/unfriend/:uid/:fid' ,verify ,FriendController.unFriend);
route.post('/api/findfriends/' ,verify ,FriendController.findFriends);

// Request send and receive 
route.get('/api/getAddFriend/:id' ,verify ,FriendController.allFriends);
route.get('/api/getallrequest/:id' ,verify ,FriendController.allRequest);
route.get('/api/getuserfriends/:id' ,verify ,FriendController.allFriends);
route.get('/api/alluserfriendssearch/:id/:name' ,verify ,FriendController.allFriendSearch);
route.post('/api/allfriendspost' ,verify ,FriendController.allFriendsPosts);


//Send and get message 
route.post('/api/sendmessage' ,verify ,MessageController.sendMsg);
route.get('/api/getmessage/:uid/:fid' ,verify ,MessageController.getUserMessage);


route.get('/api/alluser' ,verify ,UserController.findAllUsers);
route.get('/api/alluserinfo' ,verify ,UserController.allUserinfo);
module.exports = route;

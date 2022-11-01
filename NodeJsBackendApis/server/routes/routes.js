const express = require('express');
const route = express.Router();
const service = require('../services/service');
const controller = require('../controller/controller')
const AuthController = require('../controller/AuthController')
const FriendController = require('../controller/FriendController')
const MessageController = require('../controller/MessageController')
const PostController = require('../controller/PostController')
const SendMailController = require('../controller/SendMailController')
const StoryController = require('../controller/StoryController')
const UserController = require('../controller/UserController')
const verify = require('../middleware/verifyUserMiddleware')


const fileuploadeController = require('../controller/fileUploadeController');

route.get('/api/',controller.home);

// Authentication
route.post('/api/createAccount',AuthController.createAcc);
route.post('/api/login',AuthController.loginUser);
route.get('/api/getprofile' ,verify ,AuthController.getUserProfile);
route.post('/api/updateAccount/:id' ,verify ,fileuploadeController.ProfilePhotoUpload,AuthController.updateAccount)


// Forget Poassword
route.post('/api/testmail' ,service.sendtestmail);
route.post('/api/sendmail' ,SendMailController.sendtestmail);
route.post('/api/checkopt' ,SendMailController.checkOtpCode);
route.post('/api/changepassword' ,SendMailController.changePassword);


//Post mangement 
route.post('/api/createpost',verify ,fileuploadeController.postPhotoUpload , PostController.createPost);
route.post('/api/updatepost',verify ,fileuploadeController.postPhotoUpload , PostController.updatePost);
route.get('/api/getpostdata/:id' ,verify ,PostController.getPost);
route.get('/api/deletepost/:id' ,verify ,PostController.deletePost);
route.get('/api/findpost/:search',verify ,PostController.searchPost);

// Post =>Like And Comment 
route.post('/api/likedislike',verify ,PostController.like);
route.post('/api/createcomment',verify ,PostController.createComment);
route.get('/api/deletecomment/:cid/:pid',verify ,PostController.deleteComment);

// Story Management 
route.post('/api/createstory',fileuploadeController.StoryPhotoUpload ,verify , StoryController.createstory);
route.post('/api/getstory/:id' ,verify ,StoryController.getStory);


route.post('/api/createuserinformation' , fileuploadeController.ProfileCoverPhotoUpload ,verify ,UserController.addUserInfo);

// Visited User
route.get('/api/getcurrentloginuser/:token' ,verify ,UserController.getCurrentUser);
route.get('/api/getcurrentuserposts/:cid/:id' ,verify ,UserController.getCurrentUserPost);

route.get('/api/addfriend/:uid/:fid' ,verify ,FriendController.addFriend);
route.get('/api/acceptfriendrequest/:uid/:fid' ,verify ,FriendController.acceptFriendRequest);
route.get('/api/rejectfriendrequest/:uid/:fid' ,verify ,FriendController.rejectRequest);
route.get('/api/unfriend/:uid/:fid' ,verify ,FriendController.unFriend);
route.get('/api/findfriends/:name' ,verify ,FriendController.findFriends);

// Request send and receive 
route.get('/api/getAddFriend/:id' ,verify ,FriendController.allfriends);
route.get('/api/getallrequest/:id' ,verify ,FriendController.allRequest);
route.get('/api/getuserfriends/:id' ,verify ,FriendController.allfriends);
route.get('/api/alluserfriendssearch/:id/:name' ,verify ,FriendController.allfriendsearch);
route.post('/api/allfriendspost' ,verify ,FriendController.allFriendsPosts);


//Send and get message 
route.post('/api/sendmessage' ,verify ,MessageController.sendmsg);
route.get('/api/getmessage/:uid/:fid' ,verify ,MessageController.getusermessage);


route.get('/api/alluser' ,verify ,UserController.findAllUsers);
route.get('/api/alluserinfo' ,verify ,UserController.alluserinfo);


module.exports = route;

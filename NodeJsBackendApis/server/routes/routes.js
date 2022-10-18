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


const fileuploadeController = require('../controller/fileUploadeController');

route.get('/api/',controller.home);

// Autthentication
route.post('/api/createAccount',AuthController.createAcc);
route.post('/api/updateAccount/:id' ,fileuploadeController.ProfilePhotoUpload,AuthController.updateAccount)
route.post('/api/login',AuthController.loginUser);


//Post mangement 
route.post('/api/createpost',fileuploadeController.postPhotoUpload , PostController.createPost);
route.post('/api/updatepost',fileuploadeController.postPhotoUpload , PostController.updatePost);
route.get('/api/getpostdata/:id' ,PostController.getPost);
route.get('/api/deletepost/:id' ,PostController.deletePost);
route.get('/api/findpost/:search' ,PostController.searchPost);

// Post =>Like And Comment 
route.post('/api/likedislike',PostController.like);
route.post('/api/createcomment',PostController.createComment);
route.get('/api/deletecomment/:cid/:pid',PostController.deleteComment);

// Story Management 
route.post('/api/createstory',fileuploadeController.StoryPhotoUpload , StoryController.createstory);
route.post('/api/getstory/:id' ,StoryController.getStory);


route.post('/api/createuserinformation' , fileuploadeController.ProfileCoverPhotoUpload ,UserController.addUserInfo);

// Visited User
route.get('/api/getcurrentloginuser/:token' ,UserController.getCurrentUser);
route.get('/api/getcurrentuserposts/:cid/:id' ,UserController.getCurrentUserPost);

route.get('/api/addfriend/:uid/:fid' ,FriendController.addFriend);
route.get('/api/acceptfriendrequest/:uid/:fid' ,FriendController.acceptFriendRequest);
route.get('/api/rejectfriendrequest/:uid/:fid' ,FriendController.rejectRequest);
route.get('/api/unfriend/:uid/:fid' ,FriendController.unFriend);
route.get('/api/findfriends/:name' ,FriendController.findFriends);

// Request send and receive 
route.get('/api/getAddFriend/:id' ,FriendController.allfriends);
route.get('/api/getallrequest/:id' ,FriendController.allRequest);
route.get('/api/getuserfriends/:id' ,FriendController.allfriends);
route.get('/api/alluserfriendssearch/:id/:name' ,FriendController.allfriendsearch);
route.post('/api/allfriendspost' ,FriendController.allFriendsPosts);


//Send and get message 
route.post('/api/sendmessage' ,MessageController.sendmsg);
route.get('/api/getmessage/:uid/:fid' ,MessageController.getusermessage);

// send Mail
route.post('/api/testmail' ,service.sendtestmail);


route.post('/api/sendmail' ,SendMailController.sendtestmail);
route.post('/api/checkopt' , SendMailController.checkOtpCode);
route.post('/api/changepassword' , SendMailController.changePassword);





route.get('/api/alluser' , UserController.findAllUsers);

route.get('/api/alluserinfo' ,UserController.alluserinfo);


module.exports = route;

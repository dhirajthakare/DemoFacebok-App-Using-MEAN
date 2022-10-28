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

route.get('/',controller.home);

// Autthentication
route.post('/createAccount',AuthController.createAcc);
route.post('/updateAccount/:id' ,fileuploadeController.ProfilePhotoUpload,AuthController.updateAccount)
route.post('/login',AuthController.loginUser);


//Post mangement 
route.post('/createpost',fileuploadeController.postPhotoUpload , PostController.createPost);
route.post('/updatepost',fileuploadeController.postPhotoUpload , PostController.updatePost);
route.get('/getpostdata/:id' ,PostController.getPost);
route.get('/deletepost/:id' ,PostController.deletePost);
route.get('/findpost/:search' ,PostController.searchPost);

// Post =>Like And Comment 
route.post('/likedislike',PostController.like);
route.post('/createcomment',PostController.createComment);
route.get('/deletecomment/:cid/:pid',PostController.deleteComment);

// Story Management 
route.post('/createstory',fileuploadeController.StoryPhotoUpload , StoryController.createstory);
route.post('/getstory/:id' ,StoryController.getStory);


route.post('/createuserinformation' , fileuploadeController.ProfileCoverPhotoUpload ,UserController.addUserInfo);

// Visited User
route.get('/getcurrentloginuser/:token' ,UserController.getCurrentUser);
route.get('/getcurrentuserposts/:cid/:id' ,UserController.getCurrentUserPost);

route.get('/addfriend/:uid/:fid' ,FriendController.addFriend);
route.get('/acceptfriendrequest/:uid/:fid' ,FriendController.acceptFriendRequest);
route.get('/rejectfriendrequest/:uid/:fid' ,FriendController.rejectRequest);
route.get('/unfriend/:uid/:fid' ,FriendController.unFriend);
route.get('/findfriends/:name' ,FriendController.findFriends);

// Request send and receive 
route.get('/getAddFriend/:id' ,FriendController.allfriends);
route.get('/getallrequest/:id' ,FriendController.allRequest);
route.get('/getuserfriends/:id' ,FriendController.allfriends);
route.get('/alluserfriendssearch/:id/:name' ,FriendController.allfriendsearch);
route.post('/allfriendspost' ,FriendController.allFriendsPosts);


//Send and get message 
route.post('/sendmessage' ,MessageController.sendmsg);
route.get('/getmessage/:uid/:fid' ,MessageController.getusermessage);

// send Mail
route.post('/testmail' ,service.sendtestmail);



route.post('/sendmail' ,SendMailController.sendtestmail);
route.post('/checkopt' , SendMailController.checkOtpCode);
route.post('/changepassword' , SendMailController.changePassword);





route.get('/alluser' , UserController.findAllUsers);

route.get('/alluserinfo' ,UserController.alluserinfo);


module.exports = route;

const express = require('express');
const route = express.Router();
const service = require('../services/service');
const controller = require('../controller/controller')
const fileuploadeController = require('../controller/fileUploadeController');
const { Router } = require('express');

route.get('/',controller.home);

// Autthentication
route.post('/createAccount',controller.createAcc);
route.post('/updateAccount/:id' ,fileuploadeController.ProfilePhotoUpload,controller.updateAccount)
route.post('/login',controller.loginUser);


//Post mangement 
route.post('/createpost',fileuploadeController.postPhotoUpload , controller.createPost);
route.post('/updatepost',fileuploadeController.postPhotoUpload , controller.updatePost);
route.get('/getpostdata/:id' ,controller.getPost);
route.get('/deletepost/:id' ,controller.deletePost);
route.get('/findpost/:search' ,controller.searchPost);

// Post =>Like And Comment 
route.post('/likedislike',controller.like);
route.post('/createcomment',controller.createComment);
route.get('/deletecomment/:cid/:pid',controller.deleteComment);

// Story Management 
route.post('/createstory',fileuploadeController.StoryPhotoUpload , controller.createstory);
route.post('/getstory/:id' ,controller.getStory);


route.post('/createuserinformation' , fileuploadeController.ProfileCoverPhotoUpload ,controller.addUserInfo);

// Visited User
route.get('/getcurrentloginuser/:token' ,controller.getCurrentUser);
route.get('/getcurrentuserposts/:cid/:id' ,controller.getCurrentUserPost);

route.get('/addfriend/:uid/:fid' ,controller.addFriend);
route.get('/acceptfriendrequest/:uid/:fid' ,controller.acceptFriendRequest);
route.get('/rejectfriendrequest/:uid/:fid' ,controller.rejectRequest);
route.get('/unfriend/:uid/:fid' ,controller.unFriend);
route.get('/findfriends/:name' ,controller.findFriends);

// Request send and receive 
route.get('/getAddFriend/:id' ,controller.allfriends);
route.get('/getallrequest/:id' ,controller.allRequest);
route.get('/getuserfriends/:id' ,controller.allfriends);
route.post('/allfriendspost' ,controller.allFriendsPosts);


//Send and get message 
route.post('/sendmessage' ,controller.sendmsg);
route.get('/getmessage/:uid/:fid' ,controller.getusermessage);

// send Mail
route.post('/testmail' ,service.sendtestmail);


route.post('/sendmail' ,controller.sendmail);
route.post('/checkopt' , controller.checkOtpCode);
route.post('/changepassword' , controller.changePassword);





route.get('/alluser' , controller.findAllUsers);

route.get('/alluserinfo' ,controller.alluserinfo);


module.exports = route;

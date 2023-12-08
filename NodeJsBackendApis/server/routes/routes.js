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
route.post('/api/create-account',AuthController.createAcc);
route.post('/api/login',AuthController.loginUser);
route.get('/api/get-profile' ,verify ,AuthController.getUserProfile);
route.post('/api/update-account/:id' ,verify ,fileUploadController.ProfilePhotoUpload,AuthController.updateAccount)


// Forget Password
route.post('/api/test-mail' ,service.sendTestMail);
route.post('/api/sendmail' ,SendMailController.sendTestMail);
route.post('/api/check-opt' ,SendMailController.checkOtpCode);
route.post('/api/change-password' ,SendMailController.changePassword);


//Post Management 
route.post('/api/create-post',verify ,fileUploadController.postPhotoUpload , PostController.createPost);
route.post('/api/update-post',verify ,fileUploadController.postPhotoUpload , PostController.updatePost);
route.get('/api/get-post-data/:id' ,verify ,PostController.getPost);
route.get('/api/delete-post/:id' ,verify ,PostController.deletePost);
route.post('/api/search-post/',verify ,PostController.searchPost);

// Post =>Like And Comment 
route.post('/api/toggle-like',verify ,PostController.like);
route.post('/api/create-comment',verify ,PostController.createComment);
route.get('/api/delete-comment/:cid/:pid',verify ,PostController.deleteComment);

// Story Management 
route.post('/api/create-story',fileUploadController.StoryPhotoUpload ,verify , StoryController.createStory);
route.post('/api/get-story/:id' ,verify ,StoryController.getStory);


route.post('/api/create-user-information' , fileUploadController.ProfileCoverPhotoUpload ,verify ,UserController.addUserInfo);

// Visited User
route.get('/api/get-current-login-user/:token' ,verify ,UserController.getCurrentUser);
route.get('/api/get-current-user-posts/:cid/:id' ,verify ,UserController.getCurrentUserPost);

route.get('/api/add-friend/:uid/:fid' ,verify ,FriendController.addFriend);
route.get('/api/accept-friend-request/:uid/:fid' ,verify ,FriendController.acceptFriendRequest);
route.get('/api/reject-friend-request/:uid/:fid' ,verify ,FriendController.rejectRequest);
route.get('/api/unfriend/:uid/:fid' ,verify ,FriendController.unFriend);
route.post('/api/find-friend/' ,verify ,FriendController.findFriends);

// Request send and receive 
route.get('/api/getAddFriend/:id' ,verify ,FriendController.allFriends);
route.get('/api/get-all-request/:id' ,verify ,FriendController.allRequest);
route.get('/api/get-user-friends/:id' ,verify ,FriendController.allFriends);
route.get('/api/all-user-friends-search/:id/:name' ,verify ,FriendController.allFriendSearch);
route.post('/api/all-friends-post' ,verify ,FriendController.allFriendsPosts);


//Send and get message 
route.post('/api/send-message' ,verify ,MessageController.sendMsg);
route.get('/api/get-message/:uid/:fid' ,verify ,MessageController.getUserMessage);


route.get('/api/all-user' ,verify ,UserController.findAllUsers);
route.get('/api/all-userinfo' ,verify ,UserController.allUserinfo);
module.exports = route;

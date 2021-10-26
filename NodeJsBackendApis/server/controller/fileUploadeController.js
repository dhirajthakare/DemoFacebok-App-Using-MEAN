
const multer = require('multer');

//profile store
const ProfileStorage = multer.diskStorage({
    destination:'assets/profileUpload/',filename:(req,file,callBack)=>{
        // console.log(file);
        callBack(null,`${randomNum(100000,599990)}_ProfilePhoto_${file.originalname}`)
    }
})

//Post Uploade
const PostStorage = multer.diskStorage({
    destination:'assets/postStorage/',filename:(req,file,callBack)=>{
        // console.log(file);
        callBack(null,`${randomNum(100000,599990)}_PostPhoto_${file.originalname}`)
    }
})

//Story Uploade
const storyStorage = multer.diskStorage({
    destination:'assets/storyStorage/',filename:(req,file,callBack)=>{
        // console.log(file);
        callBack(null,`${randomNum(100000,599990)}_Story_${file.originalname}`)
    }
})


//profileCover Uploade
const profileCoverStorage = multer.diskStorage({
    destination:'assets/profileCoverStorage/',filename:(req,file,callBack)=>{
        // console.log(file);
        callBack(null,`${randomNum(100000,599990)}_profileCover_${file.originalname}`)
    }
})


    // Profile Uploade 
var profilePhoto = multer({storage:ProfileStorage});
    //Post Uploade
var postfile = multer({storage:PostStorage});
    //Story Uploade
var storyfile = multer({storage:storyStorage});
    // profile cover
var ProfileCoverFIle = multer({storage:profileCoverStorage});


exports.ProfilePhotoUpload = profilePhoto.single('profile');

exports.postPhotoUpload = postfile.single('postUrl');

exports.StoryPhotoUpload = storyfile.single('storyUrl');

// exports.ProfileCoverPhotoUpload = if(single('CoverPhoto')){
// return ProfileCoverFIle.single('CoverPhoto') ;
// }

exports.ProfileCoverPhotoUpload = ProfileCoverFIle.single('CoverPhoto') ? ProfileCoverFIle.single('CoverPhoto') :'';





function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
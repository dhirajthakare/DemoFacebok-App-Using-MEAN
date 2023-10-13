
const multer = require('multer');

//profile store
const ProfileStorage = multer.diskStorage({
    destination:'assets/profileUpload/',filename:(req,file,callBack)=>{
        // console.log(file);
        callBack(null,`${randomNum(100000,599990)}_ProfilePhoto_${file.originalname}`)
    }
})

//Post Upload
const PostStorage = multer.diskStorage({
    destination:'assets/postStorage/',filename:(req,file,callBack)=>{
        // console.log(file);
        callBack(null,`${randomNum(100000,599990)}_PostPhoto_${file.originalname}`)
    }
})

//Story Upload
const storyStorage = multer.diskStorage({
    destination:'assets/storyStorage/',filename:(req,file,callBack)=>{
        // console.log(file);
        callBack(null,`${randomNum(100000,599990)}_Story_${file.originalname}`)
    }
})


//profileCover Upload
const profileCoverStorage = multer.diskStorage({
    destination:'assets/profileCoverStorage/',filename:(req,file,callBack)=>{
        // console.log(file);
        callBack(null,`${randomNum(100000,599990)}_profileCover_${file.originalname}`)
    }
})


    // Profile Upload 
var profilePhoto = multer({storage:ProfileStorage});
    //Post Upload
var postFile = multer({storage:PostStorage});
    //Story Upload
var storyFile = multer({storage:storyStorage});
    // profile cover
var ProfileCoverFIle = multer({storage:profileCoverStorage});


exports.ProfilePhotoUpload = profilePhoto.single('profile');

exports.postPhotoUpload = postFile.single('postUrl');

exports.StoryPhotoUpload = storyFile.single('storyUrl');

// exports.ProfileCoverPhotoUpload = if(single('CoverPhoto')){
// return ProfileCoverFIle.single('CoverPhoto') ;
// }

exports.ProfileCoverPhotoUpload = ProfileCoverFIle.single('CoverPhoto') ? ProfileCoverFIle.single('CoverPhoto') :'';





function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
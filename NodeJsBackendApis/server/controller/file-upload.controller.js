const multer = require("multer");
const commandService = require("../services/common.Service");

// Storage configuration
const createStorage = (destination) =>
  multer.diskStorage({
    destination,
    filename: (req, file, callBack) => {
      callBack(
        null,
        `${commandService.randomNum(100000, 599990)}_${file.fieldname}_${
          file.originalname
        }`
      );
    },
  });

// Define storages and uploads
const profileStorage = createStorage("assets/profileUpload/");
const postStorage = createStorage("assets/postStorage/");
const storyStorage = createStorage("assets/storyStorage/");
const profileCoverStorage = createStorage("assets/profileCoverStorage/");

// Upload configurations
const profilePhoto = multer({ storage: profileStorage });
const postFile = multer({ storage: postStorage });
const storyFile = multer({ storage: storyStorage });
const ProfileCoverFIle = multer({ storage: profileCoverStorage });

// Export upload middleware
exports.ProfilePhotoUpload = profilePhoto.single("profile");
exports.postPhotoUpload = postFile.single("postUrl");
exports.StoryPhotoUpload = storyFile.single("storyUrl");
exports.ProfileCoverPhotoUpload = ProfileCoverFIle.single("coverPhoto")
  ? ProfileCoverFIle.single("coverPhoto")
  : "";

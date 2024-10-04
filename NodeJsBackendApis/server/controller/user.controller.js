// All modal imported
var userModel = require("../model/users");
var userInfoModal = require("../model/user-information");
var postModal = require("../model/post-photos");

const userInformationModel = require("../model/user-information");

// Add User More Information
exports.addUserInfo = async (req, res) => {
  try {
    const file = req.file;
    const filename = file
      ? "/assets/profileCoverStorage/" + file.filename
      : undefined;

    const existingInfo = await userInformationModel.findOne({
      user: req.body.user_id,
    });

    if (existingInfo) {
      await userInfoModal.updateOne(
        { user: req.body.user_id },
        {
          $set: {
            workplace: req.body.workplace,
            highSchool: req.body.highSchool,
            university: req.body.university,
            currentCity: req.body.currentCity,
            homeTown: req.body.homeTown,
            coverPhoto: filename,
            relation: req.body.relation,
            website: req.body.website,
            SocialLinks: req.body.SocialLinks,
            user: req.body.user_id,
          },
        }
      );

      res.json("Profile Information Updated Successfully");
    } else {
      const userInfo = new userInfoModal({
        workplace: req.body.workplace,
        highSchool: req.body.highSchool,
        university: req.body.university,
        currentCity: req.body.currentCity,
        homeTown: req.body.homeTown,
        coverPhoto: filename,
        relation: req.body.relation,
        website: req.body.website,
        SocialLinks: req.body.SocialLinks,
        user: req.body.user_id,
      });

      const savedInfo = await userInfo.save();

      await userModel.updateOne(
        { _id: req.body.user_id },
        {
          $set: {
            user_info: savedInfo._id,
          },
        }
      );

      res.json("Information Added Successfully");
    }
  } catch (err) {
    res.status(400).json("Something Wrong While Update Information: " + err);
  }
};

// Get Current User
exports.getCurrentUser = async (req, res) => {
  try {
    const response = await userModel.findOne({ userToken: req.params.token });

    const response1 = await userModel
      .findOne({ userToken: response.userToken })
      .populate({ path: "user_info" })
      .populate({
        path: "user_Friends",
        match: { user_id: response._id, friendStatus: "Accepted" },
        populate: [{ path: "friend_id" }, { path: "user_id" }],
      })
      .populate({
        path: "user_post",
        populate: [
          {
            path: "getLikes",
            match: { likeStatus: "like" },
            populate: [{ path: "user_id" }, { path: "userClickId" }],
          },
          { path: "postComments", populate: [{ path: "user_commented_id" }] },
        ],
      });

    res.json(response1);
  } catch (err) {
    res.status(400).json("Something Wrong: " + err);
  }
};

// Find All Users
exports.findAllUsers = async (req, res) => {
  try {
    const response = await userModel.find().populate({
      path: "user_post",
      populate: [
        {
          path: "getLikes",
          populate: [{ path: "userClickId" }, { path: "user_id" }],
        },
        { path: "postComments" },
      ],
    });

    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.allUserInfo = async (req, res) => {
  try {
    const response = await userInformationModel.find().populate("user");
    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

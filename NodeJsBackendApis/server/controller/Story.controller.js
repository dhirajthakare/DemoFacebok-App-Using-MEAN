// All modal imported
var userModel = require("../model/users");
var storyModal = require("../model/stories");
const { getFriendsId } = require("./common.controller");

// Create stories
exports.createStory = async (req, res) => {
  try {
    const file = req.file;
    const newStory = new storyModal({
      storyText: req.body.status,
      user_id: req.body.user_id,
      storyUrl: "/assets/storyStorage/" + file.filename,
    });

    const savedStory = await newStory.save();
    await userModel.updateOne(
      { _id: req.body.user_id },
      { $push: { user_stories: savedStory._id } }
    );

    res.json("Story Updated Successfully");
  } catch (err) {
    res.status(400).json("Story Updated Failed: " + err);
  }
};

// get stories
exports.getStory = async (req, res) => {
  try {
    const friendsIds = await getFriendsId(req.params.id);
    const userStories = await storyModal
      .find({
        user_id: req.params.id,
        createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      })
      .populate("user_id");

    const friendStories = await storyModal
      .find({
        user_id: friendsIds,
        createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      })
      .populate("user_id");

    res.json({ userStories: userStories, userFriendStories: friendStories });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

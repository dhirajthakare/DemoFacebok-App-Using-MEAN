// All modal imported
const userModel = require("../model/users");
const postModal = require("../model/post-photos");
const friendsModal = require("../model/user_friend_mapping");
const mongoose = require("mongoose");

// Add friends
exports.addFriend = async (req, res) => {
  try {
    const existingRequest = await friendsModal.findOne({
      user_id: req.params.uid,
      friend_id: req.params.fid,
      friendStatus: "Pending",
    });

    if (existingRequest) {
      return res.json("Already sent request");
    }

    const newRequest = new friendsModal({
      user_id: req.params.uid,
      friend_id: req.params.fid,
      friendStatus: "Pending",
    });

    const savedRequest = await newRequest.save();

    await userModel.updateMany(
      { _id: { $in: [req.params.uid, req.params.fid] } },
      { $push: { user_Friends: savedRequest._id } }
    );

    res.json("Request sent successfully");
  } catch (err) {
    res.status(400).json("Something went wrong: " + err);
  }
};

// Accept Friend Request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const existingFriend = await friendsModal.findOne({
      user_id: req.params.uid,
      friend_id: req.params.fid,
      friendStatus: "Accepted",
    });

    if (existingFriend) {
      await friendsModal.deleteOne({
        user_id: req.params.uid,
        friend_id: req.params.fid,
        $or: [{ friendStatus: "Pending" }, { friendStatus: "Rejected" }],
      });

      return res.json("You are already friends");
    }

    const newFriend = new friendsModal({
      user_id: req.params.uid,
      friend_id: req.params.fid,
      friendStatus: "Accepted",
    });

    const createdFriend = await newFriend.save();

    await userModel.updateMany(
      { _id: { $in: [req.params.fid, req.params.uid] } },
      {
        $push: {
          user_Friends: createdFriend._id,
        },
      }
    );

    await friendsModal.updateOne(
      { user_id: req.params.fid, friend_id: req.params.uid },
      {
        $set: {
          friendStatus: "Accepted",
        },
      }
    );

    res.json("Request confirmed");
  } catch (err) {
    res.status(400).json("Something went wrong: " + err);
  }
};

//reject Friend Request
exports.rejectRequest = async (req, res) => {
  try {
    await friendsModal.deleteMany({
      user_id: req.params.fid,
      friend_id: req.params.uid,
    });
    res.json("request Rejected");
  } catch (error) {
    res.status(500).json({ error: "Something wrong while request Rejected " });
  }
};

// Remove friend
exports.unFriend = async (req, res) => {
  try {
    await friendsModal.deleteMany({
      $or: [
        { user_id: req.params.fid, friend_id: req.params.uid },
        { user_id: req.params.uid, friend_id: req.params.fid },
      ],
    });
    res.json("Successfully Remove From Your Friend List");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Search Friends
exports.findFriends = async (req, res) => {
  try {
    if (req.body.name) {
      regExp = new RegExp(req.body.name, "i");
      const searchResult = await userModel.find({
        $or: [{ name: regExp }, { email: regExp }],
      });
      res.json(searchResult);
    } else {
      res.json();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// All friends of visited user
exports.allFriends = async (req, res) => {
  try {
    const friends = await userModel
      .findOne({ _id: req.params.id })
      .populate([{ path: "user_info" }])
      .populate({
        path: "user_Friends",
        match: { user_id: req.params.id, friendStatus: "Accepted" },
        populate: [{ path: "friend_id" }, { path: "user_id" }],
      });
    res.json(friends);
  } catch (error) {
    res.status(500).json({ error: "Something wrong while retrieve friends" });
  }
};

// All friends of visited user wth search
exports.allFriendSearch = async (req, res) => {
  try {
    regExp = new RegExp(req.params.name, "i");
    const searchResult = await userModel
      .findOne({ _id: req.params.id })
      .populate([{ path: "user_info" }])
      .populate({
        path: "user_Friends",
        match: { user_id: req.params.id, friendStatus: "Accepted" },
        populate: [
          { path: "friend_id", match: { name: regExp } },
          { path: "user_id" },
        ],
      });
    res.json(searchResult);
  } catch (err) {
    res.status(500).json({ error: "Something wrong " });
  }
};

exports.allRequest = async (req, res) => {
  try {
    const allRequest = await userModel
      .findOne({ _id: req.params.id })
      .populate("user_info")
      .populate({
        path: "user_Friends",
        match: { friend_id: req.params.id, friendStatus: "Pending" },
        populate: [{ path: "user_id" }, { path: "friend_id" }],
      });
    res.json(allRequest);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.allFriendsPosts = async (req, res) => {
  try {
    const posts = await postModal
      .find({ postUser: req.body.friendsIds })
      .populate([
        { path: "postUser" },
        {
          path: "getLikes",
          match: { likeStatus: "like" },
          populate: [{ path: "userClickId" }],
        },
        { path: "postComments", populate: "user_commented_id" },
      ])
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.allFriendsPostsUsingLookup = async (req, res) => {
  try {
    const posts = await postModal.aggregate([
      {
        $match: {
          postUser: {
            $in: req.body.friendsIds.map((userId) =>
              mongoose.Types.ObjectId(userId)
            ),
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: req.body.offset,
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "users",
          localField: "postUser",
          foreignField: "_id",
          as: "postUser",
        },
      },
      { $unwind: "$postUser" },
      {
        $lookup: {
          from: "likes",
          localField: "getLikes",
          foreignField: "_id",
          as: "likeDetails",
          pipeline: [
            {
              $match: { likeStatus: "like" },
            },
            {
              $lookup: {
                from: "users",
                localField: "userClickId",
                foreignField: "_id",
                as: "likeUser",
              },
            },
            { $unwind: "$likeUser" },
          ],
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { commentIds: "$postComments" },
          pipeline: [
            {
              $match: { $expr: { $in: ["$_id", "$$commentIds"] } },
            },
            {
              $lookup: {
                from: "users",
                localField: "user_commented_id",
                foreignField: "_id",
                as: "userCommented",
              },
            },
            { $unwind: "$userCommented" },
          ],
          as: "postComments",
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    posts.forEach((element) => {
      element.allLikeUsers = element.likeDetails.map((e) => e.likeUser);
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

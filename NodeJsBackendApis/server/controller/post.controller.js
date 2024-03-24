// All modal imported
var userModel = require("../model/users");
var postModal = require("../model/post-photos");
var likeModal = require("../model/likes");
var commentModal = require("../model/comments");

// create Post
exports.createPost = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json("Photo should be selected");
    }

    const newPost = new postModal({
      status: req.body.status,
      postUrl: "/assets/postStorage/" + file.filename,
      postUser: req.body.user_id,
    });

    const createdPost = await newPost.save();

    if (createdPost) {
      const updatedUser = await userModel.updateOne(
        { _id: req.body.user_id },
        { $push: { user_post: createdPost._id } }
      );

      if (updatedUser) {
        return res.json("Post created successfully");
      } else {
        return res
          .status(400)
          .json("Something went wrong while updating user post");
      }
    } else {
      return res.status(400).json("Post creation failed");
    }
  } catch (err) {
    return res
      .status(400)
      .json("Something went wrong while updating user post");
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const file = req.file;
    const filename = file ? `/assets/postStorage/${file.filename}` : undefined;

    const updatedPost = await postModal.updateOne(
      { _id: req.body.id },
      { $set: { status: req.body.status, postUrl: filename } }
    );

    res.json(
      updatedPost.modifiedCount
        ? "Post Updated Successfully"
        : "Post Update Failed"
    );
  } catch (err) {
    res.status(400).json("Post Update Failed");
  }
};

// Get Posts
exports.getPost = async (req, res) => {
  try {
    const response = await postModal
      .find()
      .sort({ createdAt: -1 })
      .populate([
        { path: "postUser" },
        {
          path: "getLikes",
          match: { likeStatus: "like" },
          populate: [{ path: "userClickId" }],
        },
        { path: "postComments", populate: "user_commented_id" },
      ]);

    res.json(response || []);
  } catch (err) {
    res.status(400).json("Something went wrong");
  }
};

//Delete Posts
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await postModal.deleteOne({ _id: req.params.id });
    if (deletedPost.deletedCount) {
      res.json("Deleted Post ");
    } else {
      res.status(400).json("Post not found");
    }
  } catch (err) {
    res.status(400).json("Something Wrong Please try again ");
  }
};

// Search Post
exports.searchPost = async (req, res) => {
  try {
    if (req.body.search) {
      const regex = new RegExp(req.body.search, "i");
      const response = await postModal
        .find({ status: regex })
        .populate("postUser");

      res.json(response || []);
    } else {
      res.json([]);
    }
  } catch (err) {
    res.status(400).json("Not found");
  }
};

exports.like = async (req, res) => {
  try {
    const { post_photo_id, user_id, userClickId,isLike } = req.body;

    let checkLike = await likeModal.findOne({
      post_photo_id,
      user_id,
      userClickId,
    });

    if (checkLike) {
      const updateStatus = isLike  ? "like" : "unlike";

      const updateLike = await likeModal.updateOne(
        { post_photo_id, user_id, userClickId },
        { $set: { likeStatus: updateStatus } }
      );

      if (updateLike.modifiedCount) {
        const incValue = updateStatus === "like" ? 1 : -1;

        const updatePost = await postModal.updateOne(
          { _id: post_photo_id },
          { $inc: { likeCounts: incValue } }
        );

        return updatePost
          ? res.json(updateStatus === "like" ? true : false)
          : res
              .status(400)
              .json(`Error occurred while updating ${updateStatus} count`);
      } else {
        return res
          .status(400)
          .json(`Error occurred while updating ${updateStatus}`);
      }
    } else {
      const newLike = new likeModal({
        likeStatus: "like",
        post_photo_id,
        user_id,
        userClickId,
      });

      const saveLike = await newLike.save();

      if (saveLike) {
        const updatePost = await postModal.updateOne(
          { _id: post_photo_id },
          { $push: { getLikes: saveLike._id }, $inc: { likeCounts: 1 } }
        );

        return updatePost.modifiedCount
          ? res.json("Created like")
          : res.status(400).json("Error occurred while updating Post Like");
      } else {
        return res.status(400).json("Something went wrong. Please try again");
      }
    }
  } catch (err) {
    return res.status(400).json("Something went wrong. Please try again");
  }
};

// create Comments
exports.createComment = async (req, res) => {
  try {
    const send = new commentModal({
      comment: req.body.comment,
      post_photo_id: req.body.post_photo_id,
      user_id: req.body.user_id,
      user_commented_id: req.body.user_commented_id,
    });

    const createComment = await send.save();
    if (createComment) {
      const postUpdate = await postModal.updateOne(
        { _id: req.body.post_photo_id },
        {
          $push: {
            postComments: createComment._id,
          },
          $inc: {
            commentCounts: 1,
          },
        }
      );
      return postUpdate
        ? res.json(createComment)
        : res.status(400).json("Something wrong while update post comment");
    } else {
      res.status(400).json("Something wrong please try again");
    }
  } catch (err) {
    res.status(400).json("Something wrong please try again");
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deleteCommentResult = await commentModal.deleteOne({
      _id: req.params.cid,
    });

    if (deleteCommentResult.deletedCount) {
      const postUpdateResult = await postModal.updateOne(
        { _id: req.params.pid },
        { $inc: { commentCounts: -1 } }
      );

      return postUpdateResult
        ? res.json("Deleted Comment")
        : res.status(400).json("Error occurred while updating comment count");
    } else {
      return res
        .status(400)
        .json("Something went wrong while deleting Comment");
    }
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};

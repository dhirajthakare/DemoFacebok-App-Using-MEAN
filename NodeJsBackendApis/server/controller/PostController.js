// All modal imported
var usermodal = require("../model/users");
var postModal = require("../model/post_photos");
var likeModal = require("../model/likes");
var commentModal = require("../model/comments");

//create Post
exports.createPost = async (req, res) => {
  try {
    var file = req.file;

    if (!file) {
      res.status(400).json("Photo Should be selected");
    }

    var send = new postModal({
      status: req.body.status,
      postUrl: "/assets/postStorage/" + file.filename,
      postUser: req.body.user_id,
    });

    let createPost = await send.save();

    if (createPost) {
      let updateduserPostid = await usermodal.updateOne(
        { _id: req.body.user_id },
        {
          $push: {
            user_post: createPost._id,
          },
        }
      );

      if (updateduserPostid) {
        res.json("Post Created  Successfully");
      } else {
        res.status(400).json("somthing wrong while update User Post");
      }
    } else {
      res.status(400).json(err + "Post Updated Failed ");
    }
  } catch (err) {
    res.status(400).json("somthing wrong while update User Post");
  }
};

//Update Post
exports.updatePost = async (req, res) => {
  try {
    var file = req.file;
    var filename;
    if (file) {
      filename = "/assets/postStorage/" + file.filename;
    }

    let updatedPost = await postModal.updateOne(
      { _id: req.body.id },
      {
        $set: {
          status: req.body.status,
          postUrl: filename,
        },
      }
    );
    if (updatedPost.modifiedCount) {
      res.json(" Post Updated Successfully ");
    } else {
      res.status(400).json(" Post Updation Failed ");
    }
  } catch (err) {
    res.status(400).json(" Post Updation Failed ");
  }
};

//Get Posts
exports.getPost = async (req, res) => {
  try {
    let responce = await postModal
      .find()
      .sort({ createdAt: -1 })
      .populate([
        { path: "postUser" },
        {
          path: "getlikes",
          match: { likeStatus: "like" },
          populate: [{ path: "userclick_id" }],
        },
        { path: "postcomment", populate: "usercomment_id" },
      ]);
    if (responce) {
      res.json(responce);
    } else {
      res.status(400).json("somthing wrong");
    }
  } catch (err) {
    res.status(400).json("somthing wrong");
  }
};

//Delete Posts
exports.deletePost = async (req, res) => {
  try {
    let deletedPost = await postModal.deleteOne({ _id: req.params.id });
    if (deletedPost.deletedCount) {
      res.json("deleted successfuly ");
    } else {
      res.status(400).json("This post is not available");
    }
  } catch (err) {
    res.status(400).json("Somthing Wrong Please try again ");
  }
};

//search Post
exports.searchPost = async (req, res) => {
  try {
    if (req.body.search) {
      regex = new RegExp(req.body.search, "i");
      let responce = await postModal
        .find({ $or: [{ status: regex }] })
        .populate("postUser");

      if (responce) {
        res.json(responce);
      } else {
        res.status(400).json(" Not found ");
      }
    } else {
      res.json();
    }
  } catch {
    res.status(400).json(" Not found ");
  }
};

//like and dislike

exports.like = async (req, res) => {
  try {
    let checklike = await likeModal.findOne({
      post_photo_id: req.body.post_photo_id,
      user_id: req.body.user_id,
      userclick_id: req.body.userclick_id,
    });

    if (checklike) {
      if (checklike.likeStatus == "like") {
        let updatelike = await likeModal.updateOne(
          {
            post_photo_id: req.body.post_photo_id,
            user_id: req.body.user_id,
            userclick_id: req.body.userclick_id,
          },
          {
            $set: {
              likeStatus: "unlike",
            },
          }
        );
        if (updatelike.modifiedCount) {
          let postupdate = await postModal.updateOne(
            { _id: req.body.post_photo_id },
            {
              $inc: {
                likeCounts: -1,
              },
            }
          );
          if (postupdate.modifiedCount) {
            res.json("update to unlike");
          } else {
            res.status(400).json("error comes while update unlike count");
          }
        } else {
          res.status(400).json("error come while remove like ");
        }
      } else if (checklike.likeStatus == "unlike") {
        let updatelike = await likeModal.updateOne(
          {
            post_photo_id: req.body.post_photo_id,
            user_id: req.body.user_id,
            userclick_id: req.body.userclick_id,
          },
          {
            $set: {
              likeStatus: "like",
            },
          }
        );
        if (updatelike.modifiedCount) {
          let updatePost = await postModal.updateOne(
            { _id: req.body.post_photo_id },
            {
              $inc: {
                likeCounts: 1,
              },
            }
          );
          if (updatePost) {
            res.json("update to like");
          } else {
            res.status(400).json("error comes while update like count");
          }
        } else {
          res.status(400).json("error come while add like ");
        }
      } else {
        res.status(400).json("Somthing Wrong");
      }
    } else {
      var send = new likeModal({
        likeStatus: "like",
        post_photo_id: req.body.post_photo_id,
        user_id: req.body.user_id,
        userclick_id: req.body.userclick_id,
      });

      let saveLike = await send.save();
      if (saveLike) {
        let updatePost = await postModal.updateOne(
          { _id: req.body.post_photo_id },
          {
            $push: {
              getlikes: saveLike._id,
            },
            $inc: {
              likeCounts: 1,
            },
          }
        );
        if (updatePost.modifiedCount) {
          res.json("Creted like ");
        } else {
          res.status(400).json("Somthing Wrong While Update Post Like");
        }
      } else {
        res.status(400).json("somthing wrong Please try Again 1");
      }
    }
  } catch (err) {
    res.status(400).json("somthing wrong Please try Again 2");
  }
};

// create Comments
exports.createComment = async (req, res) => {
  try {
    var send = new commentModal({
      comment: req.body.comment,
      post_photo_id: req.body.post_photo_id,
      user_id: req.body.user_id,
      usercomment_id: req.body.usercomment_id,
    });

    let createComment = await send.save();
    if (createComment) {
      let postupdate = await postModal.updateOne(
        { _id: req.body.post_photo_id },
        {
          $push: {
            postcomment: createComment._id,
          },
          $inc: {
            commentCounts: 1,
          },
        }
      );
      if (postupdate) {
        res.json(" Comment Added Successfully ");
      } else {
        res.status(400).json("Somthing wrong while wpdate post comment");
      }
    } else {
      res.status(400).json("Somthing wrong please try again");
    }
  } catch (err) {
    res.status(400).json("Somthing wrong please try again");
  }
};

//deleteComments
exports.deleteComment = async (req, res) => {
  try {
    let deleteComment = await commentModal.deleteOne({ _id: req.params.cid });
    if (deleteComment.deletedCount) {
      let postupdate = await postModal.updateOne(
        { _id: req.params.pid },
        {
          $inc: {
            commentCounts: -1,
          },
        }
      );
      if (postupdate) {
        res.json("Deleted Comment");
      } else {
        res.status(400).json("error comes while update comment count");
      }
    } else {
      res.status(400).json("Somthing wrong while delete Comment");
    }
  } catch (err) {
    res.status(400).json("Somthing wrong");
  }
};

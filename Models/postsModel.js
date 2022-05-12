const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  commentBody: String,
  creatorName: String,
  creatorImage: String,
  likes: Number,
  creator: { ref: "user", type: mongoose.Types.ObjectId },
  time: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = mongoose.Schema({
  creator: { ref: "user", type: mongoose.Types.ObjectId },
  creatorName: String,
  creatorImage: String,
  postBody: String,
  likes: Number,
  tags: String,
  comments: [commentSchema],
  createDate: {
    type: Date,
    default: Date.now,
  },
});

var Post = mongoose.model("posts", postSchema);

const get = (callback, limit) => {
  Post.find(callback).limit(limit);
};
const Comment = mongoose.model("comments", commentSchema);

module.exports = {
  get,
  Post,
  Comment,
};

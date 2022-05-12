const { Post, Comment } = require("../Models/postsModel");
const User = require("../Models/usersModel");

//Get All Posts
exports.getPosts = (req, res) => {
  Post.find({})
    .sort("-createDate")
    .limit(100)
    .exec((err, posts) => {
      !err
        ? res.json({
            status: "success",
            message: "Fetched posts successfully.",
            data: posts,
          })
        : res.json({
            status: "failure",
            message: "Failled t load posts",
            error: err,
          });
    });
};

//Create new post:
exports.newPost = (req, res) => {
  let post = new Post();
  post.postBody = req.body.postBody;
  post.likes = req.body.likes;
  post.comments = req.body.comments;
  post.tags = req.body.tags;
  post.creator = req.body.creator;
  post.creatorName = req.body.creatorName;
  post.creatorImage = req.body.creatorImage;

  post.save((err) => {
    err ? res.json({ err }) : res.json({ message: "Post Create", data: post });
  });
};

//View single post:
exports.getOnePost = (req, res) => {
  Post.findById(req.params.postId, (err, post) => {
    err ? res.json(err) : res.json({ message: "Post lading", data: post });
  });
};

// Delete post
exports.delete = (req, res) => {
  Post.remove(
    {
      _id: req.params.postId,
    },
    (err, post) => {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Post deleted",
      });
    }
  );
};

//Update post
exports.update = (req, res) => {
  Post.findById(req.params.postId, (err, post) => {
    if (err) res.send(err);
    post.postBody = req.body.postBody ? req.body.postBody : post.postBody;
    post.likes = req.body.likes ? req.body.likes : post.likes;
    post // save the post
      .save((err) => {
        if (err) res.json(err);
        res.json({
          message: "Post Info updated",
          data: post,
        });
      });
  });
};

//Adding a new comment
exports.newComment = (req, res) => {
  Post.findById(req.params.postId, async (err, post) => {
    if (err) res.send(err);
    try {
      if (!post) res.status(404).send("Post not found").end();
      else {
        console.log("Req body:", req.body);
        let comment = new Comment({ ...req.body });
        console.log("\nComment", comment);
        post.comments = await [...post.comments, comment];

        post.save((err, result) => {
          if (err) res.json(err);
          else {
            res.json({
              message: "Comment created",
              data: result,
            });
          }
        });
      }
    } catch (error) {
      res.json(err);
    }
  });
};

exports.getFriendsPosts = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    let friends = user.friendsId;
    let i;
    let posts = [];
    for (i in friends) {
      let post = Post.findAll({ friendsId: friendsId[i] });
      posts = [...posts, ...post];
      posts.sort();
    }
  });
};

//Get All Friends Posts
exports.getFriendsPosts = (req, res) => {
  User.findById(req.params.userId, async (err, user) => {
    let friends = user.friendsId;
    let friendsPost = [];
    let posts;

    for (i in friends) {
      posts = await Post.find({ _id: friends[i] });
      friendsPost.push(posts);
    }
    res.json(friendsPost);
  });
};

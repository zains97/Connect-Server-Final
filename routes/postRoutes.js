const router = require("express").Router();
const postController = require("../Controllers/postController");
const authVerify = require("./authVerify");

//Defining apis for posts
router.route("/").get(postController.getPosts).post(postController.newPost);

router.route("/friends-post/:userId").get(postController.getFriendsPosts);

router
  .route("/onepost/:postId")
  .put(postController.update)
  .patch(postController.update)
  .delete(postController.delete)
  .get(postController.getOnePost);

router.put("/new-comment/:postId", postController.newComment);

module.exports = router;

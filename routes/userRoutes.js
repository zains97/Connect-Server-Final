const router = require("express").Router();
const userController = require("../Controllers/userController");

//Defining apis for users
router.route("/").get(userController.getUsers).post(userController.newUser);

router.patch("/add-friend/:userId", userController.addFriend);

router
  .route("/user/:userId")
  .get(userController.getOneUser)
  .patch(userController.updateUserInfo)
  .put(userController.updateUserInfo)
  .delete(userController.deleteUser);

router.route("/friends/:userId").get(userController.getFriends);

router.route("/upload-photo").put(userController.uploadPhoto);

module.exports = router;

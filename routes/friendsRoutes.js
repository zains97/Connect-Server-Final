const router = require("express").Router();
const friendsController = require("../Controllers/friendsController");

router.post("/send-request", friendsController.sendFriendRequest);
router.get("/get-requests/:recipientId", friendsController.getFriendRequests);

module.exports = router;

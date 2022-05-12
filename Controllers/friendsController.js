const { FriendRequest } = require("../Models/friendRequestModel");
const User = require("../Models/usersModel");

exports.sendFriendRequest = (req, res) => {
  const friendRequest = new FriendRequest();
  friendRequest.requester = req.body.requester;
  friendRequest.recipient = req.body.recipient;
  friendRequest.status = req.body.status;

  if (req.body.requester !== req.body.recipient) {
    friendRequest.save((err) => {
      if (err) res.json(err);
      res.json({
        status: 200,
        message: "Friend request sent",
        data: friendRequest,
      });
    });
  } else {
    res.send("Requestor and recipient are same");
  }
};

exports.getFriendRequests = (req, res) => {
  FriendRequest.find(
    { recipient: req.params.recipientId },
    (err, friendRequests) => {
      try {
        if (err) res.send(err);
        res.status(200).json({
          message: "Got all friend requests for user",
          data: friendRequests,
          status: 200,
        });
      } catch (error) {
        res.send(error);
      }
    }
  );
};

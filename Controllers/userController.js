const User = require("../Models/usersModel");
const bcrypt = require("bcryptjs");
const { use } = require("../routes/userRoutes");

//Get all the users
exports.getUsers = (req, res) => {
  User.get((err, users) => {
    !err
      ? res.json({
          status: "Success",
          message: "Successfuly retrived users",
          data: users,
        })
      : res.json({ status: "Failed", error: err });
  });
};

//Get one user from params
exports.getOneUser = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    !err
      ? res.json({
          status: "Success",
          message: "Retrived users data",
          data: user,
        })
      : res.json({ status: "Failed", error: err });
  });
};

//New user
exports.newUser = (req, res) => {
  const user = new User();
  user.uId = req.body.uId;
  user.fistName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.gender = req.body.gender;
  user.currentLocation = req.body.currentLocation;
  user.dob = req.body.dob;
  user.isAdmin = req.body.isAdmin;
  user.interests = req.body.interests;
  user.friendsId = req.body.friendsId;
  user.chatID = req.body.chatID;
  user.postID = req.body.postID;

  user.save((err) => {
    if (err) res.json(err);
    res.json({ message: "User info updated", data: user });
  });
};

//Update user Info
exports.updateUserInfo = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    err ? res.json(err) : null;
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    user.dob = req.body.dob || user.dob;

    user.save((err) => {
      if (err) res.json(err);
      res.json({ message: "User info updated", data: user });
    });
  });
};

//Delete user
exports.deleteUser = (req, res) => {
  User.remove({ _id: req.params.userId }, (err) => {
    err
      ? res.send(err)
      : res.json({ status: "success", message: "User info deleted" });
  });
};

//Add friends
exports.addFriend = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) res.send(err);
    if (user.friendsId.includes(req.body.friendsId))
      res.send("Already freinds with this person");

    user.friendsId = [...user.friendsId, req.body.friendsId];
    user.save((err) => {
      if (err) res.json(err);
      res.json({ message: "Friend added", data: user });
    });
  });
};

//Get friends
exports.getFriends = (req, res) => {
  User.findById(req.params.userId, async (err, user) => {
    if (err) {
      res.send(err);
    } else {
      try {
        let friends = await user.friendsId;
        res.send(friends);
      } catch (error) {
        res.send(error);
      }
    }
  });
};

exports.uploadPhoto = (req, res) => {
  User.findById(req.body.userId, (err, user) => {
    err ? res.json(err) : null;
    console.log(req.body.profilePic);
    user.profilePic = req.body.profilePic || user.profilePic;

    user.save((err) => {
      if (err) res.json(err);
      res.json({ message: "Picture uploaded successfully", data: user });
    });
  });
};

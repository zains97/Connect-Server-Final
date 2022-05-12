const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, min: 1, max: 256 },
  lastName: { type: String, required: true, min: 1, max: 256 },
  email: { type: String, required: true, min: 6, max: 256 },
  password: { type: String, required: true, min: 6, max: 1024 },
  gender: { type: String, max: 256 },
  currentLocation: String,
  dob: Date,
  profilePic: String,
  isAdmin: { type: Boolean, default: false },
  interests: [String],
  friendsId: [mongoose.Types.ObjectId],
  friendsRequestedId: [mongoose.Types.ObjectId],
  chatID: [mongoose.Types.ObjectId],
  postID: [mongoose.Types.ObjectId],
  blockedUsers: [mongoose.Types.ObjectId],
});

const User = (module.exports = mongoose.model("user", userSchema));
module.exports.get = (callback, limit) => {
  User.find(callback).limit(limit);
};

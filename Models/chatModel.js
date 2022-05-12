const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  messageBody: String,
  time: { type: Date, default: Date.now },
});

const chatSchema = mongoose.Schema({
  userId: [Number],
  messages: [messageSchema],
});

module.exports.Message = mongoose.model("message", messageSchema);
const Chat = (module.exports = mongoose.model("chat", chatSchema));

module.exports.getChats = (callback, limit) => {
  Chat.find({ callback }).limit(limit);
};

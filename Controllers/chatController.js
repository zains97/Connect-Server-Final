Chat = require("../Models/chatModel");

//Get chats
exports.getAllChats = () => {
  Chat.getChats = (err, chats) => {
    !err
      ? res.json({
          status: "200",
          messaage: "successfully retrieved chats",
          data: chats,
        })
      : res.json({ status: "Failed", error: err });
  };
};

//Create chat
exports.createChat = (req, res) => {
  let chat = new Chat();
  chat.userId = req.body.userId;
  chat.messaages = req.body.messaages;
};

//View single Chat
exports.viewOneChat = (req, res) => {
  Chat.findById(req.params.chat_id, (err, chat) => {
    !err
      ? res.json({ status: "Loading chat", data: chat })
      : res.json({ status: "Failed", error: err });
  });
};

//Delete chats
exports.deleteChat = (req, res) => {
  Chat.remove({ _id: req.params.chat_id }, (err, chat) => {
    !err
      ? res.json({ status: "Success", message: "Deleting chat" })
      : res.send(err);
  });
};

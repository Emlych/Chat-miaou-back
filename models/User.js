const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: { required: true, unique: true, type: String },
  avatar: Object,
  token: String,
  hash: String,
  salt: String,
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatRoom",
  },
});

module.exports = User;

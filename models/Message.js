const mongoose = require("mongoose");

const Message = mongoose.model("Message", {
  text: { type: String, required: true },
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  chatRoom: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatRoom",
  },
  readBy: { type: String },
  createdAt: { type: Date },
});

module.exports = Message;

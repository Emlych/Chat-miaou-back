const mongoose = require("mongoose");

const ChatRoom = mongoose.model("ChatRoom", {
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  roomname: { type: String, default: "new room" },
  messages: [
    {
      messages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
      meta: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          delivered: Boolean,
          read: Boolean,
        },
      ],
    },
  ],
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  isPrivate: { type: Boolean, default: "false" },
});

module.exports = ChatRoom;

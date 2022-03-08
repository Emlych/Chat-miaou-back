const express = require("express");
const router = express.Router();

const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
const User = require("../models/User");

//create a new chatroom
router.post("/chat/create", async (req, res) => {
  console.log("route: /chat/create");
  const tokenUser = req.headers.authorization.replace("Bearer ", "");
  const sender = await User.findOne({ token: tokenUser });
  try {
    const newChatRoom = new ChatRoom({
      sender: sender,
      participants: sender,
      roomname: req.fields.roomname,
      isPrivate: req.fields.isPrivate,
    });
    await newChatRoom.save();
    res.json(newChatRoom);
  } catch (error) {
    res.status(400).json(error);
  }
});

//Get all chatrooms
router.get("/chats", async (req, res) => {
  console.log("route: /chats");
  try {
    const chatrooms = await ChatRoom.find();
    res.json({ chatrooms: chatrooms });
  } catch (error) {
    res.status(400).json(error);
  }
});

//Get specific chatroom by id
router.get("/chat/:id", async (req, res) => {
  console.log("route: /chat/:id");
  try {
    const chatroom = await ChatRoom.findById(req.params.id).populate([
      {
        path: "participants.user",
        select: "username",
        // model: "User",
      },
    ]);
    // .exec((err, user) => {
    //   if (err) {
    //     console.log("error", err);
    //   } else {
    //     console.log("Populated User " + user);
    //   }
    // });
    //const chatroom = await ChatRoom.findById(req.params.id);
    // .populate("participants.user")

    console.log("chatroom info in back: ", chatroom);
    res.json(chatroom);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;

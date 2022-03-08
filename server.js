const express = require("express");
const http = require("http");
const io = require("socket.io")(http);
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chat-miaou");
mongoose.connect("mongodb://localhost/chat-miaou");

//import routes
const userRoutes = require("./routes/user");
app.use(userRoutes);
const chatRoutes = require("./routes/chat");
app.use(chatRoutes);

//Page not found
app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found." });
});

//launch server
//app.listen(process.env.PORT || 4000, () => {
app.listen(4000, () => {
  console.log("Server has started");
});

//socket listener
io.on("connection", (socket) => {
  console.log("new client connected");
});

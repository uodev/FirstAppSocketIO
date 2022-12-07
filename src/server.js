const express = require("express");
const socket = require("socket.io");
const app = express();
const server = app.listen(3000);

app.use(express.static("src/public"));

const io = socket(server);

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

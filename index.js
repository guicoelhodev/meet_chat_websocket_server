const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

// socket session

const historyMessages = [];

io.on("connection", (socket) => {
  io.emit("getHistoricMessages", historyMessages);
  socket.on("sendMessageToServer", (data, type) => {
    historyMessages.push(data);

    io.emit("resendMessageToApp", data);
  });
});

// connection port

server.listen(3000, () => {
  console.log("Server running on port: 3000");
});

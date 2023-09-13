const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: '*',
    methods:["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("a user connected.");

  socket.on("hello", (data) => {
    console.log(data);


    socket.emit("hellofromsv", "hello from server")
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("sever is running at port ", process.env.PORT || 5000);
});

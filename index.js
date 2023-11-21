const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const isDev = app.settings.env === "development";
const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

const URL = isDev
  ? `http://localhost:${PORT}`
  : "https://sketch-board-front-12tvzevvq-2020mandarambre-vesacin.vercel.app";

app.use(cors({ origin: URL }));

const io = new Server(httpServer, { cors: { origin: URL } });

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("server connected");

  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });

  socket.on("drawLine", (arg) => {
    socket.broadcast.emit("drawLine", arg);
  });

  socket.on("changeConfig", (arg) => {
    socket.broadcast.emit("changeConfig", arg);
  });
});

httpServer.listen(5000);

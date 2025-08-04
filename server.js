const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store messages, events, and actions
let gameLog = [];

io.on("connection", (socket) => {
  console.log("🔥 New player connected");

  // Send current game state to the new player
  socket.emit("gameLog", gameLog);

  // Listen for actions from ChatGPT/MMO client
  socket.on("action", (data) => {
    console.log("📜 Action received:", data);

    // Save the action and broadcast to all players
    gameLog.push(data);
    io.emit("gameUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Player disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Sacred System MMO server running on port ${PORT}`);
});

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let players = {}; // Store players and XP data

app.get("/", (req, res) => {
  res.send("🔥 Sacred System MMO Server is Running!");
});

// Handle new connections
io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  // Initialize new player
  players[socket.id] = { level: 1, xp: 0 };
  socket.emit("hud update", players[socket.id]);

  // Handle player actions
  socket.on("player action", (action) => {
    let player = players[socket.id];
    player.xp += 10; // Example XP gain
    if (player.xp >= player.level * 100) {
      player.level++;
      player.xp = 0;
    }
    io.emit("atlas message", `Player ${socket.id} did ${action}`);
    io.emit("hud update", player);
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
    delete players[socket.id];
  });
});

// Render will use this port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

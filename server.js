const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

let players = [];

io.on("connection", (socket) => {
  console.log("🔌 مستخدم متصل");

  socket.on("joinGame", (name) => {
    const player = { id: socket.id, name };
    players.push(player);
    socket.emit("welcome", { message: "أهلاً بك يا " + name });
    io.emit("updatePlayers", players);
  });

  socket.on("disconnect", () => {
    players = players.filter(p => p.id !== socket.id);
    io.emit("updatePlayers", players);
  });
});

server.listen(PORT, () => {
  console.log("🚀 السيرفر شغال على المنفذ " + PORT);
});

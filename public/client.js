const socket = io();
const startBtn = document.getElementById("startBtn");
const playerNameInput = document.getElementById("playerName");
const mainScreen = document.getElementById("main-screen");
const gameScreen = document.getElementById("game-screen");

startBtn.onclick = () => {
  const name = playerNameInput.value.trim();
  if (name) {
    socket.emit("joinGame", name);
    mainScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  }
};

socket.on("welcome", (data) => {
  alert(data.message);
});

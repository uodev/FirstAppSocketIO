const socket = io.connect("https://firstchatappsocket.onrender.com");

const sender = document.getElementById("sender");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submit");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

submitBtn.addEventListener("click", () => {
  socket.emit("chat", { message: message.value, sender: sender.value });
  message.value = "";
});

socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.sender + " :</strong> " + data.message + "</p>";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", sender.value);
});

socket.on("typing", (data) => {
  feedback.innerHTML = "<p>" + data + " yazıyor...</p>";
});

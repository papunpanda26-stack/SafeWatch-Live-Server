const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.get("/", (req, res) => {
    res.send("✅ SafeWatch Live Server Running");
});

io.on("connection", (socket) => {

    console.log("Device Connected :", socket.id);

  socket.on("camera-frame", (frame) => {

    console.log("📷 Camera Frame Received");

    socket.broadcast.emit("camera-frame", frame);

});
    socket.on("disconnect", () => {
        console.log("Device Disconnected :", socket.id);
    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("SafeWatch Server Running On Port", PORT);
});

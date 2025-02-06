import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { addMessage, getMessages } from "../utils/messages.js";

export const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //console.log(`User connected: ${socket.id}`);
  socket.emit("initial_data", { message: "Hello from server" });
  socket.on("join_room",async(data) => {
    //console.log("Join room:", data.team_id, data.channel_id);
    const key=data.team_id + "." + data.channel_id;
    socket.join(data.team_id + "." + data.channel_id);
    const prev_messages=await getMessages(data.team_id, data.channel_id);
    socket.broadcast.to(key).emit("prev_messages", prev_messages);
  });

  socket.on("get_messages", (data) => {
    const { team_id, channel_id } = data;
    const key = team_id + "." + channel_id;
    getMessages(team_id, channel_id).then((messages) => {
      socket.broadcast.to(key).emit("receive_messages", messages);
    });
  }); 

  socket.on("send_message", (data) => {
    const { team_id, channel_id } = data;
    const key = team_id + "." + channel_id;
    //console.log("Message received:", data);
    addMessage(data.message);
    socket.broadcast.to(key).emit("receive_message", data.message);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(4000, () => {
  console.log("socket running on http://localhost:4000");
});

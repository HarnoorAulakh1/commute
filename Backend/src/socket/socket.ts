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
  console.log(`User connected: ${socket.id}`);
  socket.emit("initial_data", { message: "Hello from server" });
  socket.on("join_room", async (data) => {
    //console.log("Join room:", data.team_id, data.channel_id);
    const key = data.team_id + "." + data.channel_id;
    socket.join(data.team_id + "." + data.channel_id);
    //console.log("key:", key);
    const prev_messages = await getMessages(data.team_id, data.channel_id);
    socket.broadcast.to(key).emit("prev_messages", prev_messages);
  });

  // socket.on("dm", (data) => {
  //   const key = data.sender_id + "." + data.receiver_id;
  //   socket.join(key);
  // });

  socket.on("send_message", async (data) => {
    const { team_id, channel_id } = data;
    const key = team_id + "." + channel_id;
    console.log("key:", key);
    const result=await addMessage(data.message);
    console.log("result",result);
    if(result)
    socket.broadcast.to(key).emit("receive_message",{...data.message,file:{...data.message.file,link:result.url}});
    else
    socket.broadcast.to(key).emit("receive_message", data.message);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(4000, () => {
  console.log("socket running on http://localhost:4000");
});

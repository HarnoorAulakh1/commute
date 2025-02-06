import { writeFile } from "fs";
import { uploadToCloudinary } from "./cloudinary.js";
import { messages } from "../types";
import { Message } from "../models/message.js";

export async function getMessages(team_id: string, channel_id: string) {
    try {
        const messages=await Message
        .find({team_id,channel_id});
        return messages;
    } catch (error) {
        return error;
    }
}      

export async function addMessage(data: messages) {
  const { sender_id, receiver_id, message, channel_id, team_id, file,image,name } = data;
  console.log("data=",data);
  const newMessage = new Message({
    name,
    sender_id: sender_id,
    receiver_id: receiver_id,
    message,
    channel_id: channel_id,
    team_id: team_id,
    file: {
      type: file && file.type,
      link: "",
      name: file && file.name,
    },
    time: new Date(),
    image,
  });
  if (newMessage.file!=null && newMessage.file!=undefined && newMessage.file.name!='' && newMessage.file.name!=undefined && newMessage.file.type!='' && newMessage.file.type!=undefined) {
    const upload = addFile(file);
    const result=await uploadToCloudinary(upload,newMessage.file.type.split("/")[1]);
    console.log(result);
    newMessage.file={
      type: file && file.type,
      link: result.url,
      name: file && file.name,
    };
  }
  await newMessage.save();
}

export function addFile(file: any) {
  const path = "/Users/harnoorsinghaulakh/Desktop/Projects/commute/backend/src/uploads/" + file.name;
  writeFile(path, file.link, (err: any) => {
    if (err) console.log(err);
  });
  return path;
}

import { writeFile } from "fs";
import { uploadToCloudinary } from "./cloudinary.js";
import { messages } from "../types";
import { Message } from "../models/message.js";
import ObjectId from "bson-objectid";

export async function getMessages(team_id: string, channel_id: string) {
  try {
    const messages = await Message.find({ team_id, channel_id });
    return messages;
  } catch (error) {
    return error;
  }
}

export async function addMessage(data: messages) {
  const {
    sender_id,
    receiver_id,
    message,
    channel_id,
    team_id,
    file,
    image,
    name,
  } = data;
  const newMessage = new Message({
    name,
    sender_id: new ObjectId(sender_id),
    receiver_id: new ObjectId(receiver_id),
    message,
    team_id,
    ...(channel_id ? { channel_id: new ObjectId(channel_id) } : {}),
    file: {
      type: file?.type || "",
      link: "",
      name: file?.name || "",
    },
    image,
  });
  let result;
  if (
    newMessage.file != null &&
    newMessage.file != undefined &&
    newMessage.file.name != "" &&
    newMessage.file.name != undefined &&
    newMessage.file.type != "" &&
    newMessage.file.type != undefined
  ) {
    const upload = addFile(file);
    result = await uploadToCloudinary(
      upload,
      newMessage.file.type.split("/")[1]
    );
    newMessage.file = {
      type: file && file.type,
      link: result.url,
      name: file && file.name,
    };
  }
  await newMessage.save();
  return result;
}

export function addFile(file: any) {
  const path =
    "/Users/harnoorsinghaulakh/Desktop/Projects/commute/backend/src/uploads/" +
    file.name;
  writeFile(path, file.link, (err: any) => {
    if (err) console.log(err);
  });
  return path;
}

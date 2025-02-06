import { Request, Response } from "express";
import { channel } from "../models/channel.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";
import { team } from "../models/team.js";
import { channel as channelInterface } from "../types.js";
import user from "../models/user.js";
import { notification } from "../models/notifications.js";
import ObjectID from "bson-objectid";

//multer
export const createChannel = async (req: Request, res: Response) => {
  const { name, description, team_id, creater_id } = req.body;
  const { _id } = req.body.user;
  console.log("req.body", req.body);
  const check = await team.find({
    _id: ObjectID(team_id),
    admins: ObjectID(creater_id),
  });
  const check1=await channel.find({team_id:ObjectID(team_id),name:name});
  console.log("check=", check);
  if (check.length == 0 ) {
    res
      .status(401)
      .send(JSON.stringify({ message: "You are not a admin of this team" }));
    return;
  }
  if(check1.length!=0){
    res.status(401).send(JSON.stringify({message:"Channel name already exists"}));
    return;
  }
  const channel1 = new channel({
    name,
    description,
    team_id,
    members: [_id],
  });
  if (req.file && req.file.path) {
    const local = req.file["path"];
    const result = await uploadToCloudinary(local);
    channel1.logo = result.url;
  }
  await channel1.save();
  await user.findByIdAndUpdate(_id, { $push: { channels: channel1._id } });
  await team.findByIdAndUpdate(team_id, { $push: { channels: channel1._id } });
  res.status(200).send({ message: "Channel created successfully" });
};

export const deleteChannel = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const data: channelInterface | null = await channel.findById(_id);
  if (data && data.logo) await deleteFromCloudinary(data.logo);
  await channel.findByIdAndDelete(_id);
  res.status(200).send({ message: "channel deleted successfully" });
};

//multer
export const updateChannel = async (req: Request, res: Response) => {
  const { _id, newData } = req.body;
  if (req.file && req.file.path) {
    const local = req.file["path"];
    const prev = await channel.findById(_id);
    const result = await uploadToCloudinary(local);
    newData.logo = result.url;
    if (prev && prev.logo && prev.logo != "NULL")
      await deleteFromCloudinary(prev.logo);
  }
  await channel.replaceOne({ _id }, newData);
  res.status(200).send({ message: "channel updated successfully" });
};

export const sendRequest = async (req: Request, res: Response) => {
  const { user_id, username, channel, channel_id } = req.body;
  const data = new notification({
    user_id,
    message: `${username} wants to join channel ${channel_id}`,
    type: "channel_request",
  });
  await data.save();
  res.status(200).send(JSON.stringify({ message: "Request sent" }));
};

export const addMember = async (req: Request, res: Response) => {
  const { user_id, channel_id } = req.body;
  await channel.findByIdAndUpdate(channel_id, { $push: { members: user_id } });
  await user.findByIdAndUpdate(user_id, { $push: { channels: channel_id } });
  res.status(200).send({ message: "Member added successfully" });
};

export const removeMember = async (req: Request, res: Response) => {
  const { user_id, channel_id } = req.body;
  await channel.findByIdAndUpdate(channel_id, { $pull: { members: user_id } });
  await user.findByIdAndUpdate(user_id, { $pull: { channels: channel_id } });
  res.status(200).send({ message: "Member removed successfully" });
};

export const getChannels = async (req: Request, res: Response) => {
  const { team_id } = req.query;
  console.log("teams_id", req.query);
  const data = await channel.find({ team_id: team_id });
  //console.log("data", data);
  res.status(200).send(JSON.stringify(data));
};

export const getChannel = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const data = await channel.findById(_id);
  res.status(200).send(data);
};

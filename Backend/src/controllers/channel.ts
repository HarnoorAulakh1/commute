import { Request, Response } from "express";
import { channel } from "../models/channel.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import { team } from "../models/team";

//multer
export const createChannel = async (req: Request, res: Response) => {
  const { name, description, team_id } = req.body;
  const channel1 = new channel({
    name,
    description,
    team_id,
  });

  if (req.file && req.file.path) {
    const local = req.file["path"];
    const result = await uploadToCloudinary(local);
    channel1.logo = result.url;
  }
  await channel1.save();
  res.status(200).send(channel1);
};

export const deleteChannel = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const data:channe = await channel.findById(_id);
  if(data.logo)
  await deleteFromCloudinary(data.logo);
  await channel.findByIdAndDelete(_id);
  res.status(200).send({ message: "channel deleted successfully" });
};

//multer
export const updateChannel = async (req: Request, res: Response) => {
  const { _id, newData } = req.body;
  if (req.file && req.file.path) {
    const local = req.file["path"];
    const result = await uploadToCloudinary(local);
    newData.logo = result.url;
  }
  await channel.findByIdAndUpdate(_id, newData);
  res.status(200).send({ message: "channel updated successfully" });
};

export const getChannels = async (req: Request, res: Response) => {
  const { teams_id } = req.body;
  const data = await channel.find({ team_id: teams_id });
  res.status(200).send(data);
};

export const getChannel = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const data = await channel.findById(_id);
  res.status(200).send(data);
};

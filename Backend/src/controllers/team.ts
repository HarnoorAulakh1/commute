import { Request, Response } from "express";
import { team } from "../models/team.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { team as teamInterface, userInterface } from "../types.js";
import user from "../models/user.js";
import { check } from "../middleware/auth";
import { notification } from "../models/notifications.js";

//multer
export const createTeam = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const team1 = new team({
    name,
    description,
  });

  if (req.file && req.file.path) {
    const local = req.file["path"];
    const result = await uploadToCloudinary(local);
    team1.logo = result.url;
  }
  await team1.save();
  res.status(200).send(JSON.stringify(team1));
};

export const getTeams = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const data: teamInterface[] = await team.find({ members: { $in: [_id] } });
  res.status(200).send(data);
};

export const getTeam = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const data: teamInterface | null = await team.findById(_id);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(404).send({ message: "Team not found" });
  }
};

//multer
export const updateTeam = async (req: Request, res: Response) => {
  const { _id, newData }: { _id: string; newData: teamInterface } = req.body;
  if (req.file && req.file.path) {
    const local = req.file["path"];
    const result = await uploadToCloudinary(local);
    newData.logo = result.url;
  }
  await team.findByIdAndUpdate(_id, newData);
  res.status(200).send(JSON.stringify({ message: "Settings updated successfully" }));
};

export const deleteTeam = async (req: Request, res: Response) => {
  const { _id } = req.body;
  await team.findByIdAndDelete(_id);
  res.status(200).send(JSON.stringify({ message: "Team deleted successfully" }));
};

export const removeMember = async (req: Request, res: Response) => {
  const { team_id, member_id } = req.body;
  await team.findByIdAndUpdate(team_id, { $pull: { members: member_id } });
  await user.findByIdAndUpdate(member_id, { $pull: { teams: team_id } });
  res.status(200).send({ message: "Member removed successfully" });
};

export const sendRequest = async (req: Request, res: Response) => {
  const { team_id, user_id } = req.body;
  const data = new notification({
    user_id,
    message: `You have been invited to join the team`,
    type: "invite",
  });
  await data.save();
  res.status(200).send(JSON.stringify({ message: "Invite sent successfully" }));
};

export const addMember = async (req: Request, res: Response) => {
  const { team_id, member_id } = req.body;
  const check = await team.find({ _id: team_id, members: { $in: member_id } });
  if (check.length > 0) {
    res.status(401).send(JSON.stringify({ message: "Member already exists" }));
    return;
  }
  await team.findByIdAndUpdate(team_id, { $push: { members: member_id } });
  await user.findByIdAndUpdate(member_id, { $push: { teams: team_id } });
  res.status(200).send(JSON.stringify({ message: "Member added successfully" }));
};

export const searchMembers = async (req: Request, res: Response) => {
  const { query, team_id } = req.body;
  const data: userInterface[] = await user.find({
    name: { $regex: query, $options: "i" },
    teams: { $in: [team_id] },
  });
  res.status(200).send(JSON.stringify(data));
};

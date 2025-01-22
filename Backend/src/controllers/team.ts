import { Request, Response } from "express";
import { team } from "../models/team.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { team as teamInterface, userInterface } from "../types.js";
import user from "../models/user.js";
import { check } from "../middleware/auth";
import { notification } from "../models/notifications.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
import { populate } from '../../node_modules/dotenv/lib/main.d';

//multer
export const createTeam = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const { _id } = req.body.user;
  const check=await team.find({name});
  console.log("req.body.user", req.body.user);
  if(check.length>0){
    res.status(401).send(JSON.stringify({message:"Team name already exists"}));
    return;
  }
  const team1 = new team({
    name,
    description,
    members: [_id],
    admins: [_id],
  });
  await user.findByIdAndUpdate(_id, { $push: { teams: team1._id } });
  if (req.file && req.file.path) {
    console.log("path", req.file.path);
    const local = req.file["path"];
    const result = await uploadToCloudinary(local);
    team1.logo = result.url;
  } else {
    team1.logo = "NULL";
  }
  await team1.save();
  console.log("team1", team1);
  res.status(200).send(JSON.stringify(team1));
};

export const getTeams = async (req: Request, res: Response) => {
  const { _id } = req.body.user;
  const data = await user.find({ _id }).populate("teams");
  //console.log("data", data);
  res.status(200).send(JSON.stringify(data[0]));
};

export const getTeam = async (req: Request, res: Response) => {
  const { _id } = req.body.user;
  const data: teamInterface | null = await team.findById(_id);
  if (data) {
    res.status(200).send(JSON.stringify(data));
  } else {
    res.status(404).send({ message: "Team not found" });
  }
};

//multer
export const updateTeam = async (req: Request, res: Response) => {
  const { _id, newData }: { _id: string; newData: teamInterface } = req.body;
  if (req.file && req.file.path) {
    const local = req.file["path"];
    const prev = await team.findById(_id);
    const result = await uploadToCloudinary(local);
    newData.logo = result.url;
    if (prev && prev.logo && prev.logo != "NULL")
      await deleteFromCloudinary(prev.logo);
  }
  await team.replaceOne({ _id }, newData);
  res
    .status(200)
    .send(JSON.stringify({ message: "Settings updated successfully" }));
};

export const deleteTeam = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const data = await user.updateMany(
    { teams: { $in: [_id] } },
    { $pull: { teams: _id } }
  );
  await team.findByIdAndDelete(_id);
  res
    .status(200)
    .send(JSON.stringify({ message: "Team deleted successfully" }));
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
  res
    .status(200)
    .send(JSON.stringify({ message: "Member added successfully" }));
};

export const searchMembers = async (req: Request, res: Response) => {
  const { query, team_id } = req.body;
  const data: userInterface[] = await user.find({
    name: { $regex: query, $options: "i" },
    teams: { $in: [team_id] },
  });
  res.status(200).send(JSON.stringify(data));
};

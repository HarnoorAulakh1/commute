import { Request, Response } from "express";
import { team } from "../models/team.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { team as teamInterface } from "../types.js";

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
  res.status(200).send(team1);
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
    const {_id,newData}:{_id:string,newData:teamInterface} = req.body;
    if(req.file && req.file.path){
        const local = req.file["path"];
        const result = await uploadToCloudinary(local);
        newData.logo = result.url;
    }
    await team.findByIdAndUpdate(_id, newData);
    res.status(200).send({message:"Settings updated successfully"});
}     

export const deleteTeam = async (req: Request, res: Response) => {
  const { _id } = req.body;
  await team.findByIdAndDelete(_id);
  res.status(200).send({ message: "Team deleted successfully" });
};

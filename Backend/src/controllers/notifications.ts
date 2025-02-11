import { Request, Response } from "express";
import { notification } from "../models/notifications.js";
import ObjectID from "bson-objectid";

export const addNotification=async({user_id,sender_id,team_id, message, type}: {user_id: string,sender_id:string,team_id:string, message: string, type: string})=> {
  const data = new notification({
    user_id,
    message,
    type,
    team_id,
    sender_id
  });
  await data.save();
}

export const  getNotification=async (req: Request, res: Response)=> {
  const { user_id} = req.query;
  //console.log("user_id",user_id);
  const data = await notification
    .find({ user_id })
    .sort({ created_at: -1 })
    .limit(10).populate("sender_id");
    res.status(200).send(JSON.stringify(data));
}

export const deleteNotification=async(req: Request, res: Response)=> {
  const { id } = req.body;
  const id1=ObjectID(id)
  console.log("delete",id1);
  await notification.findByIdAndDelete(id1);
  res.status(200).send(JSON.stringify({message:"Notification Deleted"}));
}


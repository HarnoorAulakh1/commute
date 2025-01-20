import { Request, Response } from "express";
import { notification } from "../models/notifications.js";

export const addNotification=async({user_id, message, type}: {user_id: string, message: string, type: string})=> {
  const data = new notification({
    user_id,
    message,
    type,
  });
  await data.save();
}

export const  getNotification=async (req: Request, res: Response)=> {
  const { user_id } = req.params;
  const data = await notification
    .find({ user_id })
    .sort({ created_at: -1 })
    .limit(10);
    res.status(200).send(JSON.stringify(data));
}

export const deleteNotification=async(req: Request, res: Response)=> {
  const { id } = req.params;
  await notification.findByIdAndDelete(id);
  res.status(200).send("Notification Deleted");
}


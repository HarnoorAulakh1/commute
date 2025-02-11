import { Request, Response } from "express";
import { Message } from "../models/message.js";

export const getMessages = async (req: Request, res: Response) => {
  const { team_id, channel_id } = req.body;
  try {
    if (!channel_id) {
      const messages = await Message.find({
        team_id,
        channel_id: { $exists: false },
      });
      res.status(200).json(messages);
      return;
    }
    const messages = await Message.find({ team_id, channel_id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

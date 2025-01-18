import { Schema } from "mongoose";
import { model } from "mongoose";
import { channels } from "../types";

const schema = new Schema({
  name: { type: String, required: true  unique: true },
  logo: { type: String, required: false },
  channels: [{ type: Schema.Types.ObjectId, ref: "channel" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "user" }],
  members: [{ type: Schema.Types.ObjectId, ref: "user" }],
  saved: [
    {
      type: String,
      link: String,
      name: String,
    },
  ],
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});


export const team = model("team", schema);
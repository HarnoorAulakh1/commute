import { Schema } from "mongoose";
import { model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: false },
  team_id: { type: Schema.Types.ObjectId, ref: "team", required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "user" }],
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

export const channel = model("channel", schema);

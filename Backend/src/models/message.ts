import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Fix capitalization for consistency
  receiver_id: { type: Schema.Types.ObjectId, ref: "User", required: false }, // Fix typo from "reciever" to "receiver"
  message: { type: String, required: true },
  channel_id: { type: Schema.Types.ObjectId, ref: "Channel", required: false }, // Consistent capitalization
  team_id: { type: Schema.Types.ObjectId, ref: "Team", required: true }, // Consistent capitalization
  image: { type: String, required: false },
  name: { type: String, required: true },
  file: {
    name: { type: String, required: false },
    link: { type: String, required: false },
    type: { type: String, required: false },
  },
  created_at: { type: Date, default: Date.now },
});

export const Message = model("Message", messageSchema);

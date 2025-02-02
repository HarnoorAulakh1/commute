import { Schema } from "mongoose";
import { model } from "mongoose";

const schema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    sender_id:{ type: Schema.Types.ObjectId, ref: "user", required: true },
    team_id: { type: Schema.Types.ObjectId, ref: "team" },
    type: { type: String, required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    expiresAfter: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

export const notification = model("notification", schema);

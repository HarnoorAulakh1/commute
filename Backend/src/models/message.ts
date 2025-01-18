import { Schema, model } from "mongoose";

const schema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: "user", required: true },
    reciever: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    channel: { type: Schema.Types.ObjectId, ref: "channel", required: true },
    team: { type: Schema.Types.ObjectId, ref: "team", required: true },
    logo: { type: String, required: false },
    File: {
        type: {
            name: { type: String, required: true },
            url: { type: String, required: true },
            type: { type: String, required: true },
        },
        required: false,
    },
    created_at: { type: Date, default: Date.now },
});

export const message = model("message", schema);


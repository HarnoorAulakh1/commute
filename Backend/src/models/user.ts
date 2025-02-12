import mongoose from "mongoose";
import { Schema } from "mongoose";

// mongoose.connect(
//   "process.env.MONGODB_URI",
// );

mongoose.connect("mongodb+srv://harnooraulakh16:jnTbegLfU2mpiXs0@cluster0.gc5km.mongodb.net/commute");

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
  ],
  channels: [
    {
      type: Schema.Types.ObjectId,
      ref: "channel",
    },
  ],
  darkMode: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model("user", schema);

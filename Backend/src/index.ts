import express from "express";
import user from "./routes/user.js";
import cors from "cors";
import channel from "./routes/channel.js";
import team from "./routes/team.js";
import notification from "./routes/notification.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());

app.use(express.json());
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Include Authorization header
  })
);

app.use("/user", user);
app.use("/team", team);
app.use("/channel", channel);
app.use("/notification", notification);

app.get("/", function (req, res) {
  res.send({ message: "Hello World" });
});

app.listen(port, () => {
  console.log("port running on port ", port);
});

import express from "express";
import user from "./routes/user.js";
import cors from "cors";
const app = express();

app.use(express.json());
const port=process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Include Authorization header
}));

app.use("/user",user);

app.get("/", function (req, res) {
  res.send({ message: "Hello World" });
});

app.listen(port, () => {
  console.log("port running on port ",port);
});

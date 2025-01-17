import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userInterface } from "../types.js";
import { log } from "console";
import createToken from "../utils/jwt.js";
import user from "../models/user.js";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  //console.log(req.body);
  const data: userInterface[] = await user.find({ username: username });
  const user1 = data[0];
  const secret: any = process.env.secret;
  if (!user1) {
    res.status(401).send(JSON.stringify({ message: "Password is incorrect" }));
    return;
  } else {
    if (!(await bcrypt.compare(password, user1.password))) {
      console.log("wrong");
      res
        .status(401)
        .send(JSON.stringify({ message: "Password is incorrect" }));
      return;
    }
  }
  res
    .status(200)
    .cookie("token", createToken({ ...user1, password: "" }), {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60),
    })
    .send(user1);
};
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token").send("Logged out");
};

export const register = async (req: Request, res: Response) => {
  const { email, password, username, firstName, lastName }: userInterface =
    req.body;
  const check = await user.find({
    $or: [{ email: email }, { username: username }],
  });
  //console.log(username, req.file);
  if (check.length != 0) {
    // console.log("check= ", check);
    // console.log("User already exists");
    res.status(409).send(JSON.stringify({ message: "User already exists" }));
    return;
  } else {
    try {
      const password_hashed = await bcrypt.hash(password, 10);
      const newUser = new user({
        email,
        password: password_hashed,
        username,
        firstName,
        lastName,
        status: true,
      });

      if (req.file && req.file.path) {
        const local = req.file["path"];
        const result = await uploadToCloudinary(local);
        newUser.image = result.url;
      } else {
        newUser.image = "NULL";
      }
      await newUser.save();
      res
        .status(200)
        .send(JSON.stringify({ message: "User created successfully" }));
    } catch (e) {
      res
        .status(500)
        .send(JSON.stringify({ message: "Internal server errror" }));
    }
  }
};

export const checkLogin = async (req: Request, res: Response) => {
  const token =
    (req.cookies && req.cookies.token) ||
    (req.headers["authorization"]
      ? JSON.parse(req.headers["authorization"])["value"]
      : null);
  const secret: any = process.env.secret;
  try {
    if (!token) {
      console.log("kya haal ne");
      res.status(401).send({ message: "No token" });
    } else {
      const data: any = jwt.verify(token, secret);

      console.log(data["_doc"]);
      res.status(200).send(data["_doc"]);
    }
  } catch (e) {
    res.status(401).send({ message: "Invalid token" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const data = await user.findById(id);
  res.send(JSON.stringify(data));
};

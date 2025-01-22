import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const check = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    (req.cookies && req.cookies.token) ||
    (req.headers["authorization"]
      ? JSON.parse(req.headers["authorization"])["value"]
      : null);
  const secret: any = process.env.secret;
  //console.log("token",token);
  try {
    const data: any = jwt.verify(token, secret);
    req.body.user = data["_doc"];
    //console.log("token",data["_doc"]);
    next();
  } catch (err) {
    res.status(401).send(JSON.stringify({message:"Invalid token"}));
  }
};

import { Router } from "express";
import {
  login,
  register,
  checkLogin,
  getUser,
  logout,
} from "../controllers/user.js";
import {upload} from "../utils/multer.js";
import { check } from "../middleware/auth.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(upload.single("image"),register);
router.route("/logout").post(logout);
router.route("/checkLogin").get(checkLogin);
router.route("/getUser/:id").get(getUser);
 
export default router;

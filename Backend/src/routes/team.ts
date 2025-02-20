import {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  checkAdmin,
  makeAdmin,
  removeAdmin,
} from "../controllers/team.js";
import {
  addMember,
  removeMember,
  sendRequest,
  searchMembers,
} from "../controllers/team.js";
import { Router } from "express";
import { upload } from "../utils/multer.js";
import {check} from "../middleware/auth.js";

const router = Router();

router.route("/createTeam").post(upload.single("logo"),check, createTeam);
router.route("/getTeams").get(check,getTeams);
router.route("/getTeam").get(check,getTeam);
router.route("/updateTeam").post(upload.single("logo"),check, updateTeam);
router.route("/deleteTeam").delete(check,deleteTeam);
router.route("/removeMember").delete(check,removeMember);
router.route("/makeAdmin").post(check,makeAdmin);
router.route("/removeAdmin").delete(check,removeAdmin);
router.route("/addMember").post(check,addMember);
router.route("/sendRequest").post(check,sendRequest);
router.route("/searchMembers").get(check,searchMembers);
router.route("/checkAdmin").get(check,checkAdmin);

export default router;
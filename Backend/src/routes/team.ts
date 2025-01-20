import {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/team.js";
import {
  addMember,
  removeMember,
  sendRequest,
  searchMembers,
} from "../controllers/team.js";
import { Router } from "express";
import { upload } from "../utils/multer.js";

const router = Router();

router.route("/createTeam").post(upload.single("logo"), createTeam);
router.route("/getTeams").get(getTeams);
router.route("/getTeam").get(getTeam);
router.route("/updateTeam").post(upload.single("logo"), updateTeam);
router.route("/deleteTeam").delete(deleteTeam);
router.route("/removeMember").delete(removeMember);
router.route("/addMember").post(addMember);
router.route("/sendRequest").post(sendRequest);
router.route("/searchMembers").get(searchMembers);

export default router;
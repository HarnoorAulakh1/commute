import {Router} from "express";
import {check} from "../middleware/auth.js";
import {getMessages} from "../controllers/message.js";

const router = Router();

router.route("/getMessages").post(check,getMessages);

export default router;
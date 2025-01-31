import {Router} from "express";
import {getNotification,deleteNotification} from "../controllers/notifications.js";
import {check} from "../middleware/auth.js";

const router = Router();

router.route("/getNotification").get(check,getNotification);
router.route("/deleteNotification").delete(check,deleteNotification);

export default router;
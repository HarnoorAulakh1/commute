import {Router} from 'express';
import { createChannel, deleteChannel,sendRequest,removeMember,addMember, getChannel, getChannels, updateChannel } from '../controllers/channel.js';
import {upload} from '../utils/multer.js';
import {check} from '../middleware/auth.js';
const router = Router();

router.route('/createChannel').post(upload.single("logo"),check,createChannel);
router.route('/deleteChannel').delete(check,deleteChannel);
router.route('/updateChannel').post(check,upload.single("logo"),updateChannel);
router.route('/getChannels').get(check,getChannels);
router.route('/getChannel').get(check,getChannel);
router.route('/sendRequest').post(check,sendRequest);
router.route('/removeMember').delete(check,removeMember);
router.route('/addMember').post(check,addMember);

export default router;
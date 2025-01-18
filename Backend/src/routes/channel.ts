import {Router} from 'express';
import { createChannel, deleteChannel, getChannel, getChannels, updateChannel } from '../controllers/channel.js';
import {upload} from '../utils/multer.js';
const router = Router();

router.route('/createChannel').post(upload.single("logo"),createChannel);
router.route('/deleteChannel').delete(deleteChannel);
router.route('/updateChannel').post(upload.single("logo"),updateChannel);
router.route('/getChannels').get(getChannels);
router.route('/getChannel').get(getChannel);

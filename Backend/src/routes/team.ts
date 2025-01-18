import {createTeam,getTeams,getTeam,updateTeam,deleteTeam} from '../controllers/team.js';
import {Router} from 'express';
import {upload} from '../utils/multer.js';

const router=Router();

router.route('/createTeam').post(upload.single("logo"),createTeam);
router.route('/getTeams').get(getTeams);
router.route('/getTeam').get(getTeam);
router.route('/updateTeam').post(upload.single("logo"),updateTeam);
router.route('/deleteTeam').delete(deleteTeam);


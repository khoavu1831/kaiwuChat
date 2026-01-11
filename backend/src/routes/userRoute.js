import express from 'express'
import {authMe, test} from '../controllers/userController.js'

const router = express.Router();

router.use('/me', authMe);

router.use('/test', test);

export default router;
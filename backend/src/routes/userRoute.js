import express from 'express'
import { authMe, test, searchUsers } from '../controllers/userController.js'

const router = express.Router();

router.use('/me', authMe);

router.use('/test', test);

router.get('/search', searchUsers);

export default router;
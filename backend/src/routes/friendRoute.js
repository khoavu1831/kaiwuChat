import express from 'express'
import { acceptFriendRequest, addFriend, declineFriendRequest, getAllFriends, getFriendRequests } from '../controllers/friendController.js';

const router = express.Router();

router.post('/request', addFriend);
router.post('/request/:requestId/accept', acceptFriendRequest);
router.post('/request/:requestId/decline', declineFriendRequest);

router.get('/', getAllFriends);
router.get('/requests', getFriendRequests);

export default router;
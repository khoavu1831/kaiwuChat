import express from 'express'
import { checkFriendship } from '../middlewares/checkFriendship.js'
import {checkParticipant,} from '../middlewares/checkParticipant.js'
import {
  createConversation,
  getConversations,
  getMessages,
  markAsSeen
} from '../controllers/conversationController.js'

const router = express.Router();

router.post('/', checkFriendship, createConversation); // áp dụng cho private chat
router.get('/', getConversations); // group chat

router.get('/:conversationId/messages', checkParticipant, getMessages);
router.patch('/:conversationId/seen', checkParticipant, markAsSeen);

export default router;
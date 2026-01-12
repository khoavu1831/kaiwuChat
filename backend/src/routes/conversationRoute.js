import express from 'express'
import { checkFriendship, checkParticipant } from '../middlewares/friendMiddleware.js';
import {
  addMemberToGroup,
  createConversation,
  getConversations,
  getMessages,
  markAsSeen
} from '../controllers/conversationController.js'

const router = express.Router();

router.post('/', checkFriendship, createConversation); // áp dụng cho private chat
router.get('/', getConversations); // group chat

router.get('/:conversationId/message', checkParticipant, getMessages);
router.patch('/:conversationId/seen', checkParticipant, markAsSeen);

router.post('/:conversationId/member', addMemberToGroup);

export default router;
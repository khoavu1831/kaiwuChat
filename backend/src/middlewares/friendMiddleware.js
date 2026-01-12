import { getAcceptedFriendship } from "../utils/Helper/friendshipHelper.js";
import {prisma} from '../libs/prisma.js'

export const checkFriendship = async (req, res, next) => {
  const userId = req.user.id;
  const { toUserId, type } = req.body;

  if (type !== "private") return next();

  const friendship = await getAcceptedFriendship(userId, toUserId);

  if (!friendship) {
    return res.status(403).json({ message: "Chưa là bạn bè" });
  }

  next();
};

export const checkParticipant = async (req, res, next) => {
  const userId = req.user.id;
  const conversationId = Number(req.params.conversationId);

  if (isNaN(conversationId)) {
    return res.status(400).json({ message: "conversationId không hợp lệ" });
  }

  const participant = await prisma.participant.findUnique({
    where: {
      conversationId_userId: { conversationId, userId }
    }
  });

  if (!participant) {
    return res.status(403).json({ message: "Không có quyền truy cập" });
  }

  req.conversationId = conversationId;
  req.participant = participant;
  next();
};

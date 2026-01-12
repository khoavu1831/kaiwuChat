import { prisma } from "../libs/prisma.js";

export const checkParticipant = async (req, res, next) => {
  const userId = req.user.id;
  const conversationId = req.body.conversationId || req.params.conversationId;
  const participant = await prisma.participant.findUnique({
    where: {
      conversationId_userId: { conversationId, userId }
    }
  });

  if (!participant) {
    return res.status(403).json({ message: "Không có quyền truy cập" });
  }

  req.participant = participant;
  next();
}
import { prisma } from "../libs/prisma.js";

export const sendMessage = async (req, res) => {
  const senderId = req.user.id;
  const { conversationId, content } = req.body;

  if (!conversationId || !content) {
    return res.status(400).json({ message: "Thiếu conversationId / content" });
  }

  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId,
      content,
      type: "text"
    }
  });

  res.status(201).json({ data: message });
};
import { prisma } from "../libs/prisma.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, toUserId, name } = req.body;

    if (!type || (type === "private" && !toUserId)) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    // tạo private conversation
    if (type === "private") {
      let conversation = await prisma.conversation.findFirst({
        where: {
          type: "private",
          participants: {
            every: {
              userId: { in: [userId, toUserId] }
            }
          }
        }
      });

      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: {
            type: "private",
            participants: {
              create: [{ userId }, { userId: toUserId }]
            }
          }
        });
      }

      return res.status(200).json({
        message: "Đã tạo private conversation",
        data: conversation
      });

    }

    // tạo group conversation
    const conversation = await prisma.conversation.create({
      data: {
        type: "group",
        name,
        participants: {
          create: [{ userId, role: "admin" }]
        }
      }
    });

    return res.status(201).json({
      message: "Đã tạo group conversation",
      data: conversation
    })

  } catch (error) {
    console.errer("Lỗi khi tạo cuộc trò chuyện", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
}

export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId }
        }
      },
      orderBy: {
        updatedAt: "desc"
      },
      include: {
        participants: {
          select: {
            userId: true,
            role: true,
            lastSeenAt: true,
            user: {
              select: {
                id: true,
                username: true,
                avatarUrl: true
              }
            }
          }
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            content: true,
            senderId: true,
            createdAt: true
          }
        }
      }
    });

    const result = conversations.map(c => {
      const me = c.participants.find(p => p.userId === userId);
      const lastMesage = c.messages[0];

      return {
        id: c.id,
        type: c.type,
        name: c.name,
        lastMesage,
        unreadCount: lastMesage && me?.lastSeenAt
          ? lastMesage.createdAt > me.lastSeenAt ? 1 : 0
          : lastMesage ? 1 : 0,
        participants: c.participants
          .filter(p => p.userId !== userId)
          .map(p => p.user)
      };
    });

    return res.status(201).json({
      message: "Lấy thành công các đoạn chat",
      data: result
    });

  } catch (error) {
    console.errer("Lỗi khi lấy các cuộc trò chuyện", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
}

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" }
    });

    return res.json.status(200).json({
      message: "Lấy tin nhắn thành công",
      data: messages
    });

  } catch (error) {
    console.error("Không lấy được tin nhắn", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
}

export const markAsSeen = async (req, res) => {
  try {

  } catch (error) {
    console.error("Không thể mark as seen", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
}
import { prisma } from "../libs/prisma.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, toUserId, name } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Thiếu type" });
    }

    // PRIVATE
    if (type === "private") {
      if (!toUserId) {
        return res.status(400).json({ message: "Thiếu toUserId" });
      }

      const existing = await prisma.conversation.findFirst({
        where: {
          type: "private",
          participants: {
            some: { userId },
            some: { userId: toUserId }
          }
        },
        include: { participants: true }
      });

      if (existing && existing.participants.length === 2) {
        return res.status(200).json({ data: existing });
      }

      const conversation = await prisma.conversation.create({
        data: {
          type: "private",
          participants: {
            create: [{ userId }, { userId: toUserId }]
          }
        }
      });

      return res.status(201).json({ data: conversation });
    }

    // GROUP
    if (!name) {
      return res.status(400).json({ message: "Thiếu name" });
    }

    const conversation = await prisma.conversation.create({
      data: {
        type: "group",
        name,
        participants: {
          create: [{ userId, role: "admin" }]
        }
      }
    });

    return res.status(201).json({ data: conversation });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

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
    const conversationId = req.conversationId;

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" }
    });

    return res.status(200).json({
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
    const userId = req.user.id;
    const conversationId = req.conversationId;

    await prisma.participant.update({
      where: {
        conversationId_userId: {
          conversationId,
          userId
        }
      },
      data: {
        lastSeenAt: new Date()
      }
    });

    return res.status(200).json({ message: "Seen" });

  } catch (error) {
    console.error("Không thể mark as seen", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
}

export const addMemberToGroup = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;
    const { memberId } = req.body;

    // kiểm tra đây có phải group chat không
    const conversation = await prisma.conversation.findUnique({
      where: { id: Number(conversationId) },
      include: { participants: true }
    });

    if (!conversation || conversation.type !== "group") {
      return res.status(400).json({ message: "Không phải group chat" });
    }

    // kiểm tra người dùng có tồn tại không
    const member = await prisma.user.findUnique({
      where: { id: memberId }
    });

    if (!member) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // kiểm tra có quyền admin không
    const isAdmin = conversation.participants.some(
      p => p.userId === userId && p.role === "admin"
    );

    if (!isAdmin) {
      return res.status(403).json({ message: "Không có quyền thêm thành viên" });
    }

    // kiểm tra đã tồn tại user muốn add đã có trong group chưa
    const exists = conversation.participants.some(
      p => p.userId === memberId
    );

    if (exists) {
      return res.status(409).json({ message: "User đã trong group" });
    }

    // thêm người dùng vào group
    await prisma.participant.create({
      data: {
        conversationId: Number(conversationId),
        userId: memberId
      }
    });

    return res.status(201).json({ message: "Đã thêm thành viên" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

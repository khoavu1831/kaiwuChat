import { prisma } from '../libs/prisma.js';
import { getAcceptedFriendship } from '../utils/Helper/friendshipHelper.js';

export const sendFriendRequest = async (req, res) => {
  try {
    const { to } = req.body;
    const from = req.user.id;

    // kiểm tra các trường hợp có thể gây lỗi
    // 1. gửi lời mời cho chính bản thân
    if (from === to) {
      return res.status(400).json({ message: "Không thể gửi lời mời cho chính mình" });
    }

    // 2. kiểm tra người gửi có tồn tại không
    const userExists = await prisma.user.count({
      where:
        { id: to }
    });

    if (!userExists) {
      return res.status(400).json({ message: "Không tìm được người cần gửi" });
    }

    // 3. kiểm tra 2 user có là bạn không
    await getAcceptedFriendship(from, to);

    if (existed) {
      return res.status(400).json({ message: "Lời mời đã tồn tại" });
    }

    // Nếu không lỗi => tạo lời mời
    await prisma.friendship.create({
      data: {
        userId: userA,
        friendId: userB,
        senderId: from,
        status: "pending"
      }
    });

    return res.status(201).json({ message: "Gửi lời mời kết bạn thành công" });

  } catch (error) {
    console.error("Lỗi <Kết bạn>", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const requestId = Number(req.params.requestId);
    const userId = req.user.id;

    const friendship = await prisma.friendship.findUnique({
      where: { id: requestId }
    });

    if (!friendship) {
      return res.status(404).json({ message: "Lời mời không tồn tại" });
    }

    if (friendship.status !== "pending") {
      return res.status(400).json({ message: "Lời mời đã được xử lí" });
    }

    if (friendship.senderId === userId) {
      return res.status(403).json({ message: "Không thể tự chấp nhận" });
    }

    if (friendship.userId !== userId && friendship.friendId !== userId) {
      return res.status(403).json({ message: "Không có quyền" });
    }

    // cập nhật mối quan hệ bạn bè
    await prisma.friendship.update({
      where: { id: requestId },
      data: { status: "accepted" }
    })

    return res.status(200).json({ message: "Chấp nhận lời mời kết bạn thành công" });

  } catch (error) {
    console.error("Lỗi <Chấp nhận lời mời kết bạn>", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const declineFriendRequest = async (req, res) => {
  try {
    const requestId = Number(req.params.requestId);
    const userId = req.user.id;

    const friendship = await prisma.friendship.findUnique({
      where: { id: requestId }
    });

    if (!friendship) {
      return res.status(404).json({ message: "Lời mời không tồn tại" });
    }

    if (friendship.status !== "pending") {
      return res.status(400).json({ message: "Lời mời đã được xử lí" });
    }

    if (friendship.senderId === userId) {
      return res.status(400).json({ message: "Không thể từ chối chính mình" });
    }

    if (friendship.userId !== userId && friendship.friendId !== userId) {
      return res.status(403).json({ message: "Không có quyền từ chối lời mời" });
    }

    // xóa mối quan hệ bạn bè
    await prisma.friendship.delete({
      where: { id: requestId }
    })

    return res.status(201).json({ message: "Đã từ chối lời mời kết bạn" });

  } catch (error) {
    console.error("Lỗi <Từ chối lời mời kết bạn>", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const userId = req.user.id;

    // lấy danh sách bạn bè của user
    const friends = await prisma.friendship.findMany({
      where: {
        status: "accepted",
        OR: [
          { userId },
          { friendId: userId }
        ]
      },
      include: {
        user: true,
        friend: true
      }
    });

    // danh sách bạn bè không chứa bản thân user
    const result = friends.map(f => {
      f.userId === userId ? f.friend : f.user;
    })

    return res.status(201).json({
      message: "Lấy danh sách bạn bè thành công",
      friends: result
    });

  } catch (error) {
    console.error("Lỗi <Lấy danh sách bạn bè>", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await prisma.friendship.findMany({
      where: {
        status: "pending",
        AND: [
          { senderId: { not: userId } }, // kiểm tra không trả về chính mình
          {
            OR: [
              { userId: userId },
              { friendId: userId }
            ]
          }
        ]
      },
      include: {
        sender: true
      }
    });

    const result = requests.map(r => r.sender);

    return res.status(200).json({
      message: "Lấy danh sách các yêu cầu kết bạn thành công",
      requests: result
    });

  } catch (error) {
    console.error("Lỗi <Lấy danh sách các lời mời kết bạn>", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};



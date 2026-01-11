import { prisma } from '../libs/prisma.js';

export const sendFriendRequest = async (req, res) => {
  try {
    const { to } = req.body;
    const from = req.user._id;

    // kiểm tra các trường hợp có thể gây lỗi
    // 1. gửi lời mời cho bản thân
    if (from === to) {
      return res.status(400).json({ message: "Không thể gửi lời mời cho chính mình" });
    }

    // 2. kiểm tra người gửi có tồn tại không
    const userExists = await prisma.user.count({
      where: { id: to }
    }) > 0;

    if (!userExists) {
      return res.status(400).json({ message: "Không tìm được người cần gửi" });
    }

    // 3. kiểm tra 2 user có là bạn không
    let userA = from;
    let userB = to;

    if (userA > userB) {
      [userA, userB] = [userB, userA];
    }

    const friendship = await prisma.friendship.findUnique({
      where: {
        userId_friendId: {
          userId: userA,
          friendId: userB
        }
      }
    });

    if (friendship) {
      const map = {
        "accepted": "Đã là bạn bè",
        "pending": "Đã gửi lời mời trước đó",
        "blocked": "Không thể gửi lời mời"
      };
      return res.status(400).json({ message: map[friendship.status] });
    }

    // Nếu không lỗi => tạo lời mời
    await prisma.friendship.create({
      data: {
        userId: userA,
        friendId: userB,
        status: "pending"
      }
    });

    return res.status(201).json({ message: "Gửi lời mời kết bạn thành công" });

  } catch (error) {
    console.error("Lỗi <Kết bạn>", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getAllFriends = (req, res) => {
  try {

  } catch (error) {
    console.error("Lỗi <Lấy danh sách bạn bè>", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getFriendRequests = (req, res) => {
  try {

  } catch (error) {
    console.error("Lỗi <Lấy các lời mời kết bạn>", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const acceptFriendRequest = (req, res) => {
  try {

  } catch (error) {
    console.error("Lỗi <Chấp nhận lời mời kết bạn>", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const declineFriendRequest = (req, res) => {
  try {

  } catch (error) {
    console.error("Lỗi <Từ chối lời mời kết bạn>", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};


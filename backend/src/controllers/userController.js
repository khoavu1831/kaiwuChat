import { prisma } from '../libs/prisma.js';

export const authMe = async (req, res) => {
  try {
    const user = req.user; // bắt đầu từ điểm middleware:protected trả về

    return res.status(200).json({ user });

  } catch (error) {
    console.error("Lỗi khi gọi authMe()", error);

    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const test = async (req, res) => {
  return res.sendStatus(204);
}

export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query; // search query
    const currentUserId = req.user.id;

    if (!q || q.trim() === '') {
      return res.status(400).json({ message: "Vui lòng nhập từ khóa tìm kiếm" });
    }

    const searchQuery = q.trim();

    // Tìm kiếm người dùng theo username hoặc email
    // Note: MySQL's default collation (utf8mb4_general_ci) is case-insensitive
    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: currentUserId } }, // Loại trừ người dùng hiện tại
          {
            OR: [
              { username: { contains: searchQuery } },
              { email: { contains: searchQuery } }
            ]
          }
        ]
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        avatarUrl: true,
        createdAt: true
      },
      take: 20 // Giới hạn kết quả
    });

    return res.status(200).json({
      message: "Tìm kiếm thành công",
      users
    });

  } catch (error) {
    console.error("Lỗi <Tìm kiếm người dùng>", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
import jwt from 'jsonwebtoken'
import { prisma } from '../libs/prisma.js';

// authorization
export const protectedRoute = (req, res, next) => {
  try {
    // lấy token từ header
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(" ")[1] // lấy chuỗi token trong header: dạng - Bearer <accessToken>

    // nếu không có token thì trả lỗi
    if (!token) {
      return res.status(401).json({ message: "Không thấy access token" });
    }

    // xác nhận token hợp lệ
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decodedUser) => {
      if (error) {
        console.error(error);
        return res.status(403).json({ message: "Access token hết hạn hoặc không đúng" });
      }

      // tìm user
      const user = await prisma.user.findUnique({
        where: {id: decodedUser.userId} // phải chọn đúng field id khi kí token, ở đây là "userId"
      });

      if (!user) {
        return res.status(404).json({message: "User không tồn tại"});
      }

      // return user trong request
      req.user = user;
      next();
    })
  } catch (error) {
    console.error("Lỗi xác minh jwt trong authMiddleware", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
}
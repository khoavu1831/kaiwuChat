import bcrypt from 'bcrypt'
import { prisma } from '../libs/prisma.js'
import jwt from 'jsonwebtoken'
import { randomBytes } from 'node:crypto';

const ACCESS_TOKEN_TTL = "10s";
const REFRESH_TOKEN_TTL = 10 * 24 * 60 * 60 * 1000; // 10 ngày

export const signup = async (req, res) => {
  try {
    // lấy request từ client
    const { username, password, email, firstName, lastName } = req.body;

    // kiểm tra các trường dữ liệu
    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({ message: "Không được thiếu username, password, email, firstName, lastName." });
    }

    // kiểm tra username có tồn tại trong db không
    const duplicate = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (duplicate) {
      return res.status(409).json({ message: "Email hoặc Username đã tồn tại." });
    }

    // mã hóa password
    const hashedPassword = await bcrypt.hash(password, 10);

    // thêm user mới vào db
    await prisma.user.create({
      data: {
        username: username,
        hashPassword: hashedPassword,
        email: email,
        displayName: `${firstName} ${lastName}`
      },
    });

    // return
    return res.sendStatus(200);

  } catch (error) {
    console.error(`Lỗi khi gọi signup()`, error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const signin = async (req, res) => {
  try {

    // lấy request từ client
    const { username, password } = req.body;

    // kiểm tra các trường dữ liệu
    if (!username || !password) {
      return res.status(400).json({ message: "Thiếu username hoặc password" })
    }

    // kiểm tra có user này không
    const user = await prisma.user.findUnique({
      where: {
        username: username
      }
    })

    if (!user) {
      return res.status(401).json({ message: "username hoặc password không chính xác 1" });
    }

    // lấy hashedPassword trong db để so sánh với password người dùng nhập
    const isPasswordCorrect = await bcrypt.compare(password, user.hashPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "username hoặc password không chính xác" });
    }

    // nếu khớp thì tạo accessToken + jwt
    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    // tạo refreshToken
    const refreshToken = randomBytes(64).toString("hex");

    // tạo session mới để lưu refreshToken trong db
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: refreshToken,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
      }
    });

    // trả refreshToken về trong cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,   // cookie không thể truy cập bằng js
      secure: true,     // đảm bảo chỉ gửi qua https
      sameSite: 'none',  // backend và frontend giao tiếp khi deploy
      maxAge: REFRESH_TOKEN_TTL,
    });

    // return accessToken về trong respone
    return res
      .status(200)
      .json({
        message: `User "${username}" đã đăng nhập thành công.`,
        accessToken: accessToken
      });

  } catch (error) {
    console.error(`Lỗi khi gọi signin()`, error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const signout = async (req, res) => {
  try {

    // lấy refreshToken từ cookie
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      // xóa refreshToken trong session
      await prisma.session.delete({
        where: {
          refreshToken: refreshToken
        }
      });

      // xóa refreshToken trong session
      res.clearCookie("refreshToken");
    }

    // return
    return res.sendStatus(204)

  } catch (error) {
    console.error(`Lỗi khi gọi signout()`, error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// tạo accessToken mới từ refreshToken
export const refreshToken = async (req, res) => {
  try {
    // lấy refreshToken từ cookie
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ message: 'Token không tồn tại' });
    }

    // so với refreshToken trong db
    const session = await prisma.session.findUnique({ 
      where: {
        refreshToken: refreshToken
      }
     });

    if (!session) {
      return res.status(403).json({ message: 'Token đã hết hạn hoặc không hợp lệ' });
    }

    // kiểm tra hết hạn chưa
    if (session.expiresAt < new Date()) {
      return res.status(403).json({ message: 'Token đã hết hạn' });
    }

    // tạo accessToken mới
    const accessToken = jwt.sign(
      { userId: session.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    // return
    return res.status(200).json({ accessToken });

  } catch (error) {
    console.error("Lỗi khi gọi refreshToken()", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
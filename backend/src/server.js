import express from "express"
import cors from "cors"
import "dotenv/config"
import { authRoute } from "./routes/authRoute.js"
import { prisma } from "./libs/prisma.js"

const PORT = process.env.PORT || 3001;

const app = express();
const user = await prisma.user.create({
  data: {
    username: "khoa",
    email: "khoa@test.com",
    hash_password: "hashed_password",
    first_name: "Khoa",
    last_name: "Nguyen"
  }
});


console.log("Tao thanh cong" + user);

// middleware
app.use(cors());
app.use(express.json());

// routes
// private route
app.use('/api/auth', authRoute);

// public route


app.get("/", (req, res) => {
  res.json({ message: "Xin chao" });
});

app.get("/test-db", async (req, res) => {
  const user = await prisma.user.findMany();
  res.json(user);
});


// run
app.listen(PORT, async () => {
  console.log(`Server đang chạy cổng: ${PORT}`);
})


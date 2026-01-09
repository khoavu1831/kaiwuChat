import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser'
import { protectedRoute } from './middlewares/authMiddleware.js'

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
// public route
app.use('/api/auth', authRoute);

// private route
app.use(protectedRoute); // middleware: authorization
app.use('/api/user', userRoute);


app.get("/", (req, res) => {
  res.json({ message: "Xin chao" });
});

// run
app.listen(PORT, async () => {
  console.log(`Server đang chạy cổng: ${PORT}`);
})


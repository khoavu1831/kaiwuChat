import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import cookieParser from 'cookie-parser'

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


app.get("/", (req, res) => {
  res.json({ message: "Xin chao" });
});

// run
app.listen(PORT, async () => {
  console.log(`Server đang chạy cổng: ${PORT}`);
})


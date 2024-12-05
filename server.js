import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

// Routes
import authRoutes from './routes/authRoutes.js';

// Middlewares
import { authMiddleware } from './middlewares/authMiddleware.js';
import errorMiddleware from './middlewares/error.Middleware.js';

// Initialize Express App
const app = express();
const server = http.createServer(app);

// Validate Required ENV Variables
if (!process.env.JWT_SECRET_KEY) {
  console.error("Fatal Error: JWT_SECRET_KEY is required");
  process.exit(1);
}

if (!process.env.MONGODB_URL) {
  console.error("Fatal Error: MONGODB_URL is required");
  process.exit(1);
}

// Middleware to Parse Incoming Requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('Database Access Point Connected. Ready for Action!');
  } catch (error) {
    console.error('Error Connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
connectDB();

// JWT Middleware
app.use((req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
    } catch (error) {
      console.error('JWT Verification failed:', error.message);
    }
  }
  next();
});

// Define Routes
app.use("/api/auth", authRoutes);

// Protected Route Example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route, you are authorized!', user: req.user });
});

// Health Check Endpoint
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*").send("Yooo! API 💨💨💨");
});

// Error Handling Middleware
app.use(errorMiddleware);

// Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server Listening on Port ${PORT}`));

export default app;


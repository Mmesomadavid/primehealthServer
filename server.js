import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import http from "http";
import { Server } from "socket.io"; // Import Socket.IO
import errorMiddleware from "./middleware/errroMiddleware.js";
import cors from 'cors';
import bodyParser from 'body-parser';

// Routes
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js"
import patientRoutes from './routes/patientRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js'
import { verifyTransporter } from './services/emailConfig.js';

// Create Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins or specify your frontend URL
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

verifyTransporter();

// Checking for required ENV
if (!process.env.JWT_SECRET_KEY) {
  console.log("Fatal Error: jwtPrivateKey is required");
  process.exit(1);
}

// Connecting to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((e) => console.log("Error connecting to MongoDB", e));

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (signup, login, OTP verification)
app.use('/api/doctor', doctorRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling
app.use(errorMiddleware);

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle custom events
  socket.on('sendNotification', (data) => {
    console.log(`Notification received:`, data);

    // Broadcast the notification to all connected clients
    io.emit('receiveNotification', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Listening to port
const PORT = !process.env.PORT ? 5000 : process.env.PORT;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Basic route
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*").send("Yooo! API 💨💨💨 ");
});

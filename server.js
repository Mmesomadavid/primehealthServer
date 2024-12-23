import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import http from "http";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cors from 'cors';
import bodyParser from 'body-parser';

// routes
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from './routes/patientRoutes.js';
import { verifyTransporter } from './services/emailConfig.js';

// Create Express app
const app = express();
const server = http.createServer(app);

// Apply body parser middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Verify email transporter
verifyTransporter();

// Check for required environment variables
if (!process.env.JWT_SECRET_KEY) {
  console.log("Fatal Error: JWT_SECRET_KEY is required");
  process.exit(1);
}

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((e) => console.log("Error connecting to MongoDB", e));

// CORS middleware (place this at the top)
const allowedOrigins = ['https://primehealth-three.vercel.app']; // Your frontend domain
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'), false);
    }
  },
  methods: ['GET', 'POST'],
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (signup, login, OTP verification)
app.use('/api/doctor', doctorRoutes); 
app.use('/api/patient', patientRoutes); // Authentication routes (signup, login, OTP verification)

// Error handling
app.use(errorMiddleware);

// Listening to port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Root route
app.get("/", (req, res) => {
  res.send("Yooo! API 💨💨💨 ");
});

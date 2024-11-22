import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import mongoose from 'mongoose';
import http from  "http";
import cors from "cors"
// routes
import authRoutes from '../routes/authRoutes.js';
import patientRoutes from '../routes/patientRoutes.js';
import doctorRoutes from '../routes/doctorRoutes.js';
import hospitalRoutes from '../routes/hospitalRoutes.js';

// middlwares
import { authMiddleware } from '../middlewares/auth.Middleware.js'; // Assuming you have the auth middleware
import errorMiddleware from "../middlewares/error.Middleware.js"; // Assuming you have an error handler middleware



// Initialize Express App
const app = express();
const server = http.createServer(app)



// checking for required ENV
if (!process.env.JWT_SECRET_KEY) {
    console.log("Fatal Error: jwtPrivateKey is required");
    process.exit(1);
  }

  
// Middleware to parse incoming request bodies
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For URL encoded form data

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Access point connected. Ready for action');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

// Connect to MongoDB
connectDB();

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


// middlware
app.use(cors())
app.use(express.json())


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/hospital", hospitalRoutes);

// Auth Middleware Example Route
app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route, you are authorized!');
});

// Error handling middleware
app.use(errorMiddleware);



// listening to port
const PORT = !process.env.PORT ? 5000 : process.env.PORT;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*").send("Yooo! API 💨💨💨 ");
});

export default express
import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import mongoose from 'mongoose';
import http from "http";
import errorMiddleware from "./middleware/errroMiddleware.js";
import cors from 'cors';


// routes
import authRoutes from "./routes/authRoutes.js"
import doctorRoutes from "./routes/doctorRoutes.js"
import patientRoutes from './routes/patientRoutes.js'
import { verifyTransporter } from './services/emailConfig.js';

// Create Express app
const app = express();
const server = http.createServer(app);

verifyTransporter();

// checking for required ENV
if (!process.env.JWT_SECRET_KEY) {
    console.log("Fatal Error: jwtPrivateKey is required");
    process.exit(1);
  }


// connecting to MongoDB
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
app.use('/api/patient', patientRoutes); // Authentication routes (signup, login, OTP verification)


// Error handling
app.use(errorMiddleware);


// listening to port
const PORT = !process.env.PORT ? 5000 : process.env.PORT;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*").send("Yooo! API 💨💨💨 ");
});
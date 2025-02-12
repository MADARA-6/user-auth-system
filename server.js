import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import passport from "passport";
import "./config/passport.js";
import session from "express-session";


// Import routes using ES module syntax
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware for session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(authRoutes); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("User Authentication System API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

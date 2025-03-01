import express, { Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import connectDB from "./db";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Connect to database
connectDB();

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Register routes
app.use("/api", routes);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the server!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

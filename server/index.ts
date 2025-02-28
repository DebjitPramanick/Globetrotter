import express, { Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import connectDB from "./db";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Connect to database
connectDB()
  .then(() => {
    console.log("Database connection initialized");
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });

// Middleware to parse JSON bodies
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

import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./db/connectDB.js";
import { v1Router } from "./routes/v1/index.js";
import cookieParser from "cookie-parser";
import path from "path";

configDotenv(); // Load environment variables

connectDB(); // Connect to the database

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000;

// Get the directory name for the current module
const __dirname = path.dirname(
	new URL(import.meta.url).pathname
);

// Enable CORS - Allow communication with front-end
const corsOptions = {
	origin: process.env.FRONTEND_URL,
	credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files (images, etc.) from the 'uploads' directory
app.use(
	"/uploads",
	express.static(path.join(__dirname, "uploads"))
);

// ROUTES
app.get("/", (req, res) => {
	console.log("Request received on root path");
	res.json({
		message: "Silence is golden",
	});
});

app.use("/api/v1", v1Router);

// END ROUTES
app.use("*", (req, res) => {
	res.status(404).json({
		message: "Not found",
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

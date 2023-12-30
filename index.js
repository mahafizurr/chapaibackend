const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Import dotenv
const cors = require("cors");
const userProfileRoutes = require("./routes/userProfileRoutes");

dotenv.config(); // Load environment variables from a file

const app = express();
app.use(
  cors({
    origin: ["chapaibackend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5001;

app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Define a route for the root path
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/api", userProfileRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

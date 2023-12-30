const express = require("express");
const router = express.Router();
const UserProfile = require("../models/userProfile");

// Route to get all user profiles
router.get("/user-profiles", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number, default to 1
  const limit = parseInt(req.query.limit) || 10; // Number of documents per page, default to 10

  try {
    const userProfiles = await UserProfile.find()
      .skip((page - 1) * limit) // Skip the first (page-1) * limit documents
      .limit(limit) // Limit the number of documents to 'limit'
      .exec();

    res.json(userProfiles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get a single user profile by ID
router.get("/user-profiles/:id", async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id);
    if (!userProfile) {
      return res.status(404).json({ error: "User Profile not found" });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a new user profile
router.post("/user-profiles", async (req, res) => {
  try {
    const newUserProfile = new UserProfile(req.body);
    await newUserProfile.save();
    res.status(201).json(newUserProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update an existing user profile by ID
router.put("/user-profiles/:id", async (req, res) => {
  try {
    const userProfile = await UserProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!userProfile) {
      return res.status(404).json({ error: "User Profile not found" });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete a user profile by ID
router.delete("/user-profiles/:id", async (req, res) => {
  try {
    const userProfile = await UserProfile.findByIdAndDelete(req.params.id);
    if (!userProfile) {
      return res.status(404).json({ error: "User Profile not found" });
    }
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

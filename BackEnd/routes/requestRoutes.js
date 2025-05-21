const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const auth = require("../middlewares/authMiddleware"); //  Authentication middleware

// POST: Submit new software access request
router.post("/requests", auth, async (req, res) => {
  try {
    const { softwareId, accessType, reason } = req.body;

    // Validation check
    if (!softwareId || !accessType || !reason) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new request with authenticated user
    const request = new Request({
      software: softwareId,
      accessType,
      reason,
      user: req.user._id, //  Automatically extracted from token
    });

    await request.save();
    res.status(201).json({ message: "Request submitted successfully." });
  } catch (err) {
    console.error("Request submission failed:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// GET: Get all access requests (optional, admin use)
router.get("/requests", auth, async (req, res) => {
  try {
    const requests = await Request.find().populate("user").populate("software");
    res.json(requests);
  } catch (err) {
    console.error("Failed to fetch requests:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// PATCH  : USED TO UPDATE REQUEST STATUS
router.patch("/requests/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate input
    if (!status || !["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    // Update request
    const request = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    res.json({ message: "Request status updated successfully.", request });
  } catch (err) {
    console.error("Failed to update request:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;

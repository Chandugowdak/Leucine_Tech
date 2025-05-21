const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const roleCheck = require("../middlewares/roleMiddleware");
const softwareController = require("../controllers/softwareController");

// Get all softwares (no auth if you want public access)
router.get("/all", softwareController.getAllSoftwares);

// Add new software (Admin only)
router.post(
  "/software",
  auth,
  roleCheck("Admin"),
  softwareController.addSoftware
);

module.exports = router;

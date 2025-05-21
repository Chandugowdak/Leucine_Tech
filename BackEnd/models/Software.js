const mongoose = require("mongoose");

const softwareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  accessLevels: {
    type: [String], // Example: ["Read", "Write", "Admin"]
    default: ["Read"],
  },
});

module.exports = mongoose.model("Software", softwareSchema);

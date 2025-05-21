const Software = require("../models/Software");

// Add new software (Admin only)
const  addSoftware = async (req, res)=> {
  const { name, description, accessLevels } = req.body;

  try {
    // Check if software with same name exists
    const existing = await Software.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Software already exists" });
    }

    const software = new Software({ name, description, accessLevels });
    await software.save();

    res
      .status(201)
      .json({ message: "Software created successfully", software });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Get all software list
const  getAllSoftwares = async (req, res)=> {
  try {
    const softwares = await Software.find();
    res.json(softwares);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  addSoftware,
  getAllSoftwares,
};

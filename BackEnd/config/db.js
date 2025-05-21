const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI)
          
          .then(() => console.log("Data Base Connected"))
          
          .catch((err) => console.log(err))
      
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

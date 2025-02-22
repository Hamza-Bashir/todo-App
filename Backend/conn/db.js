const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.mongo_uri);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

module.exports = conn;

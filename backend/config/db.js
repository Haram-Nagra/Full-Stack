
require('dotenv').config();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async () => {
  try {
    // Connect to MongoDB using MONGO_URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

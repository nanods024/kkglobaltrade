const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kkglobaltrade';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error(
      'Make sure MONGO_URI in server/.env points to a running MongoDB instance ' +
        '(local mongod or a MongoDB Atlas cluster).'
    );
    process.exit(1);
  }
};

module.exports = connectDB;

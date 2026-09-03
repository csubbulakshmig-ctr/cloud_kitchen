import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('⚠️ [MongoDB] MONGODB_URI not provided in environment variables.');
    console.log('ℹ️ [Storage] Running in resilient in-memory mode for instant preview and development.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ [MongoDB] Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ [MongoDB] Connection failed (${error.message}). Falling back to resilient storage.`);
    isConnected = false;
    return false;
  }
};

export const getIsConnected = () => isConnected;

export default connectDB;

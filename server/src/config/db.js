import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI; // || "mongodb://localhost:27017/plotwise-ai";
  try {
    await mongoose.connect(uri);
    console.log(`[PlotWise AI] MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.error("[PlotWise AI] MongoDB connection failed:", err.message);
    throw err;
  }
};

export default connectDB;

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.SERVER_PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[PlotWise AI] Server running on http://localhost:${PORT}`);
  });
}

start();

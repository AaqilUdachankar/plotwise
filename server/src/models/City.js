import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, default: "India", trim: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    description: { type: String, default: "" },
    population: { type: Number, default: 0 },
    economicProfile: { type: String, default: "" },
    heroImageQuery: { type: String, default: "" },
    dataMode: { type: String, enum: ["demo", "verified"], default: "demo" },
  },
  { timestamps: true }
);

citySchema.index({ name: "text", state: "text" });

export default mongoose.model("City", citySchema);

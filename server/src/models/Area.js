import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true, index: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    locality: { type: String, default: "" },
    currentPriceRange: { type: String, default: "" }, // e.g. "₹6,500 - ₹9,200 / sq.ft"
    connectivityScore: { type: Number, min: 0, max: 100, required: true },
    infrastructureScore: { type: Number, min: 0, max: 100, required: true },
    employmentScore: { type: Number, min: 0, max: 100, required: true },
    developmentScore: { type: Number, min: 0, max: 100, required: true },
    demandScore: { type: Number, min: 0, max: 100, required: true },
    riskScore: { type: Number, min: 0, max: 100, required: true }, // higher = riskier
    dataMode: { type: String, enum: ["demo", "verified"], default: "demo" },
  },
  { timestamps: true }
);

areaSchema.index({ cityId: 1, slug: 1 }, { unique: true });

export default mongoose.model("Area", areaSchema);

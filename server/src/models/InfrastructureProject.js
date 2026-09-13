import mongoose from "mongoose";

const infrastructureProjectSchema = new mongoose.Schema(
  {
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true, index: true },
    areaIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Area" }],
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["metro", "highway", "railway", "airport", "industrial", "it_park_sez", "township", "other"],
    },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["completed", "under_construction", "approved", "proposed"],
    },
    estimatedCompletion: { type: String, required: true }, // e.g. "2027" or "Q3 2026"
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    impactLevel: { type: String, enum: ["low", "medium", "high"], required: true },
    source: { type: String, required: true }, // e.g. "Bengaluru Metro Rail Corporation Limited (BMRCL)"
    sourceUrl: { type: String, required: true },
    lastVerified: { type: Date, default: Date.now },
    dataMode: { type: String, enum: ["demo", "verified"], default: "demo" },
  },
  { timestamps: true }
);

infrastructureProjectSchema.index({ cityId: 1, type: 1 });

export default mongoose.model("InfrastructureProject", infrastructureProjectSchema);

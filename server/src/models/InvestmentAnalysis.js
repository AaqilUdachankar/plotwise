import mongoose from "mongoose";

const investmentAnalysisSchema = new mongoose.Schema(
  {
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true, index: true },
    areaId: { type: mongoose.Schema.Types.ObjectId, ref: "Area", required: true, index: true, unique: true },
    totalScore: { type: Number, required: true },
    infrastructureScore: { type: Number, required: true },
    connectivityScore: { type: Number, required: true },
    employmentScore: { type: Number, required: true },
    developmentScore: { type: Number, required: true },
    demandScore: { type: Number, required: true },
    riskScore: { type: Number, required: true },
    riskLabel: { type: String, enum: ["Low", "Medium", "High"], required: true },
    growthPotential: { type: String, enum: ["Low", "Moderate", "High", "Very High"], required: true },
    strengths: [{ type: String }],
    risks: [{ type: String }],
    explanation: { type: String, default: "" }, // cached AI explanation (may be empty until requested)
    aiGeneratedAt: { type: Date, default: null },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("InvestmentAnalysis", investmentAnalysisSchema);

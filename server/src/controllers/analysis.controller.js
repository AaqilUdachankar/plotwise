import mongoose from "mongoose";
import InvestmentAnalysis from "../models/InvestmentAnalysis.js";
import Area from "../models/Area.js";

export async function getAnalysisByCity(req, res, next) {
  try {
    const { cityId } = req.params;
    if (!mongoose.isValidObjectId(cityId)) {
      return res.status(400).json({ success: false, message: "Invalid cityId" });
    }
    const analyses = await InvestmentAnalysis.find({ cityId }).sort({ totalScore: -1 }).lean();
    res.json({ success: true, count: analyses.length, data: analyses });
  } catch (err) {
    next(err);
  }
}

export async function getAnalysisByArea(req, res, next) {
  try {
    const { areaId } = req.params;
    if (!mongoose.isValidObjectId(areaId)) {
      return res.status(400).json({ success: false, message: "Invalid areaId" });
    }
    const analysis = await InvestmentAnalysis.findOne({ areaId }).lean();
    if (!analysis) return res.status(404).json({ success: false, message: "Analysis not found for this area" });
    res.json({ success: true, data: analysis });
  } catch (err) {
    next(err);
  }
}

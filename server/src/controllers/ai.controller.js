import mongoose from "mongoose";
import Area from "../models/Area.js";
import City from "../models/City.js";
import InvestmentAnalysis from "../models/InvestmentAnalysis.js";
import InfrastructureProject from "../models/InfrastructureProject.js";
import { generateAreaExplanation, generateComparisonSummary, isAIConfigured } from "../services/gemini.service.js";

export async function explainArea(req, res, next) {
  try {
    const { areaId } = req.body;
    if (!areaId || !mongoose.isValidObjectId(areaId)) {
      return res.status(400).json({ success: false, message: "A valid areaId is required" });
    }

    const area = await Area.findById(areaId).lean();
    if (!area) return res.status(404).json({ success: false, message: "Area not found" });

    const [city, analysis, infrastructureProjects] = await Promise.all([
      City.findById(area.cityId).lean(),
      InvestmentAnalysis.findOne({ areaId }).lean(),
      InfrastructureProject.find({ areaIds: area._id }).lean(),
    ]);

    if (!analysis) {
      return res.status(404).json({ success: false, message: "No analysis found for this area. Run the seed script first." });
    }

    // Serve cached explanation if we already generated one via Gemini.
    if (analysis.explanation && analysis.aiGeneratedAt) {
      return res.json({
        success: true,
        data: { explanation: analysis.explanation, source: "cache", aiConfigured: isAIConfigured() },
      });
    }

    const { text, source } = await generateAreaExplanation({ city, area, analysis, infrastructureProjects });

    await InvestmentAnalysis.updateOne({ areaId }, { explanation: text, aiGeneratedAt: new Date() });

    res.json({ success: true, data: { explanation: text, source, aiConfigured: isAIConfigured() } });
  } catch (err) {
    next(err);
  }
}

export async function compareAreas(req, res, next) {
  try {
    const { areaIds } = req.body;
    if (!Array.isArray(areaIds) || areaIds.length < 2 || areaIds.length > 3) {
      return res.status(400).json({ success: false, message: "Provide 2-3 areaIds to compare" });
    }
    if (!areaIds.every((id) => mongoose.isValidObjectId(id))) {
      return res.status(400).json({ success: false, message: "One or more areaIds are invalid" });
    }

    const areas = await Area.find({ _id: { $in: areaIds } }).lean();
    if (areas.length !== areaIds.length) {
      return res.status(404).json({ success: false, message: "One or more areas were not found" });
    }

    const city = await City.findById(areas[0].cityId).lean();
    const analyses = await InvestmentAnalysis.find({ areaId: { $in: areaIds } }).lean();
    const analysisByArea = Object.fromEntries(analyses.map((a) => [String(a.areaId), a]));

    const comparisonRows = areas.map((area) => {
      const a = analysisByArea[String(area._id)];
      return {
        areaId: String(area._id),
        name: area.name,
        totalScore: a?.totalScore ?? 0,
        infrastructureScore: a?.infrastructureScore ?? 0,
        connectivityScore: a?.connectivityScore ?? 0,
        employmentScore: a?.employmentScore ?? 0,
        developmentScore: a?.developmentScore ?? 0,
        demandScore: a?.demandScore ?? 0,
        riskScore: a?.riskScore ?? 0,
      };
    });

    const { text, source } = await generateComparisonSummary({ city, comparisonRows });

    res.json({ success: true, data: { comparisonRows, summary: text, source, aiConfigured: isAIConfigured() } });
  } catch (err) {
    next(err);
  }
}

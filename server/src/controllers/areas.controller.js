import mongoose from "mongoose";
import Area from "../models/Area.js";
import City from "../models/City.js";
import InfrastructureProject from "../models/InfrastructureProject.js";
import InvestmentAnalysis from "../models/InvestmentAnalysis.js";

export async function getAreasByCity(req, res, next) {
  try {
    const { cityId } = req.params;
    if (!mongoose.isValidObjectId(cityId)) {
      return res.status(400).json({ success: false, message: "Invalid cityId" });
    }

    const areas = await Area.find({ cityId }).lean();
    const analyses = await InvestmentAnalysis.find({ cityId }).lean();
    const analysisByArea = Object.fromEntries(analyses.map((a) => [String(a.areaId), a]));

    const data = areas
      .map((area) => ({ ...area, analysis: analysisByArea[String(area._id)] || null }))
      .sort((a, b) => (b.analysis?.totalScore || 0) - (a.analysis?.totalScore || 0));

    res.json({ success: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
}

export async function getAreaById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid area id" });
    }

    const area = await Area.findById(id).lean();
    if (!area) return res.status(404).json({ success: false, message: "Area not found" });

    const [city, analysis, infrastructureProjects] = await Promise.all([
      City.findById(area.cityId).lean(),
      InvestmentAnalysis.findOne({ areaId: area._id }).lean(),
      InfrastructureProject.find({ areaIds: area._id }).lean(),
    ]);

    res.json({
      success: true,
      data: { area, city, analysis, infrastructureProjects },
    });
  } catch (err) {
    next(err);
  }
}

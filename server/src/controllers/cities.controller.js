import City from "../models/City.js";
import Area from "../models/Area.js";
import InvestmentAnalysis from "../models/InvestmentAnalysis.js";

export async function listCities(req, res, next) {
  try {
    const cities = await City.find().sort({ name: 1 }).lean();
    res.json({ success: true, count: cities.length, data: cities });
  } catch (err) {
    next(err);
  }
}

export async function searchCities(req, res, next) {
  try {
    const { query = "" } = req.query;
    if (!query.trim()) {
      const popular = await City.find().sort({ population: -1 }).limit(8).lean();
      return res.json({ success: true, count: popular.length, data: popular });
    }

    const regex = new RegExp(query.trim(), "i");
    const cities = await City.find({
      $or: [{ name: regex }, { state: regex }, { slug: regex }],
    })
      .limit(10)
      .lean();

    res.json({ success: true, count: cities.length, data: cities });
  } catch (err) {
    next(err);
  }
}

export async function getCityBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const city = await City.findOne({ slug: slug.toLowerCase() }).lean();
    if (!city) {
      return res.status(404).json({ success: false, message: `City "${slug}" not found. Try Bengaluru, Mumbai, Hyderabad, Pune, or Delhi in demo mode.` });
    }

    const areas = await Area.find({ cityId: city._id }).lean();
    const analyses = await InvestmentAnalysis.find({ cityId: city._id }).lean();

    const analysisByArea = Object.fromEntries(analyses.map((a) => [String(a.areaId), a]));

    const areasWithScores = areas
      .map((area) => ({
        ...area,
        analysis: analysisByArea[String(area._id)] || null,
      }))
      .sort((a, b) => (b.analysis?.totalScore || 0) - (a.analysis?.totalScore || 0));

    const overall = areasWithScores.length
      ? Math.round(areasWithScores.reduce((sum, a) => sum + (a.analysis?.totalScore || 0), 0) / areasWithScores.length)
      : 0;

    res.json({
      success: true,
      data: {
        city,
        overallScore: overall,
        areaCount: areasWithScores.length,
        topAreas: areasWithScores,
      },
    });
  } catch (err) {
    next(err);
  }
}

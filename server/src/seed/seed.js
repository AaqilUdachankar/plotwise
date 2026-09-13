import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import City from "../models/City.js";
import Area from "../models/Area.js";
import InfrastructureProject from "../models/InfrastructureProject.js";
import InvestmentAnalysis from "../models/InvestmentAnalysis.js";
import { slugify } from "../utils/slugify.js";
import { buildAnalysisForArea } from "../utils/buildAnalysis.js";
import { citiesData } from "./data.js";

function nearestAreaIds(project, areas) {
  // Attach a project to any area within a rough distance threshold in degrees.
  // ~0.15 deg ~ 15-17km, generous enough for a demo city-level dataset.
  const THRESHOLD = 0.2;
  return areas
    .filter((a) => Math.hypot(a.latitude - project.latitude, a.longitude - project.longitude) <= THRESHOLD)
    .map((a) => a._id);
}

async function seed() {
  await connectDB();

  console.log("[PlotWise AI Seed] Clearing existing collections...");
  await Promise.all([
    City.deleteMany({}),
    Area.deleteMany({}),
    InfrastructureProject.deleteMany({}),
    InvestmentAnalysis.deleteMany({}),
  ]);

  let cityCount = 0;
  let areaCount = 0;
  let projectCount = 0;
  let analysisCount = 0;

  for (const cityInput of citiesData) {
    const { areas: areasInput, infra: infraInput, ...cityFields } = cityInput;

    const city = await City.create({ ...cityFields, slug: cityFields.slug || slugify(cityFields.name) });
    cityCount++;

    const createdAreas = [];
    for (const areaInput of areasInput) {
      const area = await Area.create({
        ...areaInput,
        cityId: city._id,
        slug: slugify(areaInput.name),
      });
      createdAreas.push(area);
      areaCount++;
    }

    const createdProjects = [];
    for (const projectInput of infraInput) {
      const areaIds = nearestAreaIds(projectInput, createdAreas);
      const project = await InfrastructureProject.create({
        ...projectInput,
        cityId: city._id,
        areaIds,
      });
      createdProjects.push(project);
      projectCount++;
    }

    for (const area of createdAreas) {
      const relatedProjects = createdProjects.filter((p) =>
        p.areaIds.some((id) => String(id) === String(area._id))
      );
      const analysisData = buildAnalysisForArea(area, relatedProjects);
      await InvestmentAnalysis.create(analysisData);
      analysisCount++;
    }

    console.log(`[PlotWise AI Seed] Seeded ${city.name}: ${createdAreas.length} areas, ${createdProjects.length} infra projects`);
  }

  console.log("\n[PlotWise AI Seed] Done.");
  console.log(`  Cities:     ${cityCount}`);
  console.log(`  Areas:      ${areaCount}`);
  console.log(`  Projects:   ${projectCount}`);
  console.log(`  Analyses:   ${analysisCount}`);

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error("[PlotWise AI Seed] Failed:", err);
  process.exit(1);
});

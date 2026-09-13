import {
  calculateInvestmentScore,
  riskLabelFromScore,
  growthPotentialFromScore,
  deriveStrengthsAndRisks,
} from "../services/investmentScore.service.js";

/**
 * Builds (but does not save) the deterministic analysis fields for an area.
 * Used both by the seed script and by any on-the-fly recalculation.
 */
export function buildAnalysisForArea(area, infrastructureProjects = []) {
  const totalScore = calculateInvestmentScore({
    infrastructureScore: area.infrastructureScore,
    connectivityScore: area.connectivityScore,
    employmentScore: area.employmentScore,
    developmentScore: area.developmentScore,
    demandScore: area.demandScore,
    riskScore: area.riskScore,
  });

  const { strengths, risks } = deriveStrengthsAndRisks(area, infrastructureProjects);

  return {
    cityId: area.cityId,
    areaId: area._id,
    totalScore,
    infrastructureScore: area.infrastructureScore,
    connectivityScore: area.connectivityScore,
    employmentScore: area.employmentScore,
    developmentScore: area.developmentScore,
    demandScore: area.demandScore,
    riskScore: area.riskScore,
    riskLabel: riskLabelFromScore(area.riskScore),
    growthPotential: growthPotentialFromScore(totalScore),
    strengths,
    risks,
    generatedAt: new Date(),
  };
}

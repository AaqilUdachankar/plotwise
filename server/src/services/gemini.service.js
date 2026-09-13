/**
 * gemini.service.js
 * ---------------------------------------------------
 * Thin AI provider abstraction. This is the ONLY file that talks to the
 * Gemini API. If you want to swap providers later (OpenAI, Claude, local
 * model, etc.), reimplement `generateExplanation` and `generateComparison`
 * here and nothing else in the codebase needs to change.
 *
 * IMPORTANT SAFETY RULES BAKED INTO THE PROMPTS:
 *  - The model is given ONLY structured numeric/derived data.
 *  - The model is explicitly instructed not to invent projects, prices,
 *    dates, or statistics, and to separate fact from interpretation.
 *  - If no API key is configured, or the call fails, we fall back to a
 *    deterministic, template-based explanation so the app never breaks.
 * ---------------------------------------------------
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";

let client = null;
function getClient() {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!client) client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return client;
}

export function isAIConfigured() {
  return Boolean(process.env.GEMINI_API_KEY);
}

/**
 * Explain a single area's investment score using ONLY the supplied data.
 */
export async function generateAreaExplanation({ city, area, analysis, infrastructureProjects }) {
  const genAI = getClient();
  if (!genAI) {
    return fallbackAreaExplanation({ city, area, analysis, infrastructureProjects });
  }

  const prompt = buildAreaPrompt({ city, area, analysis, infrastructureProjects });

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return { text: text.trim(), source: "gemini" };
  } catch (err) {
    console.error("[gemini.service] generateAreaExplanation failed:", err.message);
    return fallbackAreaExplanation({ city, area, analysis, infrastructureProjects });
  }
}

/**
 * Summarize a comparison across 2-3 areas using ONLY supplied data.
 */
export async function generateComparisonSummary({ city, comparisonRows }) {
  const genAI = getClient();
  if (!genAI) {
    return fallbackComparisonSummary({ comparisonRows });
  }

  const prompt = buildComparisonPrompt({ city, comparisonRows });

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return { text: text.trim(), source: "gemini" };
  } catch (err) {
    console.error("[gemini.service] generateComparisonSummary failed:", err.message);
    return fallbackComparisonSummary({ comparisonRows });
  }
}

// ---------------------------------------------------------------------------
// Prompt builders
// ---------------------------------------------------------------------------

function buildAreaPrompt({ city, area, analysis, infrastructureProjects }) {
  const projectLines = infrastructureProjects
    .map(
      (p) =>
        `- ${p.name} (${p.type}, status: ${p.status}, expected: ${p.estimatedCompletion}, impact: ${p.impactLevel}, source: ${p.source})`
    )
    .join("\n");

  return `You are an analytical assistant inside a real-estate DECISION-SUPPORT tool called PlotWise AI.
You are NOT a financial advisor and must not give investment advice or guarantee returns.

Explain why the area below received its investment score, using ONLY the structured data provided.
Do not invent any government projects, prices, dates, or statistics that are not in the data below.
Clearly separate objective facts (from the data) from your own interpretation (label it as "Interpretation").

CITY: ${city.name}, ${city.state}, ${city.country}

AREA: ${area.name} (${area.locality || "locality not specified"})
Current price range: ${area.currentPriceRange || "not available"}

SCORES (0-100 scale, Risk: higher = riskier):
- Total Investment Score: ${analysis.totalScore}
- Infrastructure: ${analysis.infrastructureScore}
- Connectivity: ${analysis.connectivityScore}
- Employment Growth: ${analysis.employmentScore}
- Development Activity: ${analysis.developmentScore}
- Demand Potential: ${analysis.demandScore}
- Risk: ${analysis.riskScore} (${analysis.riskLabel})

NEARBY INFRASTRUCTURE PROJECTS:
${projectLines || "No specific projects on file for this area."}

Respond in this exact structure using short paragraphs and bullet points:

## Why This Area Ranks Highly (or Moderately/Low, matching the score)
(2-3 sentences using only the data above)

## Key Growth Drivers
1. Connectivity - ...
2. Infrastructure - ...
3. Employment - ...
4. Development - ...

## Potential Risks
- ...
- ...

## Investment Outlook (AI Interpretation)
(2-3 sentences, clearly labeled as interpretation, not fact, and reminding the reader this is not financial advice)`;
}

function buildComparisonPrompt({ city, comparisonRows }) {
  const rows = comparisonRows
    .map(
      (r) =>
        `- ${r.name}: total=${r.totalScore}, infrastructure=${r.infrastructureScore}, connectivity=${r.connectivityScore}, employment=${r.employmentScore}, development=${r.developmentScore}, demand=${r.demandScore}, risk=${r.riskScore}`
    )
    .join("\n");

  return `You are an analytical assistant inside a real-estate DECISION-SUPPORT tool called PlotWise AI.
You are NOT a financial advisor and must not give investment advice or guarantee returns.

Compare the areas below in ${city.name}, using ONLY the structured numeric data provided. Do not invent facts.

AREAS:
${rows}

Respond in this exact structure, using short bullet points:

## Strongest for Connectivity
## Strongest for Infrastructure
## Strongest Employment Potential
## Highest Risk
## Most Balanced Option
## AI Interpretation
(1-2 sentences, clearly labeled as interpretation, reminding the reader this is not financial advice)`;
}

// ---------------------------------------------------------------------------
// Deterministic fallbacks (used when Gemini key is missing or call fails)
// ---------------------------------------------------------------------------

function fallbackAreaExplanation({ area, analysis, infrastructureProjects }) {
  const drivers = [
    `Connectivity scored ${analysis.connectivityScore}/100 based on existing and planned transit links.`,
    `Infrastructure scored ${analysis.infrastructureScore}/100 based on ${infrastructureProjects.length} tracked project(s) in the area.`,
    `Employment scored ${analysis.employmentScore}/100 reflecting nearby commercial/industrial activity.`,
    `Development scored ${analysis.developmentScore}/100 reflecting current construction and project activity.`,
  ];

  const risksText = (analysis.risks || []).map((r) => `- ${r}`).join("\n") || "- No elevated risk signals identified in available data.";
  const strengthsText = (analysis.strengths || []).map((s) => `- ${s}`).join("\n");

  const text = `## Why This Area Ranks at ${analysis.totalScore}/100
${area.name} received this score from PlotWise AI's deterministic scoring formula, which weights Infrastructure (25%), Connectivity (20%), Employment (15%), Development (15%), Demand (15%), and a Risk adjustment (10%).

## Key Growth Drivers
1. Connectivity - ${drivers[0]}
2. Infrastructure - ${drivers[1]}
3. Employment - ${drivers[2]}
4. Development - ${drivers[3]}

Additional positive signals:
${strengthsText || "- Balanced fundamentals across measured growth factors."}

## Potential Risks
${risksText}

## Investment Outlook (AI Interpretation)
This is a template-based summary generated without a connected AI model (no GEMINI_API_KEY configured, or the AI call failed). It reflects only the structured score data above and is not financial advice. Configure GEMINI_API_KEY on the backend to enable richer, natural-language AI explanations.`;

  return { text, source: "fallback-template" };
}

function fallbackComparisonSummary({ comparisonRows }) {
  const best = (key) =>
    [...comparisonRows].sort((a, b) => b[key] - a[key])[0];
  const worst = (key) =>
    [...comparisonRows].sort((a, b) => b[key] - a[key])[comparisonRows.length - 1];

  const bestConnectivity = best("connectivityScore");
  const bestInfra = best("infrastructureScore");
  const bestEmployment = best("employmentScore");
  const highestRisk = best("riskScore");
  const balanced = [...comparisonRows].sort((a, b) => b.totalScore - a.totalScore)[0];

  const text = `## Strongest for Connectivity
- ${bestConnectivity.name} (${bestConnectivity.connectivityScore}/100)

## Strongest for Infrastructure
- ${bestInfra.name} (${bestInfra.infrastructureScore}/100)

## Strongest Employment Potential
- ${bestEmployment.name} (${bestEmployment.employmentScore}/100)

## Highest Risk
- ${highestRisk.name} (risk score ${highestRisk.riskScore}/100)

## Most Balanced Option
- ${balanced.name}, with the highest overall PlotWise AI score (${balanced.totalScore}/100) across all weighted factors.

## AI Interpretation
This is a template-based summary generated without a connected AI model (no GEMINI_API_KEY configured, or the AI call failed). It is derived only from the numeric scores above and is not financial advice.`;

  return { text, source: "fallback-template" };
}

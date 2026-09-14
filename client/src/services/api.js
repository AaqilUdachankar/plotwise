
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create Axios instance
export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// Response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";

    console.error("API Error:", {
      message,
      status: error.response?.status,
      url: error.config?.url,
    });

    return Promise.reject(new Error(message));
  }
);

// ==========================================
// CITIES
// ==========================================

// Search cities
export const searchCities = async (query) => {
  try {
    const response = await api.get("/cities/search", {
      params: { query },
    });

    console.log("Search API response:", response.data);

    // Handle standard backend response: { data: [...] }
    return response.data?.data || [];
  } catch (error) {
    console.error("Search cities failed:", error);
    throw error;
  }
};

// Get all cities
export const listCities = async () => {
  const response = await api.get("/cities");

  return response.data?.data || [];
};

// Get city by slug
export const getCityBySlug = async (slug) => {
  const response = await api.get(`/cities/${slug}`);

  return response.data?.data || null;
};

// ==========================================
// AREAS
// ==========================================

// Get areas by city
export const getAreasByCity = async (cityId) => {
  const response = await api.get(`/areas/city/${cityId}`);

  return response.data?.data || [];
};

// Get area by ID
export const getAreaById = async (id) => {
  const response = await api.get(`/areas/${id}`);

  return response.data?.data || null;
};

// ==========================================
// INFRASTRUCTURE
// ==========================================

// Get infrastructure by city
export const getInfrastructureByCity = async (cityId) => {
  const response = await api.get(`/infrastructure/city/${cityId}`);

  return response.data?.data || [];
};

// ==========================================
// ANALYSIS
// ==========================================

// Get analysis by area
export const getAnalysisByArea = async (areaId) => {
  const response = await api.get(`/analysis/area/${areaId}`);

  return response.data?.data || null;
};

// ==========================================
// AI
// ==========================================

// Explain area using AI
export const explainArea = async (areaId) => {
  const response = await api.post("/ai/explain-area", {
    areaId,
  });

  return response.data?.data || null;
};

// Compare areas using AI
export const compareAreasAI = async (areaIds) => {
  const response = await api.post("/ai/compare-areas", {
    areaIds,
  });

  return response.data?.data || null;
};

// Default export
export default api;
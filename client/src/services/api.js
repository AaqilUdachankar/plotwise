import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message || err.message || "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

// ---- Cities ----
export const searchCities = (query) => api.get("/cities/search", { params: { query } }).then((r) => r.data.data);
export const listCities = () => api.get("/cities").then((r) => r.data.data);
export const getCityBySlug = (slug) => api.get(`/cities/${slug}`).then((r) => r.data.data);

// ---- Areas ----
export const getAreasByCity = (cityId) => api.get(`/areas/city/${cityId}`).then((r) => r.data.data);
export const getAreaById = (id) => api.get(`/areas/${id}`).then((r) => r.data.data);

// ---- Infrastructure ----
export const getInfrastructureByCity = (cityId) => api.get(`/infrastructure/city/${cityId}`).then((r) => r.data.data);

// ---- Analysis ----
export const getAnalysisByArea = (areaId) => api.get(`/analysis/area/${areaId}`).then((r) => r.data.data);

// ---- AI ----
export const explainArea = (areaId) => api.post("/ai/explain-area", { areaId }).then((r) => r.data.data);
export const compareAreasAI = (areaIds) => api.post("/ai/compare-areas", { areaIds }).then((r) => r.data.data);

export default api;

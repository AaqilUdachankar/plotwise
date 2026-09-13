import { Router } from "express";
import { listCities, searchCities, getCityBySlug } from "../controllers/cities.controller.js";

const router = Router();

router.get("/search", searchCities);
router.get("/:slug", getCityBySlug);
router.get("/", listCities);

export default router;

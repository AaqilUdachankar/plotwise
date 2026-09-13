import { Router } from "express";
import { getAnalysisByCity, getAnalysisByArea } from "../controllers/analysis.controller.js";

const router = Router();

router.get("/city/:cityId", getAnalysisByCity);
router.get("/area/:areaId", getAnalysisByArea);

export default router;

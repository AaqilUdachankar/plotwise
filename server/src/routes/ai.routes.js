import { Router } from "express";
import { explainArea, compareAreas } from "../controllers/ai.controller.js";
import { aiLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.use(aiLimiter);
router.post("/explain-area", explainArea);
router.post("/compare-areas", compareAreas);

export default router;

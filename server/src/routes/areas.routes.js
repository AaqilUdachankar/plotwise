import { Router } from "express";
import { getAreasByCity, getAreaById } from "../controllers/areas.controller.js";

const router = Router();

router.get("/city/:cityId", getAreasByCity);
router.get("/:id", getAreaById);

export default router;

import { Router } from "express";
import { getInfrastructureByCity, getInfrastructureById } from "../controllers/infrastructure.controller.js";

const router = Router();

router.get("/city/:cityId", getInfrastructureByCity);
router.get("/:id", getInfrastructureById);

export default router;

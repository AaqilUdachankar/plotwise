import mongoose from "mongoose";
import InfrastructureProject from "../models/InfrastructureProject.js";

export async function getInfrastructureByCity(req, res, next) {
  try {
    const { cityId } = req.params;
    if (!mongoose.isValidObjectId(cityId)) {
      return res.status(400).json({ success: false, message: "Invalid cityId" });
    }

    const projects = await InfrastructureProject.find({ cityId }).sort({ type: 1 }).lean();

    const grouped = projects.reduce((acc, p) => {
      acc[p.type] = acc[p.type] || [];
      acc[p.type].push(p);
      return acc;
    }, {});

    res.json({ success: true, count: projects.length, data: { projects, grouped } });
  } catch (err) {
    next(err);
  }
}

export async function getInfrastructureById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }
    const project = await InfrastructureProject.findById(id).lean();
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

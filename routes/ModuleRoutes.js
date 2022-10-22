import express from "express";
import { getAllModules, newModule } from "../controllers/ModuleController.js";

const router = express.Router();

router.post("/get-all", getAllModules);
router.post("/new-module", newModule);

export default router;

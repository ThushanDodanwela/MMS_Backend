import express from "express";
import {
  deleteAllModules,
  getAllModules,
  newModule,
  updateModule,
} from "../controllers/ModuleController.js";

const router = express.Router();

router.post("/get-all", getAllModules);
router.post("/delete-all", deleteAllModules);
router.post("/new-module", newModule);
router.post("/update-module", updateModule);

export default router;

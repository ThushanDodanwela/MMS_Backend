import express from "express";
import {
  deleteAllModules,
  getAllModules,
  newModule,
} from "../controllers/ModuleController.js";

const router = express.Router();

router.post("/get-all", getAllModules);
router.post("/delete-all", deleteAllModules);
router.post("/new-module", newModule);

export default router;

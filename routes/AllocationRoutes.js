import express from "express";
import {
  getAllAllocations,
  newAllocation,
} from "../controllers/AllocationController.js";

const router = express.Router();

router.post("/get-all", getAllAllocations);
router.post("/new-allocation", newAllocation);

export default router;

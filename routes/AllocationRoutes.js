import express from "express";
import {
  deleteAllAllocations,
  getAllAllocations,
  getAllocationsByLecturer,
  isAllocated,
  newAllocation,
  updateAllocation,
  updateAllocationState,
} from "../controllers/AllocationController.js";

const router = express.Router();

router.post("/get-all", getAllAllocations);
router.post("/get-allocations-by-lecturer", getAllocationsByLecturer);
router.post("/new-allocation", newAllocation);
router.post("/update-allocation", updateAllocation);
router.post("/update-allocation-state", updateAllocationState);
router.post("/delete-all", deleteAllAllocations);
router.post("/is-allocated", isAllocated);

export default router;

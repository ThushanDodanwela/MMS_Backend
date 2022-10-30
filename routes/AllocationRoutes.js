import express from "express";
import {
  deleteAllAllocations,
  getAllAllocations,
  isAllocated,
  newAllocation,
} from "../controllers/AllocationController.js";

const router = express.Router();

router.post("/get-all", getAllAllocations);
router.post("/new-allocation", newAllocation);
router.post("/delete-all", deleteAllAllocations);
router.post("/is-allocated", isAllocated);

export default router;

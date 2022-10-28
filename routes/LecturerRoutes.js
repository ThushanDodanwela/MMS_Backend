import express from "express";
import {
  getAllLecturers,
  newLecturer,
  updateLecturer,
} from "../controllers/LecturerController.js";

const router = express.Router();

router.post("/get-all", getAllLecturers);
router.post("/new-lecturer", newLecturer);
router.post("/update-lecturer", updateLecturer);

export default router;

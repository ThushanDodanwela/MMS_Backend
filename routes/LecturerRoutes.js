import express from "express";
import {
  deleteAllLecturers,
  getAllLecturers,
  newLecturer,
  updateLecturer,
} from "../controllers/LecturerController.js";

const router = express.Router();

router.post("/get-all", getAllLecturers);
router.post("/delete-all", deleteAllLecturers);
router.post("/new-lecturer", newLecturer);
router.post("/update-lecturer", updateLecturer);

export default router;

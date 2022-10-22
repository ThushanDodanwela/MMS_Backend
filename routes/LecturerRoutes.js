import express from "express";
import {
  getAllLecturers,
  newLecturer,
} from "../controllers/LecturerController.js";

const router = express.Router();

router.post("/get-all", getAllLecturers);
router.post("/new-lecturer", newLecturer);

export default router;

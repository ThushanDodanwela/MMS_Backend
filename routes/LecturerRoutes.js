import express from "express";
import {
  deleteAllLecturers,
  getAllLecturers,
  isEmailExists,
  login,
  newLecturer,
  resetPassword,
  sendOTP,
  updateLecturer,
  verifyOTP,
} from "../controllers/LecturerController.js";

const router = express.Router();

router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/get-all", getAllLecturers);
router.post("/check-email", isEmailExists);
router.post("/delete-all", deleteAllLecturers);
router.post("/new-lecturer", newLecturer);
router.post("/update-lecturer", updateLecturer);

export default router;

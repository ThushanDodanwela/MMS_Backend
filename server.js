import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import {
  getAllLecturers,
  newLecturer,
} from "./controllers/LecturerController.js";
import LecturerRoutes from "./routes/LecturerRoutes.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/lecturer", LecturerRoutes);

app.listen(3000, () => {
  console.log("server started at port 3000");
});
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

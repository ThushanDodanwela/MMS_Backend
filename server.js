import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  getAllLecturers,
  newLecturer,
} from "./controllers/LecturerController.js";
import LecturerRoutes from "./routes/LecturerRoutes.js";
import ModuleRoutes from "./routes/ModuleRoutes.js";
import AllocationRoutes from "./routes/AllocationRoutes.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/lecturer", LecturerRoutes);
app.use("/module", ModuleRoutes);
app.use("/allocations", AllocationRoutes);

app.listen(9050, () => {
  console.log("server started at port 9000");
});

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

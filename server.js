import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import {
  getAllLecturers,
  newLecturer,
} from "./controllers/LecturerController.js";

const app = express();

app.use(bodyParser.json());

app.get("/lecturers", getAllLecturers);

app.post("/new-lecturer", newLecturer);

app.listen(3000, () => {
  console.log("server started at port 3000");
});
mongoose
  .connect("mongodb://localhost:27017/MMS")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

import Lecturer from "../models/Lecturer.js";

export const getAllLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.status(200).json({
      message: "success",
      lecturers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retriving lecturers",
      error,
    });
  }
};

export const newLecturer = async (req, res) => {
  const { name, position, email } = req.body;

  try {
    const lecturer = await Lecturer.create({ name, position, email });
    res.status(200).json({
      message: "success",
      lecturer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating new lecturer",
      error,
    });
  }
};

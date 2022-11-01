import mongoose from "mongoose";
import Lecturer from "../models/Lecturer.js";

export const getAllLecturers = async (req, res, next) => {
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
  return next(error);
};

export const newLecturer = async (req, res, next) => {
  const { name, position, email, phoneNumber, qualifications } = req.body;

  try {
    const lecturer = await Lecturer.create({
      name,
      position,
      email,
      phoneNumber,
      qualifications,
    });
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
  return next(error);
};

export const deleteAllLecturers = async (req, res, next) => {
  try {
    const lecturers = await Lecturer.deleteMany({});
    res.status(200).json({
      message: "all lecturers removed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing lecturers",
      error,
    });
  }
  return next(error);
};

export const updateLecturer = async (req, res, next) => {
  const { _id, name, position, email, phoneNumber, qualifications } = req.body;

  try {
    // find lecturer in the database
    const lecturer = await Lecturer.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        name: name,
        position: position,
        email: email,
        phoneNumber: phoneNumber,
        qualifications: qualifications,
      }
    );

    lecturer.save();
    res.status(200).json({
      message: "success",
      lecturer,
    });
  } catch (error) {
    res.status(500).json({
      message: "error updating lecturer",
      error,
    });
  }
  return next(error);
};

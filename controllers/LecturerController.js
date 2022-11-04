import mongoose from "mongoose";
import Lecturer from "../models/Lecturer.js";
import nodemailer from "nodemailer";

export const getAllLecturers = async (req, res, next) => {
  try {
    const lecturers = await Lecturer.find({}, { password: 0 });
    res.status(200).json({
      message: "success",
      lecturers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retriving lecturers",
      error,
    });
    return next(error);
  }
};

export const isEmailExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const lecturer = await Lecturer.find({ email: email }, { password: 0 });
    if (lecturer.length > 0) {
      res.status(200).json({
        message: "Email already exists",
      });
    } else {
      res.status(200).json({
        message: "success",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retriving lecturers",
      error,
    });
    return next(error);
  }
};

export const newLecturer = async (req, res, next) => {
  const { name, position, email, phoneNumber, qualifications, password } =
    req.body;

  try {
    const lecturer = await Lecturer.create({
      name,
      position,
      email,
      phoneNumber,
      qualifications,
      password,
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
    return next(error);
  }
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
    return next(error);
  }
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

    res.status(200).json({
      message: "success",
      lecturer,
    });
  } catch (error) {
    res.status(500).json({
      message: "error updating lecturer",
      error,
    });
    return next(error);
  }
};

export const sendOTP = async (req, res, next) => {
  const { email } = req.body;
  // find lecturer in the database
  const lecturer = await Lecturer.findOneAndUpdate({
    email: email,
  });

  try {
    if (lecturer) {
      let OTP = (Math.random() * 100000).toFixed();
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD,
        },
      });

      let mailOptions = {
        from: "mms.dim.kln@gmail.com",
        to: "lasitheranga1@gmail.com", //TODO:replace email with lecturer email
        subject: "MMS - Password Reset",
        html: `<h1>Hi ${
          lecturer.name.split(" ")[0]
        },</h1><h3>The OTP is:</h3><span>${OTP}</span>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).json({
            message: "Error sending OTP",
            error,
          });
        } else {
          lecturer.password = OTP;
          lecturer.save();
          res.status(200).json({
            message: "success",
            info: info.response,
          });
        }
      });
    } else {
      res.status(500).json({
        message: "Email does not exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
    return next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const lecturer = await Lecturer.findOne({
      email: email,
      password: otp,
    });
    if (lecturer) {
      res.status(200).json({
        message: "success",
      });
    } else {
      res.status(500).json({
        message: "Verification Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
    return next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, password, otp } = req.body;

  try {
    // find lecturer in the database
    const lecturer = await Lecturer.findOneAndUpdate(
      {
        email: email,
        password: otp,
      },
      {
        password: password,
      }
    );
    // lecturer.save();
    if (lecturer) {
      res.status(200).json({
        message: "success",
      });
    } else {
      res.status(200).json({
        message: "Error resetting password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error resetting password",
      error,
    });
    return next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // find lecturer in the database
    const lecturer = await Lecturer.findOne({
      email: email,
      password: password,
    });
    if (lecturer) {
      res.status(200).json({
        message: "success",
        lecturerId: lecturer._id,
        position: lecturer.position,
      });
    } else {
      res.status(500).json({
        message: "Login failed",
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message: "error updating lecturer",
      error,
    });
    return next(error);
  }
};

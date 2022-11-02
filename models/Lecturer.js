import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

const LecturerSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  position: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
  },
  qualifications: {
    type: String,
    trim: true,
    required: false,
  },
  password: {
    type: String,
    trim: true,
    required: false,
  },
});

export default mongoose.model("Lecturer", LecturerSchema);

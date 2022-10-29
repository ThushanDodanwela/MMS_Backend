import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

const AllocationSchema = new Schema({
  lecturers: [
    {
      lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecturer",
      },
      workload: {
        type: String,
        trim: true,
        required: true,
      },
    },
  ],
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
  },
  batch: {
    type: String,
    trim: true,
    required: true,
  },
  state: [
    {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      date: {
        type: Date,
        trim: true,
        required: true,
      },
    },
  ],
  secondExaminar: {
    type: mongoose.Types.ObjectId,
    ref: "Lecturer",
  },
  demonstrators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
    },
  ],
});

export default mongoose.model("Allocation", AllocationSchema);

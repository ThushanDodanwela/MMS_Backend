import mongoose from "mongoose";

const { Schema, ObjectId } = mongoose;

const ModuleSchema = new Schema({
  moduleCode: {
    type: String,
    trim: true,
    required: true,
  },
  moduleName: {
    type: String,
    trim: true,
    required: true,
  },
  level: {
    type: String,
    trim: true,
    required: true,
  },
  credits: {
    type: String,
    trim: true,
    required: true,
  },
  semester: {
    type: String,
    trim: true,
    required: true,
  },
});

export default mongoose.model("Modules", ModuleSchema);

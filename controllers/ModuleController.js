import Modules from "../models/Modules.js";

export const getAllModules = async (req, res) => {
  try {
    const modules = await Modules.find();
    res.status(200).json({
      message: "success",
      modules,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retriving modules",
      error,
    });
  }
};

export const newModule = async (req, res) => {
  const { moduleCode, moduleName, level, credits, semester } = req.body;

  try {
    const modules = await Modules.create({
      moduleCode,
      moduleName,
      level,
      credits,
      semester,
    });
    res.status(200).json({
      message: "success",
      modules,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating new module",
      error,
    });
  }
};

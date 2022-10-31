import Module from "../models/Module.js";

export const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find();
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

export const deleteAllModules = async (req, res) => {
  try {
    const modules = await Module.deleteMany({});
    res.status(200).json({
      message: "all modules removed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing modules",
      error,
    });
  }
};

export const newModule = async (req, res) => {
  const { moduleCode, moduleName, level, credits, semester } = req.body;

  try {
    const modules = await Module.create({
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

export const updateModule = async (req, res) => {
  const { _id, moduleCode, moduleName, level, credits, semester } = req.body;

  try {
    const modules = await Module.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        moduleCode,
        moduleName,
        level,
        credits,
        semester,
      }
    );
    res.status(200).json({
      message: "success",
      modules,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating new module",
      error,
    });
  }
};

import Module from "../models/Module.js";

export const getAllModules = async (req, res, next) => {
  try {
    const modules = await Module.find({ state: "exams" });
    res.status(200).json({
      message: "success",
      modules,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retriving modules",
      error,
    });
    return next(error);
  }
};

export const isModuleExists = async (req, res, next) => {
  const { moduleCode } = req.body;
  try {
    const module = await Module.find({ moduleCode: moduleCode });
    if (module.length > 0) {
      res.status(200).json({
        message: "Module code already exists",
      });
    } else {
      res.status(200).json({
        message: "success",
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

export const deleteAllModules = async (req, res, next) => {
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
    return next(error);
  }
};

export const newModule = async (req, res, next) => {
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
    return next(error);
  }
};

export const updateModule = async (req, res, next) => {
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
    return next(error);
  }
};

import Allocation from "../models/Allocation.js";

export const getAllAllocations = async (req, res, next) => {
  try {
    const allocations = await Allocation.find({}).populate(
      "lecturers.lecturer module secondExaminar demonstrators"
    );
    res.status(200).json({
      message: "success",
      allocations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retriving allocations",
      error,
    });
    return next(error);
  }
};

export const getAllocationsByLecturer = async (req, res, next) => {
  const { lecturerId } = req.body;

  try {
    const allocations = await Allocation.find({
      "lecturers.lecturer": { _id: lecturerId },
    }).populate("lecturers.lecturer module secondExaminar demonstrators");
    res.status(200).json({
      message: "success",
      allocations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retriving allocations",
      error,
    });
    return next(error);
  }
};

export const deleteAllAllocations = async (req, res, next) => {
  try {
    const allocations = await Allocation.deleteMany({});
    res.status(200).json({
      message: "all allocations removed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing allocations",
      error,
    });
    return next(error);
  }
};

export const newAllocation = async (req, res, next) => {
  const { lecturers, module, state, batch, secondExaminar, demonstrators } =
    req.body;
  try {
    const allocation = await Allocation.create({
      lecturers,
      module,
      state,
      batch,
      secondExaminar,
      demonstrators,
    });
    res.status(200).json({
      message: "success",
      allocation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating new allocation",
      error,
    });
    return next(error);
  }
};

export const isAllocated = async (req, res, next) => {
  const { moduleId, batch } = req.body;

  try {
    const allocation = await Allocation.findOne({
      module: { _id: moduleId },
      batch: batch,
    });
    if (allocation) {
      res.status(200).json({
        message: "ALLOCATED",
        allocation,
      });
    } else {
      res.status(200).json({
        message: "NOT_ALLOCATED",
        allocation,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error finding allocation",
      error,
    });
    return next(error);
  }
};

export const updateAllocation = async (req, res, next) => {
  const {
    _id,
    lecturers,
    module,
    state,
    batch,
    secondExaminar,
    demonstrators,
  } = req.body;
  try {
    const allocation = await Allocation.findOne({
      _id: _id,
    });
    allocation.lecturers = lecturers;
    allocation.module = module;
    allocation.state = state;
    allocation.batch = batch;
    allocation.secondExaminar = secondExaminar;
    allocation.demonstrators = demonstrators;
    allocation.save();
    res.status(200).json({
      message: "success",
      allocation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating new allocation",
      error,
    });
    return next(error);
  }
};

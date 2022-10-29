import Allocation from "../models/Allocation.js";

export const getAllAllocations = async (req, res) => {
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
  }
};

export const deleteAllAllocations = async (req, res) => {
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
  }
};

export const newAllocation = async (req, res) => {
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
  }
};

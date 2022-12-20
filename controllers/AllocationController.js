import { STATES } from "../const.js";
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
      ...(secondExaminar.length > 0 && { secondExaminar }),
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
        message: "success",
        isAllocated: "ALLOCATED",
        allocation: allocation,
      });
    } else {
      res.status(200).json({
        message: "success",
        isAllocated: "NOT_ALLOCATED",
        allocation: allocation,
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
  const { _id, lecturers, module, batch, secondExaminar, demonstrators } =
    req.body;
  try {
    const allocation = await Allocation.findOne({
      _id: _id,
    });
    allocation.lecturers = lecturers;
    allocation.module = module;
    allocation.batch = batch;
    if (secondExaminar.length > 0) {
      allocation.secondExaminar = secondExaminar;
    } else {
      allocation.secondExaminar = null;
    }
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

export const updateAllocationState = async (req, res, next) => {
  const { _id, state } = req.body;
  try {
    const allocation = await Allocation.findOne({
      _id: _id,
    });
    if (allocation) {
      // check whether it already exists
      const isAllocated = allocation.state.find(
        (current) => current.name === state.name
      );
      if (!isAllocated) {
        //check whether the order is correct
        const currentStateIndex = STATES.findIndex((current) => {
          return current === allocation.state[allocation.state.length - 1].name;
        });
        //if its the last element no more updates
        if (
          STATES.length - 1 !== currentStateIndex &&
          STATES[currentStateIndex + 1] === state.name
        ) {
          //check dates wheter new date is ahead
          const currentDate = new Date(
            allocation.state[allocation.state.length - 1].date
          );
          const newDate = new Date(state.date);
          // console.log(currentDate, newDate);
          if (currentDate < newDate) {
            allocation.state.push(state);
          } else {
            res.status(400).json({
              message:
                "Operation Failed, New date is behind the previous state date.",
              allocation: allocation,
            });
            return;
          }
        } else {
          res.status(400).json({
            message: "Operation Failed, You cannot change the state order",
            allocation: allocation,
          });
          return;
        }
      } else {
        res.status(400).json({
          message: "Operation Failed, Already existing state",
          allocation: allocation,
        });
        return;
      }
      allocation.save();
      res.status(200).json({
        message: "success",
        allocation,
      });
    } else {
      //no allocation found for given id
      res.status(400).json({
        message: "Allocation not found",
        allocation: allocation,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating allocation state",
      error,
    });
    return next(error);
  }
};

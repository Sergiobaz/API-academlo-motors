import { catchAsync } from "../common/errors/catchAsync.js";
import { RepairService } from "./repairs.service.js";
import { validateCreateRepair } from "./repairs.schema.js"
import { AppError } from "../common/errors/appError.js";

const repairService = new RepairService();

export const findAllRepairs = async (req, res) => {
  try {
    const repair = await repairService.findAll();

    return res.status(200).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const createRepair = catchAsync( async (req, res) => {
  const { hasError, errorMessages, repairData} = validateCreateRepair(req.body)
  if(hasError){
    return res.status(422).json({
      status: "error",
      message: errorMessages
    })
  }
    const repair = await repairService.create(repairData);
    return res.status(201).json(repair);
});

export const findOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  return res.status(200).json(repair);
});

export const updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  const repairUpdated = await repairService.update(repair, req.body);

  return res.status(200).json(repairUpdated);
});

export const deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repairService.delete(repair);

  return res.status(204).json(null);
});

import Repair from "./repairs.model.js";

export class RepairService {
  async findOne(id) {
    return await Repair.findOne({
      where: {
        status: "pending",
        id,
      },
    });
  }

  async findAll() {
    return await Repair.findAll({
      where: {
        status: "pending",
      },
    });
  }

  async create(data) {
    return await Repair.create(data);
  }

  async update(Repair, data) {
    return await Repair.update({ status: "completed"});
  }

  async delete(Repair) {
    return await Repair.update({ status: "cancelled" });
  }
}

import User from "./users.model.js";

export class UserService {
  async findOne(id) {
    return await User.findOne({
      where: {
        status: "available",
        id,
      },
    });
  }

  async findAll() {
    return await User.findAll({
      where: {
        status: "available",
      },
    });
  }

  async create(data) {
    return await User.create(data)
  }
  
  async update(User, data) {
    return await User.update(data)
  }

 async delete(User) {
    return await User.update({ status: 'disabled'})
 }
}

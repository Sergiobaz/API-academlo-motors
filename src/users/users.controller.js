import { UserService } from "./users.service.js";

const userService = new UserService();

export const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await userService.create(req.body);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findOne(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findOne(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }
    
    const userUpdated = await userService.update(user, req.body)

    return res.status(200).json(userUpdated)

  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {

    const  { id } = req.params
    const user = await userService.findOne(id)

    if (!user) {
        return res.status(404).json({
          status: "error",
          message: "user not found",
        });
      }

      await userService.delete(user)

      return res.status(204).json(null)

  } catch (error) {
    return res.status(500).json(error);
  }
};

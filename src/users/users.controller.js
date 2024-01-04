import { AppError } from "../common/errors/appError.js";
import { catchAsync } from "../common/errors/catchAsync.js";
import { verifyPassword } from "../config/plugin/encripted-password.plugin.js";
import generateJWT from "../config/plugin/generate-jwt.plugin.js";
import { UserService } from "./users.service.js";
import { validateCreateUser } from "./users.schema.js";

const userService = new UserService();

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.findOneByEmail(email);

  if (!user) {
    return next(new AppError("user not found", 404));
  }

  const isCorrectPassword = await verifyPassword(password, user.password);

  if (!isCorrectPassword) {
    return next(new AppError("invalid password", 401));
  }

  const token = await generateJWT(user.id);
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
    },
  });
});

export const findAllUsers = catchAsync(async (req, res) => {
  const users = await userService.findAll();
  return res.status(200).json(users);
});

export const createUser = catchAsync(async (req, res) => {
  //console.log(req.body);
  //const { hasError, errorMessages, userData } = validateCreateUser(req.body);
  //console.log(userData);
  const { name, email, password } = req.body
  
  const user = await userService.create({ name, email, password });
  const token = await generateJWT(user.id);
  return res.status(201).json({
    token,
    user: {
      name: user.name,
      id: user.id,
    },
  });
});

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

    const userUpdated = await userService.update(user, req.body);

    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findOne(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not found",
      });
    }

    await userService.delete(user);

    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};

import { AppError } from "../common/errors/appError.js";
import { catchAsync } from "../common/errors/catchAsync.js";
import { verifyPassword } from "../config/plugin/encripted-password.plugin.js";
import generateJWT from "../config/plugin/generate-jwt.plugin.js";
import { UserService } from "./users.service.js";

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

export const findAllUsers = catchAsync(async (req, res, next) => {
  const users = await userService.findAll();
  return res.status(200).json(users);
});

export const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await userService.create({ name, email, password, role });
  const token = await generateJWT(user.id);
  return res.status(201).json({
    token,
    user: {
      name: user.name,
      id: user.id,
    },
  });
});

export const findOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await userService.findOne(id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }
  return res.status(200).json(user);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;
  const userUpdated = await userService.update(user, { name, email });
  return res.status(200).json(userUpdated);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await userService.delete(user);
  return res.status(204).json(null);
});

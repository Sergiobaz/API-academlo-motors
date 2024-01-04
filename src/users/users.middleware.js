import { promisify } from "util";
import jwt from "jsonwebtoken";
import { envs } from "../config/enviorments/enviorments.js";
import { UserService } from "../users/users.service.js";
import { catchAsync } from "../common/errors/catchAsync.js";
import { AppError } from "../common/errors/appError.js";

const userService = new UserService()

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get acces", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

  const user = await userService.findOne(decoded.id);

  if (!user) {
    return next(
      new AppError("The owner of this token is not longer available", 401)
    );
  }
  req.sessionUser = user;
  next();
});

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.sessionUser.role)) {
            return next(
                new AppError("you do not have permission to perform this action!", 403)
            )
        }
        next()
    }
}

export const protectAccountOwner = catchAsync(async (req, res, next) => {
    const { user, sessionUser } = req

    if (user.id !== sessionUser.id) {
        return next (new AppError("You do not own this account.", 401))
    }
    next()
})
import HttpError from "../utils/httpError.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

//Check if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new HttpError(401, "Login first to access this resource"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});

//Authorize user roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!roles.includes(role)) {
      return next(
        new HttpError(
          403,
          `Role (${role}) is not allowed to access this resource`
        )
      );
    }

    next();
  };
};

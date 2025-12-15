import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import HttpError from "../utils/httpError.js";
import comparePassword from "../models/user.js";
import sendToken from "../utils/sendToken.js";
import getResetPasswordToken from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { delete_file, upload_file } from "../utils/cloudinary.js";

// Register user => /api/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

// Login user => /api/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HttpError(400, "Please enter email and password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new HttpError(401, "Invalid email or password"));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new HttpError(401, "Invalid email or password"));
  }

  sendToken(user, 200, res);
});

//Logout user => /api/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : "lax",
    secure: process.env.NODE_ENV === "PRODUCTION",
  });

  res.status(200).json({
    message: "Logged Out",
  });
});

//Upload user avatar => /api/me/upload-avatar
export const uploadAvatar = catchAsyncErrors(async (req, res, next) => {
  const { avatar } = req.body;
  const userId = req?.user?._id;

  if (req?.user?.avatar?.url) {
    await delete_file(req?.user?.avatar?.public_id);
  }

  const avatarResponse = await upload_file(avatar, "Grocerly/avatars");

  const user = await User.findByIdAndUpdate(userId, {
    avatar: avatarResponse,
  });

  res.status(200).json({
    user,
  });
});

// Forgot password => /api/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new HttpError(404, "User not found with this email"));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/password-reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Grocerly Password Recovery",
      message,
    });

    res.status(200).json({
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new HttpError(500, error?.message));
  }
});

// Reset Password  => /api/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new HttpError(400, "Password reset token is invalid or has been expired")
    );
  }

  if (password !== confirmPassword) {
    return next(new HttpError(400, "Passwords does not match"));
  }

  user.password = password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password has been reset successfully",
  });
});

//Get current user profile => /api/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);

  res.status(200).json({
    user,
  });
});

//Update Password  = /api/password/update

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, password } = req?.body;

  const user = await User.findById(req?.user?._id).select("+password");

  const isPasswordMatched = await user.comparePassword(oldPassword);
  if (!isPasswordMatched) {
    return next(new HttpError(400, "Old Password in incorrect"));
  }

  user.password = password;
  await user.save();

  res.status(200).json({
    success: true,
  });
});

//Update User Profile => /api/me/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;

  const newUserData = {
    name,
    email,
  };

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get all User - Admin => /api/admin/users

export const allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get  User details - Admin => /api/admin/users/:id

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return next(new HttpError(404, `User not found with id:${id}`));
  }
  res.status(200).json({
    user,
  });
});

//Update User Details- Admin => /api/admin/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, role } = req.body;
  const { id } = req.params;

  const newUserData = {
    name,
    email,
    role,
  };

  const user = await User.findByIdAndUpdate(id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});

//Delete User - Admin => /api/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return next(new HttpError(404, `User not found with id: ${id}`));
  }

  if (user?.avatar?.public_id) {
    await delete_file(user?.avatar?.public_id);
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
});

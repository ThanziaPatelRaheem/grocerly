import express from "express";
import {
  allUsers,
  deleteUser,
  forgotPassword,
  getUserDetails,
  getUserProfile,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUser,
  uploadAvatar,
} from "../controllers/authControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.patch("/password-reset/:token", resetPassword);
router.get("/me", isAuthenticatedUser, getUserProfile);
router.patch("/me/update", isAuthenticatedUser, updateProfile);
router.patch("/me/upload-avatar", isAuthenticatedUser, uploadAvatar);
router.patch("/password/update", isAuthenticatedUser, updatePassword);
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  allUsers
);
router.get(
  "/admin/users/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getUserDetails
);
router.patch(
  "/admin/users/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUser
);
router.delete(
  "/admin/users/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUser
);

export default router;

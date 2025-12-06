import express from "express";
import {
  deleteOrder,
  getAllAdminOrders,
  getOrderDetails,
  getSales,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.post("/orders/new", isAuthenticatedUser, newOrder);
router.get("/orders/:id", isAuthenticatedUser, getOrderDetails);
router.get("/me/orders", isAuthenticatedUser, myOrders);
router.get(
  "/admin/get-sales",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSales
);
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllAdminOrders
);
router.patch(
  "/admin/orders/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrder
);
router.delete(
  "/admin/orders/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrder
);

export default router;

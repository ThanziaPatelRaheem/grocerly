import express from "express";
import {
  stripeCheckoutSession,
  stripeWebhook,
} from "../controllers/paymentControllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/payment/checkout-session",
  isAuthenticatedUser,
  stripeCheckoutSession
);

router.post("/payment/webhook", stripeWebhook);
export default router;

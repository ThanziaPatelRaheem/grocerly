import express from "express";
import {
  canUserReview,
  createProductReview,
  deleteProduct,
  deleteProductImage,
  deleteReview,
  getAdminProducts,
  getProductDetails,
  getProductReviews,
  getProducts,
  getRecommendedProducts,
  getTrendingProducts,
  newProduct,
  updateProduct,
  uploadProductImages,
} from "../controllers/productControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.get("/products", getProducts);
router.get("/products/recommended", getRecommendedProducts);
router.get("/products/trending", getTrendingProducts);
router.post(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  newProduct
);
router.get(
  "/admin/products",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAdminProducts
);
router.patch(
  "/admin/products/:id/upload_images",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  uploadProductImages
);
router.patch(
  "/admin/products/:id/delete_image",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProductImage
);
router.get("/products/:id", getProductDetails);
router.patch("/admin/products/:id", updateProduct);
router.delete("/admin/products/:id", deleteProduct);
router.patch("/reviews", isAuthenticatedUser, createProductReview);
router.get("/reviews", isAuthenticatedUser, getProductReviews);
router.get("/can-review", isAuthenticatedUser, canUserReview);

router.delete(
  "/admin/reviews",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteReview
);

export default router;

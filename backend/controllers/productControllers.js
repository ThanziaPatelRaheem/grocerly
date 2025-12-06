import Product from "../models/product.js";
import HttpError from "../utils/httpError.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilters.js";
import Order from "../models/order.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";

// Get all the products => /api/products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const resPerPage = 12;
  const apiFilters = new APIFilters(Product, req.query).search().filters();

  let filter = apiFilters.query.getFilter();

  const totalProducts = await Product.estimatedDocumentCount();
  const filteredProductsCount = await Product.countDocuments(filter);

  apiFilters.query = apiFilters.query.sort({ name: 1 });
  apiFilters.pagination(resPerPage);
  const products = await apiFilters.query.lean();

  return res.status(200).json({
    success: true,
    resPerPage,
    filteredProductsCount,
    totalProducts,
    products,
  });
});

// Get recommended products => /api/products/recommended
export const getRecommendedProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find({ isRecommended: true })
    .sort({ updatedAt: -1 })
    .limit(20)
    .lean();

  return res.status(200).json({
    success: true,
    products,
  });
});

// Get trending products => /api/products/trending
export const getTrendingProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find({ isTrending: true })
    .sort({ updatedAt: -1 })
    .limit(20)
    .lean();

  res.status(200).json({
    success: true,
    products,
  });
});

//Create new Product Admin route /api/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Get single product details  /api/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req?.params;
  const product = await Product.findById(id).populate("reviews.user");

  if (!product) {
    return next(new HttpError(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Get admin products details  /api/admin/products
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//Update product details admin =>  /api/admin/products/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
  const { id } = req?.params;
  let product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({
    success: true,
    product,
  });
});

//Upload product images =>  /api/admin/products/:id/upload_images
export const uploadProductImages = catchAsyncErrors(async (req, res) => {
  const { id } = req?.params;
  let product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  const uploader = async (image) => upload_file(image, "Grocerly/products");
  const urls = await Promise.all((req?.body?.images).map(uploader));

  product?.images?.push(...urls);
  await product?.save();

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete product images =>  /api/admin/products/:id/delete_image
export const deleteProductImage = catchAsyncErrors(async (req, res) => {
  const { id } = req?.params;
  const { imgId } = req.body;
  let product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  const isDeleted = await delete_file(req.body.imgId);

  if (isDeleted) {
    product.images = product?.images?.filter(
      (img) => img.public_id !== req.body.imgId
    );
    await product?.save();
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete product  admin =>  /api/admin/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  const { id } = req?.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  //deleting images associated with product
  for (let i = 0; i < product?.images?.length; i++) {
    await delete_file(product?.images[i].public_id);
  }
  await product.deleteOne();

  res.status(200).json({
    message: "Product deleted successfully!",
  });
});

//Create/update product review => /api/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const userId = req?.user?._id;

  const review = {
    user: userId,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new HttpError(404, "Product not found"));
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === userId.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((r) => {
      if (r?.user?.toString() === userId.toString()) {
        r.comment = comment;
        r.rating = Number(rating);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get product reviews => /api/reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;

  const product = await Product.findById(id).populate("reviews.user");

  if (!product) {
    return next(new HttpError(404, "Product not found"));
  }

  res.status(200).json({
    reviews: product.reviews,
  });
});

//Delete product review => /api/admin/reviews
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const { productId, id } = req.query;

  let product = await Product.findById(productId);

  if (!product) {
    return next(new HttpError(404, "Product not found"));
  }

  const reviews = product?.reviews?.filter(
    (r) => r._id.toString() !== id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  product = await Product.findByIdAndUpdate(
    productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    product,
  });
});

//Can User reviews =>  /api/can-review
export const canUserReview = catchAsyncErrors(async (req, res) => {
  const userId = req?.user?._id;
  const { productId } = req.query;
  const orders = await Order.find({
    user: userId,
    "orderItems.product": productId,
  });

  if (orders.length === 0) {
    return res.status(200).json({
      canReview: false,
    });
  }

  res.status(200).json({
    canReview: true,
  });
});

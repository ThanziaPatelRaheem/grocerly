import { kMaxLength } from "buffer";
import mongoose from "mongoose";
import { type } from "os";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [5, "Product price cannot exceed 5 digits"],
    },
    shortDescription: {
      type: String,
      maxLength: [200, "Short description cannot exceed 200 characters"],
      // required: [true, "Please enter product description"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category"],
      enum: {
        values: [
          "Fruits",
          "Vegetables",
          "Dairy & Eggs",
          "Meat & Poultry",
          "Bakery & Bread",
          "Frozen Foods",
          "Snacks & Candy",
          "Household Supplies",
          "Mother & Baby",
          "Beauty & Personal Care",
          "Beverages",
          "Cooking & Baking Needs",
        ],
        message: "Please select correct category",
      },
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },
    weight: {
      type: String,
      required: [true, "Please enter weight or quantity"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Product", ProductSchema);

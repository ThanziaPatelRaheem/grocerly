import React, { useEffect, useState } from "react";
import Apple from "../../public/images/apples.png";
import Apple1 from "../../public/images/apples-1.png";
import Apple2 from "../../public/images/apples-2.png";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useParams, Link } from "react-router-dom";
import Review from "./Review";
import ProductDescription from "./ProductDescription";
import { useGetProductDetailsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import Loader from "../components/Layout/Loader";
import { RatingView } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import { setCartItem } from "../redux/features/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");
  const [activeImg, setActiveImg] = useState("");

  const { data, isLoading, isError, error } = useGetProductDetailsQuery(id);
  const product = data?.product;
  console.log(product);
  console.log(data);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    setActiveImg(
      product?.images[0] ? product?.images?.[0] : "/images/default-image.png"
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to load products");
    }
  }, [isError]);

  const increaseQty = () => {
    if (quantity >= (product?.stock ?? 1)) return;
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const setItemToCart = () => {
    const cartItem = {
      product: product?.id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0],
      stock: product?.stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));
    toast.success("Item added to Cart");
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <section className="product-details-container main-grid">
        <Link to=".." relative="path" className="back-btn">
          <MdKeyboardDoubleArrowLeft className="back-arrow-btn" />
          <span className="back-text">Back to all Products</span>
        </Link>
        <div className="product-image-area">
          <div className="main-image-gallery">
            <img
              src={activeImg}
              className="main-product-img"
              alt={product?.name}
            />
          </div>
          <div className="thumbnail-gallery">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                className={`thumb-product-img ${
                  img === activeImg ? "add-border" : ""
                }`}
                alt={img}
                onClick={(e) => setActiveImg(img)}
              />
            ))}
          </div>
        </div>
        <div className="product-information">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-id">{product.id}</p>
          <div className="rating-reviews">
            <RatingView
              ratingValue={product.rating}
              size={20}
              fillColor="#ffd700"
              emptyColor="#ced4da"
              className="product-rating-comp"
            />
            <p className="review-pro">({product.reviews} Reviews)</p>
          </div>

          <div className="product-detail-section">
            <p className="price">${product.price}</p>
            <div className="quantity-container">
              <button
                className="quantity-btn minus"
                aria-label="Decrease quantity"
                onClick={decreaseQty}
              >
                -
              </button>
              <input
                type="number"
                className="quantity-input count"
                value={quantity}
                min="1"
                readOnly
                aria-live="polite"
              ></input>
              <button
                className="quantity-btn plus"
                aria-label="Increase quantity"
                onClick={increaseQty}
              >
                +
              </button>
            </div>
            <div
              className={` stock-container ${
                product?.stock > 0 ? "stock-green" : "stock-red"
              }`}
            >
              <p className="stock-line">
                {product?.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>

            <div className="product-description-container">
              <h2 className="product-des-title">Description</h2>
              <p className="product-des">{product.description}</p>
            </div>
            <div className="add-to-cart-product">
              <button
                className="addto-cart-btn"
                disabled={product?.stock <= 0}
                onClick={setItemToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="product-reviews-section ">
          <div className="tab-btn-area">
            <button
              className={`product-tab review-btn ${
                activeTab === "reviews" ? "active" : ""
              }`}
              onClick={() => handleTabClick("reviews")}
            >
              Reviews
            </button>
            <button
              className={`product-tab description-btn ${
                activeTab === "description" ? "active" : ""
              }`}
              onClick={() => handleTabClick("description")}
            >
              Description
            </button>
          </div>
          <div className="tab-content-area">
            {activeTab === "reviews" && <Review />}
            {activeTab === "description" && <ProductDescription />}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

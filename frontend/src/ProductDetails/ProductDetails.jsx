import React, { useEffect, useState } from "react";
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
import MetaData from "../components/Layout/MetaData";
import DefaultPicture from "../assets/images/default-image.png";
import NotFound from "../components/Layout/NotFound";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");
  const [activeImg, setActiveImg] = useState(DefaultPicture);

  const { data, isLoading, isError, error, refetch } =
    useGetProductDetailsQuery(id);
  const product = data?.product;

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (product?.images?.length > 0 && product.images[0]?.url) {
      setActiveImg(product.images[0].url);
    } else {
      setActiveImg(DefaultPicture);
    }
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
    const imageUrl = product?.images?.[0]?.url || DefaultPicture;
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: imageUrl,
      stock: product?.stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));
    toast.success("Item added to Cart");
  };

  if (isLoading) return <Loader />;
  if (error && error?.status == 404) {
    return <NotFound />;
  }

  return (
    <>
      <MetaData title={"Product Details"} />
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
            {product?.images?.length > 0 &&
              product?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  className={`thumb-product-img ${
                    img === activeImg ? "add-border" : ""
                  }`}
                  alt={img}
                  onClick={() => setActiveImg(img.url)}
                />
              ))}
          </div>
        </div>
        <div className="product-information">
          <h1 className="product-detail-title">{product?.name}</h1>
          <p className="product-detail-id">{product?._id}</p>
          <div className="rating-reviews">
            <RatingView
              ratingValue={product?.ratings}
              size={20}
              fillColor="#ffd700"
              emptyColor="#ced4da"
              className="product-rating-comp"
            />
            <p className="review-pro">
              ({product?.numOfReviews}{" "}
              {product?.numOfReviews > 1 ? "Reviews" : "Review"})
            </p>
          </div>

          <div className="product-detail-section">
            <p className="price">${product?.price}</p>
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
              <p className="product-des">{product?.shortDescription}</p>
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
            {activeTab === "reviews" && (
              <Review
                productId={product?._id}
                product={product}
                refetchProduct={refetch}
              />
            )}
            {activeTab === "description" && (
              <ProductDescription product={product} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;

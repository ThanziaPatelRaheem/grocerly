import React from "react";
import { Link } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { useSelector } from "react-redux";
import DefaultPicture from "../assets/images/default-image.png";

const ProductCard = ({ product = {}, addToCart = () => {} }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const inCart = cartItems.some((i) => i.product === product._id);

  const { _id, images, name, weight, price, category } = product;
  const mainImage = images?.[0]?.url || DefaultPicture;

  return (
    <section className="product-container">
      <Link to={`/products/${_id}`} className="product-image-container">
        <img src={mainImage} alt={name} className="product-card-image" />
      </Link>

      <div className="product-details">
        <h3 className="product-title">{name}</h3>
      </div>

      <div className="product-footer-row">
        <p className="product-weight">{weight}</p>
        <p className="product-price">${price}</p>
      </div>
      {!inCart ? (
        <button
          className="hero-cart-btn"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          disabled={product?.stock <= 0}
        >
          <CgShoppingCart className="cart-card-icon" />
          {product?.stock > 0 ? "Add to cart" : "Out of stock"}
        </button>
      ) : (
        <Link to="/cart" className="hero-cart-btn">
          View cart
        </Link>
      )}
    </section>
  );
};

export default ProductCard;

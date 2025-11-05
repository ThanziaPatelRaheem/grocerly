import React from "react";
import { Link } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { useSelector } from "react-redux";

const ProductCard = ({ product = {}, addToCart }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const inCart = cartItems.some((i) => i.product === product.id);

  const { id, images, name, unit, price, category } = product;
  const mainImage = images?.[0];
  return (
    <section className="product-container">
      <Link to={`/products/${id}`} className="product-image-container">
        <img src={mainImage} alt={name} className="product-card-image" />
      </Link>

      <div className="product-details">
        <p>{category}</p>
        <h3 className="product-title">{name}</h3>
      </div>

      <div className="product-footer-row">
        <p className="product-weight">{unit}</p>
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
          <p className="cart-info">
            {product?.stock > 0 ? "Add toCart" : "Out of stock"}
          </p>
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

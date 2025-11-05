import React from "react";
import emptyCart from "../../assets/images/emptyCart.png";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <>
      <section className="empty-cart-section ">
        <div className="empty-wrapper">
          <div className="empty-cart-img-container">
            <img
              src={emptyCart}
              alt="empty-cart"
              aria-label="empty-cart-image"
              className="empty-image"
            />
          </div>
          <div className="empty-cart-details">
            <h2>Your cart is empty</h2>
            <p>Add items into your shopping cart and they will appear here</p>
          </div>
          <Link to="/products" className="empty-cart-button">
            Start shopping
          </Link>
        </div>
      </section>
    </>
  );
};

export default EmptyCart;

import React, { useState } from "react";
import MetaData from "../../components/Layout/MetaData";
import Apples from "../../../public/images/apples.png";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
} from "../../redux/features/cartSlice";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  console.log("cartItems", cartItems);
  const count = cartItems?.length ?? 0;

  return (
    <>
      <MetaData title={"Your cart"} />

      <main className="main-cart main-grid">
        {count > 0 && (
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? " all-products products-active" : "all-products"
            }
          >
            <MdKeyboardDoubleArrowLeft className="back-arrow-btn-cart" />
            <span className="back-text">Back to all Products</span>
          </NavLink>
        )}
        {count === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <h2 className="cart-item-heading">
              Shopping cart ({`${count} ${count === 1 ? "item" : "items"}`})
            </h2>

            <section className="cart-section main-grid ">
              <div className="product-cart-item-wrapper">
                {cartItems?.map((item) => (
                  <article key={item?.product} className="product-cart-section">
                    <div className="product-cart-wrapper">
                      <Link
                        to={`/products/${item.product}`}
                        className="cart-img-wrapper"
                      >
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="cart-image"
                        />
                      </Link>
                      <div className="product-cart-details">
                        <div className="product-cart-name">
                          <Link to={`/products/${item?.product}`}>
                            {item?.name}
                          </Link>
                          <button
                            className="cart-product-del-btn"
                            aria-label={`Remove ${item?.name} from cart`}
                            onClick={() =>
                              dispatch(removeItemFromCart(item?.product))
                            }
                          >
                            <RiDeleteBin7Fill className="cart-product-delete" />
                          </button>
                        </div>

                        <div className="product-cart-quantity-container">
                          <div className="product-cart-quantity">
                            <button
                              type="button"
                              className="cart-qdecrease"
                              onClick={() =>
                                dispatch(decreaseItemQuantity(item?.product))
                              }
                              disabled={item?.quantity <= 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              name="number"
                              value={item?.quantity}
                              readOnly
                              min={1}
                            />
                            <button
                              type="button"
                              className="cart-qincrease"
                              onClick={() =>
                                dispatch(increaseItemQuantity(item?.product))
                              }
                              disabled={
                                typeof item.stock === "number" &&
                                item.quantity >= item.stock
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className="product-cart-price">
                            <p className="p-cart-price">${item?.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* <article className="order-summary-section">
                <div className="summary-wrapper">
                  <div className="subtotal-container">
                    <p>Subtotal</p>
                    <p>quantity</p>
                  </div>
                  <div className="esttotal-container">
                    <p>Est.total</p>
                    <p>total price</p>
                  </div>
                </div>
                <button className="checkout-btn">
                  Checkout
                  <span>price</span>
                </button>
              </article> */}

              <article className="order-summary-section">
                <div className="summary-wrapper">
                  <div className="subtotal-container">
                    <p>Units</p>
                    <p>
                      {cartItems?.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                      (Units)
                    </p>
                  </div>
                  <div className="esttotal-container">
                    <p>Est.total</p>
                    <p>
                      $
                      {cartItems
                        ?.reduce(
                          (acc, item) => acc + item?.quantity * item?.price,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
                <Link
                  to={count > 0 ? "/shipping" : "#"}
                  onClick={(e) => {
                    if (count === 0) e.preventDefault();
                  }}
                  aria-disabled={count === 0}
                  className={`checkout-btn ${count === 0 ? "is-disabled" : ""}`}
                >
                  Checkout
                  <span>
                    {" "}
                    $
                    {cartItems
                      ?.reduce(
                        (acc, item) => acc + item?.quantity * item?.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </Link>
              </article>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default Cart;

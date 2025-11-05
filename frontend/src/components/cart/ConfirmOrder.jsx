import React from "react";
import { Link } from "react-router-dom";
import Apples from "../../../public/images/apples.png";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../../helpers/helper";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calculateOrderCost(cartItems);

  return (
    <>
      <MetaData title={"Confirm Order"} />
      <section className="confirm-order-section main-grid">
        <div className="confirm-order-section-wrapper">
          <div className="confirm-order-left-column">
            <div className="order-shipping-info">
              <h3 className="confm-shipping-info">Shipping Info</h3>
              <div className="user-name-info">
                <p>{user?.name}</p>
                <p className="user-phone-no">({shippingInfo?.phoneNo})</p>
              </div>
              <div className="user-addresss-info">
                <p>
                  {shippingInfo?.address}, {shippingInfo?.city},{" "}
                  {shippingInfo?.zipCode}, {shippingInfo?.country}
                </p>
              </div>
            </div>
            <div className="product-cart-item-wrapper confirm-order-wrapper">
              {cartItems?.map((item) => (
                <article className="product-cart-section">
                  <div className="product-cart-wrapper">
                    <Link to="" className="cart-img-wrapper">
                      <img src={item?.image} alt="" className="cart-image" />
                    </Link>
                    <div className="product-cart-details">
                      <div className="product-cart-name">
                        <Link to="">{item?.name}</Link>
                      </div>

                      <div className="product-cart-quantity-container">
                        <div className="product-cart-price">
                          <p className="p-cart-price">${item?.price}</p>
                        </div>
                        <div className="product-cart-quantity">
                          <p>x{item?.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <article className="order-summary-section confirm-order-summary">
            <div className="summary-wrapper confirm-order-wrapper">
              <div className="subtotal-container cnfm-order confirm-order-subtotal-container">
                <p>Subtotal</p>
                <p>${itemsPrice}</p>
              </div>
              <div className="esttotal-container cnfm-order cnfm-shipping-container">
                <p>Shipping</p>
                <p>${shippingPrice}</p>
              </div>
              <div className="esttotal-container cnfm-order cnfm-tax-container">
                <p>Tax</p>
                <p>${taxPrice}</p>
              </div>
              <div className="esttotal-container cnfm cnfm-total-container">
                <p>Total</p>
                <p>${totalPrice}</p>
              </div>
            </div>
            <Link to="/payment-method" className="confirm-order-btn">
              Proceed to Payment
            </Link>
          </article>
        </div>
      </section>
    </>
  );
};

export default ConfirmOrder;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../../helpers/helper";
import {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
} from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [createNewOrder, { isSuccess, error }] = useCreateNewOrderMutation();

  const [
    stripeCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useStripeCheckoutSessionMutation();

  useEffect(() => {
    if (checkoutData) {
      window.location.href = checkoutData?.url;
    }
    if (checkoutError) {
      toast.error(error?.data?.message || "Failed to start checkout");
    }
  }, [checkoutData, checkoutError]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Your Order is Placed!");
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculateOrderCost(cartItems);

    if (method === "COD") {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };

      createNewOrder(orderData);
    }

    if (method === "Card") {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
      };
      stripeCheckoutSession(orderData);
    }
  };

  return (
    <>
      <MetaData title={"Payment Method"} />
      <section className="payment-method-section main-grid">
        <div className="payment-head">
          <h3>Payment Method</h3>
        </div>
        <div className="payment-method-wrapper">
          <form className="payment-form" onSubmit={submitHandler}>
            <h4>Select your payment method</h4>
            <div className="input-payment">
              <input
                type="radio"
                name="paymentMethod"
                id="cod"
                value="COD"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label htmlFor="cod" className="payment-label">
                Cash on Delivery
              </label>
            </div>
            <div className="input-payment">
              <input
                type="radio"
                name="paymentMethod"
                id="card-payment"
                value="Card"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label htmlFor="card-payment" className="payment-label">
                Card - VISA, MasterCard
              </label>
            </div>

            <button
              id="continue-btn"
              type="submit"
              className="continue-btn"
              disabled={isLoading}
            >
              CONTINUE
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default PaymentMethod;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../../helpers/helper";
import { useCreateNewOrderMutation } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const [createNewOrder, { isLoading, isSuccess, error }] =
    useCreateNewOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Your Order is Placed!");
      navigate("/");
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
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };

      createNewOrder(orderData);
    }

    if (method === "Card") {
      alert("Card");
    }
  };

  return (
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

          <button id="continue-btn" type="submit" className="continue-btn">
            CONTINUE
          </button>
        </form>
      </div>
    </section>
  );
};

export default PaymentMethod;

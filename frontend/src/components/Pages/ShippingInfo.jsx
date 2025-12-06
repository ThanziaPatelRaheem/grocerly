import React from "react";
import MetaData from "../Layout/MetaData";

const ShippingInfo = () => {
  return (
    <>
      <MetaData title={`Shipping Info`} />
      <section className="shipping-infopage-section main-grid">
        <div className="shipping-infopage">
          <h2>Shipping & Delivery Information</h2>

          <div className="faq-item">
            <h3>1. What are the delivery charges?</h3>
            <p>
              Enjoy <strong>free delivery</strong> for orders above{" "}
              <strong>$100</strong>. A <strong>$20 delivery fee</strong> applies
              for orders below $100.
            </p>
          </div>

          <div className="faq-item">
            <h3>2. When will my delivery arrive?</h3>
            <p>
              You can track your delivery status by going to
              <strong> My Account → My Orders</strong> and selecting the
              relevant order.
            </p>
            <p>
              If your delivery has not arrived after the stated delivery window,
              please contact:
              <br />
              Email: <a href="mailto:info@grocerly.com">info@grocerly.com</a>
              <br />
              Tel: +65 6909 5500
              <br />
              Office Hours: Monday–Sunday, 9:00 AM – 9:00 PM
            </p>
          </div>

          <div className="faq-item">
            <h3>3. What happens if items are out of stock or reweighed?</h3>
            <p>
              If an item is out of stock or fresh produce is reweighed, any
              approved refund will be returned to the
              <strong> same card</strong> used for the purchase.
            </p>
          </div>

          <div className="faq-item">
            <h3>
              4. What if my delivery contains damaged, missing or wrong items?
            </h3>
            <p>
              Please keep the damaged or incorrect item in its original
              packaging. Prepare your order number and photo of the product(s),
              then email:
              <a href="mailto:info@grocerly.com"> info@grocerly.com </a>. Their
              team will follow up with next steps.
            </p>
          </div>

          <div className="faq-item">
            <h3>5. What is the time frame for raising delivery disputes?</h3>
            <p>
              • For Ambient & Frozen products: <strong>within 7 days</strong> of
              delivery. <br />• For Fresh items: <strong>within 3 days</strong>{" "}
              of delivery.
            </p>
          </div>

          <div className="faq-item">
            <h3>6. Who decides refund outcomes?</h3>
            <p>
              Refund outcomes are assessed and decided solely by the Customer
              Service Team.
            </p>
          </div>

          <div className="faq-item">
            <h3>7. Can I raise a dispute after the deadline?</h3>
            <p>
              Unfortunately, disputes raised after the specified 7-day (or 3-day
              for Fresh) deadline may not be eligible for review.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShippingInfo;

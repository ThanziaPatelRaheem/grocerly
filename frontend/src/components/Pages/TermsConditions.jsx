import React from "react";
import MetaData from "../Layout/MetaData";

const TermsConditions = () => {
  return (
    <>
      <MetaData title={`Terms & Conditions`} />
      <section className="terms-section main-grid">
        <div className="terms-conditions">
          <h2>Terms & Conditions</h2>

          <p className="terms-line">
            By accessing and using our website, you agree to the following terms
            and conditions. Please read them carefully before proceeding.
          </p>

          <div className="tc-item">
            <h3>1. Use of the Website</h3>
            <p>
              The content on this website is provided for personal,
              non-commercial use. You may not reproduce, distribute, or modify
              any part of the website without permission.
            </p>
          </div>

          <div className="tc-item">
            <h3>2. Product Information</h3>
            <p>
              We strive to provide accurate product details, but actual product
              packaging, ingredients, or appearance may differ from images
              shown.
            </p>
          </div>

          <div className="tc-item">
            <h3>3. Pricing & Promotions</h3>
            <p>
              All prices, promotions, and discounts are subject to change
              without prior notice. Final checkout prices may be adjusted for
              substitutions or weighted items.
            </p>
          </div>

          <div className="tc-item">
            <h3>4. Orders & Payments</h3>
            <p>
              Orders are confirmed only after successful payment. We reserve the
              right to cancel or reject orders due to stock availability,
              pricing errors, or suspicious activity.
            </p>
          </div>

          <div className="tc-item">
            <h3>5. Delivery Policy</h3>
            <p>
              Delivery times may vary due to weather, traffic, or operational
              delays. Additional fees may apply for re-delivery attempts.
            </p>
          </div>

          <div className="tc-item">
            <h3>6. Refunds & Returns</h3>
            <p>
              Refunds are processed according to our refund policy. Items must
              be retained in original packaging for inspection.
            </p>
          </div>

          <div className="tc-item">
            <h3>7. Account Responsibility</h3>
            <p>
              You are responsible for maintaining the confidentiality of your
              login information. Any activity under your account is assumed to
              be authorized by you.
            </p>
          </div>

          <div className="tc-item">
            <h3>8. Limitation of Liability</h3>
            <p>
              We are not liable for any indirect, incidental, or consequential
              damages arising from your use of the website or products
              purchased.
            </p>
          </div>

          <div className="tc-item">
            <h3>9. Changes to Terms</h3>
            <p>
              We may update these Terms & Conditions at any time. Continued use
              of the website indicates your acceptance of the revised terms.
            </p>
          </div>

          <div className="tc-item">
            <h3>10. Contact Us</h3>
            <p>
              If you have questions regarding these Terms & Conditions, please
              contact our customer service team.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsConditions;

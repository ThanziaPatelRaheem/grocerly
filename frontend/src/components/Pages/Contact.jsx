import React from "react";
import MetaData from "../Layout/MetaData";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <MetaData title={`Contact Page`} />
      <section className="contact-page main-grid">
        <h2 className="page-heading">Contact Us</h2>

        <div className="contact-wrapper">
          <p className="contact-intro">
            Have any questions about your orders, products, or our services?
            We’re happy to help.
          </p>

          <div className="contact-box">
            <h3 className="contact-title">Customer Support</h3>
            <p>
              Email:{" "}
              <Link to="mailto:support@grocerly.com">support@grocerly.com</Link>
            </p>
            <p>Phone: +65 1234 5678</p>
            <p>WhatsApp: +65 9876 5432</p>
          </div>

          <div className="contact-box">
            <h3 className="contact-title">Business Hours</h3>
            <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
            <p>Saturday: 10:00 AM – 4:00 PM</p>
            <p>Sunday & Public Holidays: Closed</p>
          </div>

          <div className="contact-box">
            <h3 className="contact-title">Head Office</h3>
            <p>Grocerly Pte Ltd</p>
            <p>123 Market Street</p>
            <p>Singapore 123456</p>
          </div>

          <p className="contact-note">
            For order-related queries, please include your Order ID in the email
            so we can assist you faster.
          </p>
        </div>
      </section>
    </>
  );
};

export default Contact;

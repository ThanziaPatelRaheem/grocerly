import React from "react";
import { Link } from "react-router";

const HeroBanner = () => {
  return (
    <>
      <section className="hero-banner main-grid">
        <div className="hero-content">
          <h1 className="hero-title">
            Get freshness <span>delivered</span> <br />
            on your doorstep
          </h1>
          <p className="hero-info">Organic and fresh food</p>

          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;

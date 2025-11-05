import React from "react";
import { Link } from "react-router";
import { BiRadioCircleMarked } from "react-icons/bi";

const HeroBanner = () => {
  return (
    <>
      <section className="hero-banner main-grid">
        <div className="hero-content">
          <h1 className="hero-title">
            Get freshness delivered <br /> on your doorstep
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

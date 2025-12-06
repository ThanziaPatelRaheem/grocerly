import React from "react";
import MetaData from "../Layout/MetaData";

const About = () => {
  return (
    <>
      <MetaData title={`About-Us`} />
      <section className="about-us-section main-grid">
        <div className="about-us">
          <h2>About Us</h2>

          <p>
            Grocerly is a modern online grocery store built to make everyday
            shopping simple, fast and affordable. We bring you fresh produce,
            daily essentials, and quality household items — all delivered
            straight to your doorstep.
          </p>

          <p>
            Our mission is to give you a smooth and reliable shopping experience
            with clear pricing, trusted products, and convenient delivery
            options. Whether you’re stocking up for the week or grabbing
            last-minute essentials, Grocerly is here to make life easier.
          </p>

          <p>
            We are committed to freshness, transparency, and exceptional
            service. Your needs always come first — that’s the Grocerly promise.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;

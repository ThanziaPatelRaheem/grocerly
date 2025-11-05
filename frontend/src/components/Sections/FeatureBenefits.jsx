import React, { useEffect } from "react";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import FastDeliveryIcon from "../../assets/images/fast-delivery.svg";
import PaymentIcon from "../../assets/images/payment.svg";
import TrackingIcon from "../../assets/images/track.svg";

const FeatureBenefits = () => {
  const cardWidth = 390;
  const { scrollRef, scroll } = useHorizontalScroll(cardWidth);

  useEffect(() => {
    const autoScroll = () => {
      const container = scrollRef.current;
      if (!container) return;

      const totalContentWidth = container.scrollWidth;
      const originalListWidth = totalContentWidth / 2;

      if (container.scrollLeft >= originalListWidth - cardWidth) {
        container.scrollTo({
          left: container.scrollLeft - originalListWidth + cardWidth,
          behavior: "auto",
        });
      }
      scroll("right");
    };

    const intervalId = setInterval(autoScroll, 10000);
    return () => clearInterval(intervalId);
  }, [scroll, cardWidth, scrollRef]);

  const features = [
    {
      image: PaymentIcon,
      title: "Easy Payment",
      description:
        "Securely pay with multiple options, including major credit cards, UPI, and digital wallets.",
    },
    {
      image: FastDeliveryIcon,
      title: "Fast Delivery",
      description:
        "Get your order delivered within 60 minutes or choose a time slot that suits your daily schedule.",
    },
    {
      image: TrackingIcon,
      title: "Order Tracking",
      description:
        "Order tracking made easy. Follow your groceries from the shelf to your doorstep in real-time.",
    },
  ];
  return (
    <section className="benefits-section main-grid">
      <div className="features-container" ref={scrollRef}>
        {[...features, ...features].map((feature, index) => (
          <div key={index} className="feature-card ">
            <div className="feature-wrapper">
              <img src={feature.image} className="feature-icon" />
            </div>
            <div className="feature-info">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureBenefits;

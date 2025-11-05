import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { CgShapeCircle } from "react-icons/cg";
import FreshApples from "../../../public/images/apples.png";
import ScrollArrows from "../ScrollArrows";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";

const RecommendedProducts = () => {
  const { scrollRef, scroll } = useHorizontalScroll(150);
  const recommendedData = [
    {
      id: 1,
      image: FreshApples,
      name: "Fresh Red Apples",
      weight: "1kg",
      price: "$8.00",
    },
    {
      id: 2,
      image: FreshApples,
      name: "Organic Milk",
      weight: "1L",
      price: "$4.50",
    },
    {
      id: 3,
      image: FreshApples,
      name: "Assorted Vegetables",
      weight: "2kg",
      price: "$12.00",
    },
    {
      id: 4,
      image: FreshApples,
      name: "Whole Wheat Bread",
      weight: "500g",
      price: "$3.50",
    },
    {
      id: 5,
      image: FreshApples,
      name: "Cheddar Cheese Block",
      weight: "300g",
      price: "$7.50",
    },
    {
      id: 6,
      image: FreshApples,
      name: "Chicken Breasts",
      weight: "1kg",
      price: "$15.00",
    },
    {
      id: 7,
      image: FreshApples,
      name: "Mixed Berry Frozen Bag",
      weight: "500g",
      price: "$6.00",
    },
    {
      id: 8,
      image: FreshApples,
      name: "Salted Snack Mix",
      weight: "200g",
      price: "$4.99",
    },
    {
      id: 9,
      image: FreshApples,
      name: "Laundry Detergent",
      weight: "2L",
      price: "$18.50",
    },
    {
      id: 10,
      image: FreshApples,
      name: "Organic Milk",
      weight: "1L",
      price: "$4.50",
    },
  ];
  return (
    <>
      <section className="recommended-section main-grid">
        <div className="section-header-row">
          <div className="product-heading">
            <CgShapeCircle className="aside-icon" />
            <h2 className="recommend-heading">Recommended Products</h2>
          </div>
          <ScrollArrows onScroll={scroll} />
        </div>

        <div className="recommended-list-container" ref={scrollRef}>
          {recommendedData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link to="/products" className="product-load-more ">
          Load More
        </Link>
      </section>
    </>
  );
};

export default RecommendedProducts;

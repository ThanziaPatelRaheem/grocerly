import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { CgShapeCircle } from "react-icons/cg";
import ScrollArrows from "../ScrollArrows";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";
import { useGetRecommendedProductsQuery } from "../../redux/api/productApi";

const RecommendedProducts = ({ addToCart }) => {
  const { scrollRef, scroll } = useHorizontalScroll(150);
  const { data, isLoading, isFetching, isError } =
    useGetRecommendedProductsQuery();

  const recommendedProducts = data?.products || [];

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
          {isLoading || isFetching ? (
            <p>Loading recommended products...</p>
          ) : isError ? (
            <p>Could not load recommended products.</p>
          ) : recommendedProducts.length === 0 ? (
            <p>No recommended products yet.</p>
          ) : (
            recommendedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
              />
            ))
          )}
        </div>

        <Link to="/products" className="product-load-more ">
          Load More
        </Link>
      </section>
    </>
  );
};

export default RecommendedProducts;

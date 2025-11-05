import React from "react";
import HeroBanner from "./Sections/HeroBanner";
import ProductCategories from "./Sections/ProductCategories";
import TrendingProducts from "./Sections/TrendingProducts";
import FeatureBenefits from "./Sections/FeatureBenefits";
import RecommendedProducts from "./Sections/RecommendedProducts";

const Home = () => {
  return (
    <>
      <main>
        <HeroBanner />
        <ProductCategories />
        <FeatureBenefits />
        <TrendingProducts />
        <RecommendedProducts />
      </main>
    </>
  );
};

export default Home;

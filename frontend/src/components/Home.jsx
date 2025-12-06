import React from "react";
import HeroBanner from "./Sections/HeroBanner";
import ProductCategories from "./Sections/ProductCategories";
import TrendingProducts from "./Sections/TrendingProducts";
import FeatureBenefits from "./Sections/FeatureBenefits";
import RecommendedProducts from "./Sections/RecommendedProducts";
import { setCartItem } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(
      setCartItem({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url,
        stock: product.stock,
      })
    );
  };
  return (
    <>
      <main>
        <HeroBanner />
        <ProductCategories />
        <FeatureBenefits />
        <TrendingProducts addToCart={handleAddToCart} />
        <RecommendedProducts addToCart={handleAddToCart} />
      </main>
    </>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import fruits from "../../assets/images/fruits.png";
import vegetables from "../../assets/images/vegetables.png";
import dairy from "../../assets/images/dairy.png";
import frozen from "../../assets/images/frozen.png";
import snacks from "../../assets/images/snacks.png";
import household from "../../assets/images/household.png";
import poultry from "../../assets/images/poultry.png";
import bread from "../../assets/images/bread.png";
import baby from "../../assets/images/baby.png";
import beauty from "../../assets/images/beauty.png";
import beverages from "../../assets/images/beverages.png";
import baking from "../../assets/images/baking.png";
import { CgShapeCircle } from "react-icons/cg";
import ScrollArrows from "../ScrollArrows";
import useHorizontalScroll from "../../hooks/useHorizontalScroll";

const ProductCategories = () => {
  const { scrollRef, scroll } = useHorizontalScroll(150);
  const categories = [
    { name: "Fruits", image: fruits },
    { name: "Vegetables", image: vegetables },
    { name: "Dairy & Eggs", image: dairy },
    { name: "Meat & Poultry", image: poultry },
    { name: "Bakery & Bread", image: bread },
    { name: "Frozen Foods", image: frozen },
    { name: "Snacks & Candy", image: snacks },
    { name: "Household Supplies", image: household },
    { name: "Mother & Baby", image: baby },
    { name: "Beauty & Personal Care", image: beauty },
    { name: "Beverages", image: beverages },
    { name: "Cooking & Baking Needs", image: baking },
  ];
  // const scrollContainerRef = useRef(null);

  // const scrollDistance = 150;
  // const scroll = (direction) => {
  //   const container = scrollContainerRef.current;

  //   if (container) {
  //     if (direction === "left") {
  //       container.scrollLeft -= scrollDistance;
  //     } else {
  //       container.scrollLeft += scrollDistance;
  //     }
  //   }
  // };
  return (
    <>
      <section className="categories-section main-grid">
        <div className="section-header-row">
          <div className="product-heading">
            <CgShapeCircle className="aside-icon" />
            <h2 className="category-title">Products Categories</h2>
          </div>

          <ScrollArrows onScroll={scroll} />
        </div>

        <div className="category-list-container" ref={scrollRef}>
          {categories.map((cat, index) => (
            <Link key={index} className="category-item">
              <div className="category-icon-wrapper">
                <img
                  src={cat.image}
                  className="category-image"
                  alt="catergory-image"
                />
              </div>
              <p className="category-name">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductCategories;

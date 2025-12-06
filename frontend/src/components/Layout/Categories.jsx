import React from "react";
import { NavLink } from "react-router-dom";
import productCategories from "../../data/productCategoriesData";
const Categories = ({ menuOpen, menuToggle }) => {
  const navClass = menuOpen ? "desktop-menu open" : "desktop-menu";

  return (
    <>
      <nav className={navClass}>
        <ul className="menu-list">
          {productCategories.map((category) => (
            <li key={category.name}>
              <NavLink
                to={`/products?category=${encodeURIComponent(category.slug)}`}
                className="menu-list-item"
                onClick={menuToggle}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
export default Categories;

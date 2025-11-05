import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
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
                to={category.to}
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

import React from "react";
import { CgShoppingCart } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosLogIn } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { PiContactlessPayment } from "react-icons/pi";
import logo from "../../assets/images/Grologo.png";
import { IoSearch } from "react-icons/io5";
import "../../css/headerMobile.css";
import Categories from "./Categories";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      <header className="header">
        <div className="main-header main-grid ">
          <div className="header-first-row">
            <a href="#" className="logo-container">
              <img src={logo} alt="Brand-logo" className="logo-image" />
            </a>
            <nav className="navs">
              <NavLink>Home</NavLink>
              <NavLink>Promotions</NavLink>
              <NavLink>Contact</NavLink>
            </nav>
            <div className="socials">
              <a href="#" className="social-links">
                <FaFacebookSquare />
              </a>
              <a href="#" className="social-links">
                <FaInstagram />
              </a>
              <a href="#" className="social-links">
                <FaXTwitter />
              </a>
            </div>

            <button
              className="menu"
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open Menu"}
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <AiOutlineClose className="menu-icon" />
              ) : (
                <RxHamburgerMenu className="menu-icon" />
              )}
            </button>
          </div>
          <div className="header-second-row">
            <Categories className="all-categories-button" />
            <form role="search" action="" className="search">
              <label htmlFor="search" className="search-bar">
                Search products
              </label>
              <input
                id="search"
                type="search"
                placeholder="Search Products..."
              />
              <button type="submit" className="searchBtn">
                <IoSearch className="search-icon" />
              </button>
            </form>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link-desktop"
              }
            >
              <div className="nav-items-desktop">
                <IoIosLogIn className="nav-icons-desktop" />
                <p> Login/Sign up</p>
              </div>
            </NavLink>
            <Link to="/" className="fav-links">
              <FaRegHeart className="fav-icon" />
            </Link>
            <a href="#" className="cart-btn">
              <CgShoppingCart className="cart-icon" />
            </a>
          </div>
        </div>
        <nav className={`nav-drawer ${isMenuOpen ? "nav-drawer-open" : ""}`}>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            <div className="nav-items">
              <TbListDetails className="nav-icons" />
              <p>Categories</p>
            </div>
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            <div className="nav-items">
              <IoIosLogIn className="nav-icons" />
              <p> Login/Sign up</p>
            </div>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            <div className="nav-items">
              <PiContactlessPayment className="nav-icons" />
              <p> Contact</p>
            </div>
          </NavLink>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            <div className="nav-items">
              <VscAccount className="nav-icons" />
              <p> Account</p>
            </div>
          </NavLink>
        </nav>
      </header>
    </>
  );
};
export default MobileNav;

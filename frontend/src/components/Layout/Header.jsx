import React from "react";
import { CgShoppingCart } from "react-icons/cg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
import { IoIosLogIn } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { PiContactlessPayment } from "react-icons/pi";
import logo from "../../assets/images/Grocerly.png";
import AccountIcon from "../../assets/images/profileIcon.png";
import { GoHome } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import "../../css/headerMobile.css";
import Categories from "./Categories";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import { useLogoutMutation } from "../../redux/api/authApi";
import { setIsAuthenticated, setUser } from "../../redux/features/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const { data: userData, isLoading } = useGetMeQuery();

  const { cartItems } = useSelector((state) => state.cart);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  const [logout, { isLoading: loggingOut }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
      navigate(0);
    }
  };

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = React.useState(false);

  const toggleCategoryMenu = () => {
    setIsCategoryMenuOpen((prev) => !prev);
  };

  const ButtonContent = isCategoryMenuOpen ? (
    <RiCloseLargeLine className="close-menu-icon" />
  ) : (
    <GiHamburgerMenu className="desktop-menu-icon" />
  );
  return (
    <>
      <header className="header">
        <div className="main-header main-grid ">
          <div className="header-first-row">
            <Link to="/" className="logo-container">
              <img src={logo} alt="Brand-logo" className="logo-image" />
            </Link>
            <nav className="navs">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "nav-links-desktop nav-active"
                    : "nav-links-desktop"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "nav-links-desktop nav-active"
                    : "nav-links-desktop"
                }
              >
                Shop
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "nav-links-desktop nav-active"
                    : "nav-links-desktop"
                }
              >
                Contact
              </NavLink>
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
            <div className="category-btn-header">
              <button
                className="all-categories-button"
                onClick={toggleCategoryMenu}
                aria-expanded={isCategoryMenuOpen}
              >
                {ButtonContent}
              </button>
              <p className="btn-info">Categories</p>
            </div>

            <Search />

            <NavLink to="/cart" className="cart-btn cart-btn-mobile">
              <CgShoppingCart className="cart-icon" />
              <span className="cart-count">{totalQuantity}</span>
            </NavLink>

            <div className="header-actions">
              {user ? (
                <UserDropdown user={user} loggingOut={logoutHandler} />
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-link-desk active-link" : "nav-link-desktop"
                  }
                  style={{ textDecoration: "none", zIndex: 50 }}
                >
                  <div className="nav-items-desktop">
                    {!isLoading && <p className="login-info"> Login</p>}
                  </div>
                </NavLink>
              )}

              <NavLink to="/cart" className="cart-btn">
                <CgShoppingCart className="cart-icon" />
                <span className="cart-count">{totalQuantity}</span>
              </NavLink>
            </div>
          </div>
        </div>
        <nav className={`nav-drawer ${isMenuOpen ? "nav-drawer-open" : ""}`}>
          {user ? (
            <>
              <div className="nav-user-mobile">
                <div className="nav-items">
                  <div className="nav-wrapper">
                    <img
                      src={user?.avatar?.url || AccountIcon}
                      className="nav-avatar"
                      alt=""
                    />
                  </div>
                  <p>{user.name}</p>
                </div>

                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="nav-items">
                    <GoHome className="nav-icons" />
                    <p>Home</p>
                  </div>
                </NavLink>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  onClick={() => setIsMenuOpen(false)}
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
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="nav-items">
                    <HiOutlineShoppingBag className="nav-icons" />
                    <p> Shop</p>
                  </div>
                </NavLink>

                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="nav-items">
                    <PiContactlessPayment className="nav-icons" />
                    <p> Contact</p>
                  </div>
                </NavLink>

                <NavLink
                  to="/me/profile"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="nav-items">
                    <CgProfile className="nav-icons" />
                    <p>Profile</p>
                  </div>
                </NavLink>

                <NavLink
                  to="/me/orders"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="nav-items">
                    <BiMoneyWithdraw className="nav-icons" />
                    <p>Orders</p>
                  </div>
                </NavLink>

                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="nav-items">
                    <RiDashboardHorizontalLine className="nav-icons" />
                    <p>Dashboard</p>
                  </div>
                </NavLink>
              </div>

              <button
                className="nav-link nav-link-lout-btn"
                onClick={() => {
                  setIsMenuOpen(false);
                  logoutHandler();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <button className="nav-items mobile-navigation-login-btn">
                <IoIosLogIn className="nav-icons" />
                <p>Login / Sign up</p>
              </button>
            </NavLink>
          )}
        </nav>
        <Categories
          menuOpen={isCategoryMenuOpen}
          menuToggle={toggleCategoryMenu}
        />
      </header>
      <div className="header-spacer" />
    </>
  );
};
export default Header;

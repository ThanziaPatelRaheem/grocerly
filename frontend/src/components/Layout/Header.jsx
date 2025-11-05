import React, { useEffect } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
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
import AccountIcon from "../../assets/images/account-icon.png";

import "../../css/headerMobile.css";
import Categories from "./Categories";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
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

  // const [logout, { isSuccess, data: logoutData, isLoading: logOut }] =
  //   useLazyLogoutQuery();
  const [triggerLogout] = useLazyLogoutQuery();

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(setUser(null));
  //     dispatch(setIsAuthenticated(false));
  //     navigate("/");
  //   }
  // }, [isSuccess, navigate, dispatch]);

  // const logoutHandler = () => {
  //   logout();
  // };

  const logoutHandler = async () => {
    try {
      // fire the request (optionally await if you want to ensure it finishes)
      await triggerLogout();
    } catch (e) {
      console.error(e);
    } finally {
      // clear client auth state and go home
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
      navigate("/");
    }
  };

  // category menu button
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
              <NavLink to="/" className="nav-links-desktop">
                Home
              </NavLink>
              <NavLink to="/products" className="nav-links-desktop">
                Shop
              </NavLink>
              <NavLink to="/promotions" className="nav-links-desktop">
                Promotions
              </NavLink>
              <NavLink to="/contact" className="nav-links-desktop">
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
            {/* <Categories className="all-categories-button" /> */}
            <button
              className="all-categories-button"
              onClick={toggleCategoryMenu}
              aria-expanded={isCategoryMenuOpen}
            >
              {ButtonContent}
              <p className="btn-info">Categories</p>
            </button>

            <Search />

            <div className="header-actions">
              {user ? (
                <UserDropdown
                  user={user}
                  loggingOut={logoutHandler}
                  // logOut={logOut}
                />
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

              {/* <Link to="/" className="fav-links">
                <FaRegHeart className="fav-icon" />
              </Link> */}
              <NavLink to="/cart" className="cart-btn">
                <CgShoppingCart className="cart-icon" />
                <span className="cart-count">{totalQuantity}</span>
              </NavLink>
            </div>
          </div>
        </div>
        <nav className={`nav-drawer ${isMenuOpen ? "nav-drawer-open" : ""}`}>
          {user && (
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
                to="/me/profile"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>

              <NavLink
                to="/me/orders"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </NavLink>

              <NavLink
                to="/admin"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>

              <button
                className="nav-link"
                onClick={() => {
                  setIsMenuOpen(false);
                  logoutHandler();
                }}
              >
                Logout
              </button>
            </div>
          )}
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
              <IoIosLogIn className="nav-icons" />
              <p> Login/Sign up</p>
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
            to="/account"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="nav-items">
              <VscAccount className="nav-icons" />
              <p> Account</p>
            </div>
          </NavLink>
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

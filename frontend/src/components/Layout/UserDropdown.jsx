import React, { useEffect, useRef, useState } from "react";
import AccountIcon from "../../assets/images/profileIcon.png";
import { NavLink } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";

const UserDropdown = ({ loggingOut }) => {
  const { user } = useSelector((state) => state.auth);
  const [userMenu, setUserMenu] = useState(false);

  const menuRef = useRef();

  const avatarUrl = user?.avatar?.url || AccountIcon;

  const toggleUserMenu = () => {
    setUserMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!userMenu) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-button"
        onClick={toggleUserMenu}
        aria-expanded={userMenu ? "true" : "false"}
      >
        <div className="nav-wrapper">
          <img src={avatarUrl} className="nav-avatar" />
        </div>
        <span className="user-name">{user.name || "User"} </span>
        <TiArrowSortedDown className="user-arrow" />
      </button>

      {userMenu && (
        <nav className="user-nav">
          <ul className="user-list">
            <li className="user-list-item">
              <NavLink
                to="/me/profile"
                className={({ isActive }) =>
                  isActive ? "user-link active" : "user-link"
                }
              >
                <CgProfile className="nav-icons" />
                <p>My Profile</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/me/orders"
                className={({ isActive }) =>
                  isActive ? "user-link active" : "user-link"
                }
              >
                <BiMoneyWithdraw className="nav-icons" />
                <p>Orders</p>
              </NavLink>
            </li>
            {user?.role === "admin" && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? "user-link active" : "user-link"
                  }
                >
                  <RiDashboardHorizontalLine className="nav-icons" />
                  <p>Dashboard</p>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "user-link active" : "user-link"
                }
                onClick={loggingOut}
              >
                <TbLogout2 className="nav-icons" />
                Log out
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default UserDropdown;

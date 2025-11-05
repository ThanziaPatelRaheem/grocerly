import React, { useState } from "react";
import AccountIcon from "../../assets/images/account-icon.png";
import { NavLink } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";

const UserDropdown = ({ user, loggingOut }) => {
  const [userMenu, setUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setUserMenu((prev) => !prev);
  };
  return (
    <div className="user-menu">
      <button
        className="user-button"
        onClick={toggleUserMenu}
        aria-expanded={userMenu ? "true" : "false"}
      >
        <div className="nav-wrapper">
          <img src={AccountIcon} className="nav-avatar" />
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
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive ? "user-link active" : "user-link"
                }
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive ? "user-link active" : "user-link"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "user-link active" : "user-link"
                }
                onClick={loggingOut}
              >
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

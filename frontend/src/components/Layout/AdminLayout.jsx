import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa";
import { TbReceipt2 } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { MdReviews } from "react-icons/md";

const AdminLayout = () => {
  return (
    <>
      <section className="adminlayout-section  main-grid">
        <div className="profile-layout admin-profile-layout">
          <nav className="profile-navigation admin-navigation">
            <NavLink
              to="."
              end
              className={({ isActive }) =>
                isActive ? " profile-links pactive" : "profile-links"
              }
            >
              <RiDashboardHorizontalFill className="profile-icon" />
              Dashboard
            </NavLink>
            <NavLink
              to="product/new"
              className={({ isActive }) =>
                isActive ? "profile-links pactive" : "profile-links"
              }
            >
              <IoMdAddCircle className="profile-icon" />
              New Product
            </NavLink>
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive ? " profile-links pactive" : "profile-links"
              }
            >
              <FaProductHunt className="profile-icon" />
              Products
            </NavLink>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive ? " profile-links pactive" : "profile-links"
              }
            >
              <TbReceipt2 className="profile-icon" />
              Orders
            </NavLink>
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive ? " profile-links pactive" : "profile-links"
              }
            >
              <FaUserFriends className="profile-icon" />
              Users
            </NavLink>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                isActive ? " profile-links pactive" : "profile-links"
              }
            >
              <MdReviews className="profile-icon" />
              Reviews
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default AdminLayout;

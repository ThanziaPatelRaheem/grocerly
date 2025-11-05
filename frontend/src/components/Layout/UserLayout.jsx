import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

const UserLayout = () => {
  return (
    <>
      <section className="userlayout-section main-grid">
        <div className="profile-layout">
          <nav className="profile-navigation">
            <NavLink
              to="."
              end
              className={({ isActive }) =>
                isActive ? " profile-links pactive" : "profile-links"
              }
            >
              <MdManageAccounts className="profile-icon" />
              Profile
            </NavLink>
            <NavLink
              to="update_profile"
              className={({ isActive }) =>
                isActive ? "profile-links pactive" : "profile-links"
              }
            >
              <MdEditNote className="profile-icon" />
              Update Profile
            </NavLink>
            <NavLink
              to="upload_avatar"
              className={({ isActive }) =>
                isActive ? " profile-links pactive" : "profile-links"
              }
            >
              <MdAccountCircle className="profile-icon" />
              Upload Avatar
            </NavLink>
            <NavLink
              to="update_password"
              className={({ isActive }) =>
                isActive ? " profile-links pactive" : "profile-links"
              }
            >
              <RiEdit2Fill className="profile-icon" />
              Update Password
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default UserLayout;

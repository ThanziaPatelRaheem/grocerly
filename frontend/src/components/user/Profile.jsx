import React from "react";
import DefaultPicture from "../../assets/images/profileIcon.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <aside className="profile-section">
        <div className="profile-image-container">
          <img
            src={user?.avatar ? user?.avatar?.url : DefaultPicture}
            alt={user?.name}
            className="profile-picture"
          />
        </div>
        <div className="profile-detail-container">
          <h4 className="profile-name">Name</h4>
          <p>{user?.name}</p>
          <h4>Email</h4>
          <p>{user?.email}</p>
          <h4>Joined on</h4>
          <p>{user?.createdAt.substring(0, 10)}</p>
        </div>
      </aside>
    </>
  );
};

export default Profile;

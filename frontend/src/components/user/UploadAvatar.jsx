import React from "react";
import DefaultPicture from "../../assets/images/account-icon.png";

const UploadAvatar = () => {
  return (
    <aside className="profile-section upload-avatar-section">
      <h3 className="upload-heading">Upload avatar</h3>
      <form className="upload-image-form">
        <div className="upload-image-container">
          <img src={DefaultPicture} className="default-picture" />
        </div>
        <div className="upload-details">
          <label htmlFor="upload" className="upload-image">
            Upload Image
          </label>
          <input
            type="file"
            name="upload"
            id="upload"
            className="upload-input"
          />
          <button className="upload-av-btn">Upload</button>
        </div>
      </form>
    </aside>
  );
};

export default UploadAvatar;

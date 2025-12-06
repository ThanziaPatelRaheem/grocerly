import React, { useEffect } from "react";
import DefaultPicture from "../../assets/images/profileIcon.png";
import MetaData from "../Layout/MetaData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UploadAvatar = () => {
  const { user } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : DefaultPicture
  );

  const navigate = useNavigate();
  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Avatar updated successfully!");
      navigate("..", { replace: true });
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const AvatarData = {
      avatar,
    };

    uploadAvatar(AvatarData);
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      <MetaData title={"Upload Avatar"} />
      <aside className="profile-section upload-avatar-section">
        <h3 className="upload-heading">Upload avatar</h3>
        <form className="upload-image-form" onSubmit={submitHandler}>
          <div className="upload-image-container">
            <img src={avatarPreview} className="default-picture" />
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
              onChange={onChange}
            />
            <button className="upload-av-btn" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
};

export default UploadAvatar;

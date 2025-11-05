import React, { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfm, setShowConfm] = useState(false);

  const navigate = useNavigate();

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Password Updated");
      navigate("..");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const passwordData = {
      currentPassword,
      newPassword,
      confirmPassword,
    };
    updatePassword(passwordData);
  };
  return (
    <aside className="profile-section update-password-section">
      <h3 className="update-heading">Update Password</h3>
      <form
        className="update-profile-form upassword-section"
        onSubmit={submitHandler}
      >
        <label htmlFor="current-password" className="profile-label">
          Current Password
        </label>
        <div className="pw-field">
          <input
            type={showCur ? "text" : "password"}
            autoComplete="current-password"
            name="current-password"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            type="button"
            aria-pressed={showCur}
            aria-label={
              showCur ? "Hide current password" : "Show current password"
            }
            onClick={() => setShowCur((v) => !v)}
            className="pw-btn"
          >
            {showCur ? (
              <IoMdEye className="password-eye-visible" />
            ) : (
              <IoMdEyeOff className="password-eye-visible" />
            )}
          </button>
        </div>

        <label htmlFor="new-password" className="profile-label">
          New Password
        </label>
        <div className="pw-field">
          <input
            type={showNew ? "text" : "password"}
            autoComplete="new-password"
            name="new-password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            aria-pressed={showNew}
            aria-label={showNew ? "Hide new password" : "Show new password"}
            className="pw-btn"
            onClick={() => setShowNew((v) => !v)}
          >
            {showNew ? (
              <IoMdEye className="password-eye-visible" />
            ) : (
              <IoMdEyeOff className="password-eye-visible" />
            )}
          </button>
        </div>

        <label htmlFor="confirm-password" className="profile-label">
          Confirm Password
        </label>
        <div className="pw-field">
          <input
            type={showConfm ? "text" : "password"}
            autoComplete="new-password"
            name="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            aria-pressed={showConfm}
            aria-label={
              showConfm ? "Hide confirm password" : "Show confirm password"
            }
            className="pw-btn"
            onClick={() => setShowConfm((v) => !v)}
          >
            {showConfm ? (
              <IoMdEye className="password-eye-visible" />
            ) : (
              <IoMdEyeOff className="password-eye-visible" />
            )}
          </button>
        </div>
        <button className="update-btn" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </aside>
  );
};

export default UpdatePassword;

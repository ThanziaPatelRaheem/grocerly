import React from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const ResetPassword = () => {
  return (
    <>
      <section className="profile-section update-password-section">
        <h3 className="update-heading">Update Password</h3>
        <form className="update-profile-form upassword-section">
          <label htmlFor="new-password" className="profile-label">
            New Password
          </label>
          <div className="pw-field">
            <input
              type={showCur ? "text" : "password"}
              autoComplete="current-password"
              name="new-password"
              id="new-password"
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

          <label htmlFor="conf-new-password" className="profile-label">
            Confirm New Password
          </label>
          <div className="pw-field">
            <input
              type={showNew ? "text" : "password"}
              autoComplete="new-password"
              name="conf-new-password"
              id="conf-new-password"
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

          <button className="update-btn" disabled={isLoading}>
            {isLoading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </section>
    </>
  );
};

export default ResetPassword;

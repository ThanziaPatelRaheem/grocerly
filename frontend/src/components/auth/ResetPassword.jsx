import React, { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [showConfm, setShowConfm] = useState(false);

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Password has been reset successfully!");
      navigate("/login");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password doesn not match, Try again!");
    }
    const data = { password, confirmPassword };
    resetPassword({ token, body: data });
  };
  return (
    <>
      <section className="profile-section update-password-section">
        <h3 className="update-heading">Update Password</h3>
        <form
          className="update-profile-form upassword-section"
          onSubmit={submitHandler}
        >
          <label htmlFor="new-password" className="profile-label">
            New Password
          </label>
          <div className="pw-field">
            <input
              type={showNew ? "text" : "password"}
              autoComplete="current-password"
              name="new-password"
              id="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              aria-pressed={showNew}
              aria-label={
                showNew ? "Hide current password" : "Show current password"
              }
              onClick={() => setShowNew((v) => !v)}
              className="pw-btn"
            >
              {showNew ? (
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
              type={showConfm ? "text" : "password"}
              autoComplete="new-password"
              name="conf-new-password"
              id="conf-new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              aria-pressed={showConfm}
              aria-label={showConfm ? "Hide new password" : "Show new password"}
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
            {isLoading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </section>
    </>
  );
};

export default ResetPassword;

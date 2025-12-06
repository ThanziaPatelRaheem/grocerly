import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Email sent. Please check your inbox");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    forgotPassword({ email });
  };
  return (
    <>
      <section className="forgot-password-email main-grid">
        <h2 className="for-heading">Forgot Password</h2>
        <div className="for-pwd-wrapper">
          <div className="for-pwd-container">
            <form className="login-form" onSubmit={submitHandler}>
              <label htmlFor="email" className="login-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className=" btn login-btn" disabled={isLoading}>
                {isLoading ? "Sending.." : "Send Email"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;

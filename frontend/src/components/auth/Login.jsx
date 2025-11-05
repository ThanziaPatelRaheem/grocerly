import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };
    login(loginData);
  };
  return (
    <>
      <section className="login-section main-grid">
        <h2 className="login-heading">Login/Sign up</h2>
        <div className="login-wrapper">
          <div className="login-container">
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
              <div className="password-div">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <Link to="/forgot-password" className="forgot-pass">
                  Forgot password?
                </Link>
              </div>

              <input
                name="password"
                id="password"
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className=" btn login-btn" disabled={isLoading}>
                {isLoading ? "Loging.." : "Login"}
              </button>
            </form>
          </div>
          <div className="sign-up-prompt">
            <p className="sign-up-text">Don't have an account? Create one</p>

            <Link to="/register" className="signup-prompt-btn">
              Sign up
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

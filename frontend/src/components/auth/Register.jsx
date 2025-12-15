import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { name, email, password } = user;

  const [register, { data, isLoading, error, isSuccess }] =
    useRegisterMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isSuccess && data?.token) {
      toast.success("Account created successfully. Please log in.");
      navigate("/login");
    }

    if (error) {
      toast.error(error?.data?.message || "Registration failed");
    }
  }, [isSuccess, data, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const signUpData = {
      name,
      email,
      password,
    };
    register(signUpData);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="login-section main-grid">
      <h2 className="login-heading">Sign up</h2>
      <div className="login-wrapper">
        <div className="login-container">
          <form className="login-form" onSubmit={submitHandler}>
            <label htmlFor="name" className="login-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              placeholder="Enter email"
            />
            <div className="password-div">
              <label htmlFor="password" className="login-label">
                Password
              </label>
            </div>
            <input
              name="password"
              id="password"
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
            <button className=" btn login-btn" disabled={isLoading}>
              {isLoading ? "Registering" : "Register"}
            </button>
          </form>
        </div>
        <div className="sign-up-prompt">
          <p className="sign-up-text">Already have an account? Log in</p>

          <Link to="/login" className="signup-prompt-btn">
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;

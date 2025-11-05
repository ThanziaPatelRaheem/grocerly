import React, { useEffect, useState } from "react";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { replace, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("User updated successfully!");
      navigate("..", { replace: true });
    }
  }, [user, error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
    };

    updateProfile(userData);
  };
  return (
    <aside className="profile-section update-profile-section">
      <h3 className="update-heading">Update Profile</h3>
      <form className="update-profile-form" onSubmit={submitHandler}>
        <label htmlFor="name" className="profile-label">
          Name
        </label>
        <input
          type="text"
          name="update-name"
          id="update-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="update-email" className="profile-label">
          Email
        </label>
        <input
          type="email"
          name="update-email"
          id="update-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="update-btn" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </aside>
  );
};

export default UpdateProfile;

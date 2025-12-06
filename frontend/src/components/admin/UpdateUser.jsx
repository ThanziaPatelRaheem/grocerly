import React, { useEffect, useState } from "react";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const { data, error: fetchError } = useGetUserDetailsQuery(id);
  const [updateUser, { error, isSuccess, isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setRole(data?.user?.role);
    }
  }, [data]);

  useEffect(() => {
    if (fetchError) {
      toast.error(fetchError?.data?.message || "Failed to load user");
    }

    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("User updated successfully!");
      navigate("/admin/users", { replace: true });
    }
  }, [fetchError, error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };

    updateUser({ id: id, body: userData });
  };
  return (
    <>
      <MetaData title={`Update User Details`} />
      <aside className="profile-section update-profile-section">
        <h3 className="update-heading">Update User</h3>
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

          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <button className="update-btn" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </aside>
    </>
  );
};

export default UpdateUser;

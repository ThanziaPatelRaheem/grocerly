import React from "react";
import { Route } from "react-router-dom";
import Home from "../Home";
import Products from "../Pages/Products";
import AppLayout from "../Layout/AppLayout";
import ProductDetails from "../../ProductDetails/ProductDetails";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Profile from "../user/Profile";
import UserLayout from "../Layout/UserLayout";
import UpdateProfile from "../user/UpdateProfile";
import UploadAvatar from "../user/UploadAvatar";
import UpdatePassword from "../user/UpdatePassword";
import ProtectedRoute from "../auth/ProtectedRoute";
import ForgotPassword from "../auth/ForgotPassword";
import Cart from "../cart/Cart";
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import PaymentMethod from "../cart/PaymentMethod";

const UserRoutes = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<ProductDetails />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="cart" element={<Cart />} />
      <Route
        path="shipping"
        element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
      />
      <Route
        path="confirm-order"
        element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        }
      />

      <Route
        path="payment-method"
        element={
          <ProtectedRoute>
            <PaymentMethod />
          </ProtectedRoute>
        }
      />

      <Route path="me/profile" element={<UserLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="update_profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="upload_avatar"
          element={
            <ProtectedRoute>
              <UploadAvatar />
            </ProtectedRoute>
          }
        />
        <Route
          path="update_password"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  );
};

export default UserRoutes;

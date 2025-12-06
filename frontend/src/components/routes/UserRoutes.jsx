import React, { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import Home from "../Home";
import Products from "../Pages/Products";
import Loader from "../Layout/Loader";
import AppLayout from "../Layout/AppLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import UserLayout from "../Layout/UserLayout";
import ProtectedRoute from "../auth/ProtectedRoute";
import ForgotPassword from "../auth/ForgotPassword";
import Cart from "../cart/Cart";
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import PaymentMethod from "../cart/PaymentMethod";
import ResetPassword from "../auth/ResetPassword";
import Contact from "../Pages/Contact";
import ShippingInfo from "../Pages/ShippingInfo";
import TermsConditions from "../Pages/TermsConditions";
import About from "../Pages/About";
const ProductDetails = lazy(() =>
  import("../../ProductDetails/ProductDetails")
);
const MyOrders = lazy(() => import("../order/MyOrders"));
const OrderDetails = lazy(() => import("../order/OrderDetails"));
const Invoice = lazy(() => import("../invoice/invoice"));

const Profile = lazy(() => import("../user/Profile"));
const UpdateProfile = lazy(() => import("../user/UpdateProfile"));
const UploadAvatar = lazy(() => import("../user/UploadAvatar"));
const UpdatePassword = lazy(() => import("../user/UpdatePassword"));

const UserRoutes = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route
        path="products/:id"
        element={
          <Suspense fallback={<Loader />}>
            <ProductDetails />
          </Suspense>
        }
      />

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="password-reset/:token" element={<ResetPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="cart" element={<Cart />} />
      <Route path="shipping-info" element={<ShippingInfo />} />
      <Route path="terms-conditions" element={<TermsConditions />} />
      <Route path="about-us" element={<About />} />
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
      <Route
        path="me/orders"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <MyOrders />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="me/order/:id"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <OrderDetails />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="invoice/order/:id"
        element={
          <ProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Invoice />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route path="me/profile" element={<UserLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="update_profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <UpdateProfile />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="upload_avatar"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <UploadAvatar />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="update_password"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loader />}>
                <UpdatePassword />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  );
};

export default UserRoutes;

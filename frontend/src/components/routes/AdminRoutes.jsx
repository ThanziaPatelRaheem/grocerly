import React, { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import AdminLayout from "../../components/Layout/AdminLayout";
import Loader from "../Layout/Loader";
const Dashboard = lazy(() => import("../admin/Dashboard"));
const ListProducts = lazy(() => import("../admin/ListProducts"));
const NewProduct = lazy(() => import("../admin/NewProduct"));
const UpdateProduct = lazy(() => import("../admin/UpdateProduct"));
const UploadImages = lazy(() => import("../admin/UploadImages"));
const ListOrders = lazy(() => import("../admin/ListOders"));
const ProcessOrder = lazy(() => import("../admin/ProcessOrder"));
const ListUsers = lazy(() => import("../admin/ListUsers"));
const UpdateUser = lazy(() => import("../admin/UpdateUser"));
const ProductReviews = lazy(() => import("../admin/ProductReviews"));

const AdminRoutes = () => {
  return (
    <>
      <Route
        path="admin"
        element={
          <ProtectedRoute admin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <ProtectedRoute admin={true}>
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="products"
          element={
            <ProtectedRoute admin={true}>
              <Suspense fallback={<Loader />}>
                <ListProducts />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="product/new"
          element={
            <ProtectedRoute admin={true}>
              <Suspense fallback={<Loader />}>
                <NewProduct />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="products/:id"
          element={
            <ProtectedRoute admin={true}>
              <Suspense fallback={<Loader />}>
                <UpdateProduct />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="products/:id/upload_images"
          element={
            <ProtectedRoute admin={true}>
              <Suspense fallback={<Loader />}>
                <UploadImages />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="orders"
          element={
            <ProtectedRoute admin={true}>
              <Suspense fallback={<Loader />}>
                <ListOrders />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="orders/:id"
          element={
            <ProtectedRoute admin={true}>
              <Suspense fallback={<Loader />}>
                <ProcessOrder />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="users"
          element={
            <ProtectedRoute admin={true}>
              <Suspense fallback={<Loader />}>
                <ListUsers />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="users/:id"
          element={
            <ProtectedRoute admin={true}>
              <Suspense fallback={<Loader />}>
                <UpdateUser />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="reviews"
          element={
            <ProtectedRoute admin={true}>
              <Suspense fallback={<Loader />}>
                <ProductReviews />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  );
};

export default AdminRoutes;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
  return (
    <div className="site-wrapper">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            // border: "1px solid grey",
            color: "#495057",
            backgroundColor: "#fff",
            zIndex: 9999, // You might want this too
          },
        }}
      />
      <Header />

      <main className="main-content-wrapper ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;

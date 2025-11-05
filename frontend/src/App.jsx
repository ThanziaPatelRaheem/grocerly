import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./components/routes/userRoutes";
import AdminRoutes from "./components/routes/adminRoutes";
import AppLayout from "./components/Layout/AppLayout";

function App() {
  const userRoutes = UserRoutes();
  const adminRoutes = AdminRoutes();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {userRoutes}
            {adminRoutes}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

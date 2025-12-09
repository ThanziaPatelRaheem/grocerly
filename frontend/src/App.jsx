import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./components/routes/UserRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";
import AppLayout from "./components/Layout/AppLayout";
import NotFound from "./components/Layout/NotFound";

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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

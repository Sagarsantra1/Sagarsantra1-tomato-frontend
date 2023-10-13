import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RestaurantPage from "../pages/RestaurantPage";
import RestaurantDetailsPage from "../pages/RestaurantDetailsPage";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

function AppRoutes() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {isHomePage ? null : <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:city" element={<RestaurantPage />} />
        <Route path="/:city/:slug" element={<RestaurantDetailsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import NftPage from "./Pages/NftPage";
import Report from "./Pages/Report";
import Settings from "./Pages/Settings";
import UserManagement from "./Pages/UserManagement";
import ApiPractice from "./Pages/ApiPractice";
import UseEffect from "./Pages/UseEffect";
import DisplayPages from "./Pages/DisplayPages";
import HomepageDisplay from "./Components/DisplayPagesContainer/Containers/HomepageDisplay";
import HomepageBannerList from "./Components/DisplayPagesContainer/Containers/HomepageDisplay/HomePageBannerList";
import Category from "./Pages/Category";
import CategoryChildren from "Pages/CategoryChildren";
import Products from "Pages/Products";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="display-pages" element={<DisplayPages />} />
        <Route
          path="display-pages/homepage-display"
          element={<HomepageDisplay />}
        />
        <Route
          path="display-pages/homepage-display/homepage-banner-list"
          element={<HomepageBannerList />}
        />

        <Route path="category" element={<Category />} />

        <Route
          path="category/category-child/:id"
          element={<CategoryChildren />}
        />
        <Route
          path="category/category-child/:id/products"
          element={<Products />}
        />

        <Route path="login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;

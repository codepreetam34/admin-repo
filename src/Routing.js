import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "Pages/Home";
import LogIn from "Pages/LogIn";
import DisplayPages from "Pages/DisplayPages";
import HomepageDisplay from "Components/DisplayPagesContainer/Containers/HomepageDisplay";
import HomepageBannerList from "Components/DisplayPagesContainer/Containers/HomepageDisplay/HomePageBannerList";
import ParentCategory from "Pages/ParentCategory";
import CategoryChildren from "Pages/ChildCategory";
import Products from "Pages/Products";
import {
  HOME,
  DISPLAY_PAGES,
  HOMEPAGE_DISPLAY,
  HOMEPAGE_BANNER_LIST,
  CATEGORY,
  CATEGORY_CHILDREN,
  CATEGORY_CHILD_PRODUCTS,
  LOGIN,
  SETUP_NEW_PASSWORD,
  FORGOT_PASSWORD,
} from "Routes/Routes";
import PrivateRoutes from "Routes/PrivateRoutes";
import SetupNewPassword from "Components/LogIn/SetupNewPassword";
import ForgotPassword from "Components/LogIn/ForgotPassword";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<LogIn />} />
        <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={SETUP_NEW_PASSWORD} element={<SetupNewPassword />} />
        <Route path={HOME} element={<PrivateRoutes Component={Home} />} />

        <Route
          path={DISPLAY_PAGES}
          element={<PrivateRoutes Component={DisplayPages} />}
        />

        <Route
          path={HOMEPAGE_DISPLAY}
          element={<PrivateRoutes Component={HomepageDisplay} />}
        />

        <Route
          path={HOMEPAGE_BANNER_LIST}
          element={<PrivateRoutes Component={HomepageBannerList} />}
        />
        <Route
          path={CATEGORY}
          element={<PrivateRoutes Component={ParentCategory} />}
        />
        <Route
          path={CATEGORY_CHILDREN}
          element={<PrivateRoutes Component={CategoryChildren} />}
        />
        <Route
          path={CATEGORY_CHILD_PRODUCTS}
          element={<PrivateRoutes Component={Products} />}
        />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;

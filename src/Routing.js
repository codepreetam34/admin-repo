import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "Pages/Home";
import LogIn from "Pages/LogIn";
import DisplayPages from "Pages/DisplayPages";
import HomepageDisplay from "Components/DisplayPagesContainer/Containers/HomepageDisplay";
import HomepageBannerList from "Components/DisplayPagesContainer/Containers/HomepageDisplay/HomePageBannerList";
import Category from "Pages/Category";
import CategoryChildren from "Pages/CategoryChildren";
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
} from "Routes/Routes";
import PrivateRoutes from "Routes/PrivateRoutes";
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<LogIn />} />
        
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
        <Route path={CATEGORY} element={<Category />} />
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

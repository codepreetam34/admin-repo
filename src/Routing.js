import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "Pages/Home";
import LogIn from "Pages/LogIn";
import DisplayPages from "Pages/DisplayPages";
import HomepageDisplay from "Components/DisplayPagesContainer/Containers/HomepageDisplay";
import HomepageBannerList from "Components/DisplayPagesContainer/Containers/HomepageDisplay/HomePageBannerList";
import HomepageTwoAdsBanner from "Components/DisplayPagesContainer/Containers/HomepageDisplay/HomePageTwoAdsBanner";
import ParentCategory from "Pages/ParentCategory";
import CategoryChildren from "Pages/ChildCategory";
import ProductsByCategory from "Pages/ProductsByCategory";
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
  PRODUCTS,
  ADD_PRODUCTS,
  TAGS,
  HOMEPAGE_TWO_ADS_BANNER,
  HOMEPAGE_SHOP_BY_OCCASION,
  HOMEPAGE_PAMPER_ZONE,
  REGISTER_VENDOR,
  ORDER_PAGE,
  USER_PAGE,
  PRODUCT_APPROVAL,
} from "Routes/Routes";
import PrivateRoutes from "Routes/PrivateRoutes";
import SetupNewPassword from "Components/LogIn/SetupNewPassword";
import ForgotPassword from "Components/LogIn/ForgotPassword";
import Products from "Pages/Products";
import AddProduct from "Components/ProductsPage/Components/AddProductPage";
import TagsPage from "Components/TagsPage";
import HomePageShopByOccasion from "Components/DisplayPagesContainer/Containers/HomepageDisplay/HomePageShopByOccasion";
import HomePagePamperZone from "Components/DisplayPagesContainer/Containers/HomepageDisplay/HomePagePamperZone";
import RegisterVendor from "Components/RegisterVendorPage";
import Orders from "Pages/Orders";
import Users from "Pages/Users";
import ProductApprovalPage from "Components/ProductApprovalPage";

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
          path={ORDER_PAGE}
          element={<PrivateRoutes Component={Orders} />}
        />
        <Route path={USER_PAGE} element={<PrivateRoutes Component={Users} />} />
        <Route
          path={REGISTER_VENDOR}
          element={<PrivateRoutes Component={RegisterVendor} />}
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
          path={HOMEPAGE_TWO_ADS_BANNER}
          element={<PrivateRoutes Component={HomepageTwoAdsBanner} />}
        />
        <Route
          path={HOMEPAGE_SHOP_BY_OCCASION}
          element={<PrivateRoutes Component={HomePageShopByOccasion} />}
        />
        <Route
          path={HOMEPAGE_PAMPER_ZONE}
          element={<PrivateRoutes Component={HomePagePamperZone} />}
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
          element={<PrivateRoutes Component={ProductsByCategory} />}
        />
        <Route path={TAGS} element={<PrivateRoutes Component={TagsPage} />} />
        <Route
          path={PRODUCT_APPROVAL}
          element={<PrivateRoutes Component={ProductApprovalPage} />}
        />
        <Route
          path={PRODUCTS}
          element={<PrivateRoutes Component={Products} />}
        />
        <Route
          path={ADD_PRODUCTS}
          element={<PrivateRoutes Component={AddProduct} />}
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;

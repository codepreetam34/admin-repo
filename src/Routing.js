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
const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="manage-nft" element={<NftPage />} />
        <Route path="report" element={<Report />} />
        <Route path="settings" element={<Settings />} />

        <Route path="display-pages" element={<DisplayPages />} />
        <Route
          path="display-pages/homepage-display"
          element={<HomepageDisplay />}
        />
        <Route
          path="display-pages/homepage-display/homepage-banner-list"
          element={<HomepageBannerList />}
        />

        <Route path="login" element={<LogIn />} />
        <Route path="apipractice" element={<ApiPractice />} />
        <Route path="useeffect-practice" element={<UseEffect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;

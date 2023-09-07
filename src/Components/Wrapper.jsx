import React, { useState } from "react";
import Topbar from "./Header_Footer/Topbar";
import Sidebar from "./SideBar/Sidebar";
import Footer from "./Header_Footer/Footer";

const Wrapper = (props) => {

  const [toggleicon, setToggleicon] = useState(false);

  function ToggleBtn() {
    setToggleicon(!toggleicon);
    document.body.classList.toggle('togglesidebar');
  }

  return (
    <div className="wrapper">
      <Sidebar toggleicon={toggleicon} setToggleicon={setToggleicon} ToggleBtn={ToggleBtn} />
      <div className="maincontent d-flex flex-column justify-content-between">
        <div className="">
          <Topbar toggleicon={toggleicon} setToggleicon={setToggleicon} ToggleBtn={ToggleBtn} />
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default Wrapper;

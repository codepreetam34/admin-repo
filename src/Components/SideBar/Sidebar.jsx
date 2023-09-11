import React from "react";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../../src/images/vibezterLogo.png";

const Sidebar = ({ toggleicon, setToggleicon, ToggleBtn }) => {
  const [sideBarLink, setSideBarLink] = useState(false);
  function onhidesidebar() {
    setSideBarLink(!sideBarLink);
    document.body.classList.remove("togglesidebar");
  }

  return (
    <div>
      <div className="foroverlay d-block d-lg-none"></div>
      <div className="sidebar">
        <div
          className="toggle_button d-block d-xl-none me-3"
          onClick={() => ToggleBtn()}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="logo">
          <a href="/">
            <img src={Logo} className="img-fluid" alt="" />
          </a>
        </div>
        <div className="menulist">
          {/* <ul className='p-0 m-0'>
                    <li className='list_item active_li'><a href="/"><i className="fa-solid fa-border-all"></i> Dashboard</a></li>
                    <li className='list_item'><a href="user-management"><i className="fa-solid fa-user"></i> Users Management</a></li>
                    <li className='list_item'><a href="manage-nft"><i className="fa-solid fa-list"></i> Manage NFT</a></li>
                    <li className='list_item'><a href="report"><i className="fa-solid fa-chart-line"></i> Report</a></li>
                    <li className='list_item'><a href="settings"><i className="fa-solid fa-gear"></i> Settings</a></li>
                    <li className='list_item'><a href="/"><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</a></li>
                </ul> */}
          <Nav className="d-block" navbarScroll>
            <Nav.Link
              onClick={() => onhidesidebar()}
              as={NavLink}
              exact=""
              to="/"
            >
              <i className="fa-solid fa-border-all"></i> Dashboard
            </Nav.Link>
            <Nav.Link
              onClick={() => onhidesidebar()}
              as={NavLink}
              exact=""
              to="/display-pages"
            >
              <i className="fa-solid fa-user"></i>Display Pages
            </Nav.Link>
            <Nav.Link
              onClick={() => onhidesidebar()}
              as={NavLink}
              exact=""
              to="/category"
            >
              <i className="fa-solid fa-gear"></i>Category & Products
            </Nav.Link>
            {/* <Nav.Link onClick={() => onhidesidebar()} as={NavLink} exact='' to="/user-management"><i className="fa-solid fa-user"></i> Users Management</Nav.Link>
                        <Nav.Link onClick={() => onhidesidebar()} as={NavLink} exact='' to="/manage-nft"><i className="fa-solid fa-list"></i> Manage NFT</Nav.Link>
                        <Nav.Link onClick={() => onhidesidebar()} as={NavLink} exact='' to="/report"><i className="fa-solid fa-chart-line"></i> Report</Nav.Link>
                        <Nav.Link onClick={() => onhidesidebar()} as={NavLink} exact='' to="/settings"><i className="fa-solid fa-gear"></i> Settings</Nav.Link> */}
            <Nav.Link
              onClick={() => onhidesidebar()}
              as={NavLink}
              exact=""
              to="/login"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../src/images/vibezterLogo.png";
import { logout } from "Redux/Slices/Login/auth.slice";
import { useDispatch } from "react-redux";
import { Notify } from "Constants/utils";
const Sidebar = ({ toggleicon, setToggleicon, ToggleBtn }) => {
  const [sideBarLink, setSideBarLink] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onhidesidebar() {
    setSideBarLink(!sideBarLink);
    document.body.classList.remove("togglesidebar");
  }

  const handleLogOut = () => {
    dispatch(logout())
      .then((response) => {
        localStorage.clear();

        navigate("/login");
      })
      .catch((rejectedWithValue) => {
        navigate("/");
      });
  };

  return (
    <div>
      <div className="foroverlay d-block d-lg-none"></div>
      <div
        className="sidebar"
        style={{ transition: "transform 1s ease-in-out" }}
      >
        <div
          className="toggle_button d-block d-xl-none me-3"
          onClick={() => ToggleBtn()}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="logo">
          <Link to="/">
            <img src={Logo} className="img-fluid" alt="" loading="lazy" />
          </Link>
        </div>
        <div className="menulist">
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
            <Nav.Link as={NavLink} exact="" to="/login" onClick={handleLogOut}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

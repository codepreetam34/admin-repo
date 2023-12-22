import React from "react";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "images/vibezterLogo.png";
import { logout } from "Redux/Slices/Login/auth.slice";
import { useDispatch } from "react-redux";
import { CATEGORY, DISPLAY_PAGES, LOGIN, ORDER_PAGE, PRODUCTS, TAGS } from "Routes/Routes";

const Sidebar = ({ toggleicon, setToggleicon, ToggleBtn }) => {
  const [sideBarLink, setSideBarLink] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("Sidebar_Module_Assigned"));
  console.log("user Info ", userInfo?.role);
  console.log(
    "user Info role ",
    localStorage.getItem("Sidebar_Module_Assigned").role
  );
  function onhidesidebar() {
    setSideBarLink(!sideBarLink);
    document.body.classList.remove("togglesidebar");
  }

  const handleLogOut = () => {
    setSideBarLink(!sideBarLink);
    document.body.classList.remove("togglesidebar");

    dispatch(logout())
      .then((response) => {
        if (
          (response && response?.meta?.requestStatus === "fulfilled") ||
          !response
        ) {
          localStorage.clear();
          navigate("/login", {
            state: {
              showToastMessage: response?.payload?.message
                ? response?.payload?.message
                : "Logout successful. Have a great day!",
            },
          });
        }
      })
      .catch((err) => {
        navigate("/", {
          state: {
            showErrorToastMessage: err?.error?.response?.data?.message
              ? err?.error?.response?.data?.message
              : "Something went wrong please try again!",
            showErrorToast: true,
          },
        });
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
              to={DISPLAY_PAGES}
            >
              <i class="fa-solid fa-layer-group"></i> Display Pages
            </Nav.Link>
            {userInfo?.role === "super-admin" && (
              <Nav.Link
                onClick={() => onhidesidebar()}
                as={NavLink}
                exact=""
                to={TAGS}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <i class="fa-solid fa-tag"></i>
                <div>Tags</div>
              </Nav.Link>
            )}
            <Nav.Link
              onClick={() => onhidesidebar()}
              as={NavLink}
              exact=""
              to={CATEGORY}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <i className="fa-solid fa-gear"></i>
              <div>Category</div>
            </Nav.Link>
            <Nav.Link
              onClick={() => onhidesidebar()}
              as={NavLink}
              exact=""
              to={PRODUCTS}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <i class="fa-solid fa-tag"></i>
              <div>Products</div>
            </Nav.Link>
            <Nav.Link
              onClick={() => onhidesidebar()}
              as={NavLink}
              exact=""
              to={ORDER_PAGE}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <i class="fa-solid fa-tag"></i>
              <div>All Orders</div>
            </Nav.Link>
            <Nav.Link as={NavLink} exact="" to={LOGIN} onClick={handleLogOut}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

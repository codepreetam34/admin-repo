import React, { useState } from "react";
import { Dropdown, Form, InputGroup, Row, Col } from "react-bootstrap";
import User from "../../../src/images/user.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "Redux/Slices/Login/auth.slice";
import { ErrorToaster } from "Constants/utils";
import { REGISTER_VENDOR } from "Routes/Routes";

const Topbar = ({ toggleicon, setToggleicon, ToggleBtn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = JSON.parse(localStorage.getItem("Sidebar_Module_Assigned_Admin"));
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showErrorToastMessage, setShowErrorToastMessage] = useState();
  const [sideBarLink, setSideBarLink] = useState(false);
  const [openAddProductPage, setOpenAddProductPage] = useState(false);
  const handleLogOut = () => {
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
        setShowErrorToast(true);
        setShowErrorToastMessage(err?.error?.response?.data?.message);
      });
  };
  const handleRegisterVendor = () => {
    setOpenAddProductPage(true);
    navigate(REGISTER_VENDOR)
    // setModalData({ type: "Add", data: null });
  };
  return (
    <>
      <div className="topbar">
        <Row className="align-items-center">
          <Col md={4}>
            <div className="d-flex align-items-center">
              <div
                className="toggle_button me-3 d-none d-xl-block"
                onClick={() => ToggleBtn(setSideBarLink(!sideBarLink))}
              >
                {sideBarLink ? (
                  <i className="fa-solid fa-bars"></i>
                ) : (
                  <i class="fa-solid fa-bars-staggered"></i>
                )}
              </div>
              <div
                className="toggle_button me-3 d-block d-xl-none"
                onClick={() => ToggleBtn()}
              >
                <i className="fa-solid fa-bars"></i>
              </div>
              <div className="searchbar">
                <InputGroup className="" style={{ flexWrap: 'nowrap' }}>
                  <InputGroup.Text id="basic-addon1" className="">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search Here"
                    className=""
                    aria-label="Search Here"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </div>
            </div>
          </Col>

          <Col md={8}>
            <Row className="justify-content-end align-items-center ">
              <Col md={4} className="justify-content-end d-flex">
                <div style={{
                  backgroundColor: "#801317",
                  borderRadius: "100px",
                  padding: "12px 50px",
                  fontSize: "18px",
                  fontWeight: "400",
                  color: "#ffffff",
                  marginTop: "8px",
                  marginRight: "30px",
                  display: "inline-block",
                  textDecoration: "none",
                  transition: "0.3s",
                  padding: "6px 15px",
                  borderRadius: "4px",
                  margin: "0",
                  marginLeft: "15px",
                  boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.1)",
                  fontSize: "14px",
                  cursor: "pointer"
                }}>
                  <div className="bgbtnred" onClick={handleRegisterVendor}>
                    Register Vendor
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="userprofile text-end">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant=""
                      className="p-0"
                      id="dropdown-basic"
                      style={{ textTransform: "capitalize" }}
                    >
                      <img src={User} className="img-fluid" alt="" loading="lazy" />{" "}
                      {authData && authData?.fullName}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* <Dropdown.Item href="#" onClick={() => setShowToast(true)}>
                    Profile
                  </Dropdown.Item> */}
                      <Dropdown.Item href="#" onClick={handleLogOut}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>

          </Col>
        </Row>
        <ErrorToaster
          showErrorToast={showErrorToast}
          setShowErrorToast={setShowErrorToast}
          showErrorToastMessage={showErrorToastMessage}
          customErrorMessage={"Logout failed. Please try again later."}
        />
      </div>
    </>
  );
};

export default Topbar;

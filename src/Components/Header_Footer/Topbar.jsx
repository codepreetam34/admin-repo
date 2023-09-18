import React, { useState } from "react";
import { Dropdown, Form, InputGroup, Row, Col } from "react-bootstrap";
import User from "../../../src/images/user.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "Redux/Slices/Login/auth.slice";
import { ErrorToaster } from "Constants/utils";

const Topbar = ({ toggleicon, setToggleicon, ToggleBtn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = JSON.parse(localStorage.getItem("Sidebar_Module_Assigned"));
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showErrorToastMessage, setShowErrorToastMessage] = useState();
  const [sideBarLink, setSideBarLink] = useState(false);
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

  return (
    <>
      <div className="topbar">
        <Row className="align-items-center">
          <Col xs={7} md={6}>
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
                <InputGroup className="">
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
          <Col xs={5} md={6}>
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

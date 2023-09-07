import React from "react";
import { Row, Col, Tabs, Tab, Form, InputGroup } from "react-bootstrap";
import Wrapper from "../Wrapper";
import Solana from "../../../src/images/solana.png";

const SettingsCompo = () => {
  return (
    <Wrapper>
      <div className="user_management_list">
        <div className="setting_page">
          <Row>
            <Col md={12}>
              <div className="user_heading">
                <h3>Settings</h3>
                <p>Welcome to Settings Page</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className=""
              >
                <Tab eventKey="profile" title="Profile">
                  <div className="tab_bg_area">
                    <div className="user_heading">
                      <h3>Update profile Settings</h3>
                    </div>
                    <div className="profile_upload">
                      <Form.Label>Profile Picture</Form.Label>
                      <span className="img_store">
                        <small>Upload Image</small>
                        {/* <img src={Profile} className='img-fluid' alt="" /> */}
                        <Form.Control type="file" />
                      </span>
                    </div>
                    <Form className="seting_profile_form mt-5">
                      <Row>
                        <Col lg={4} md={6}>
                          <Form.Group className="mb-4" controlId="full_name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="email" />
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={6}>
                          <Form.Group className="mb-4" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" />
                          </Form.Group>
                        </Col>
                        <Col lg={4}></Col>
                        <Col lg={4} md={6}>
                          <Form.Group className="mb-4" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="email" />
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={6}>
                          <Form.Group className="mb-4" controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="email" />
                          </Form.Group>
                        </Col>
                        <Col lg={4}></Col>
                        <Col lg={4} md={6}>
                          <Form.Group className="mb-4" controlId="postal_code">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control type="email" />
                          </Form.Group>
                        </Col>
                        <Col lg={4} md={6}>
                          <Form.Label>Country</Form.Label>
                          <Form.Select aria-label="Default select example">
                            <option>Select</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Col>
                        <Col md={12}>
                          <a href="#" className="btn">
                            Save
                          </a>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Tab>
                <Tab eventKey="password" title="Password">
                  <div className="tab_bg_area">
                    <div className="user_heading">
                      <h3>Update Password</h3>
                    </div>
                    <Form className="seting_profile_form mt-5">
                      <Row>
                        <Col md={6} lg={6} xl={5} xxl={4}>
                          <Form.Group className="mb-4" controlId="old_password">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control type="password" />
                          </Form.Group>
                        </Col>
                        <Col md={6} lg={6} xl={7} xxl={8}></Col>
                        <Col md={6} lg={6} xl={5} xxl={4}>
                          <Form.Group className="mb-4" controlId="new_password">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" />
                          </Form.Group>
                        </Col>
                        <Col md={6} lg={6} xl={7} xxl={8}></Col>
                        <Col md={6} lg={6} xl={5} xxl={4}>
                          <Form.Group
                            className="mb-md-4"
                            controlId="confirm_password"
                          >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <a href="#" className="btn">
                            Update Password
                          </a>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Tab>
                <Tab eventKey="notification" title="Notification">
                  <div className="tab_bg_area">
                    <div className="user_heading">
                      <h3>Notification</h3>
                    </div>
                    <div className="mt-lg-5 mt-md-5 mt-4">
                      <Form.Group className="mb-3" controlId="itempur">
                        <Form.Label className="d-flex align-items-center">
                          <Form.Check type="checkbox" className="me-3" />
                          <div className="checkboxlist">
                            <h4>Item Purchased</h4>
                            <span>
                              When someone purchased one of your items
                            </span>
                          </div>
                        </Form.Label>
                      </Form.Group>
                    </div>
                    <div className="mt-lg-5 mt-md-5 mt-4">
                      <Form.Group className="mb-3" controlId="outbid">
                        <Form.Label className="d-flex align-items-center">
                          <Form.Check type="checkbox" className="me-3" />
                          <div className="checkboxlist">
                            <h4>Outbid Items update</h4>
                            <span>
                              When an offer you placed is exceeded by another
                              user
                            </span>
                          </div>
                        </Form.Label>
                      </Form.Group>
                    </div>
                    <div className="mt-lg-5 mt-md-5 mt-4">
                      <Form.Group className="mb-3" controlId="creatednft">
                        <Form.Label className="d-flex align-items-center">
                          <Form.Check type="checkbox" className="me-3" />
                          <div className="checkboxlist">
                            <h4>Successfully created NFT</h4>
                            <span>When you successfully created NFT</span>
                          </div>
                        </Form.Label>
                      </Form.Group>
                    </div>
                    <div className="mt-lg-5 mt-md-5 mt-4">
                      <Form.Group className="mb-3" controlId="purchase">
                        <Form.Label className="d-flex align-items-center">
                          <Form.Check type="checkbox" className="me-3" />
                          <div className="checkboxlist">
                            <h4>Successful Purchase</h4>
                            <span>When you successfully buy an item</span>
                          </div>
                        </Form.Label>
                      </Form.Group>
                    </div>
                    <div className="mt-lg-5 mt-md-5 mt-4">
                      <Form.Group className="mb-3" controlId="newsletter">
                        <Form.Label className="d-flex align-items-center">
                          <Form.Check type="checkbox" className="me-3" />
                          <div className="checkboxlist">
                            <h4>Vibezter Newsletter</h4>
                            <span>
                              Occasional updates from the Vibezter team
                            </span>
                          </div>
                        </Form.Label>
                      </Form.Group>
                    </div>
                    <div className="mini-text">
                      <h4>Minimum Bid Threshold</h4>
                      <p>
                        Receive notifications only when you receive offers with
                        a value greater than or equal to this amount of ETH.
                      </p>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                          <img src={Solana} className="img-fluid" alt="" />
                          <div className="">
                            <h5 className="m-0">SLN</h5>
                            <span>solana</span>
                          </div>
                        </InputGroup.Text>
                        <Form.Control type="number" value="0.005" />
                      </InputGroup>
                    </div>
                    <div className="seting_profile_form">
                      <a href="#" className="btn">
                        Save
                      </a>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </div>
      </div>
    </Wrapper>
  );
};

export default SettingsCompo;

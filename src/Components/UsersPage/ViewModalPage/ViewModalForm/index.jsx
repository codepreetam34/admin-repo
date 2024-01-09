import { format, parseISO } from "date-fns";
import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

const ViewModalForm = ({ modalData }) => {
  const parsedDob = modalData?.dob ? parseISO(modalData.dob) : null;
  const formattedDob = parsedDob ? format(parsedDob, "dd/MM/yyyy") : "";

  return (
    <>
      <div className="container">
        <Form className="user_form" style={{ padding: "0 2rem 2rem" }}>
          <Row>
            <div className="view-details-heading pb-2 text-center">
              <strong>User Details</strong>
            </div>
            <div className="product-detail-design card">
              <Col md={12}>
                <Row>
                  <Col md={6}>
                    <div className="view-details pb-2">
                      <strong>First Name</strong> <br /> {modalData?.firstName}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="view-details pb-2">
                      <strong>Last Name</strong>
                      <br />
                      {modalData?.lastName}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="view-details pb-2">
                      <strong>Email</strong>
                      <br />
                      {modalData?.email}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="view-details pb-2">
                      <strong>Contact Number</strong>
                      <br />
                      {modalData?.contactNumber}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="view-details pb-2">
                      <strong>D.O.B</strong>
                      <br />
                      {formattedDob}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="view-details pb-2">
                      <strong>Gender</strong>
                      <br />
                      {modalData?.gender}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="view-details pb-2">
                      <strong>Verified</strong>
                      <br />
                      <span
                        className={`badge ${
                          modalData?.verified ? "verified" : "not-verified"
                        }`}
                      >
                        {modalData?.verified ? "Verified" : "Not Verified"}
                      </span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="view-details pb-2">
                      <strong>Role</strong>
                      <br />
                      {modalData?.role}
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="view-details pb-2">
                      <strong>User Profile</strong>
                      <br />
                      <div style={{ width: "100%", height: "300px" }}>
                        <img
                          src={modalData?.profilePicture}
                          alt="profilePicture"
                          className="img-fluid pt-2"
                          style={{ maxWidth: "100%", height: "300px" }}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </div>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ViewModalForm;

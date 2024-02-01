import React, { useState } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";

const ViewModalForm = ({ bannerData }) => {
  return (
    <>
      <div className="container">
        <Form className="user_form" style={{ padding: "2rem" }}>
          <Row>
            <div className="view-details-heading pb-4 text-center">
              <strong>Homepage Two Ads Banner Details</strong>
            </div>

            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Title</strong> <br /> {bannerData?.title}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Sub Title</strong> <br /> {bannerData?.subTitle}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Image Alt Text</strong>
                <br />
                {bannerData?.imageAltText}
              </div>
            </Col>

            <Col md={12}>
              <div className="view-details pb-2">
                <strong>Banner Image</strong>
                <br />
                <div style={{ width: "100%", height: "300px" }}>
                  <img
                    src={bannerData?.banner}
                    alt="Category"
                    className="img-fluid pt-2"
                    style={{ maxWidth: "100%", height: "300px" }}
                  />
                </div>
              </div>
            </Col>

          </Row>
        </Form >
      </div >
    </>
  );
};

export default ViewModalForm;

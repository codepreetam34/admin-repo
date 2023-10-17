import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

const ViewCategoryForm = ({ categoryData }) => {
  return (
    <>
      <div className="container">
        <Form className="user_form" style={{ padding: "2rem" }}>
          <Row>
            <div className="view-details-heading pb-2 text-center">
              <strong>Category Details</strong>
            </div>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Category Name</strong> <br /> {categoryData?.name}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Image Alt Text</strong>
                <br />
                {categoryData?.imageAltText}
              </div>
            </Col>
            <Col md={12}>
              <div className="view-details pb-2">
                <strong>Category Tags</strong>
                <br />
                <Row>
                  {categoryData?.tags?.map((tag) => {
                    return (
                      <Col
                        md={6}
                        style={{
                          paddingBottom: "0.7rem",
                          paddingTop: "0.2rem",
                        }}
                      >
                        <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                          {" "}
                          {tag?.tagType}{" "}
                        </div>
                        <div>
                          {tag?.names?.map((name) => {
                            return <div>{name}</div>;
                          })}
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Col>
            <Col md={12}>
              <div className="view-details pb-2">
                <strong>Category Image</strong>
                <br />
                <div style={{ width: "100%", height: "300px" }}>
                  <img
                    src={categoryData?.categoryImage}
                    alt="Category"
                    className="img-fluid pt-2"
                    style={{ maxWidth: "100%", height: "300px" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ViewCategoryForm;

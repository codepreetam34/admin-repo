import React, { useState } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";

const ViewModalForm = ({ modalData }) => {
  return (
    <>
      <div className="container product-detail-design-new">
        <Form className="user_form" style={{ padding: "2rem" }}>
          <Row className="">
            <div className="view-details-heading pb-4 text-center">
              <strong>Tags Details</strong>
            </div>
            <div className="product-detail-design-new">
              <Col md={6} >
                <div className="view-details p-3">
                  <strong>Tag Category Name</strong> <br />{" "}
                  {modalData?.tagName}
                </div>
              </Col>
              <Row className="m-0 p-0">
                {modalData?.categories?.map((category, categoryIndex) => (
                  <Col md={5} className="product-detail-design-new m-3">
                    <Form.Group controlId={`categoryName-${categoryIndex}`}>
                      <Form.Label>Tag Category Type</Form.Label>
                      <Form.Control
                        type="text"
                        disabled
                        value={category.name}
                      />
                    </Form.Group>

                    <Form.Group
                      className="pt-2"
                      controlId={`options-${categoryIndex}`}
                    >
                      <Form.Label>Options</Form.Label>
                      {category.options.map((option, optionIndex) => (
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <Form.Control
                            disabled
                            key={optionIndex}
                            type="text"
                            placeholder="Enter Option"
                            value={option}
                          />
                        </div>
                      ))}
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </div>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ViewModalForm;

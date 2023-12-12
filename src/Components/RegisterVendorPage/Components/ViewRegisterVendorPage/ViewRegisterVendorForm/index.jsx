import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const ViewRegisterVendorForm = ({ productData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  return (
    <Form className="user_form" style={{ padding: "2rem" }}>
      <Row>
        {" "}
        <div className="view-details-heading pb-2 text-center">
          <strong>Vendor Details</strong>
          <div className="d-flex justify-content-center gap-3">
            <div style={{ fontSize: "1.2rem" }}>
              Quantity - ({productData?.quantity})
            </div>
            <div style={{ fontSize: "1.2rem" }}>
              Offer - ({productData?.offer})
            </div>
          </div>
        </div>
        <Col md={12} className="product-detail-design">
          <Row>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Name</strong> <br /> {productData?.name}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Price</strong> <br /> {productData?.actualPrice}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default ViewRegisterVendorForm;

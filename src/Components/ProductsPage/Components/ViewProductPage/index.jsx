import React from "react";
import { Col, Container } from "react-bootstrap";
import ViewProductForm from "./ViewProductForm";

const ViewProductPage = ({ setOpenViewProductPage, productData }) => {
  return (
    <Col md={12}>
      <div className="pt-4">
        <div
          className="text_heading"
          style={{ cursor: "pointer" }}
          onClick={() => setOpenViewProductPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>View Product</span>
        </div>
      </div>
      <Container>
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <ViewProductForm productData={productData} />
            </div>
          </div>
        </div>
      </Container>
    </Col>
  );
};

export default ViewProductPage;

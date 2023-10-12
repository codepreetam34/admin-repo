import React from "react";
import { Col, Container } from "react-bootstrap";
import ViewCategoryForm from "./ViewCategoryForm";

const ViewCategoryPage = ({ categoryData, setOpenViewCategoryPage }) => {
  return (
    <Col md={12}>
      {" "}
      <div className="pt-4">
        <div
          className="text_heading"
          style={{ cursor: "pointer" }}
          onClick={() => setOpenViewCategoryPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>View Category</span>
        </div>
      </div>
      <Container className="">
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <ViewCategoryForm categoryData={categoryData} />
            </div>{" "}
          </div>
        </div>
      </Container>
    </Col>
  );
};

export default ViewCategoryPage;

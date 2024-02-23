import React from "react";
import { Col, Container } from "react-bootstrap";
import ViewRegisterVendorForm from "./ViewRegisterVendorForm";

const ViewRegisterVendorPage = ({ setOpenViewRegisterVendorPage, vendorData }) => {
  return (
    <Col md={12}>
      <div className="pt-4">
        <div
          className="text_heading"
          style={{ cursor: "pointer" }}
          onClick={() => setOpenViewRegisterVendorPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>View Vendor</span>
        </div>
      </div>
      <Container>
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <ViewRegisterVendorForm vendorData={vendorData} />
            </div>
          </div>
        </div>
      </Container>
    </Col>
  );
};

export default ViewRegisterVendorPage;

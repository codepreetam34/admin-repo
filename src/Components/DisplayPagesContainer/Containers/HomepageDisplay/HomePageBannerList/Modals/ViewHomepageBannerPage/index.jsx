import React from "react";
import { Col, Container } from "react-bootstrap";
import ViewHomepageBannerForm from "./ViewHomepageBannerForm";

const ViewHomepageBannerPage = ({ bannerData, setOpenViewHomepageBannerPage }) => {
  return (
    <Col md={12}>
      {" "}
      <div className="pt-4">
        <div
          className="text_heading"
          style={{ cursor: "pointer" }}
          onClick={() => setOpenViewHomepageBannerPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>View Homepage Banner</span>
        </div>
      </div>
      <Container className="">
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <ViewHomepageBannerForm bannerData={bannerData} />
            </div>{" "}
          </div>
        </div>
      </Container>
    </Col>
  );
};

export default ViewHomepageBannerPage;

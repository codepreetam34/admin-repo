import React from "react";
import { Col, Container } from "react-bootstrap";
import AddHomepageBannerForm from "./AddHomepageBannerForm";

const AddHomepageBannerPage = ({
  setOpenAddHomepageBannerPage,
  setIsLoading,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
}) => {
  return (
    <Col md={12}>
      {" "}
      <div className="pt-4">
        <div
          className="text_heading"
          style={{ cursor: "pointer" }}
          onClick={() => setOpenAddHomepageBannerPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>Add Homepage Banner</span>
        </div>
      </div>
      <Container className="">
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <AddHomepageBannerForm
                setIsLoading={setIsLoading}
                setAddShowErrorToast={setAddShowErrorToast}
                setAddShowErrorToastMessage={setAddShowErrorToastMessage}
                setAddShowToast={setAddShowToast}
                setAddShowToastMessage={setAddShowToastMessage}
                setOpenAddHomepageBannerPage={setOpenAddHomepageBannerPage}
              />
            </div>{" "}
          </div>
        </div>
      </Container>
    </Col>
  );
};

export default AddHomepageBannerPage;

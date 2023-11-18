import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Modal,Container } from "react-bootstrap";
import EditHomepageBannerForm from "./EditHomepageBannerForm";


const EditHomepageBannerPage = ({
  bannerById,
  setOpenEditHomepageBannerPage,
  setIsLoading,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
}) => {



  return (
    <Col md={12}>
      <div className="pt-4">
        <div
          className="text_heading"
          style={{ cursor: "pointer" }}
          onClick={() => setOpenEditHomepageBannerPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>Edit Homepage Banner</span>
        </div>
      </div>

      <Container className="">
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <EditHomepageBannerForm
                setIsLoading={setIsLoading}
                setOpenEditHomepageBannerPage={setOpenEditHomepageBannerPage}
                bannerById={bannerById}
                setAddShowErrorToast={setAddShowErrorToast}
                setAddShowErrorToastMessage={setAddShowErrorToastMessage}
                setAddShowToast={setAddShowToast}
                setAddShowToastMessage={setAddShowToastMessage}
              />
            </div>
          </div>
        </div>
      </Container>
    </Col>
  );
};

export default EditHomepageBannerPage;

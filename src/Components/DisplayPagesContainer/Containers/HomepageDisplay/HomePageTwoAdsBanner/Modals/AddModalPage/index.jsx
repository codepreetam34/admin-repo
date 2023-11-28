import React from "react";
import { Col, Container } from "react-bootstrap";
import AddModalForm from "./AddModalForm";

const AddModalPage = ({
  setOpenAddModalPage,
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
          onClick={() => setOpenAddModalPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>Add Homepage Two Ads Banner</span>
        </div>
      </div>
      <Container className="">
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <AddModalForm
                setIsLoading={setIsLoading}
                setAddShowErrorToast={setAddShowErrorToast}
                setAddShowErrorToastMessage={setAddShowErrorToastMessage}
                setAddShowToast={setAddShowToast}
                setAddShowToastMessage={setAddShowToastMessage}
                setOpenAddModalPage={setOpenAddModalPage}
              />
            </div>{" "}
          </div>
        </div>
      </Container>
    </Col>
  );
};

export default AddModalPage;

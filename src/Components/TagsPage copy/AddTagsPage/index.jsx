import React from "react";
import { Col, Container } from "react-bootstrap";
import AddTagsForm from "./AddTagsForm";

const AddTagsPage = ({
  setOpenAddTagsPage,
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
          onClick={() => setOpenAddTagsPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>Add Tags</span>
        </div>
      </div>
      <Container className="">
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <AddTagsForm
                setOpenAddTagsPage={setOpenAddTagsPage}
                setIsLoading={setIsLoading}
                setAddShowErrorToast={setAddShowErrorToast}
                setAddShowErrorToastMessage={setAddShowErrorToastMessage}
                setAddShowToast={setAddShowToast}
                setAddShowToastMessage={setAddShowToastMessage}
              />
            </div>{" "}
          </div>
        </div>
      </Container>
    </Col>
  );
};

export default AddTagsPage;

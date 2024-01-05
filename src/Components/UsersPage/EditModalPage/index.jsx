import React from "react";
import { Col, Container } from "react-bootstrap";
import EditModalForm from "./EditModalForm";

const EditModalPage = ({
  setOpenEditModalPage,
  setIsLoading,
  modalData,
  dataId,
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
          onClick={() => setOpenEditModalPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>Edit Orders</span>
        </div>
      </div>
      <Container className="">
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <EditModalForm
                dataId={dataId}
                productData={modalData}
                setOpenEditProductPage={setOpenEditModalPage}
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

export default EditModalPage;

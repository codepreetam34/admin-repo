import React from "react";
import { Col, Container } from "react-bootstrap";
import EditRegisterVendorForm from "./EditRegisterVendorForm";

const EditRegisterVendorPage = ({
  setOpenEditRegisterVendorPage,
  setIsLoading,
  productData,
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
          onClick={() => setOpenEditRegisterVendorPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>Edit Vender</span>
        </div>
      </div>

      <Container className="">
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <EditRegisterVendorForm
                setIsLoading={setIsLoading}
                setOpenEditRegisterVendorPage={setOpenEditRegisterVendorPage}
                productData={productData}
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

export default EditRegisterVendorPage;

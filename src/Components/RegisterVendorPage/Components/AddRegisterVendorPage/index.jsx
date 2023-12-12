import React from "react";
import { Col, Container } from "react-bootstrap";
import AddRegisterVendorForm from "./AddRegisterVendorForm";

const AddRegiterVendorPage = ({
  setOpenAddRegisterVendorPage,
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
          onClick={() => setOpenAddRegisterVendorPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>Add Vendor</span>
        </div>
      </div>
      <Container className="">
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <AddRegisterVendorForm
                setOpenAddRegisterVendorPage={setOpenAddRegisterVendorPage}
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

export default AddRegiterVendorPage;

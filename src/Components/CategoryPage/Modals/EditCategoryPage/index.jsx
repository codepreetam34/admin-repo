import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Modal,Container } from "react-bootstrap";

import EditCategoryForm from "./EditCategoryForm";

const EditCategoryPage = ({
  categoryById,
  setOpenEditCategoryPage,
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
          onClick={() => setOpenEditCategoryPage(false)}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>Edit Category</span>
        </div>
      </div>

      <Container className="">
        <div className="user_table">
          <div className="nftstable">
            <div
              className="tablearea"
              style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
            >
              <EditCategoryForm
                setIsLoading={setIsLoading}
                setOpenEditCategoryPage={setOpenEditCategoryPage}
                categoryById={categoryById}
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

export default EditCategoryPage;

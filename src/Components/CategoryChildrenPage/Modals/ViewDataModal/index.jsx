import React from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";

const ViewDataModal = ({ categoryData, setShowModal, pageTitle }) => {
  return (
    <Form className="user_form">
      <Row>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Category Name</strong> <div> {categoryData?.name}</div>
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Parent Name</strong> <div> {pageTitle}</div>
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Image Alt Text</strong>
            <div>{categoryData?.imageAltText}</div>
          </div>
        </Col>
        <Col md={12}>
          <div className="view-details pb-2">
            <strong>Category Image</strong>

            <div style={{ width: "100%", height: "300px" }}>
              <img
                src={categoryData?.categoryImage}
                alt="Category"
                className="img-fluid pt-2"
                style={{ maxWidth: "100%", height: "300px" }}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default ViewDataModal;

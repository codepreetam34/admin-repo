import React, { useState } from "react";
import { Row, Col, Form, Table, Modal, Button } from "react-bootstrap";
import ModalData from "JsonFile/ModalHisJson";
import ModalImg from "images/modal-img.png";

const ViewDataModal = ({ categoryData, setShowModal }) => {
  const [MoHisTabData] = useState(ModalData);
  return (
    <Form className="user_form">
      <Row>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Category Name</strong> <br /> {categoryData.name}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Image Alt Text</strong>
            <br />
            {categoryData.parentId}
          </div>
        </Col>
        <Col md={12}>
          <div className="view-details pb-2">
            <strong>Category Image</strong>
            <br />
            <img
              src={categoryData.categoryImage}
              alt="Category"
              className="img-fluid pt-2"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
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

import React, { useState } from "react";
import { Row, Col, Form, Modal, Button } from "react-bootstrap";

const DeleteDataModal = ({ show, onClose }) => {
  return (
    <Modal
      className="user_modal"
      show={show}
      onHide={onClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title id="example-modal-sizes-title-lg">
          <h3>Delete Manage NFT</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="user_form">
          <Row>
            <Col md={12}>
              <div className="delete-para">
                <p>Are you sure you want to delete this items?</p>
              </div>
            </Col>
            <Col xs={6} md={6}>
              <div className="text-end">
                <Button variant="dark" type="submit">
                  Cancel
                </Button>
              </div>
            </Col>
            <Col xs={6} md={6}>
              <div className="text-start">
                <Button variant="" type="submit">
                  Delete
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteDataModal;

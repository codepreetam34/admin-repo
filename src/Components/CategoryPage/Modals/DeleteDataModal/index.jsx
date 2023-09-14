import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const DeleteDataModal = ({ show, onClose }) => {
  return (
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
  );
};

export default DeleteDataModal;

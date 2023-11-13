import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const EditDataModal = ({ show, onClose }) => {
  return (
    <Form className="user_form">
      <Row>
        <Col md={6}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value="Chetu" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Surnames</Form.Label>
            <Form.Control type="text" value="India" />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value="abc@chetu.com" />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" value="1234567890" />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value="1234567890" />
          </Form.Group>
        </Col>
        <Col md={12}>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Select Role</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="Admin">Admin</option>
              <option value="Investor">Investor</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={12}>
          <Button variant="" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default EditDataModal;

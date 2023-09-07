import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap";

import ModalImg from "../../../../../../src/images/modal-img.png";
const DynamicModal = ({ show, onClose, type, data, onSubmit }) => {
  let modalTitle = "";
  let modalContent = null;
  const [MoHisTabData] = useState(data);
  switch (type) {
    case "Add":
      modalTitle = "Create Homepage Banner";
      modalContent = (
        <Form className="user_form">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
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
      break;
    case "Edit":
      modalTitle = "Edit Data";
      modalContent = (
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
      break;
    case "View":
      modalTitle = "View Data";
      modalContent = (
        <Form className="user_form">
          <Row>
            <Col md={12} lg={3}>
              <div className="">
                <img src={ModalImg} className="img-fluid" alt="" />
              </div>
            </Col>
            <Col md={12} lg={9}>
              <div className="view-details">
                <h4>Dark Knight</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book... <span className="text-red">Read more</span>
                </p>
                <div>
                  <ul className="p-0 m-0 d-flex">
                    <li>
                      <span>Price -</span>
                      <div className="d-flex align-items-center">
                        <img
                          src="./images/solana.png"
                          className="img-fluid"
                          alt=""
                        />
                        <p>95.533 BNB</p>
                      </div>
                    </li>
                    <li>
                      <span>Owned by -</span>
                      <div className="d-flex align-items-center">
                        <p>John</p>
                        <img
                          src="./images/tooltip-check.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </li>
                    <li>
                      <span>Created by -</span>
                      <div className="d-flex align-items-center">
                        <p>John</p>
                        <img
                          src="./images/tooltip-check.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={12} lg={5}>
              <div className="details_box">
                <h4>Details -</h4>
                <ul className="p-0 m-0">
                  <li>
                    <span>Contract Address:</span>
                    <span className="text-red">73ee30Af1F</span>
                  </li>
                  <li>
                    <span>Token ID:</span>
                    <span>7144</span>
                  </li>
                  <li>
                    <span>Token Standard:</span>
                    <span>ERC-721</span>
                  </li>
                  <li>
                    <span>Blockchain:</span>
                    <span>Solana</span>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={12} lg={7}>
              <div className="details_box">
                <h4>History -</h4>
                <div className="modaltable">
                  <Table responsive className="m-0">
                    <thead className="custom_variant">
                      <tr>
                        <th>Name</th>
                        <th>Action</th>
                        <th>Price</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MoHisTabData.map((MoHisTabData, index) => (
                        <tr key={MoHisTabData.id}>
                          <td>{MoHisTabData.name}</td>
                          <td>{MoHisTabData.action}</td>
                          <td>
                            <img
                              src={MoHisTabData.priceimg}
                              className="img-fluid"
                              alt=""
                            />{" "}
                            {MoHisTabData.price}
                          </td>
                          <td>{MoHisTabData.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      );
      break;
    case "Delete":
      modalTitle = "Delete Data";
      modalContent = (
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
      break;
    default:
      modalTitle = "";
      modalContent = null;
  }

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {type === "Delete" ? (
          <Button variant="danger" onClick={onSubmit}>
            Delete
          </Button>
        ) : (
          <Button variant="primary" onClick={onSubmit}>
            {type === "View" ? "Close" : "Save Changes"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DynamicModal;
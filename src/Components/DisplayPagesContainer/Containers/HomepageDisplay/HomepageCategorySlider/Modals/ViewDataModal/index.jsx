import React, { useState } from "react";
import { Row, Col, Form, Table } from "react-bootstrap";
import ModalData from "../../../../../../../JsonFile/ModalHisJson";
import ModalImg from "../../../../../../../../src/images/modal-img.png";

const ViewDataModal = ({ show, onClose }) => {
  const [MoHisTabData] = useState(ModalData);
  return (
    <Form className="user_form">
      <Row>
        <Col md={12} lg={3}>
          <div className="">
            <img src={ModalImg} className="img-fluid" alt="" loading="lazy" />
          </div>
        </Col>
        <Col md={12} lg={9}>
          <div className="view-details">
            <h4>Dark Knight</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book...{" "}
              <span className="text-red">Read more</span>
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
                      loading="lazy"
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
                      loading="lazy"
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
                      loading="lazy"
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
                  {MoHisTabData &&
                    MoHisTabData?.map((MoHisTabData, index) => (
                      <tr key={MoHisTabData.id}>
                        <td>{MoHisTabData.name}</td>
                        <td>{MoHisTabData.action}</td>
                        <td>
                          <img
                            src={MoHisTabData.priceimg}
                            className="img-fluid"
                            alt=""
                            loading="lazy"
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
};

export default ViewDataModal;

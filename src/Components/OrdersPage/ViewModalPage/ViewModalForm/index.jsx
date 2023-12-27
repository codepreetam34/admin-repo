import React from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";

const ViewModalForm = ({ modalData, setOpenViewModalPage }) => {
  console.log("modal data : ", modalData);
  const getFullAddress = (address) => {
    const {
      name,
      mobileNumber,
      pinCode,
      locality,
      address: streetAddress,
      cityDistrictTown,
      state,
      landmark,
      alternatePhone,
      addressType,
    } = address;

    return `${streetAddress}, ${locality}, ${cityDistrictTown}, near ${landmark}`;
  };
  return (
    <>
      <div className="container product-detail-design-new">
        <Form className="user_form">
          <Container fluid className="px-5">
            <Row className="mb-4">
              <Col className="d-flex">
                <div
                  className="text_heading"
                  style={{
                    fontWeight: "500",
                    cursor: "pointer",
                    fontSize: "40px",
                    textTransform: "capitalize",
                  }}
                  onClick={() => setOpenViewModalPage(false)}
                >
                  Order Items
                </div>
                <div className="d-flex align-items-center ml-1">
                  <div
                    className="text_heading"
                    style={{
                      fontWeight: "300",
                      fontSize: "20px",
                      lineHeight: "30px",
                      color: "#717171",
                    }}
                    onClick={() => setOpenViewModalPage(false)}
                  >
                    {modalData && `| ${modalData.items?.length} items`}
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-around gap-4">
              {modalData && modalData?.items?.length > 0 ? (
                modalData?.items.map((item, index) => (
                  <Col key={index}>
                    <Card style={{ width: "400px", borderRadius: "20px" }}>
                      <Card.Img
                        variant="top"
                        src={
                          item?.productId?.productPictures[0]?.img ||
                          "default_image_url"
                        }
                        alt="product"
                        height="283"
                        width="283"
                      />
                      <Card.Body>
                        <Card.Title
                          className="text-limit"
                          style={{
                            fontSize: "18px",
                            color: "#222222",
                            fontWeight: "500",
                            textTransform: "capitalize",
                          }}
                        >
                          {item?.productId?.name || "N/A"}
                        </Card.Title>
                        <div className="d-flex justify-content-between">
                          <div>
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#000000",
                                fontWeight: "600",
                              }}
                            >
                              ₹ {item?.payablePrice || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div
                              style={{ color: "#801317", fontWeight: "400" }}
                            >
                              Qty {item?.purchasedQty || "N/A"}
                            </div>
                          </div>
                        </div>
                        <hr style={{ margin: "4px 0px" }} />
                        <div className="d-flex justify-content-between">
                          <div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#717171",
                                fontWeight: "400",
                                textTransform: "capitalize",
                              }}
                            >
                              Receiver Name
                            </div>{" "}
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#008539",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {modalData.address?.name || "N/A"}
                            </div>{" "}
                          </div>

                          <div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#717171",
                                fontWeight: "400",
                                textTransform: "capitalize",
                              }}
                            >
                              Mobile Number
                            </div>{" "}
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#008539",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {modalData.address?.mobileNumber || "N/A"}
                            </div>{" "}
                          </div>
                        </div>

                        <hr style={{ margin: "4px 0px" }} />

                        <div className="d-flex justify-content-between">
                          <div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#717171",
                                fontWeight: "400",
                                textTransform: "capitalize",
                              }}
                            >
                              {" "}
                              Payment Status
                            </div>{" "}
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#008539",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {modalData.paymentStatus || "N/A"}
                            </div>{" "}
                          </div>

                          <div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#717171",
                                fontWeight: "400",
                                textTransform: "capitalize",
                              }}
                            >
                              Order Status
                            </div>{" "}
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#008539",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {modalData?.orderStatus.find(
                                (ele) => ele.isCompleted
                              )?.type || "N/A"}
                            </div>{" "}
                          </div>
                        </div>

                        <hr style={{ margin: "4px 0" }} />
                        <div className="d-flex justify-content-between">
                          <Col>
                            {" "}
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#717171",
                                fontWeight: "400",
                                textTransform: "capitalize",
                              }}
                            >
                              Address Type{" "}
                            </div>
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#008539",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {modalData?.address?.addressType || "N/A"}
                            </div>
                          </Col>

                          <Col>
                            {" "}
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#717171",
                                fontWeight: "400",
                                textAlign: "end",
                                textTransform: "capitalize",
                              }}
                            >
                              Delivery Pincode{" "}
                            </div>
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#008539",
                                fontWeight: "500",
                                textAlign: "end",
                                textTransform: "capitalize",
                              }}
                            >
                              {modalData?.address?.pinCode || "N/A"}
                            </div>
                          </Col>
                        </div>
                        <hr style={{ margin: "4px 0" }} />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Col md={9}>
                            {" "}
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#717171",
                                fontWeight: "400",
                                textTransform: "capitalize",
                              }}
                            >
                              Shipping Address{" "}
                            </div>
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#008539",
                                fontWeight: "500",

                                textTransform: "capitalize",
                              }}
                            >
                              {modalData.address
                                ? getFullAddress(modalData.address)
                                : "N/A"}
                            </div>
                          </Col>

                          <Col>
                            {" "}
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#717171",
                                fontWeight: "400",
                                textAlign: "end",
                                textTransform: "capitalize",
                              }}
                            >
                              Delivery State{" "}
                            </div>
                            <div
                              style={{
                                fontSize: "14px",
                                color: "#008539",
                                fontWeight: "500",
                                textAlign: "end",
                                textTransform: "capitalize",
                              }}
                            >
                              {modalData?.address?.state || "N/A"}
                            </div>
                          </Col>
                        </div>

                        <hr style={{ margin: "4px 0" }} />

                        {/* 
                        <div className="d-flex justify-content-between">
                          <Col>
                            <Button
                              variant="secondary"
                              style={{
                                borderRadius: "10px",
                                textTransform: "capitalize",
                                color: "black",
                                fontWeight: "600",
                                fontSize: "14px",
                              }}
                            >
                              Track Order
                            </Button>
                          </Col>
                         <Col className="text-end">
                            <Button
                              variant="outline-dark"
                              style={{
                                borderRadius: "10px",
                                textTransform: "capitalize",
                                color: "black",
                                fontWeight: "600",
                                fontSize: "14px",
                              }}
                            >
                              Return Order
                            </Button>
                          </Col
                        </div>> */}
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <Card style={{ width: "280px", borderRadius: "20px" }}>
                    <Card.Body style={{ height: "4rem", textAlign: "center" }}>
                      <Card.Title
                        style={{ fontSize: "18px", color: "#801317" }}
                      >
                        No orders available!
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Container>
        </Form>
      </div>
    </>
  );
};

export default ViewModalForm;

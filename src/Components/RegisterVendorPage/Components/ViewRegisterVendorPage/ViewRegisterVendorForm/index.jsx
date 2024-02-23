import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const ViewRegisterVendorForm = ({ vendorData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  console.log("vendorData ", vendorData);

  return (
    <Form className="user_form" style={{ padding: "2rem" }}>
      <Row>
        {" "}
        <div className="view-details-heading pb-2 text-center">
          <strong>Vendor Details</strong>
        </div>
        <Col md={12} className="product-detail-design p-4">

          <Row>

            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Shop Name</strong> <br /> {vendorData?.shopName}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Vendor Name</strong> <br /> {vendorData?.vendorName}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>PAN Number</strong> <br /> {vendorData?.panNumber}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Gst Number</strong> <br /> {vendorData?.gstNumber}
              </div>
            </Col>

            <Col md={12}>
              <div className="view-details">
                <hr />
                <h4><strong>Address of Home</strong></h4>
                <hr />
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Enter Address 1</strong> <br /> {vendorData?.homeAddress1}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Enter Address 2</strong> <br /> {vendorData?.homeAddress2}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Home City</strong> <br /> {vendorData?.homeCity}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Home State</strong> <br /> {vendorData?.homeState}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Home Phone Number</strong> <br /> {vendorData?.homePhone}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Home Pincode</strong> <br /> {vendorData?.homePincode}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Home Email</strong> <br /> {vendorData?.homeEmail}
              </div>
            </Col>

            <Col md={12}>
              <div className="view-details">
                <hr />
                <h4><strong>Address of Office</strong></h4>
                <hr />
              </div></Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Enter Address 1</strong> <br /> {vendorData?.officeAddress1}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Enter Address 2</strong> <br /> {vendorData?.officeAddress2}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Office City</strong> <br /> {vendorData?.officeCity}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Office State</strong> <br /> {vendorData?.officeState}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Office Phone Number</strong> <br /> {vendorData?.officePhone}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Office Pincode</strong> <br /> {vendorData?.officePincode}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Office Email</strong> <br /> {vendorData?.officeEmail}
              </div>
            </Col>



          </Row>

        </Col>
      </Row>
    </Form>
  );
};

export default ViewRegisterVendorForm;

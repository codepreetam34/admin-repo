import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const ViewProductForm = ({ categoryData }) => {
  return (
    <Form className="user_form" style={{ padding: "2rem" }}>
      <Row>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Name</strong> <br /> {categoryData?.name}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Price</strong> <br /> {categoryData?.actualPrice}
          </div>
        </Col>{" "}
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Product Category</strong> <br /> {categoryData?.category}
          </div>
        </Col>{" "}
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Delivery Day</strong>
            <br />
            {categoryData?.deliveryDay}
          </div>
        </Col>
        <Col md={12}>
          <div className="view-details pb-2">
            <strong>Description</strong>
            <br />
            {categoryData?.description}
          </div>
        </Col>
        <Col md={12}>
          <div className="view-details pb-2">
            <strong>Specifications</strong> <br />{" "}
            {categoryData?.specifications}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Discount Price</strong> <br /> {categoryData?.discountPrice}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>1/2kg Price</strong>
            <br />
            {categoryData?.halfkgprice}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>1kg Price</strong> <br /> {categoryData?.onekgprice}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>2kg Price</strong>
            <br />
            {categoryData?.twokgprice}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Total Reviews</strong> <br /> {categoryData?.numReviews}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Quantity</strong>
            <br />
            {categoryData?.quantity}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Rating</strong> <br /> {categoryData?.rating}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Reviews</strong>
            <br />
            {categoryData?.reviews}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Tags</strong>
            <br />
            {categoryData?.tags}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Pincode</strong>
            <br />
            {categoryData?.pincode}
          </div>
        </Col>
        <Col md={6}>
          <div className="view-details pb-2">
            <strong>Product Pictures</strong>
            <br />
            {categoryData?.productPictures}
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default ViewProductForm;

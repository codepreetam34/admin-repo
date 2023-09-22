import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import DisplayTable from "../DisplayTable";

const ViewProductForm = ({ categoryData }) => {
  return (
    <Form className="user_form" style={{ padding: "2rem" }}>
      <Row>
        {" "}
        <div className="view-details-heading pb-2 text-center">
          <strong>Product Details</strong>
          <div style={{ fontSize: "1.2rem" }}>
            Quantity ({categoryData?.quantity})
          </div>
        </div>
        <Col md={12} className="product-detail-design">
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
            </Col>

            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Product Category</strong> <br />{" "}
                {categoryData?.category}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Delivery Day</strong>
                <br />
                {categoryData?.deliveryDay}
              </div>{" "}
            </Col>
          </Row>
        </Col>
        <Col md={12} className="product-detail-design">
          <div className="view-details pb-2">
            <strong>Description</strong>
            <br />
            {categoryData?.description}
          </div>
        </Col>
        <Col md={12} className="product-detail-design">
          <div className="view-details pb-2">
            <strong>Specifications</strong> <br />{" "}
            {categoryData?.specifications}
          </div>
        </Col>
        <Col md={12} className="product-detail-design">
          <div className="view-details pb-2">
            <strong>Tags ({categoryData?.tags?.length})</strong>

            <div className="d-flex flex-wrap gap-3 pt-2">
              {categoryData?.tags.length > 0 &&
                categoryData?.tags.map((tag, index) => (
                  <div
                    style={{
                      color: "rgba(0, 0, 0, 0.87)",
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      borderRadius: "16px",
                      transition:
                        "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      border: "1px solid #bdbdbd",
                      padding: "10px",
                    }}
                    key={index}
                  >
                    {tag}
                  </div>
                ))}
            </div>
          </div>
        </Col>
        <Col md={12} className="product-detail-design">
          <div className="view-details pb-2">
            <strong>Pincode ({categoryData?.pincode?.length})</strong>

            <div className="d-flex flex-wrap gap-3 pt-2">
              {categoryData?.pincode.length > 0 &&
                categoryData?.pincode.map((pin, index) => (
                  <div
                    style={{
                      color: "rgba(0, 0, 0, 0.87)",
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      borderRadius: "16px",
                      transition:
                        "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      border: "1px solid #bdbdbd",
                      padding: "10px",
                    }}
                    key={index}
                  >
                    {pin}
                  </div>
                ))}
            </div>
          </div>
        </Col>
        <Col md={12} className="product-detail-design">
          <h3>Price Variants</h3>
          <Row>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Discount Price</strong> <br />{" "}
                {categoryData?.discountPrice}
              </div>
              <div className="view-details pb-2">
                <strong>1/2kg Price</strong>
                <br />
                {categoryData?.halfkgprice}
              </div>{" "}
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>1kg Price</strong> <br />
                {categoryData?.onekgprice}
              </div>

              <div className="view-details pb-2">
                <strong>2kg Price</strong>
                <br />
                {categoryData?.twokgprice}
              </div>
            </Col>
          </Row>
        </Col>
        <DisplayTable reviews={categoryData?.reviews} />
        <Col md={12} className="product-detail-design">
          <h3>Product Pictures ({categoryData?.productPictures?.length})</h3>

          <Row style={{ paddingTop: "10px" }}>
            <Col md={12} className="image-detail-view">
              {categoryData?.productPictures?.length > 0 &&
                categoryData?.productPictures?.map((picture, index) => (
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                  >
                    <img
                      key={index}
                      src={picture?.img}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default ViewProductForm;

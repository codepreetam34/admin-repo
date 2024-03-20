import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DisplayTable from "../DisplayTable";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "Redux/Slices/Category/CategorySlice";

const ViewProductForm = ({ productData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [defaultCategoryName, setDefaultCategoryName] = useState();
  const dispatch = useDispatch();

  const categoryList = useSelector(
    (state) => state?.CategoryList?.categoryList?.categoryList
  );

  useEffect(() => {
    if (!categoryList || categoryList?.length === 0) {
      dispatch(getCategory())
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, categoryList]);

  useEffect(() => {
    if ((categoryList && categoryList) || categoryList?.length > 0) {
      const categoryIdToFind = productData?.category;

      const foundCategory = categoryList.find(
        (item) => item._id === categoryIdToFind
      );

      if (foundCategory) {
        setDefaultCategoryName(foundCategory?.name);
      } else {
        const foundInChildren = categoryList
          .map((category) =>
            category?.children.find((child) => child?._id === categoryIdToFind)
          )
          .filter((child) => child !== undefined);
        if (foundInChildren) {
          setDefaultCategoryName(foundInChildren[0]?.name);
        } else {
          console.log("Category not found ", defaultCategoryName);
        }
      }
    } else {
    }
  }, [dispatch, categoryList]);


  return (
    <Form className="user_form" style={{ padding: "2rem" }}>
      <Row>
        {" "}
        <div className="view-details-heading pb-2 text-center">
          <strong>Product Details</strong>
          <div className="d-flex justify-content-center gap-3">
            <div style={{ fontSize: "1.2rem" }}>
              Quantity - ({productData?.quantity})
            </div>
            <div style={{ fontSize: "1.2rem" }}>
              Offer - ({productData?.offer})
            </div>
          </div>
        </div>
        <Col md={12} className="product-detail-design">
          <Row>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Name</strong> <br /> {productData?.name}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Price</strong> <br /> {productData?.actualPrice}
              </div>
            </Col>

            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Product Category</strong> <br />
                {productData?.categoryName}
              </div>
            </Col>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Delivery Day</strong>
                <br />
                {productData?.deliveryDay}
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={12} className="product-detail-design">
          <div className="view-details pb-2">
            <strong>Description</strong>
            <br />
            {productData?.description}
          </div>
        </Col>
        <Col md={12} className="product-detail-design">
          <div className="view-details pb-2">
            <strong>Specifications</strong> <br /> {productData?.specifications}
          </div>
        </Col>
        {/* <Col md={12} className="product-detail-design">
          <div className="view-details pb-2">
            <strong>
              Tags ({productData?.tags && productData?.tags?.length})
            </strong>

            <div className="d-flex flex-wrap gap-3 pt-2">
              {productData?.tags &&
                productData?.tags.length > 0 &&
                productData?.tags.map((tag, index) => (
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
        </Col> */}
        <Col md={12} className="product-detail-design" >
          <div className="view-details pb-2">
            <strong>Product Tags</strong>
            <br />
            <Row>
              {productData?.tags?.map((tag) => {
                return (
                  <Col
                    md={3}
                    style={{ paddingBottom: "0.7rem", paddingTop: "0.2rem" }}
                  >
                    <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                      {tag?.tagType}
                    </div>
                    <div>
                      {tag?.names?.map((name) => {
                        return (
                          <div
                          //onClick={() => handleTag(name)}
                          >{name}</div>
                        );
                      })}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>



        <Col md={12} className="product-detail-design">
          <Row>
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>
                  Pincode ({productData?.pincode && productData?.pincode?.length})
                </strong>

                <div className="d-flex flex-wrap gap-3 pt-2">
                  {productData?.pincode &&
                    productData?.pincode.length > 0 &&
                    productData?.pincode?.map((pin, index) => (
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
            <Col md={6}>
              <div className="view-details pb-2">
                <strong>Vendor Name</strong>
                <br />
                {productData?.vendorName}
              </div>
            </Col>
          </Row>
        </Col>

        {defaultCategoryName &&
          (defaultCategoryName.toLowerCase() === "cake" ||
            defaultCategoryName.toLowerCase() === "cakes") ? (
          <Col md={12} className="product-detail-design">
            <h3>Price Variants</h3>
            <Row className="pt-2">
              <Col md={6}>
                <div className="view-details pb-2">
                  <strong>Discount Price</strong> <br />
                  {productData?.discountPrice}
                </div>
                <div className="view-details pb-2">
                  <strong>1/2kg Price</strong>
                  <br />
                  {productData?.halfkgprice}
                </div>
              </Col>
              <Col md={6}>
                <div className="view-details pb-2">
                  <strong>1kg Price</strong> <br />
                  {productData?.onekgprice}
                </div>

                <div className="view-details pb-2">
                  <strong>2kg Price</strong>
                  <br />
                  {productData?.twokgprice}
                </div>
              </Col>
            </Row>
          </Col>
        ) : (
          <></>
        )}
        <DisplayTable reviews={productData?.reviews} />
        <Col md={12} className="product-detail-design pt-2">
          <h3>
            Product Pictures (
            {productData?.productPictures &&
              productData?.productPictures?.length}
            )
          </h3>

          <Row style={{ paddingTop: "10px" }}>
            <Col md={12} className="image-detail-view">
              {productData?.productPictures &&
                productData?.productPictures?.length > 0 &&
                productData?.productPictures?.map((picture, index) => (
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                  >
                    <img
                      key={index}
                      alt="pic"
                      src={picture?.img}
                      style={{
                        width: "100%",
                        height: "100%",
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

import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProductSchema } from "ValidationSchema/addProductSchema";
import { addAVendor, getAVendor } from "Redux/Slices/RegisterAVendor/RegisterAVendorSlice";
import { vendorSchema } from "ValidationSchema/vendorSchema";

const AddRegisterVendorForm = ({
  setOpenAddRegisterVendorPage,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
  setIsLoading,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(vendorSchema),
    mode: "onChange",
  });


  const onSubmit = (data) => {
    dispatch(addAVendor(data)).then((res) => {
      setIsLoading(true);
      if (
        res?.paylaod?.error?.response?.status === 400 ||
        res?.paylaod?.error?.response?.status === 500
      ) {
        setIsLoading(false);
        setAddShowErrorToast(true);
        setAddShowErrorToastMessage(res.paylaod.error.message);
      } else {
        setIsLoading(false);
        setAddShowToast(true);
        setAddShowToastMessage(res.payload.message);
          setOpenAddRegisterVendorPage(false);
            dispatch(getAVendor());
      }
    });
  };

  return (
    <div className="container">
      <Form
        className="user_form"
        onSubmit={handleSubmit(onSubmit)}
        style={{ padding: "2rem" }}
      >
        <Row>
          <Col md={12} className="product-detail-design">

            <Row>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Shop Name of the Vendor</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("shopName")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Name of the Vendor</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("vendorName")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>PAN No. of the Vendor</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("panNumber")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>GST No.</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("gstNumber")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Form.Label style={{ fontSize: "1.25rem", fontWeight: "500" }}>Address of Registerd Office</Form.Label>
              <Col md={12}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Enter Address 1</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("officeAddress1")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Enter Address 2</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("officeAddress2")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>City</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("officeCity")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>State</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("officeState")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Pincode</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("officePincode")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Phone No.</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("officePhone")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Email Address</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("officeEmail")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Form.Label style={{ fontSize: "1.25rem", fontWeight: "500" }}>Address of Home</Form.Label>
              <Col md={12}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Enter Address 1</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("homeAddress1")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Enter Address 2</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("homeAddress1")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>City</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("homeCity")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>State</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("homeState")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Pincode</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("homePincode")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Phone No.</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("homePhone")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Email Address</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("localOfficeEmail")}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>


            </Row>

          </Col>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="primary"
              style={{
                textTransform: "capitalize",
                marginTop: "2rem",
                "&:hover": {
                  border: "none",
                  textDecoration: "none",
                },
              }}
            >
              Submit
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default AddRegisterVendorForm;


import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addProducts, getProducts } from "Redux/Slices/Products/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addProductSchema } from "ValidationSchema/addProductSchema";

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
    resolver: yupResolver(addProductSchema),
    mode: "onChange",
  });


  const onSubmit = (data) => {
    const formData = new FormData();

    dispatch(addProducts(formData)).then((res) => {
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
        dispatch(getProducts());
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
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    {...register("name")}
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


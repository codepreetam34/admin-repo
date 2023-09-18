import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema } from "ValidationSchema/addProductSchema";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addProductSchema),
    mode: "onChange",
  });

  const onSubmit = (formData) => {
    console.log("Form data is valid:", formData);
  };

  return (
    <Form
      className="user_form"
      onSubmit={handleSubmit(onSubmit)}
      style={{ padding: "2rem" }}
    >
      <Row>
        <Col md={12}>
          <Form.Group controlId="title" className="form-group-padding-bottom">
            <Form.Label>Title</Form.Label>

            <Form.Control
              type="text"
              name="title"
              {...register("title")}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Form.Group
          controlId="description"
          className="form-group-padding-bottom"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            {...register("description")}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddProductForm;

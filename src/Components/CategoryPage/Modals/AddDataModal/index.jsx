import React, { useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  addMainCategory,
  getCategory,
} from "Redux/Slices/Category/CategorySlice";
import { categorySchema } from "ValidationSchema/categorySchema";

const AddDataModal = ({
  setShowModal,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
}) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryImage, setCategoryImage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(categorySchema),
    mode: "onChange",
  });

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data?.name?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("categoryImage", categoryImage);
    console.log("categoryImage 1", categoryImage);
    // if (data?.parentId) {
    //   formData.append("parentId", data?.parentId?.toString());
    // }
    console.log("category ", data?.categoryImage);
    console.log("category 1", categoryImage);
    console.log("formData", formData.values());
    dispatch(addMainCategory(formData))
      .then((res) => {
        console.log("res", res);
        if (res?.payload?.error?.response?.status === 400) {
          setAddShowErrorToast(true);
          setAddShowErrorToastMessage(
            res?.payload?.error?.response?.data?.message
          );
        } else {
      //    dispatch(getCategory());
     //     setAddShowToastMessage(res?.payload?.message);
      //    setAddShowToast(true);
          //   setShowModal(false);
          // setValue("name", "");
          // setValue("categoryImage", "");
          // setValue("imageAltText", "");
          // setValue("parentId", "");
          // setImagePreview("");
        }
      })
      .catch((err) => {
        setAddShowErrorToast(true);
        setAddShowErrorToastMessage(err?.error?.response?.data?.message);
      });
  };

  return (
    <>
      <Form className="user_form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-4" controlId="name">
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" name="name" {...register("name")} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="categoryImage">
              <Form.Label>Category Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="categoryImage"
                id="categoryImage"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Col>{" "}
          <Col md={6}>
            <Form.Group className="mb-4" controlId="imageAltText">
              <Form.Label>Image Alt Text</Form.Label>
              <Form.Control
                type="text"
                name="imageAltText"
                {...register("imageAltText")}
              />
            </Form.Group>
          </Col>{" "}
          <Col md={12} className="mb-4">
            {imagePreview && (
              <div className="">
                <div className="mb-2">{`Image Preview`} </div>
                <img
                  src={imagePreview}
                  style={{
                    width: "100%",
                    height: "200px",
                  }}
                />
              </div>
            )}
          </Col>
        </Row>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default AddDataModal;

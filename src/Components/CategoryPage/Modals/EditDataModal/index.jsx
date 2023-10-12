import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { editMainCategory, getCategory } from "Redux/Slices/Category/CategorySlice";
import { categorySchema } from "ValidationSchema/categorySchema";

const EditCategoryPage= ({
  setShowModal,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
  categoryById,
}) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [viewCategoryImage, setViewCategoryImage] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      name: categoryById?.name,
      imageAltText: categoryById?.imageAltText,
      parentId: categoryById?.parentId,
    });
    setViewCategoryImage(categoryById?.categoryImage);
  }, [categoryById, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
    setImagePreview(URL.createObjectURL(file));
    setViewCategoryImage("");
  };
  const onSubmit = (data) => {
    const formData = new FormData();
    if (data?.name) {
      formData.append("name", data?.name?.toString());
    }
    if (data?.imageAltText) {
      formData.append("imageAltText", data?.imageAltText?.toString());
    }
    if (categoryImage) {
      formData.append("categoryImage", categoryImage);
    }


    formData.append("_id", categoryById._id);

    dispatch(editMainCategory(formData))
      .then((res) => {
        if (res?.payload?.error?.response?.status === 400) {
          setAddShowErrorToast(true);
          setAddShowErrorToastMessage(
            res?.payload?.error?.response?.data?.message
          );
        } else {
          dispatch(getCategory());
          setAddShowToastMessage(res?.payload?.message);
          setAddShowToast(true);
          setShowModal(false);
          setValue("name", "");
          setValue("categoryImage", "");
          setValue("imageAltText", "");
          setImagePreview("");
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
            {imagePreview && imagePreview ? (
              <div className="">
                <div className="mb-2">{`Image Preview`} </div>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="categoryImage"
                    style={{ maxWidth: "100%", height: "300px" }}
                  />
                </div>
              </div>
            ) : viewCategoryImage && viewCategoryImage ? (
              <div className="">
                <div className="mb-2">{`Image Preview`} </div>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <img
                    src={viewCategoryImage}
                    alt="categoryImage"
                    style={{ maxWidth: "100%", height: "300px" }}
                  />{" "}
                </div>
              </div>
            ) : (
              <></>
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

export default EditCategoryPage;

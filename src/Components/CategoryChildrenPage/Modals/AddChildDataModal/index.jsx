import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addMainCategory,
  getCategory,
} from "Redux/Slices/Category/CategorySlice";
import { categorySchema } from "ValidationSchema/categorySchema";

const AddChildDataModal = ({
  setShowModal,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
  categoryId,
}) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryImage, setCategoryImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const categoryList = useSelector(
    (state) => state?.CategoryList?.categoryList?.categoryList
  );

  useEffect(() => {
    if (!categoryList || categoryList.length === 0) {
      dispatch(getCategory())
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, categoryList]);
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

    if (data?.parentId) {
      formData.append("parentId", data?.parentId?.toString());
    }

    dispatch(addMainCategory(formData))
      .then((res) => {
        console.log("res", res);
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
          setValue("parentId", "");
          setImagePreview("");
        }
      })
      .catch((err) => {
        setAddShowErrorToast(true);
        setAddShowErrorToastMessage(err?.error?.response?.data?.message);
      });
  };
  useEffect(() => {
    reset({
      parentId: categoryId,
    });
  }, [categoryId, reset]);

  return (
    <>
      <Form className="user_form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4" controlId="name">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                {...register("name")}
                isInvalid={!!errors?.name}
              />

              <Form.Control.Feedback type="invalid">
                {errors?.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>{" "}
          <Col md={6}>
            <Form.Group controlId="parentId">
              <Form.Label>Select a Parent Category</Form.Label>
              <Form.Control
                as="select"
                {...register("parentId")}
                isInvalid={!!errors?.parentId}
              >
                <option value="">Select</option>
                {categoryList &&
                  categoryList?.map((option) => (
                    <option key={option?._id} value={option?._id}>
                      {option?.name}
                    </option>
                  ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors?.parentId?.message}
              </Form.Control.Feedback>
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
                //         isInvalid={!categoryImage}
              />
              {/* {!categoryImage && (
                <Form.Control.Feedback type="invalid">
                  {"required image"}
                </Form.Control.Feedback>
              )} */}
            </Form.Group>
          </Col>{" "}
          <Col md={6}>
            <Form.Group className="mb-4" controlId="imageAltText">
              <Form.Label>Image Alt Text</Form.Label>
              <Form.Control
                type="text"
                name="imageAltText"
                {...register("imageAltText")}
                isInvalid={!!errors?.imageAltText}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.imageAltText?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>{" "}
          <Col md={12} className="mb-4">
            {imagePreview && (
              <div className="">
                <div className="mb-2">{`Image Preview`} </div>
                <div style={{ width: "100%", height: "300px" }}>
                  <img
                    src={imagePreview}
                    alt="categoryImage"
                    style={{ maxWidth: "100%", height: "300px" }}
                  />{" "}
                </div>
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
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default AddChildDataModal;

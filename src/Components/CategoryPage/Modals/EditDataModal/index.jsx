import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  editMainCategory,
  getCategory,
  getCategoryById,
} from "Redux/Slices/Category/CategorySlice";
import { categorySchema } from "ValidationSchema/categorySchema";

const EditDataModal = ({
  setShowModal,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
  categoryById,
}) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
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

  // const categoryById = useSelector(
  //   (state) => state?.CategoryList?.categoryByIdData?.categoryById
  // );
  console.log("V categoryId", categoryById);

  // useEffect(() => {
  //   if (!categoryById || categoryById.length === 0) {
  //     dispatch(getCategoryById(categoryId))
  //       .then(() => {
  //         setIsLoading(false);
  //       })
  //       .catch(() => setIsLoading(false));
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [dispatch,categoryId]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   dispatch(getCategoryById(categoryId))
  //     .then(() => {
  //       setIsLoading(false);
  //     })
  //     .catch(() => setIsLoading(false));
  // }, [dispatch, categoryId, categoryById]);

  useEffect(() => {
    reset({
      name: categoryById?.name,
      imageAltText: categoryById?.imageAltText,
      parentId: categoryById?.parentId,
    });
    setCategoryImage(categoryById?.categoryImage);
  }, [categoryById, reset]);

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
    setImagePreview(URL.createObjectURL(file));
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
    console.log("categoryImage 1", categoryImage);
    // if (data?.parentId) {
    //   formData.append("parentId", data?.parentId?.toString());
    // }
    formData.append("_id", categoryById._id);
    console.log("formData", formData.values());
    dispatch(editMainCategory(formData))
      .then((res) => {
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
            {imagePreview && imagePreview ? (
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
            ) : categoryImage && categoryImage ? (
              <div className="">
                <div className="mb-2">{`Image Preview`} </div>
                <img
                  src={categoryImage}
                  style={{
                    width: "100%",
                    height: "200px",
                  }}
                />
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

export default EditDataModal;

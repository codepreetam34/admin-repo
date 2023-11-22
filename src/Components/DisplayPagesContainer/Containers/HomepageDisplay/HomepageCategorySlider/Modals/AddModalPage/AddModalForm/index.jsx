import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { homepageBannerSchema } from "ValidationSchema/homepageBanner";
import { addHomepageTwoAdsBanner, getHomePageTwoAdsBanner } from "Redux/Slices/TwoAdsBanner/TwoAdsBannerSlice";

const AddModalForm = ({
  setIsLoading,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
  setOpenAddModalPage,
}) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [bannerImage, setBannerImage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(homepageBannerSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("banner", bannerImage);

    dispatch(addHomepageTwoAdsBanner(formData))
      .then((res) => {
        if (res?.payload?.error?.response?.status === 400) {
          setAddShowErrorToast(true);
          setAddShowErrorToastMessage(
            res?.payload?.error?.response?.data?.message
          );
        } else if (res?.payload?.error?.response?.status === 500) {
          setAddShowErrorToast(true);
          setAddShowErrorToastMessage(
            res?.payload?.error?.response?.data?.message
          );
        } else {
          setAddShowToast(true);
          setAddShowToastMessage(res?.payload?.message);
          setOpenAddModalPage(false);
          dispatch(getHomePageTwoAdsBanner());
        }
      })
      .catch((err) => {
        setAddShowErrorToast(true);
        setAddShowErrorToastMessage(err?.error?.response?.data?.message);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="container">
        <Form
          className="user_form"
          onSubmit={handleSubmit(onSubmit)}
          style={{ padding: "2rem" }}
        >
          <Row>
            <Col md={12}>
              <Form.Group className="mb-4" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" {...register("title")} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4" controlId="bannerImage">
                <Form.Label>Banner Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="bannerImage"
                  id="bannerImage"
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
                  <div style={{ width: "100%", height: "300px" }}>
                    <img
                      src={imagePreview}
                      alt="bannerImage"
                      style={{ maxWidth: "100%", height: "300px" }}
                    />{" "}
                  </div>
                </div>
              )}
            </Col>
          </Row>

          <div className="pt-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddModalForm;

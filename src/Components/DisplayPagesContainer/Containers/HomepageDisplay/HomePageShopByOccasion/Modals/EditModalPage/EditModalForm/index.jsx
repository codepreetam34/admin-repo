import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { homepageBannerSchema } from "ValidationSchema/homepageBanner";
import { editHomepageShopByOccasion, getHomePageShopByOccasion } from "Redux/Slices/ShopByOccasion/ShopByOccasionSlice";

const EditModalForm = ({
  setAddShowErrorToast,
  bannerById,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setOpenEditModalPage,
  setAddShowToastMessage,
}) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [viewBannerImage, setViewBannerImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(homepageBannerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      title: bannerById?.title,
      imageAltText: bannerById?.imageAltText,
    });
    setViewBannerImage(bannerById?.banner);
  }, [bannerById, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("banner", bannerImage);
    formData.append("_id", bannerById?._id);

    dispatch(editHomepageShopByOccasion(formData))
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
          setOpenEditModalPage(false);
          dispatch(getHomePageShopByOccasion());
          setAddShowToastMessage(res?.payload?.message);
          setAddShowToast(true);
          setValue("name", "");
          setValue("bannerImage", "");
          setValue("imageAltText", "");
          setImagePreview("");
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
    setViewBannerImage("");
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
                      alt="bannerImage"
                      style={{ maxWidth: "100%", height: "300px" }}
                    />
                  </div>
                </div>
              ) : viewBannerImage && viewBannerImage ? (
                <div className="">
                  <div className="mb-2">{`Image Preview`} </div>
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                    }}
                  >
                    <img
                      src={viewBannerImage}
                      alt="bannerImage"
                      style={{ maxWidth: "100%", height: "300px" }}
                    />{" "}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </Col>

          </Row>
          <div className="pt-3">
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditModalForm;

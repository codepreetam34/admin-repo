import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProductSchema } from "ValidationSchema/editProductSchema";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  updateProducts,
  getProducts,
} from "Redux/Slices/Products/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategory } from "Redux/Slices/Category/CategorySlice";

const EditProductForm = ({

  setOpenEditProductPage,
  setIsLoading,
  productData,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,

}) => {
  
  const [imageAltText, setImageAltText] = useState([""]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pinCode, setPinCode] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [viewProductImages, setViewProductImages] = useState([""]);
  const [defaultCategory, setDefaultCategory] = useState();

  const [colors, setColors] = useState([
    {
      name: "",
      productPictures: [
        {
          img: "",
          colorImageAltText: "",
          picturePreview: "",
        },
      ],
    },
  ]);
  const [bannerPicture, setBannerPicture] = useState([
    {
      img: "",
      imageAltText: "",
      picturePreview: "",
    },
  ]);

  const handleImageAltText = (event, i) => {
    setBannerPicture((bannerPicture) => {
      const newBannerPicture = [...bannerPicture];
      newBannerPicture[i].imageAltText = event.target.value;
      return newBannerPicture;
    });
  };
  const handleBannerPictures = (e, i) => {
    setViewProductImages("");
    setBannerPicture((bannerPicture) => {
      const newBannerPicture = [...bannerPicture];
      newBannerPicture[i].img = e.target.files[0];
      newBannerPicture[i].picturePreview = URL.createObjectURL(
        e.target.files[0]
      );
      return newBannerPicture;
    });
  };
  const handleColorNameChange = (event, index) => {
    const newColors = [...colors];
    newColors[index].name = event.target.value;
    setColors(newColors);
  };

  const handleImgChange = (event, colorIndex, pictureIndex) => {
    //    setBanner([...banner, event.target.files[0]]);
    setColors((colors) => {
      const newColors = [...colors];
      newColors[colorIndex].productPictures[pictureIndex].img =
        event.target.files[0];
      newColors[colorIndex].productPictures[pictureIndex].picturePreview =
        URL.createObjectURL(event.target.files[0]);
      return newColors;
    });
  };

  const handleColorImageAltTextChange = (event, colorIndex, pictureIndex) => {
    setColors((colors) => {
      const newColors = [...colors];
      newColors[colorIndex].productPictures[pictureIndex].colorImageAltText =
        event.target.value;
      return newColors;
    });
  };

  const addColor = () => {
    console.log("on colors", colors);
    setColors([
      ...colors,
      {
        name: "",
        productPictures: [
          {
            img: "",
            colorImageAltText: "",
            picturePreview: "",
          },
        ],
      },
    ]);
  };

  const addColorProductPicture = (colorIndex) => {
    setColors((colors) => {
      const newState = [...colors];
      console.log("on newState", newState);
      newState[colorIndex].productPictures.push([
        {
          img: "",
          colorImageAltText: "",
          picturePreview: "",
        },
      ]);
      return newState;
    });
  };

  const onRemovePicture = (colorIndex, pictureIndex) => {
    console.log("on pictureIndex", pictureIndex, "colorIndex ", colorIndex);
    const list = [...colors];
    list[colorIndex].productPictures.splice(pictureIndex, 1);
    setColors(list);
    console.log("on remove", colors);
  };

  const addProductPicture = () => {
    setViewProductImages("");
    setBannerPicture([
      ...bannerPicture,
      {
        img: "",
        imageAltText: "",
        picturePreview: "",
      },
    ]);
  };

  const onRemoveBannerPicture = (index) => {
    const inputList = [...bannerPicture];
    inputList.splice(index, 1);
    setBannerPicture(inputList);
    const list2 = [...imageAltText];
    list2.splice(index, 1);
    setImageAltText(list2);

    console.log("on bannerPicture", bannerPicture);
  };

  const onRemoveColor = (colorIndex) => {
    console.log("on colors", colors);
    const list = [...colors];
    list.splice(colorIndex, 1);
    setColors(list);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(editProductSchema),
    mode: "onChange",
  });

  // Import necessary libraries and components at the top

  const ColorVariantSection = ({
    colors,
    handleColorNameChange,
    handleImgChange,
    onRemovePicture,
    addColorProductPicture,
    onRemoveColor,
    addColor,
  }) => {
    return (
      <Col
        md={12}
        style={{
          border: "0.0625rem solid #1a1a1a1f",
          borderRadius: "0.5rem",
          marginTop: "2rem",
          padding: "0.625rem 0.875rem",
        }}
      >
        <h5>Add Up to 4 Color Variants</h5>

        {colors?.map((color, colorIndex) => (
          <div key={colorIndex}>
            <div
              style={{
                border: "0.0625rem solid #1a1a1a1f",
                borderRadius: "0.5rem",
                margin: "10px 0",
                padding: "0.625rem 0.875rem",
              }}
            >
              <div>
                <Form.Group controlId={`colorName-${colorIndex}`}>
                  <Form.Label>Color Name {colorIndex + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    name={`colors[${colorIndex}].name`}
                    style={{ marginBottom: "10px" }}
                    value={color?.name}
                    onChange={(event) =>
                      handleColorNameChange(event, colorIndex)
                    }
                  />
                </Form.Group>
              </div>

              {color.productPictures.map((picture, pictureIndex) => (
                <div key={pictureIndex}>
                  {picture?.picturePreview && (
                    <div className="m-3">
                      <div>{`Image ${pictureIndex + 1}`}</div>
                      <img
                        src={picture?.picturePreview}
                        style={{
                          width: "200px",
                          height: "200px",
                        }}
                        alt={`Color ${colorIndex + 1} - Image ${pictureIndex + 1
                          }`}
                      />
                      <div>{`${picture?.imageAltText}`}</div>
                    </div>
                  )}

                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>{`Color Picture ${pictureIndex + 1
                          }`}</Form.Label>

                        <Form.Control
                          type="file"
                          accept="image/*"
                          style={{ marginBottom: "10px" }}
                          id={`colorPicture-${colorIndex}-${pictureIndex}`}
                          name={`colorPicture-${colorIndex}-${pictureIndex}`}
                          onChange={(event) =>
                            handleImgChange(event, colorIndex, pictureIndex)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        controlId={`colorImageAltText-${colorIndex}-${pictureIndex}`}
                      >
                        <Form.Label>Image Alt Text</Form.Label>
                        <Form.Control
                          type="text"
                          name={`colors[${colorIndex}].productPictures[${pictureIndex}].colorImageAltText`}
                          style={{ marginBottom: "10px" }}
                          value={picture.colorImageAltText}
                          onChange={(event) =>
                            handleColorImageAltTextChange(
                              event,
                              colorIndex,
                              pictureIndex
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingTop: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => onRemovePicture(colorIndex, pictureIndex)}
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </Button>
                  </div>
                </div>
              ))}

              <div>
                <Button
                  variant="secondary"
                  onClick={() => addColorProductPicture(colorIndex)}
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  Add Color Picture
                </Button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "5px 0px 20px 0px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => onRemoveColor(colorIndex)}
                style={{
                  textTransform: "capitalize",
                }}
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </Button>
            </div>
          </div>
        ))}

        <div>
          <Button
            variant="secondary"
            style={{
              textTransform: "capitalize",
              marginTop: "2rem",
            }}
            onClick={addColor}
          >
            Add Color
          </Button>
        </div>
      </Col>
    );
  };
  const handleInputChange = async (e, index) => {
    const value = e;
    const list = [...pinCode];
    list[index] = value;
    setPinCode(list);
  };
  const handleAddClick = () => {
    setPinCode([...pinCode, [""]]);
  };
  const handleTagInputChange = async (e, index) => {
    const value = e;
    const list = [...tags];
    list[index] = value;
    setTags(list);
  };
  const handleAddTagClick = () => {
    setTags([...tags, [""]]);
  };

  const onRemovePincode = (indexToRemove) => {
    const updatedPinCode = [...pinCode];
    updatedPinCode.splice(indexToRemove, 1);
    setPinCode(updatedPinCode);
  };

  const onRemoveTags = (indexToRemove) => {
    const updatedTags = [...tags];
    updatedTags.splice(indexToRemove, 1);
    setTags(updatedTags);
  };

  useEffect(() => {
    reset({
      name: productData?.name,
      imageAltText: productData?.imageAltText,
      actualPrice: productData?.actualPrice,
      deliveryDay: productData?.deliveryDay,
      description: productData?.description,
      specifications: productData?.specifications,
      discountPrice: productData?.discountPrice,
      quantity: productData?.quantity,
      offer: productData?.offer,
      halfkgprice: productData?.halfkgprice,
      onekgprice: productData?.onekgprice,
      twokgprice: productData?.twokgprice,
    });
    setPinCode(productData?.pincode);
    setTags(productData?.tags);
    setViewProductImages(productData?.productPictures);
    setDefaultCategory(productData?.category);
  }, [productData, reset]);

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

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data?.name) formData.append("name", data?.name?.toString());
    if (productData._id) formData.append("_id", productData?._id);
    if (data?.description)
      formData.append("description", data?.description?.toString());
    if (defaultCategory) formData.append("category", defaultCategory);
    if (data?.deliveryDay) formData.append("deliveryDay", data?.deliveryDay);
    if (data?.discountPrice)
      formData.append("discountPrice", data?.discountPrice);
    if (data?.quantity) formData.append("quantity", data?.quantity);
    if (data?.offer) formData.append("offer", data?.offer);
    if (data?.halfkgprice) formData.append("halfkgprice", data?.halfkgprice);
    if (data?.onekgprice) formData.append("onekgprice", data?.onekgprice);
    if (data?.twokgprice) formData.append("twokgprice", data?.twokgprice);
    if (data?.actualPrice) formData.append("actualPrice", data?.actualPrice);
    if (data?.specifications)
      formData.append("specifications", data?.specifications?.toString());
    Array.from(pinCode).forEach((item) => {
      formData.append("pincode", item);
    });
    const tagsArray = tags.map((additionalTag) => {
      return {
        tagType: additionalTag.tagType,
        names: additionalTag.names,
      };
    });
    //  / formData.append("tags", JSON.stringify(tagsArray));
    if (bannerPicture && bannerPicture?.length > 1) {
      bannerPicture?.map((file, index) => {
        return {
          img: formData.append("productPicture", file?.img),
          imageAltText: formData.append("imageAltText", file?.imageAltText),
        };
      });
    } else if (bannerPicture && bannerPicture?.length === 1) {
      bannerPicture[0]?.img &&
        formData.append("productPicture", bannerPicture[0]?.img);
      bannerPicture[0]?.imageAltText &&
        formData.append("imageAltText", bannerPicture[0]?.imageAltText);
    }
    dispatch(updateProducts(formData)).then((res) => {
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
        setOpenEditProductPage(false);
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
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Actual Price</Form.Label>

                  <Form.Control
                    id="actualPrice"
                    type="text"
                    name="actualPrice"
                    {...register("actualPrice")}
                    isInvalid={!!errors.actualPrice}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.actualPrice?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Select Category</Form.Label>
                  <div className="select-wrapper">
                    <Form.Control
                      as="select"
                      name="categoryId"
                      id="categoryId"
                      isInvalid={!!errors?.categoryId}
                      value={defaultCategory}
                      onChange={(e) => setDefaultCategory(e.target.value)}
                    >
                      <option disabled selected style={{ fontWeight: "600" }}>
                        Select Category
                      </option>
                      {categoryList &&
                        categoryList?.map((option) => (
                          <option key={option._id} value={option?._id}>
                            {option?.name}
                          </option>
                        ))}
                    </Form.Control>
                    <div className="select-arrow"></div>
                  </div>

                  <Form.Control.Feedback type="invalid">
                    {errors?.categoryId?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Delivery Day</Form.Label>
                  <Form.Control
                    type="text"
                    name="deliveryDay"
                    id="deliveryDay"
                    {...register("deliveryDay")}
                    isInvalid={!!errors.deliveryDay}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.deliveryDay?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col md={12} className="product-detail-design">
            <Form.Group className="form-group-padding-bottom">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                id="description"
                {...register("description")}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={12} className="product-detail-design">
            <Form.Group className="form-group-padding-bottom">
              <Form.Label>Specifications</Form.Label>
              <Form.Control
                as="textarea"
                name="specifications"
                id="specifications"
                {...register("specifications")}
                isInvalid={!!errors.specifications}
              />
              <Form.Control.Feedback type="invalid">
                {errors.specifications?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={12} className="product-detail-design">
            <Row>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Tags</Form.Label>
                  {tags?.map((tag, index) => (
                    <div className="d-flex pb-3" key={index}>
                      <Form.Control
                        type="text"
                        name="tag"
                        id="tag"
                        value={tag}
                        onChange={(e) => {
                          handleTagInputChange(e.target.value, index);
                        }}
                      />
                      <div
                        className="ps-1"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => onRemoveTags(index)}
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          <i className="fa-solid fa-circle-xmark"></i>
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="d-grid justify-content-center">
                    <Button
                      variant="secondary"
                      onClick={() => handleAddTagClick()}
                    >
                      Add +
                    </Button>
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Pincode</Form.Label>
                  {pinCode?.map((pincode, index) => (
                    <div className="d-flex pb-3" key={index}>
                      <Form.Control
                        type="text"
                        name="pincode"
                        id="pincode"
                        value={pincode}
                        onChange={(e) => {
                          handleInputChange(e.target.value, index);
                        }}
                      />
                      <div
                        className="ps-1"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={() => onRemovePincode(index)}
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          <i className="fa-solid fa-circle-xmark"></i>
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="d-grid justify-content-center">
                    <Button
                      variant="secondary"
                      onClick={() => handleAddClick()}
                    >
                      Add +
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col md={12} className="product-detail-design">
            <Row>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Discount Price</Form.Label>

                  <Form.Control
                    type="text"
                    id="discountPrice"
                    name="discountPrice"
                    {...register("discountPrice")}
                    isInvalid={!!errors.discountPrice}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.discountPrice?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Half Kg Price</Form.Label>

                  <Form.Control
                    type="text"
                    id="halfkgprice"
                    name="halfkgprice"
                    {...register("halfkgprice")}
                    isInvalid={!!errors.halfkgprice}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.halfkgprice?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>One Kg Price</Form.Label>

                  <Form.Control
                    type="text"
                    name="onekgprice"
                    id="onekgprice"
                    {...register("onekgprice")}
                    isInvalid={!!errors.onekgprice}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.onekgprice?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Two Kg Price</Form.Label>

                  <Form.Control
                    type="text"
                    name="twokgprice"
                    id="twokgprice"
                    {...register("twokgprice")}
                    isInvalid={!!errors.twokgprice}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.twokgprice?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Offer</Form.Label>

                  <Form.Control
                    type="text"
                    id="offer"
                    name="offer"
                    {...register("offer")}
                    isInvalid={!!errors.offer}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.offer?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Quantity</Form.Label>

                  <Form.Control
                    type="text"
                    id="quantity"
                    name="quantity"
                    {...register("quantity")}
                    isInvalid={!!errors.quantity}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.quantity?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col
            md={12}
            style={{
              border: "0.0625rem solid #1a1a1a1f",
              borderRadius: "0.5rem",
              marginTop: "2rem",
              padding: "0.625rem 0.875rem",
            }}
          >
            <div className="mb-4">
              {bannerPicture &&
                bannerPicture?.map((picture, index) => (
                  <div key={index}>
                    {picture?.picturePreview && picture?.picturePreview ? (
                      <div className="m-3">
                        <div>{`Image Preview ${index + 1}`} </div>
                        <img
                          src={picture?.picturePreview}
                          style={{
                            width: "200px",
                            height: "200px",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="d-flex flex-wrap gap-3 pb-3">
                        {viewProductImages && viewProductImages.length > 0 ? (
                          viewProductImages?.map((picture, index) => (
                            <div>
                              <div className="pb-2">
                                {`Image ${index + 1}`}{" "}
                              </div>
                              <img
                                src={picture?.img}
                                style={{
                                  width: "70px",
                                  height: "50px",
                                }}
                              />
                              <div className="pb-2">
                                {picture?.imageAltText}
                              </div>
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                    )}

                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Product Images {index + 1}</Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            name="banner"
                            id="banner"
                            onChange={(event) =>
                              handleBannerPictures(event, index)
                            }
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Image Alt Text</Form.Label>
                          <div className="d-flex pb-3" key={index}>
                            <Form.Control
                              type="text"
                              name="imageAltText"
                              id="imageAltText"
                              value={picture.imageAltText}
                              isInvalid={!!errors.imageAltText}
                              onChange={(e) => handleImageAltText(e, index)}
                            />
                            <div
                              className="ps-1"
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Button
                                variant="contained"
                                onClick={() => onRemoveTags(index)}
                                style={{
                                  textTransform: "capitalize",
                                }}
                              >
                                <i className="fa-solid fa-circle-xmark"></i>
                              </Button>
                            </div>
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                ))}
              <div>
                <Button
                  variant="secondary"
                  disabled={false}
                  style={{
                    textTransform: "capitalize",
                    "&:hover": {
                      border: "none",
                      textDecoration: "none",
                    },
                  }}
                  onClick={addProductPicture}
                >
                  Add Picture
                </Button>
              </div>
            </div>
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
              Update Product
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default EditProductForm;

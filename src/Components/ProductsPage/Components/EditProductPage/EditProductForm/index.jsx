import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema } from "ValidationSchema/addProductSchema";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  updateProducts,
  getProducts,
} from "Redux/Slices/Products/ProductsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProductForm = ({ setOpenAddProductPage }) => {
  const [imageAltText, setImageAltText] = useState([""]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");
  const [pinCode, setPinCode] = useState([""]);
  const [tags, setTags] = useState([""]);
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

  const addProductPicture = (colorIndex) => {
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

  const addBannerPicture = () => {
    console.log("on bannerPicture", bannerPicture);
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
    resolver: yupResolver(addProductSchema),
    mode: "onChange",
  });

  const onSubmit = (formData) => {
    const validationErrors = addProductSchema.validate(formData, {
      abortEarly: false, // This ensures all validation errors are captured
    });

    if (validationErrors.error) {
      console.log(validationErrors.error);
    } else {
      console.log("Form data is valid:", formData);

      const formData = new FormData();
      if (formData?.name) formData.append("name", formData?.name?.toString());

      if (formData?.description)
        formData.append("description", formData?.description?.toString());

      if (categoryId) formData.append("category", categoryId);
      // formData.append("amazonLink", data?.amazonLink?.toString());
      if (formData?.specification)
        formData.append("specification", formData?.specification?.toString());

      // Array.from(formData?.pinCode).forEach((item) => {
      //   formData.append("pinCode", item);
      // });

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

      if (colors && colors?.length > 0) {
        colors?.map((color, index) => {
          const productPictures = color?.productPictures?.map((picture, i) => {
            return {
              img: formData.append(`colorPicture${index}`, picture?.img),
              colorImageAltText: formData.append(
                "colorImageAltText",
                picture?.colorImageAltText
              ),
            };
          });

          return {
            colorName: formData.append("colorName", [color?.name]),
            productPictures,
          };
        });
      }

      dispatch(updateProducts(formData)).then(() => {
        const usersListData = { page: 1 };
        dispatch(getProducts(usersListData)).then(() => {
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        });
      });
      setOpenAddProductPage("Data Added Successfully");
      setValue("name", "");
      setValue("description", "");
      setValue("category", "");
      setValue("specification", "");
    }
  };
  // Import necessary libraries and components at the top

  const ColorVariantSection = ({
    colors,
    handleColorNameChange,
    handleImgChange,
    onRemovePicture,
    addProductPicture,
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
                      <div>{`Image Preview ${pictureIndex + 1}`}</div>
                      <img
                        src={picture?.picturePreview}
                        style={{
                          width: "200px",
                          height: "200px",
                        }}
                        alt={`Color ${colorIndex + 1} - Image ${
                          pictureIndex + 1
                        }`}
                      />
                    </div>
                  )}

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="banner">
                        <Form.Label>{`Color Picture ${
                          pictureIndex + 1
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
                  onClick={() => addProductPicture(colorIndex)}
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

  return (
    <Form
      className="user_form"
      onSubmit={handleSubmit(onSubmit)}
      style={{ padding: "2rem" }}
    >
      <Row>
        <Col md={12} className="product-detail-design">
          <Row>
            <Col md={6}>
              <Form.Group
                controlId="name"
                className="form-group-padding-bottom"
              >
                <Form.Label>Name</Form.Label>

                <Form.Control
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
              <Form.Group
                controlId="actualPrice"
                className="form-group-padding-bottom"
              >
                <Form.Label>Actual Price</Form.Label>

                <Form.Control
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
              <Form.Group
                controlId="categoryId"
                className="form-group-padding-bottom"
              >
                <Form.Label>Select Category</Form.Label>

                <Form.Control
                  type="text"
                  name="categoryId"
                  {...register("categoryId")}
                  isInvalid={!!errors.categoryId}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.categoryId?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                controlId="deliveryDay"
                className="form-group-padding-bottom"
              >
                <Form.Label>Delivery Day</Form.Label>

                <Form.Control
                  type="text"
                  name="deliveryDay"
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
          <Form.Group
            controlId="description"
            className="form-group-padding-bottom"
          >
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              name="description"
              {...register("description")}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={12} className="product-detail-design">
          <Form.Group
            controlId="description"
            className="form-group-padding-bottom"
          >
            <Form.Label>Specifications</Form.Label>

            <Form.Control
              as="textarea"
              name="specifications"
              {...register("specifications")}
              isInvalid={!!errors.specifications}
            />
            <Form.Control.Feedback type="invalid">
              {errors.specifications?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Row className="product-detail-design">
          <Col md={6}>
            <Form.Group controlId="tags" className="form-group-padding-bottom">
              <Form.Label>Tags</Form.Label>
              {tags.map((tag, index) => (
                <>
                  <Form.Control
                    type="text"
                    name="tag"
                    value={tag}
                    onChange={(e) => {
                      handleTagInputChange(e.target.value, index);
                    }}
                  />
                  <div
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
                </>
              ))}

              <div className="d-grid justify-content-center">
                <Button variant="secondary" onClick={() => handleAddTagClick()}>
                  Add +
                </Button>
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group
              controlId="pincode"
              className="form-group-padding-bottom"
            >
              <Form.Label>Pincode</Form.Label>
              {pinCode.map((pincode, index) => (
                <>
                  <Form.Control
                    type="text"
                    name="pincode"
                    value={pincode}
                    onChange={(e) => {
                      handleInputChange(e.target.value, index);
                    }}
                  />
                  <div
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
                </>
              ))}

              <div className="d-grid justify-content-center">
                <Button variant="secondary" onClick={() => handleAddClick()}>
                  Add +
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Col md={12} className="product-detail-design">
          <Row>
            <Col md={6}>
              <Form.Group
                controlId="discountPrice"
                className="form-group-padding-bottom"
              >
                <Form.Label>Discount Price</Form.Label>

                <Form.Control
                  type="text"
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
              <Form.Group
                controlId="halfkgprice"
                className="form-group-padding-bottom"
              >
                <Form.Label>Half Kg Price</Form.Label>

                <Form.Control
                  type="text"
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
              <Form.Group
                controlId="onekgprice"
                className="form-group-padding-bottom"
              >
                <Form.Label>One Kg Price</Form.Label>

                <Form.Control
                  type="text"
                  name="onekgprice"
                  {...register("onekgprice")}
                  isInvalid={!!errors.onekgprice}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.onekgprice?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                controlId="twokgprice"
                className="form-group-padding-bottom"
              >
                <Form.Label>Two Kg Price</Form.Label>

                <Form.Control
                  type="text"
                  name="twokgprice"
                  {...register("twokgprice")}
                  isInvalid={!!errors.twokgprice}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.twokgprice?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Col>

        <ColorVariantSection
          colors={colors}
          handleColorNameChange={handleColorNameChange}
          handleImgChange={handleImgChange}
          onRemovePicture={onRemovePicture}
          addProductPicture={addProductPicture}
          onRemoveColor={onRemoveColor}
          addColor={addColor}
        />

        {/* <Col
          md={12}
          style={{
            border: "0.0625rem solid #1a1a1a1f",
            borderRadius: "0.5rem",
            marginTop: "2rem",
            padding: "0.625rem 0.875rem",
          }}
        >
          <h5>Add Upto 4 Color Variant </h5>
          <Form.Group className="mb-4" controlId="categoryImage">
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
                    <Form.Group controlId="banner">
                      <Form.Label>Color Name {colorIndex + 1}</Form.Label>

                      <Form.Control
                        type="text"
                        name="colorName"
                        id="colorName"
                        style={{ marginBottom: "10px" }}
                        value={color.name}
                        onChange={(event) =>
                          handleColorNameChange(event, colorIndex)
                        }
                        isInvalid={!!errors.colorName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.colorName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  {color?.productPictures?.map((picture, pictureIndex) =>
                    picture ? (
                      <div key={pictureIndex}>
                        {picture.picturePreview && (
                          <div className="m-3">
                            <div>{`Image Preview ${pictureIndex + 1}`}</div>
                            <img
                              src={picture.picturePreview}
                              style={{
                                width: "200px",
                                height: "200px",
                              }}
                            />
                          </div>
                        )}

                        <Row>
                          <Col md={6}>
                            <Form.Label>{`Color Picture ${
                              pictureIndex + 1
                            }`}</Form.Label>
                            <Form.Control
                              type="file"
                              accept="image/*"
                              style={{ marginBottom: "10px" }}
                              value={color.name}
                              id="colorPicture"
                              name="colorPicture"
                              onChange={(event) =>
                                handleImgChange(event, colorIndex, pictureIndex)
                              }
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label>Image Alt Text</Form.Label>
                            <Form.Control
                              type="text"
                              style={{ marginBottom: "10px" }}
                              value={picture?.colorImageAltText}
                              id="colorImageAltText"
                              name="colorImageAltText"
                              onChange={(event) =>
                                handleColorImageAltTextChange(
                                  event,
                                  colorIndex,
                                  pictureIndex
                                )
                              }
                            />
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
                            onClick={() =>
                              onRemovePicture(colorIndex, pictureIndex)
                            }
                            style={{
                              textTransform: "capitalize",
                              "&:hover": {
                                border: "none",
                                textDecoration: "none",
                              },
                            }}
                          >
                            <i class="fa-solid fa-circle-xmark"></i>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )
                  )}

                  <div>
                    <Button
                      variant="secondary"
                      onClick={() => addProductPicture(colorIndex)}
                      style={{
                        textTransform: "capitalize",
                        "&:hover": {
                          border: "none",
                          textDecoration: "none",
                        },
                      }}
                    >
                      Add Color Picture
                    </Button>
                  </div>
                </div>
                <div
                  sx={{
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
                      "&:hover": {
                        border: "none",
                        textDecoration: "none",
                      },
                    }}
                  >
                    <i class="fa-solid fa-circle-xmark"></i>
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
                  "&:hover": {
                    border: "none",
                    textDecoration: "none",
                  },
                }}
                onClick={addColor}
              >
                Add Color
              </Button>
            </div>
          </Form.Group>
        </Col> */}

        <Col
          md={12}
          style={{
            border: "0.0625rem solid #1a1a1a1f",
            borderRadius: "0.5rem",
            marginTop: "2rem",
            padding: "0.625rem 0.875rem",
          }}
        >
          <Form.Group className="mb-4" controlId="banner">
            {bannerPicture?.map((picture, index) => (
              <Row key={index}>
                {picture?.picturePreview && (
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
                )}
                <Col md={6}>
                  <Form.Group controlId="banner">
                    <Form.Label>Product Images {index + 1}</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      name="banner"
                      id="banner"
                      onChange={(event) => handleBannerPictures(event, index)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="imageAltText">
                    <Form.Label>Image Alt Text</Form.Label>
                    <Form.Control
                      type="text"
                      name="imageAltText"
                      id="imageAltText"
                      value={picture.imageAltText}
                      isInvalid={!!errors.imageAltText}
                      onChange={(e) => handleImageAltText(e, index)}
                    />
                  </Form.Group>
                </Col>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => onRemoveBannerPicture(index)}
                    style={{
                      textTransform: "capitalize",
                      "&:hover": {
                        border: "none",
                        textDecoration: "none",
                      },
                    }}
                  >
                    <i class="fa-solid fa-circle-xmark"></i>
                  </Button>
                </div>
              </Row>
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
                onClick={addBannerPicture}
              >
                Add Picture
              </Button>
            </div>
          </Form.Group>
        </Col>

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
          onClick={handleSubmit(onSubmit)}
        >
          Add Product
        </Button>
      </Row>
    </Form>
  );
};

export default EditProductForm;

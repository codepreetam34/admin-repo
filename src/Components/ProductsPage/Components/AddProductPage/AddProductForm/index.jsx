import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { addProducts, getProducts } from "Redux/Slices/Products/ProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "Redux/Slices/Category/CategorySlice";
import { addProductSchema } from "ValidationSchema/addProductSchema";

const AddProductForm = ({
  setOpenAddProductPage,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
  setIsLoading,
}) => {
  const dispatch = useDispatch();
  const [pinCode, setPinCode] = useState([""]);
  const [defaultCategory, setDefaultCategory] = useState();
  const [defaultCategoryName, setDefaultCategoryName] = useState();
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

  const addProductPicture = () => {
    setBannerPicture([
      ...bannerPicture,
      {
        img: "",
        imageAltText: "",
        picturePreview: "",
      },
    ]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addProductSchema),
    mode: "onChange",
  });

  const handleInputChange = async (e, index) => {
    const value = e;
    const list = [...pinCode];
    list[index] = value;
    setPinCode(list);
  };
  const handleAddClick = () => {
    setPinCode([...pinCode, [""]]);
  };
  const onRemovePincode = (indexToRemove) => {
    const updatedPinCode = [...pinCode];
    updatedPinCode.splice(indexToRemove, 1);
    setPinCode(updatedPinCode);
  };

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
  }, [dispatch]);

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data?.name) formData.append("name", data?.name?.toString());
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
    if (data?.specifications) {
      formData.append("specifications", data?.specifications?.toString());
    }
    Array.from(pinCode).forEach((item) => {
      formData.append("pincode", item);
    });
    // Array.from(tags).forEach((item) => {
    //   formData.append("tags", item);
    // });

    const tagsArray = additionalTags.map((additionalTag) => {
      return {
        tagType: additionalTag.tagType,
        names: additionalTag.names,
      };
    });
    formData.append("tags", JSON.stringify(tagsArray));

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
        setOpenAddProductPage(false);
        dispatch(getProducts());
      }
    });
  };

  const handleSelectCategory = (e) => {
    setDefaultCategory(e.target.value);
    const categoryIdToFind = e.target.value;
    const foundCategory = categoryList.find(
      (item) => item._id === categoryIdToFind
    );
    if (foundCategory) {
      setDefaultCategoryName(foundCategory?.name);
    } else {
      console.log("Category not found ", defaultCategoryName);
    }
    setTagType("");
  };

  const combinedOptions = [
    {
      name: "Cakes",
      categories: ["By Featured", "By Occasion", "By Flavours", "By Types"],
      options: [
        // An array of options for each category.
        [
          "All Cakes",
          "Best Sellers",
          "Same Day Delivery",
          "New Arrivals",
          "Midnight Delivery",
          "Flowers N Cakes",
          "Cake Combos",
          "Cake With Chocolates",
          "Cake With Plants",
          "Cakes and Guitarist",
        ],
        [
          "Birthday Cakes",
          "Kid's Birthday Cakes",
          "Anniversary Cakes",
          "1st Anniversary",
          "25th Anniversary",
          "Wedding Cakes",
          "Congratulations",
          "Make Small Celebrations Big",
        ],
        [
          "Truffle Cakes",
          "Chocolate Cakes",
          "Black Forest Cakes",
          "Butterscotch Cakes",
          "Caramel Cakes",
          "Coffee Cakes",
          "Walnut Cakes",
          "Pineapple Cakes",
          "Fresh Fruit Cakes",
          "Pinata Cakes",
        ],
        [
          "Bento CakesNeW",
          "Eggless Cakes",
          "Photo Cakes",
          "Designer Cakes",
          "Fondant Cakes",
          "Fusion Cakes",
          "Cup Cakes",
          "Dry Cakes",
          "Jar Cakes",
        ],
      ],
    },
    {
      name: "Plants",
      categories: ["By Featured", "By Occasion", "By Planters", "By Types"],
      options: [
        [
          "Best Sellers",
          "Same Day Delivery",
          "New Arrivals",
          "Air Purifying Plants",
          "Low Maintenance Plants",
          "Indoor Plants",
        ],
        ["Birthday", "Anniversary", "House Warming", "Good Luck"],
        [
          "Ceramic Planters",
          "Metal Planters",
          "Glass Planters",
          "Self Watering Planters",
        ],
        [
          "Money Plants",
          "Lucky Bamboo",
          "Snake Plants",
          "Jade Plants",
          "Bonsai Plants",
          "Flowering Plants",
        ],
      ],
    },
  ];

  const [tagType, setTagType] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [additionalTags, setAdditionalTags] = useState([]);

  const renderTagCheckboxes = () => {
    if (defaultCategoryName && tagType) {
      const category = combinedOptions.find(
        (option) => option.name && option.name.toLowerCase() === defaultCategoryName
      );
      if (category) {
        const tagCategory =
          category.options[category.categories.indexOf(tagType)];

        return tagCategory.map((tagName, index) => (
          <Form.Check
            key={index}
            type="checkbox"
            label={tagName}
            checked={selectedTags.includes(tagName)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedTags((prevTags) => [...prevTags, tagName]);
              } else {
                setSelectedTags((prevTags) =>
                  prevTags.filter((tag) => tag !== tagName)
                );
              }
            }}
            value={tagName}
            style={{ width: "10rem" }}
          />
        ));
      } else {
        return null;
      }
    }

    return null;
  };

  const handleAddTag = () => {
    if (tagType && selectedTags.length > 0) {
      const newTag = { tagType, names: [...selectedTags] };
      setAdditionalTags([...additionalTags, newTag]);
      setSelectedTags([]);
    }
  };

  const renderAdditionalTags = () => {
    return additionalTags.map((tag, index) => (
      <Col md={6} key={index} className="mb-4">
        <Form.Group controlId={`additionalTagType_${index}`}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Label>Tag Type</Form.Label>
            <Form.Group>
              <Button
                variant="contained"
                onClick={() => onRemoveTags(index)}
                style={{
                  textTransform: "capitalize",
                }}
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </Button>
            </Form.Group>
          </div>
          <Form.Control
            type="text"
            className="mb-2"
            name={`additionalTags[${index}].tagType`}
            defaultValue={tag.tagType}
            disabled
          />
        </Form.Group>

        <Form.Group controlId={`additionalTagNames_${index}`}>
          <Form.Label>Tag Names</Form.Label>
          {tag ? (
            tag?.names?.map((name, nameIndex) => (
              <div key={nameIndex}>
                <Form.Check
                  type="checkbox"
                  label={name}
                  className="mb-2"
                  disabled
                  checked
                  onChange={(e) => {
                    const updatedNames = tag.names || [];
                    if (e.target.checked) {
                      updatedNames.push(name);
                    } else {
                      const nameIndex = updatedNames.indexOf(name);
                      if (nameIndex !== -1) {
                        updatedNames.splice(nameIndex, 1);
                      }
                    }
                    const updatedSelectedTagNames = [...selectedTags];
                    updatedSelectedTagNames[index] = updatedNames;
                    setSelectedTags(updatedSelectedTagNames);
                  }}
                  value={name}
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </Form.Group>
      </Col>
    ));
  };

  const onRemoveTags = (index) => {
    const updatedTags = [...additionalTags];
    updatedTags.splice(index, 1);
    setAdditionalTags(updatedTags);
  };

  const onRemoveBannerPicture = (index) => {
    const inputList = [...bannerPicture];
    inputList.splice(index, 1);
    setBannerPicture(inputList);
    // const list2 = [...imageAltText];
    // list2.splice(index, 1);
    // setImageAltText(list2);
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
                      onChange={(e) => handleSelectCategory(e)}
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
                <Form.Group className="mb-4" controlId="tags">
                  <Form.Label>Select Tag Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={tagType}
                    onChange={(e) => setTagType(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Tag Type
                    </option>
                    {defaultCategoryName ? (
                      combinedOptions
                        .find(
                          (option) =>
                            option.name &&
                            option.name.toLowerCase() === defaultCategoryName
                        )
                        ?.categories?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        )) || <option value="">No options available</option>
                    ) : (
                      <option value="">No options available</option>
                    )}
                  </Form.Control>
                </Form.Group>
                <div className="pt-4 d-flex justify-content-center">
                  <Button variant="secondary" onClick={handleAddTag}>
                    Add Tag
                  </Button>
                </div>
              </Col>

              {tagType ? (
                <Col md={6}>
                  <Form.Group className="pb-3" controlId="selectedTags">
                    <Form.Label style={{ fontWeight: "600" }}>
                      Select Tags
                    </Form.Label>
                    <div
                      className="d-flex flex-wrap gap-2 product-detail-design"
                      style={{ margin: "0" }}
                    >
                      {renderTagCheckboxes()}
                    </div>
                  </Form.Group>
                </Col>
              ) : (
                <></>
              )}
            </Row>

            <Row className="p-4">
              <Col md={12} className="pb-3 product-detail-design">
                <Form.Group className="pb-3" controlId="selectedTags">
                  <Form.Label style={{ fontWeight: "600" }}>
                    {defaultCategoryName} Selected Tags
                  </Form.Label>
                  <Row>{renderAdditionalTags()}</Row>
                </Form.Group>
              </Col>
            </Row>
          </Col>

          <Col className="product-detail-design">
            <Row>
              <Col md={12}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Pincode</Form.Label>
                  {pinCode.map((pincode, index) => (
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

          {defaultCategoryName &&
          (defaultCategoryName.toLowerCase() === "cake" ||
            defaultCategoryName.toLowerCase() === "cakes") ? (
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
              </Row>
            </Col>
          ) : (
            <></>
          )}

          <Col md={12} className="product-detail-design">
            <Row>
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
                      <></>
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
                                onClick={() => onRemoveBannerPicture(index)}
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
              Submit
            </Button>
          </div>
        </Row>
      </Form>
    </div>
  );
};

export default AddProductForm;

///////////   prodcut color picture component     /////////////////////

// const [colors, setColors] = useState([
//   {
//     name: "",
//     productPictures: [
//       {
//         img: "",
//         colorImageAltText: "",
//         picturePreview: "",
//       },
//     ],
//   },
// ]);

// const handleColorNameChange = (event, index) => {
//   const newColors = [...colors];
//   newColors[index].name = event.target.value;
//   setColors(newColors);
// };

// const handleImgChange = (event, colorIndex, pictureIndex) => {
//   //    setBanner([...banner, event.target.files[0]]);
//   setColors((colors) => {
//     const newColors = [...colors];
//     newColors[colorIndex].productPictures[pictureIndex].img =
//       event.target.files[0];
//     newColors[colorIndex].productPictures[pictureIndex].picturePreview =
//       URL.createObjectURL(event.target.files[0]);
//     return newColors;
//   });
// };

// const handleColorImageAltTextChange = (event, colorIndex, pictureIndex) => {
//   setColors((colors) => {
//     const newColors = [...colors];
//     newColors[colorIndex].productPictures[pictureIndex].colorImageAltText =
//       event.target.value;
//     return newColors;
//   });
// };

// const addColor = () => {
//   console.log("on colors", colors);
//   setColors([
//     ...colors,
//     {
//       name: "",
//       productPictures: [
//         {
//           img: "",
//           colorImageAltText: "",
//           picturePreview: "",
//         },
//       ],
//     },
//   ]);
// };

// const addColorProductPicture = (colorIndex) => {
//   setColors((colors) => {
//     const newState = [...colors];
//     console.log("on newState", newState);
//     newState[colorIndex].productPictures.push([
//       {
//         img: "",
//         colorImageAltText: "",
//         picturePreview: "",
//       },
//     ]);
//     return newState;
//   });
// };

//   const [tags, setTags] = useState([]);

// const onRemoveTags = (indexToRemove) => {
//   const updatedTags = [...tags];
//   updatedTags.splice(indexToRemove, 1);
//   setTags(updatedTags);
// };

// const onRemovePicture = (colorIndex, pictureIndex) => {
//   console.log("on pictureIndex", pictureIndex, "colorIndex ", colorIndex);
//   const list = [...colors];
//   list[colorIndex].productPictures.splice(pictureIndex, 1);
//   setColors(list);
//   console.log("on remove", colors);
// };

// const onRemoveBannerPicture = (index) => {
//   const inputList = [...bannerPicture];
//   inputList.splice(index, 1);
//   setBannerPicture(inputList);
//   const list2 = [...imageAltText];
//   list2.splice(index, 1);
//   setImageAltText(list2);
// };

// const onRemoveColor = (colorIndex) => {
//   console.log("on colors", colors);
//   const list = [...colors];
//   list.splice(colorIndex, 1);
//   setColors(list);
// };

// // Import necessary libraries and components at the top
// const handleTagInputChange = async (e, index) => {
//   const value = e;
//   const list = [...tags];
//   list[index] = value;
//   setTags(list);
// };
// const handleAddTagClick = () => {
//   setTags([...tags, [""]]);
// };
// const ColorVariantSection = ({
//   colors,
//   handleColorNameChange,
//   handleImgChange,
//   onRemovePicture,
//   addColorProductPicture,
//   onRemoveColor,
//   addColor,
// }) => {
//   return (
//     <Col
//       md={12}
//       style={{
//         border: "0.0625rem solid #1a1a1a1f",
//         borderRadius: "0.5rem",
//         marginTop: "2rem",
//         padding: "0.625rem 0.875rem",
//       }}
//     >
//       <h5>Add Up to 4 Color Variants</h5>

//       {colors?.map((color, colorIndex) => (
//         <div key={colorIndex}>
//           <div
//             style={{
//               border: "0.0625rem solid #1a1a1a1f",
//               borderRadius: "0.5rem",
//               margin: "10px 0",
//               padding: "0.625rem 0.875rem",
//             }}
//           >
//             <div>
//               <Form.Group controlId={`colorName-${colorIndex}`}>
//                 <Form.Label>Color Name {colorIndex + 1}</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name={`colors[${colorIndex}].name`}
//                   style={{ marginBottom: "10px" }}
//                   value={color?.name}
//                   onChange={(event) =>
//                     handleColorNameChange(event, colorIndex)
//                   }
//                 />
//               </Form.Group>
//             </div>

//             {color.productPictures.map((picture, pictureIndex) => (
//               <div key={pictureIndex}>
//                 {picture?.picturePreview && (
//                   <div className="m-3">
//                     <div>{`Image ${pictureIndex + 1}`}</div>
//                     <img
//                       src={picture?.picturePreview}
//                       style={{
//                         width: "200px",
//                         height: "200px",
//                       }}
//                       alt={`Color ${colorIndex + 1} - Image ${
//                         pictureIndex + 1
//                       }`}
//                     />
//                     <div>{`${picture?.imageAltText}`}</div>
//                   </div>
//                 )}

//                 <Row>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>{`Color Picture ${
//                         pictureIndex + 1
//                       }`}</Form.Label>

//                       <Form.Control
//                         type="file"
//                         accept="image/*"
//                         style={{ marginBottom: "10px" }}
//                         id={`colorPicture-${colorIndex}-${pictureIndex}`}
//                         name={`colorPicture-${colorIndex}-${pictureIndex}`}
//                         onChange={(event) =>
//                           handleImgChange(event, colorIndex, pictureIndex)
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group
//                       controlId={`colorImageAltText-${colorIndex}-${pictureIndex}`}
//                     >
//                       <Form.Label>Image Alt Text</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name={`colors[${colorIndex}].productPictures[${pictureIndex}].colorImageAltText`}
//                         style={{ marginBottom: "10px" }}
//                         value={picture.colorImageAltText}
//                         onChange={(event) =>
//                           handleColorImageAltTextChange(
//                             event,
//                             colorIndex,
//                             pictureIndex
//                           )
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     paddingTop: "10px",
//                   }}
//                 >
//                   <Button
//                     variant="contained"
//                     onClick={() => onRemovePicture(colorIndex, pictureIndex)}
//                     style={{
//                       textTransform: "capitalize",
//                     }}
//                   >
//                     <i className="fa-solid fa-circle-xmark"></i>
//                   </Button>
//                 </div>
//               </div>
//             ))}

//             <div>
//               <Button
//                 variant="secondary"
//                 onClick={() => addColorProductPicture(colorIndex)}
//                 style={{
//                   textTransform: "capitalize",
//                 }}
//               >
//                 Add Color Picture
//               </Button>
//             </div>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               padding: "5px 0px 20px 0px",
//             }}
//           >
//             <Button
//               variant="contained"
//               onClick={() => onRemoveColor(colorIndex)}
//               style={{
//                 textTransform: "capitalize",
//               }}
//             >
//               <i className="fa-solid fa-circle-xmark"></i>
//             </Button>
//           </div>
//         </div>
//       ))}

//       <div>
//         <Button
//           variant="secondary"
//           style={{
//             textTransform: "capitalize",
//             marginTop: "2rem",
//           }}
//           onClick={addColor}
//         >
//           Add Color
//         </Button>
//       </div>
//     </Col>
//   );
// };

/////////////////////////////////////////////////////

{
  /* <Col md={12} className="product-detail-design">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4" controlId="tags">
                  <Form.Label>Select Tag Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={tagType}
                    onChange={(e) => setTagType(e.target.value)}
                  >
                    <option value="">Select Tag Type</option>
                    {Object.keys(tagOptions).map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              {tagType && (
                <Col md={6}>
                  <Form.Group className="pb-3" controlId="selectedTags">
                    <Form.Label style={{ fontWeight: "600" }}>
                      Select Tags
                    </Form.Label>
                    <div>{renderTagCheckboxes()}</div>
                  </Form.Group>
                </Col>
              )}
            </Row>
            <Col md={12} className="pb-3">
              <Button variant="secondary" onClick={handleAddTag}>
                Add Tag
              </Button>
            </Col>
            {renderAddedTags()}
            {renderAdditionalTags()}
          </Col> */
}
{
  /* <Col md={6}>
                <Form.Group className="form-group-padding-bottom">
                  <Form.Label>Tags</Form.Label>
                  {tags.map((tag, index) => (
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
              </Col> */
}

// const tagOptions = {
//   "By Featured": [
//     "All Cakes",
//     "Best Sellers",
//     "Same Day Delivery",
//     "New Arrivals",
//     "Midnight Delivery",
//     "Flowers N Cakes",
//     "Cake Combos",
//     "Cake With Chocolates",
//     "Cake With Plants",
//     "Cakes and Guitarist",
//   ],
//   "By Occasion": [
//     "Birthday Cakes",
//     "Kid's Birthday Cakes",
//     "Anniversary Cakes",
//     "1st Anniversary",
//     "25th Anniversary",
//     "Wedding Cakes",
//     "Congratulations",
//     "Make Small Celebrations Big",
//   ],
//   "By Flavours": [
//     "Truffle Cakes",
//     "Chocolate Cakes",
//     "Black Forest Cakes",
//     "Butterscotch Cakes",
//     "Caramel Cakes",
//     "Coffee Cakes",
//     "Walnut Cakes",
//     "Pineapple Cakes",
//     "Fresh Fruit Cakes",
//     "Pinata Cakes",
//   ],
//   "By Types": [
//     "Bento CakesNeW",
//     "Eggless Cakes",
//     "Photo Cakes",
//     "Designer Cakes",
//     "Fondant Cakes",
//     "Fusion Cakes",
//     "Cup Cakes",
//     "Dry Cakes",
//     "Jar Cakes",
//   ],
//   "By Collections": [
//     "Birthday Cakes",
//     "Kid's Birthday Cakes",
//     "Anniversary Cakes",
//     "1st Anniversary",
//     "25th Anniversary",
//     "Wedding Cakes",
//     "Congratulations",
//     "Make Small Celebrations Big",
//   ],
//   "By Cities": [
//     "Delhi NCR",
//     "Bengaluru",
//     "Mumbai",
//     "Pune",
//     "Hyderabad",
//     "Kolkata",
//     "Chennai",
//     "Lucknow",
//     "Ahmedabad",
//     "All Other Cities",
//   ],
// };

// const combinedOptions = [
//   {
//     name: "Cakes",
//     categories: [
//       {
//         name: "By Featured",
//         options: [
//           "All Cakes",
//           "Best Sellers",
//           "Same Day Delivery",
//           "New Arrivals",
//           "Midnight Delivery",
//           "Flowers N Cakes",
//           "Cake Combos",
//           "Cake With Chocolates",
//           "Cake With Plants",
//           "Cakes and Guitarist",
//         ],
//       },
//       {
//         name: "By Occasion",
//         options: [
//           "Birthday Cakes",
//           "Kid's Birthday Cakes",
//           "Anniversary Cakes",
//           "1st Anniversary",
//           "25th Anniversary",
//           "Wedding Cakes",
//           "Congratulations",
//           "Make Small Celebrations Big",
//         ],
//       },
//       {
//         name: "By Flavours",
//         options: [
//           "Truffle Cakes",
//           "Chocolate Cakes",
//           "Black Forest Cakes",
//           "Butterscotch Cakes",
//           "Caramel Cakes",
//           "Coffee Cakes",
//           "Walnut Cakes",
//           "Pineapple Cakes",
//           "Fresh Fruit Cakes",
//           "Pinata Cakes",
//         ],
//       },
//       {
//         name: "By Types",
//         options: [
//           "Bento CakesNeW",
//           "Eggless Cakes",
//           "Photo Cakes",
//           "Designer Cakes",
//           "Fondant Cakes",
//           "Fusion Cakes",
//           "Cup Cakes",
//           "Dry Cakes",
//           "Jar Cakes",
//         ],
//       },
//     ],
//   },
//   {
//     name: "Plants",
//     categories: [
//       {
//         name: "By Featured",
//         options: [
//           "Best Sellers",
//           "Same Day Delivery",
//           "New Arrivals",
//           "Air Purifying Plants",
//           "Low Maintenance Plants",
//           "Indoor Plants",
//         ],
//       },
//       {
//         name: "By Occasion",
//         options: ["Birthday", "Anniversary", "House Warming", "Good Luck"],
//       },
//       {
//         name: "By Planters",
//         options: [
//           "Ceramic Planters",
//           "Metal Planters",
//           "Glass Planters",
//           "Self Watering Planters",
//         ],
//       },
//       {
//         name: "By Types",
//         options: [
//           "Money Plants",
//           "Lucky Bamboo",
//           "Snake Plants",
//           "Jade Plants",
//           "Bonsai Plants",
//           "Flowering Plants",
//         ],
//       },
//     ],
//   },
// ];

// const renderTagCheckboxes = () => {
//   if (tagType) {
//     return tagOptions[tagType].map((tagName, index) => (
//       <Form.Check
//         key={index}
//         type="checkbox"
//         label={tagName}
//         checked={selectedTags.includes(tagName)}
//         onChange={(e) => {
//           if (e.target.checked) {
//             setSelectedTags((prevTags) => [...prevTags, tagName]);
//           } else {
//             setSelectedTags((prevTags) =>
//               prevTags.filter((tag) => tag !== tagName)
//             );
//           }
//         }}
//         value={tagName}
//       />
//     ));
//   }
//   return null;
// };

// const renderAddedTags = () => {
//   return tags.map((tag, index) => (
//     <div key={index}>
//       <Form.Group controlId={`tagType_${index}`}>
//         <Form.Label>Tag Type</Form.Label>
//         <Form.Control
//           type="text"
//           name={`tags[${index}].tagType`}
//           defaultValue={tag.tagType}
//           disabled
//         />
//       </Form.Group>
//       <Form.Group controlId={`tagNames_${index}`}>
//         <Form.Label>Tag Names</Form.Label>
//         {tag.names.map((name, nameIndex) => (
//           <div key={nameIndex}>
//             <Form.Check
//               type="checkbox"
//               label={name}
//               checked={selectedTagNames[index]?.includes(name)}
//               onChange={(e) => {
//                 const updatedNames = selectedTagNames[index] || [];
//                 if (e.target.checked) {
//                   updatedNames.push(name);
//                 } else {
//                   const nameIndex = updatedNames.indexOf(name);
//                   if (nameIndex !== -1) {
//                     updatedNames.splice(nameIndex, 1);
//                   }
//                 }
//                 const updatedSelectedTagNames = [...selectedTagNames];
//                 updatedSelectedTagNames[index] = updatedNames;
//                 setSelectedTagNames(updatedSelectedTagNames);
//               }}
//               value={name}
//             />
//           </div>
//         ))}
//       </Form.Group>
//     </div>
//   ));
// };

// const renderAdditionalTags = () => {
//   return additionalTags.map((tag, index) => (
//     <Col md={6} key={index} className="mb-4">
//       <Form.Group controlId={`additionalTagType_${index}`}>
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <Form.Label>Tag Type</Form.Label>
//           <Form.Group>
//             <Button
//               variant="contained"
//               onClick={() => onRemoveTags(index)}
//               style={{
//                 textTransform: "capitalize",
//               }}
//             >
//               <i className="fa-solid fa-circle-xmark"></i>
//             </Button>
//           </Form.Group>
//         </div>
//         <Form.Control
//           type="text"
//           className="mb-2"
//           name={`additionalTags[${index}].tagType`}
//           defaultValue={tag.tagType}
//           disabled
//         />
//       </Form.Group>

//       <Form.Group controlId={`additionalTagNames_${index}`}>
//         <Form.Label>Tag Names</Form.Label>
//         {tag.names.map((name, nameIndex) => (
//           <Col md={6} key={nameIndex}>
//             <Form.Check
//               type="checkbox"
//               label={name}
//               className="mb-2"
//               disabled
//               checked
//               onChange={(e) => {
//                 const updatedNames = selectedTagNames[index] || [];
//                 if (e.target.checked) {
//                   updatedNames.push(name);
//                 } else {
//                   const nameIndex = updatedNames.indexOf(name);
//                   if (nameIndex !== -1) {
//                     updatedNames.splice(nameIndex, 1);
//                   }
//                 }
//                 const updatedSelectedTagNames = [...selectedTagNames];
//                 updatedSelectedTagNames[index] = updatedNames;
//                 setSelectedTagNames(updatedSelectedTagNames);
//               }}
//               value={name}
//             />
//           </Col>
//         ))}
//       </Form.Group>
//     </Col>
//   ));
// };

// const onRemoveTags = (index) => {
//   const updatedTags = [...additionalTags];
//   updatedTags.splice(index, 1);
//   setAdditionalTags(updatedTags);
// };
// const renderAdditionalTags = () => {
//   return additionalTags.map((tag, index) => (
//     <Col md={6} key={index} className="mb-4">
//       <Form.Group controlId={`additionalTagType_${index}`}>
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <Form.Label>Tag Type</Form.Label>
//           <Form.Group>
//             <Button
//               variant="contained"
//               onClick={() => onRemoveTags(index)}
//               style={{
//                 textTransform: "capitalize",
//               }}
//             >
//               <i className="fa-solid fa-circle-xmark"></i>
//             </Button>
//           </Form.Group>
//         </div>
//         <Form.Control
//           type="text"
//           className="mb-2"
//           name={`additionalTags[${index}].tagType`}
//           defaultValue={tag.tagType}
//           disabled
//         />
//       </Form.Group>

//       <Form.Group controlId={`additionalTagNames_${index}`}>
//         <Form.Label>Tag Names</Form.Label>
//         {tag.names.map((name, nameIndex) => (
//           <Col md={6} key={nameIndex}>
//             <Form.Check
//               type="checkbox"
//               label={name}
//               className="mb-2"
//               disabled
//               checked
//               onChange={(e) => {
//                 const updatedNames = tag.names || [];
//                 if (e.target.checked) {
//                   updatedNames.push(name);
//                 } else {
//                   const nameIndex = updatedNames.indexOf(name);
//                   if (nameIndex !== -1) {
//                     updatedNames.splice(nameIndex, 1);
//                   }
//                 }
//                 const updatedSelectedTagNames = [...selectedTags];
//                 updatedSelectedTagNames[index] = updatedNames;
//                 setSelectedTags(updatedSelectedTagNames);
//               }}
//               value={name}
//             />
//           </Col>
//         ))}
//       </Form.Group>
//     </Col>
//   ));
// };

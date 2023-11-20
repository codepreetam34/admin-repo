import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  editMainCategory,
  getCategory,
} from "Redux/Slices/Category/CategorySlice";
import { categorySchema } from "ValidationSchema/categorySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
const EditCategoryForm = ({
  setAddShowErrorToast,
  categoryById,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setOpenEditCategoryPage,
  setAddShowToastMessage,
}) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [viewCategoryImage, setViewCategoryImage] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [tagType, setTagType] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagNames, setSelectedTagNames] = useState([]);
  const [additionalTags, setAdditionalTags] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState();
  const [defaultCategoryName, setDefaultCategoryName] = useState();
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

  const tagOptions = categoryById.tags.reduce((acc, tag) => {
    acc[tag.tagType] = tag.names;
    return acc;
  }, {});

  const handleSelectCategory = (e) => {
    setDefaultCategoryName(e.target.value);
  };




  const combinedOptions = [
    {
      name: "Cakes",
      categories: ["By Featured", "By Occasion", "By Flavours", "By Types"],
      options: [
        // Options for "BY FEATURED"
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
        // Options for "BY OCCASION"
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
        // Options for "BY FLAVOURS"
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
        // Options for "BY TYPES"
        [
          "Bento Cakes",
          "New Eggless Cakes",
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
        // Options for "BY FEATURED"
        [
          "Best Sellers",
          "Same Day Delivery",
          "New Arrivals",
          "Air Purifying Plants",
          "Low Maintenance Plants",
          "Indoor Plants",
        ],
        // Options for "BY OCCASION"
        [
          "Birthday",
          "Anniversary",
          "House Warming",
          "Good Luck",
        ],
        // Options for "BY PLANTERS"
        [
          "Ceramic Planters",
          "Metal Planters",
          "Glass Planters",
          "Self Watering Planters",
        ],
        // Options for "BY TYPES"
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



  const renderTagCheckboxes = () => {
    if (defaultCategoryName && tagType) {
      const category = combinedOptions.find(
        (option) => option.name === defaultCategoryName
      );
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
          {tag.names.map((name, nameIndex) => (
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
          ))}
        </Form.Group>
      </Col>
    ));
  };

  const onRemoveTags = (index) => {
    const updatedTags = [...additionalTags];
    updatedTags.splice(index, 1);
    setAdditionalTags(updatedTags);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data?.name) formData.append("name", data?.name?.toString());
    if (data?.imageAltText) formData.append("imageAltText", data?.imageAltText?.toString());
    if (categoryImage) formData.append("categoryImage", categoryImage);
    if (categoryById._id) formData.append("_id", categoryById._id);

    const tagsArray = additionalTags.map((additionalTag) => {
      return {
        tagType: additionalTag.tagType,
        names: additionalTag.names,
      };
    });
    console.log("tagsArray ", tagsArray)
    if (tagsArray && tagsArray.length > 0 && tagsArray != []) formData.append("tags", JSON.stringify(tagsArray));

    dispatch(editMainCategory(formData))
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
          setOpenEditCategoryPage(false);
          dispatch(getCategory());
          setAddShowToastMessage(res?.payload?.message);
          setAddShowToast(true);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
    setImagePreview(URL.createObjectURL(file));
    setViewCategoryImage("");
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
            <Col md={12} className="product-detail-design">
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

                      <option key="Cakes" value="Cakes">
                        Cakes
                      </option>
                      <option key="Plants" value="Plants">
                        Plants & Flower
                      </option>
                    </Form.Control>
                    <div className="select-arrow"></div>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors?.categoryId?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
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
                      {defaultCategoryName &&
                        combinedOptions
                          .find((option) => option.name === defaultCategoryName)
                          .categories.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                    </Form.Control>
                  </Form.Group>
                  <div className="pt-4 d-flex justify-content-center">
                    <Button variant="secondary" onClick={handleAddTag}>
                      Add Tag
                    </Button>
                  </div>
                </Col>
                {tagType && (
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
          </Row>
          <div className="pt-3">
            <Button variant="primary" type="submit">
              Update Category
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditCategoryForm;

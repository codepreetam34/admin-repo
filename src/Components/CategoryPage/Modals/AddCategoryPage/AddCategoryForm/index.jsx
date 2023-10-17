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

const AddCategoryForm = ({
  setIsLoading,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
  setOpenAddCategoryPage,
}) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryImage, setCategoryImage] = useState("");
  const [defaultCategory, setDefaultCategory] = useState();
  const [defaultCategoryName, setDefaultCategoryName] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(categorySchema),
    mode: "onChange",
  });

  const handleSelectCategory = (e) => {
    setDefaultCategoryName(e.target.value);
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
    formData.append("name", data?.name?.toString());
    formData.append("imageAltText", data?.imageAltText?.toString());
    formData.append("categoryImage", categoryImage);
    const tagsArray = additionalTags.map((additionalTag) => {
      return {
        tagType: additionalTag.tagType,
        names: additionalTag.names,
      };
    });
    formData.append("tags", JSON.stringify(tagsArray));

    dispatch(addMainCategory(formData))
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
          setOpenAddCategoryPage(false);
          dispatch(getCategory());
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
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddCategoryForm;

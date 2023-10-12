import React, { useState } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  addMainCategory,
  getCategory,
} from "Redux/Slices/Category/CategorySlice";
import { categorySchema } from "ValidationSchema/categorySchema";

const AddCategoryForm = ({
  setShowModal,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
}) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [categoryImage, setCategoryImage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(categorySchema),
    mode: "onChange",
  });

  const tagOptions = {
    "By Featured": [
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
    "By Occasion": [
      "Birthday Cakes",
      "Kid's Birthday Cakes",
      "Anniversary Cakes",
      "1st Anniversary",
      "25th Anniversary",
      "Wedding Cakes",
      "Congratulations",
      "Make Small Celebrations Big",
    ],
    "By Flavours": [
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
    "By Types": [
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
    "By Collections": [
      "Birthday Cakes",
      "Kid's Birthday Cakes",
      "Anniversary Cakes",
      "1st Anniversary",
      "25th Anniversary",
      "Wedding Cakes",
      "Congratulations",
      "Make Small Celebrations Big",
    ],
    "By Cities": [
      "Delhi NCR",
      "Bengaluru",
      "Mumbai",
      "Pune",
      "Hyderabad",
      "Kolkata",
      "Chennai",
      "Lucknow",
      "Ahmedabad",
      "All Other Cities",
    ],
  };

  const renderTagCheckboxes = () => {
    if (tagType) {
      return tagOptions[tagType].map((tagName, index) => (
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
        />
      ));
    }
    return null;
  };

  const [tags, setTags] = useState([]);
  const [tagType, setTagType] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagNames, setSelectedTagNames] = useState([]);
  const [additionalTags, setAdditionalTags] = useState([]);

  const handleAddTag = () => {
    if (tagType && selectedTags.length > 0) {
      const newTag = { tagType, names: [...selectedTags] };
      setAdditionalTags([...additionalTags, newTag]);
      // Clear the selectedTags array
      console.log("tags are : ", additionalTags);
      setSelectedTags([]);
    }
  };

  const handleAddAnotherTag = () => {
    if (tagType) {
      const newTag = { tagType, names: [] };
      setTags([...tags, newTag]);
    }
    // Clear the selectedTags array
    setSelectedTags([]);
    // Clear the selectedTagNames array
    setSelectedTagNames([]);
  };

  const renderAddedTags = () => {
    return tags.map((tag, index) => (
      <div key={index}>
        <Form.Group controlId={`tagType_${index}`}>
          <Form.Label>Tag Type</Form.Label>
          <Form.Control
            type="text"
            name={`tags[${index}].tagType`}
            defaultValue={tag.tagType}
            disabled
          />
        </Form.Group>
        <Form.Group controlId={`tagNames_${index}`}>
          <Form.Label>Tag Names</Form.Label>
          {tag.names.map((name, nameIndex) => (
            <div key={nameIndex}>
              <Form.Check
                type="checkbox"
                label={name}
                checked={selectedTagNames[index]?.includes(name)}
                onChange={(e) => {
                  const updatedNames = selectedTagNames[index] || [];
                  if (e.target.checked) {
                    updatedNames.push(name);
                  } else {
                    const nameIndex = updatedNames.indexOf(name);
                    if (nameIndex !== -1) {
                      updatedNames.splice(nameIndex, 1);
                    }
                  }
                  const updatedSelectedTagNames = [...selectedTagNames];
                  updatedSelectedTagNames[index] = updatedNames;
                  setSelectedTagNames(updatedSelectedTagNames);
                }}
                value={name}
              />
            </div>
          ))}
        </Form.Group>
      </div>
    ));
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
            <Col md={6} key={nameIndex}>
              <Form.Check
                type="checkbox"
                label={name}
                className="mb-2"
                disabled
                checked
                onChange={(e) => {
                  const updatedNames = selectedTagNames[index] || [];
                  if (e.target.checked) {
                    updatedNames.push(name);
                  } else {
                    const nameIndex = updatedNames.indexOf(name);
                    if (nameIndex !== -1) {
                      updatedNames.splice(nameIndex, 1);
                    }
                  }
                  const updatedSelectedTagNames = [...selectedTagNames];
                  updatedSelectedTagNames[index] = updatedNames;
                  setSelectedTagNames(updatedSelectedTagNames);
                }}
                value={name}
              />
            </Col>
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
        }
        else if (res?.payload?.error?.response?.status === 500) {
          setAddShowErrorToast(true);
          setAddShowErrorToastMessage(
            res?.payload?.error?.response?.data?.message
          );
        } else {
          setAddShowToast(true);
          setAddShowToastMessage(res?.payload?.message);
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

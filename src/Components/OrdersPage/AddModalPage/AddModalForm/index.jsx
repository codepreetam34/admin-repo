import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "Redux/Slices/Category/CategorySlice";
import { addTags, getTags } from "Redux/Slices/Tags/TagsSlice";

const AddModalForm = ({
  setOpenAddModalPage,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
  setIsLoading,
}) => {
  const dispatch = useDispatch();
  const [tagType, setTagType] = useState("");
  const [categories, setCategories] = useState([{ name: "", options: [""] }]);

  const handleCategoryNameChange = (index, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index].name = value;
    setCategories(updatedCategories);
  };

  const handleOptionChange = (categoryIndex, optionIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].options[optionIndex] = value;
    setCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    setCategories([...categories, { name: "", options: [""] }]);
  };

  const handleAddOption = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].options.push("");
    setCategories(updatedCategories);
  };

  const handleRemoveCategory = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(categoryIndex, 1);
    setCategories(updatedCategories);
  };

  const handleRemoveOption = (categoryIndex, optionIndex) => {
    const updatedOptions = [...categories[categoryIndex].options];
    updatedOptions.splice(optionIndex, 1);

    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].options = updatedOptions;

    setCategories(updatedCategories);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { tagType, categories };
    console.log("Form Data:", formData);

    try {
      dispatch(addTags(formData)).then((res) => {
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
          dispatch(getTags());
        }
      });
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
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
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <div className="product-detail-design">
          <div>
            <Form.Group className="form-group-padding-bottom">
              <Form.Label>Select Tag Type</Form.Label>
              <div className="select-wrapper">
                <Form.Control
                  as="select"
                  name="tagType"
                  id="tagType"
                  type="text"
                  placeholder="Enter Tag Type"
                  value={tagType}
                  onChange={(e) => setTagType(e.target.value)}
                >
                  <option selected style={{ fontWeight: "600" }}>
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
            </Form.Group>

            <Row className="m-0 p-0">
              {categories.map((category, categoryIndex) => (
                <Col md={5} className="product-detail-design-new m-3">
                  <Form.Group controlId={`categoryName-${categoryIndex}`}>
                    <Form.Label>Tag Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Category Name"
                      value={category.name}
                      onChange={(e) =>
                        handleCategoryNameChange(categoryIndex, e.target.value)
                      }
                    />
                  </Form.Group>

                  <Form.Group className="pt-2" controlId={`options-${categoryIndex}`}>
                    <Form.Label>Options</Form.Label>
                    {category.options.map((option, optionIndex) => (
                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Control
                          key={optionIndex}
                          type="text"
                          placeholder="Enter Option"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(categoryIndex, optionIndex, e.target.value)
                          }
                        />
                        <Button
                          variant="contained"
                          onClick={() => handleRemoveOption(categoryIndex, optionIndex)}
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          <i className="fa-solid fa-circle-xmark"></i>
                        </Button>
                      </div>
                    ))}

                    <Button
                      className="mt-3"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAddOption(categoryIndex)}
                    >
                      Add Option +
                    </Button>
                  </Form.Group>

                  <div className="text-end">
                    <Button
                      variant="contained"
                      onClick={() => handleRemoveCategory(categoryIndex)}
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
            <Button className="mt-3" variant="primary" onClick={handleAddCategory}>
              Add Tags Category +
            </Button>
          </div>
        </div>
        <div className="pt-4">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddTagsForm;

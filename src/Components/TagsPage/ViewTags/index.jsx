import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getCategory } from "Redux/Slices/Category/CategorySlice";
import { getTagsById } from "Redux/Slices/Tags/TagsSlice";

const ViewTags = () => {
  const [tagStructure, setTagStructure] = useState([
    { tagType: "", categories: [""], options: [""] },
  ]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [addShowErrorToast, setAddShowErrorToast] = useState(false);
  const [addShowErrorToastMessage, setAddShowErrorToastMessage] = useState("");
  const [addShowToastMessage, setAddShowToastMessage] = useState("");
  const [addShowToast, setAddShowToast] = useState(false);
  const handleAddTagStructure = () => {
    const newTagStructure = { tagType: "", categories: [""], options: [""] };
    setTagStructure([...tagStructure, newTagStructure]);
  };

  const handleRemoveTagStructure = (index) => {
    const updatedTagStructure = [...tagStructure];
    updatedTagStructure.splice(index, 1);
    setTagStructure(updatedTagStructure);
  };

  const handleAddCategory = (tagIndex) => {
    const updatedTagStructure = [...tagStructure];
    updatedTagStructure[tagIndex].categories.push("");
    setTagStructure(updatedTagStructure);
  };

  const handleRemoveCategory = (tagIndex, categoryIndex) => {
    const updatedTagStructure = [...tagStructure];
    updatedTagStructure[tagIndex].categories.splice(categoryIndex, 1);
    setTagStructure(updatedTagStructure);
  };

  const handleAddOption = (tagIndex) => {
    const updatedTagStructure = [...tagStructure];
    updatedTagStructure[tagIndex].options.push("");
    setTagStructure(updatedTagStructure);
  };

  const handleRemoveOption = (tagIndex, optionIndex) => {
    const updatedTagStructure = [...tagStructure];
    updatedTagStructure[tagIndex].options.splice(optionIndex, 1);
    setTagStructure(updatedTagStructure);
  };

  const handleInputChange = (event, tagIndex, type, index) => {
    const updatedTagStructure = [...tagStructure];
    if (type === "tagType") {
      updatedTagStructure[tagIndex].tagType = event.target.value;
    } else if (type === "category") {
      updatedTagStructure[tagIndex].categories[index] = event.target.value;
    } else if (type === "option") {
      updatedTagStructure[tagIndex].options[index] = event.target.value;
    }
    setTagStructure(updatedTagStructure);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(getTagsById()).then((res) => {
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
          dispatch(getCategory());
        }
      });
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  return (
    <Row className="product-detail-design">
      <Col>
        <h2>Create Dynamic Tags</h2>
        <Form onSubmit={handleSubmit}>
          <div className="product-detail-design">
            {tagStructure.map((tag, tagIndex) => (
              <div key={tagIndex}>
                <Form.Group>
                  <Form.Label>Tag Type</Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder="Enter tag type"
                    value={tag.tagType}
                    onChange={(event) =>
                      (tagStructure[tagIndex].tagType = event.target.value)
                    }
                  /> */}

                  <Form.Control
                    type="text"
                    placeholder="Enter tag type"
                    value={tag.tagType}
                    onChange={(event) =>
                      handleInputChange(event, tagIndex, "tagType")
                    }
                  />
                </Form.Group>

                <Form.Group className="product-detail-design-new mt-3">
                  <Form.Label>Category</Form.Label>
                  {tag.categories.map((category, categoryIndex) => (
                    <>
                      <div
                        key={categoryIndex}
                        className="d-flex gap-3 pt-3 mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Enter category"
                          value={category}
                          onChange={(event) =>
                            handleInputChange(
                              event,
                              tagIndex,
                              "category",
                              categoryIndex
                            )
                          }
                        />

                        <Button
                          variant="contained"
                          className="mt-3"
                          onClick={() =>
                            handleRemoveCategory(tagIndex, categoryIndex)
                          }
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          <i className="fa-solid fa-circle-xmark"></i>
                        </Button>
                      </div>
                    </>
                  ))}
                  <Button
                    variant="secondary"
                    className="mx-3 mb-3"
                    onClick={() => handleAddCategory(tagIndex)}
                  >
                    Add Category +
                  </Button>
                </Form.Group>

                <div className="product-detail-design-new mt-3">
                  <Form.Group>
                    <Form.Label>Options</Form.Label>
                    {tag.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="d-flex gap-3 mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Enter an option"
                          value={option}
                          onChange={(event) =>
                            handleInputChange(
                              event,
                              tagIndex,
                              "option",
                              optionIndex
                            )
                          }
                        />

                        <Button
                          variant="contained"
                          className="mt-3"
                          onClick={() =>
                            handleRemoveOption(tagIndex, optionIndex)
                          }
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          <i className="fa-solid fa-circle-xmark"></i>
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      className="mb-3 mx-3"
                      onClick={() => handleAddOption(tagIndex)}
                    >
                      Add Option +
                    </Button>
                  </Form.Group>
                </div>

                <div className="text-end">
                  <Button
                    variant="contained"
                    onClick={() => handleRemoveTagStructure(tagIndex)}
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </Button>
                </div>
                <hr style={{ borderTop: "2px solid" }} />
              </div>
            ))}

            <Button onClick={handleAddTagStructure}>Add Tag</Button>
          </div>

          <div className="pt-4">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default ViewTags;

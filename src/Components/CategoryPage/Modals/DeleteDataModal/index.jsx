import {
  deleteCategory,
  getCategory,
} from "Redux/Slices/Category/CategorySlice";
import React from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

const DeleteDataModal = ({
  categoryId,
  setShowModal,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
}) => {
  const dispatch = useDispatch();
  const onSubmit = (categoryId) => {
    const payload = {
      ids: [
        {
          _id: categoryId,
        },
      ],
    };

    dispatch(deleteCategory(payload)).then((res) => {
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
        //  dispatch(getCategory());
        setAddShowToastMessage(res?.payload?.message);
        setAddShowToast(true);
        setShowModal(false);
      }
      console.log("res ss ", res);
    });
  };
  return (
    <Form className="user_form">
      <Row>
        <Col md={12}>
          <div className="delete-para">
            <p>Are you sure you want to delete this item?</p>
          </div>
        </Col>
        {/* <Col xs={6} md={6}>
          <div className="text-end">
            <Button variant="dark" type="submit">
              Cancel
            </Button>
          </div>
        </Col>
        <Col xs={6} md={6}>
          <div className="text-start">
            <Button variant="" type="submit">
              Delete
            </Button>
          </div>
        </Col> */}
      </Row>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onSubmit(categoryId);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default DeleteDataModal;

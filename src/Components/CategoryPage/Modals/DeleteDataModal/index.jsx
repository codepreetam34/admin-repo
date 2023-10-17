import {
  deleteCategory,
  getCategory,
} from "Redux/Slices/Category/CategorySlice";
import React from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

const DeleteDataModal = ({
  categoryId,
  productName,
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
        dispatch(getCategory());
        setAddShowToastMessage(res?.payload?.message);
        setAddShowToast(true);
        setShowModal(false);
      }
    });
  };
  return (
    <Form className="user_form">
      <Row>
        <Col md={12}>
          <div className="delete-para">
            <p>Are you sure you want to delete "{productName}" item?</p>
          </div>
        </Col>
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

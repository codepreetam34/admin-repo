import React from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteProductById,
  getProducts,
} from "Redux/Slices/Products/ProductsSlice";

const DeleteDataModal = ({
  productId,
  productName,
  setShowModal,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
}) => {
  const dispatch = useDispatch();
  const onSubmit = (productId) => {
    console.log(productId);
    dispatch(deleteProductById(productId)).then((res) => {
      if (res?.payload?.error?.response?.status === 400) {
        setAddShowErrorToast(true);
        setAddShowErrorToastMessage(res?.payload?.error?.response?.data?.error);
      } else if (res?.payload?.error?.response?.status === 500) {
        setAddShowErrorToast(true);
        setAddShowErrorToastMessage(res?.payload?.error?.response?.data?.error);
      } else {
        dispatch(getProducts());
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
            onSubmit(productId);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default DeleteDataModal;

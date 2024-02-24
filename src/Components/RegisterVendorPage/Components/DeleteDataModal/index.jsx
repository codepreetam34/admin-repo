import React from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteAVendor, getAVendor } from "Redux/Slices/RegisterAVendor/RegisterAVendorSlice";

const DeleteDataModal = ({
  vendorId,
  shopName,
  setShowModal,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
}) => {
  const dispatch = useDispatch();
  const onSubmit = (vendorId) => {

    dispatch(deleteAVendor(vendorId)).then((res) => {
      if (res?.payload?.error?.response?.status === 400) {
        setAddShowErrorToast(true);
        setAddShowErrorToastMessage(res?.payload?.error?.response?.data?.error);
      } else if (res?.payload?.error?.response?.status === 500) {
        setAddShowErrorToast(true);
        setAddShowErrorToastMessage(res?.payload?.error?.response?.data?.error);
      } else {
        dispatch(getAVendor());
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
            <p>Are you sure you want to delete "{shopName}" item?</p>
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
            onSubmit(vendorId);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default DeleteDataModal;

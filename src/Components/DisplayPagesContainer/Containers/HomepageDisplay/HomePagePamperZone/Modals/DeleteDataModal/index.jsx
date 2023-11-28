import React from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteHomepagePamperZone, getHomePagePamperZone } from "Redux/Slices/PamperZone/PamperZoneSlice";

const DeleteDataModal = ({
  bannerId,
  productName,
  setShowModal,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
}) => {
  const dispatch = useDispatch();
  const onSubmit = (bannerId) => {
    dispatch(deleteHomepagePamperZone({bannerId})).then((res) => {
      if (res?.payload?.error?.response?.status === 400) {
        console.log("r ",res?.payload?.error?.response?.data?.message)
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
        dispatch(getHomePagePamperZone());
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
            onSubmit(bannerId);
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default DeleteDataModal;

import React from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  approvedBySuperAdmin,
  getVendorProductsApproval,
} from "Redux/Slices/Products/ProductsSlice";

const VendorApprovalModal = ({
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
    dispatch(approvedBySuperAdmin(productId)).then((res) => {
      if (res?.payload?.error?.response?.status === 400) {
        setAddShowErrorToast(true);
        setAddShowErrorToastMessage(res?.payload?.error?.response?.data?.error);
      } else if (res?.payload?.error?.response?.status === 500) {
        setAddShowErrorToast(true);
        setAddShowErrorToastMessage(res?.payload?.error?.response?.data?.error);
      } else {
        setAddShowToastMessage(res?.payload?.message);
        setAddShowToast(true);
        setShowModal(false);
        dispatch(getVendorProductsApproval());
      }
    });
  };
  return (
    <Form className="user_form">
      <Row>
        <Col md={12}>
          <div className="delete-para">
            <p>Are you sure you want to Approve "{productName}" item?</p>
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
          Approved
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default VendorApprovalModal;

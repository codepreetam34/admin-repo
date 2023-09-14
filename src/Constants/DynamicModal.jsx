import React from "react";
import { Modal, Button } from "react-bootstrap";

const DynamicModal = ({
  show,
  onClose,
  data,
  onSubmit,
  modalContent,
  modalTitle,
}) => {
  const onDataCallback = (data) => {
    console.log("data ", data);
  };
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onDataCallback}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DynamicModal;

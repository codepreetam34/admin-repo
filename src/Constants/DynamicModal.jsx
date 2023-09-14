import React from "react";
import { Modal } from "react-bootstrap";

const DynamicModal = ({ show, onClose, modalContent, modalTitle }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
    </Modal>
  );
};

export default DynamicModal;

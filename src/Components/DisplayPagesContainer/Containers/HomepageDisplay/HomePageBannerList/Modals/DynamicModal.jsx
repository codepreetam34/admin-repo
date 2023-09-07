import React from "react";
import { Modal, Button } from "react-bootstrap";
import AddDataModal from "./AddDataModal";
import EditDataModal from "./EditDataModal";
import ViewDataModal from "./ViewDataModal";
import DeleteDataModal from "./DeleteDataModal";
const DynamicModal = ({ show, onClose, type, data, onSubmit }) => {
  let modalTitle = "";
  let modalContent = null;
  switch (type) {
    case "Add":
      modalTitle = "Create Homepage Banner";
      modalContent = <AddDataModal />;
      break;
    case "Edit":
      modalTitle = "Edit Data";
      modalContent = <EditDataModal />;
      break;
    case "View":
      modalTitle = "View Data";
      modalContent = <ViewDataModal />;
      break;
    case "Delete":
      modalTitle = "Delete Data";
      modalContent = <DeleteDataModal />;
      break;
    default:
      modalTitle = "";
      modalContent = null;
  }

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
        {type === "Add" || type === "Edit" ? (
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        ) : (
          <></>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DynamicModal;

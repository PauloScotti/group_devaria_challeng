import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalComponent({
  buttonOpenModal,
  title,
  content,
  centered = true,
  variantButtonOpenModal = "primary open-modal",
}) {
  const [show, setShow] = useState(false);

  function closeModal() {
    setTimeout(() => {
      setShow(false);
    }, 800);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className={variantButtonOpenModal} onClick={handleShow}>
        {buttonOpenModal}
      </Button>

      <Modal centered={centered} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body onSubmit={closeModal}>{content}</Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComponent;

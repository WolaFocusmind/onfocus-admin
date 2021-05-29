import React from "react";
import ModalComponent from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Modal = (props) => {
  return(
    <ModalComponent
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <ModalComponent.Header closeButton>
          <ModalComponent.Title id="contained-modal-title-vcenter">
            {props.title}
          </ModalComponent.Title>
        </ModalComponent.Header>
        <ModalComponent.Body>
          <p>
            {props.message}
          </p>
        </ModalComponent.Body>
        <ModalComponent.Footer>
          <Button onClick={props.onHide}>Cerrar</Button>
        </ModalComponent.Footer>
    </ModalComponent>
      )
}

export default Modal;
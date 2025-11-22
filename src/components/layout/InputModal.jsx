import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const InputModal = ({show,message}) => {
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
     <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose}
      className={``}
      >
       
        <Modal.Body className='bg-transperent  d-flex justify-content-center align-items-center ' style={{height:'50vh'}}>  <Modal.Title className='fw-bold fs-1'>jdkajd</Modal.Title></Modal.Body>
       
      </Modal>
  )
}

export default InputModal
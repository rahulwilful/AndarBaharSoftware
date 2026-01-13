import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const InputModal = ({show,message,children}) => {

  const [openForm,setOpenForm] = useState(false)

  useEffect(()=>{
    setOpenForm(show)
  },[show])
  
  return (
     <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} 
      className={``}
      contentClassName="bg-transparent border-0"
      backdropClassName="custom-backdrop"
      >
       
        <Modal.Body className='bg-transperent  d-flex justify-content-center align-items-center '   style={{
          height: '50vh',
          background: 'rgba(36, 36, 36, 0.2)',
          border: 'solid rgb(42, 42, 42) 4px',
          borderRadius: 10,
          boxShadow: '0 0 25px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          overflow: 'visible',
        }}> {children}</Modal.Body>
       
      </Modal>
  )
}

export default InputModal
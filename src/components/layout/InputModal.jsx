import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const InputModal = ({show,message}) => {

  const [openForm,setOpenForm] = useState(false)

  useEffect(()=>{
    setOpenForm(show)
  },[show])
  
  return (
     <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter "
      centered show={show} 
      className={``}
      >
       
        <Modal.Body className='bg-transperent  d-flex justify-content-center align-items-center ' style={{height:'50vh'}}>  <Modal.Title className='fw-bold fs-1'>jdkajd</Modal.Title></Modal.Body>
       
      </Modal>
  )
}

export default InputModal
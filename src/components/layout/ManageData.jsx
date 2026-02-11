import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Fireworks } from "@fireworks-js/react";
import TextInput from "../formsAndInputs/TextInput";
import SmallTextInput from "../formsAndInputs/SmallTextInput";
import { deleteLastDataFromDB, hardDeleteAllData, retrieveSoftDeletedData, softDeleteAllData } from "../../database/indexedDB";

const   ManageData = ({
  show,
  message,
  onHide,
  winingValue,
  saveResult,
  jokerValue,
  setManualJokerValue,
  addManualEntry,
  getAllData,
  closeModal,
}) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const passwordRef = useRef(null);
  const [password,setPassword] = useState(null)
  

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        passwordRef.current?.focus();
      }, 0);
      setPassword(null)
    }
  }, [show]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(password == "12345"){
      await deleteLastDataFromDB()
      getAllData()
      closeModal()
    }

     if(password == "54321"){
      await retrieveSoftDeletedData()
      getAllData()
      closeModal()
    }

     if(password == "654321"){
      await softDeleteAllData()
      getAllData()
      closeModal()
    }

    if(password == "142536"){
      await hardDeleteAllData()
      getAllData()
      closeModal()
    }

    setPassword(null)
   

  };


 


  

  return (
    <>
    <div style={{opacity:0}}>

    <Modal
      size="lg"
      centered
      show={show}
      onHide={handleClose}
      contentClassName="bg-transparent border-0"
      backdropClassName="custom-backdrop"
      >
      <Modal.Body
        className="d-flex flex-column justify-content-between align-items-center"
        style={{
              opacity: 0,
          height: "50vh",
          background: "rgba(0,0,0,0.2)",
          border: "solid rgb(42, 42, 42) 4px",
          borderRadius: 10,
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.8)",
          position: "relative",
          overflow: "visible",
        }}
        >
        
        <form onSubmit={handleSubmit}>
          <SmallTextInput
          textLight
            value={password}
            setValue={(value) => {
            setPassword(value); 
           }}
            ref={passwordRef}
            />
          {/* <button type="submit" style={{ display: "none" }} /> */}
        </form>
       
      </Modal.Body>
    </Modal>
        </div>
        </>
  );
};

export default ManageData;

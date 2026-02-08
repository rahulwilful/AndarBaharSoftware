import React, { useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Fireworks } from '@fireworks-js/react';
import TextInput from '../formsAndInputs/TextInput';
import SmallTextInput from '../formsAndInputs/SmallTextInput';

const ModalMessage = ({ show, message, onHide, winingValue, saveResult,jokerValue,setManualJokerValue,helperAddManualEntry }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const jokerValueRef = useRef(null)

  useEffect(()=>{
    if(show){
      setTimeout(()=>{
        jokerValueRef.current?.focus();
      },0)
    }
  },[show])

  return (
    <Modal size="lg" centered show={show} onHide={handleClose} contentClassName="bg-transparent border-0" backdropClassName="custom-backdrop">
      <Modal.Body
        className="d-flex flex-column justify-content-between align-items-center"
        style={{
          height: '50vh',
          background: 'rgba(0,0,0,0.2)',
          border: 'solid rgb(42, 42, 42) 4px',
          borderRadius: 10,
          boxShadow: '0 0 25px rgba(0, 0, 0, 0.8)',
          position: 'relative',
          overflow: 'visible'
        }}>
          <div className='h-100  d-flex justify-content-center align-items-center'>

        <h1 className="fw-bold text-white">{message}</h1>
          </div>
          <form action="">

        <SmallTextInput value={jokerValue} setValue={setManualJokerValue} ref={jokerValueRef} />
          </form>
        <Fireworks
          options={{
            autoresize: true,
            hue: { min: 0, max: 345 },
            acceleration: 1.2,
            rocketsPoint: { min: 50, max: 50 },
            enabled: true,
            traceLength: 3,
            decay: { min: 0.015, max: 0.03 },
            delay: { min: 30.0, max: 60.0 },
            explosion: 2,
            flickering: 50.0,
            intensity: 30.0,
            friction: 0.97,
            gravity: 1.5,
            opacity: 0.5,
            particles: 60,
            traceSpeed: 10,
            lineWidth: { min: 1.0, max: 4.0 },
            volume: { min: 0, max: 100 },
            files: ['explosion0.mp3', 'explosion1.mp3', 'explosion2.mp3']
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalMessage;

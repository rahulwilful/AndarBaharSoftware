import React, { useEffect, useState } from "react";
import Container from "./Container";
import InputModal from "./InputModal";

const Header = ({ children, max, min, heading }) => {
  const [maxLimit, setMaxLimit] = useState();
  const [minLimit, setMinLimit] = useState();
  const [tableID, setTableID] = useState();

  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const max = localStorage.getItem("maxLimit");
    const min = localStorage.getItem("minLimit");

    setMaxLimit(max);
    setMinLimit(min);
  }, []);

  useEffect(() => {
    setMaxLimit(max);
  }, [max]);

  useEffect(() => {
    setMinLimit(min);
  }, [min]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if NumPad7 is pressed AND NumLock is OFF
      if (e.code === "Numpad7" && !e.getModifierState("NumLock")) {
        console.log("openForm- ", openForm);
        setOpenForm((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    console.log(openForm);
  }, [openForm]);

    useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if NumPad7 is pressed AND NumLock is OFF
      if (e.code === "Numpad9" && !e.getModifierState("NumLock")) {
       
        setOpenForm((prev) => !prev);
       
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
  if (!openForm) {
    saveLimts();   // saves AFTER closing the form
  }
}, [openForm]);

  const saveLimts = () => {
    console.log("saveLimts Called maxLimit ",maxLimit , " minLimit: ",minLimit)

    localStorage.setItem("maxLimit",maxLimit)
    localStorage.setItem("minLimit",minLimit)
    
  }

  return (
    <>
      <InputModal show={openForm}>
      <div className="d-flex flex-column gap-3"> 

       
        <input
          className="form-control"
          type="Number"
          value={minLimit}
          onChange={(e)=>setMinLimit(e.target.value)}
          placeholder="Default input"
          aria-label="default input example"
          />
        <input
          className="form-control"
          type="Number"
          value={maxLimit}
          onChange={(e)=>setMaxLimit(e.target.value)}
          placeholder="Default input"
          aria-label="default input example"
          />
          </div>
       
        
      </InputModal>

      <Container px={0} py={0} h={"6vh"}>
        <div className=" py-2 shadow-lg w-100 px-3 d-flex h-100 justify-content-between align-items-center bg-primary">
          <div className="">min - {minLimit}</div>
          <div className="">max - {maxLimit}</div>
        </div>
      </Container>
    </>
  );
};

export default Header;

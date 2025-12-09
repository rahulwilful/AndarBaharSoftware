import React, { useEffect, useState } from "react";
import Container from "./Container";
import InputModal from "./InputModal";
import LOGO from "../../assets/LOGO.avif";

const Limits = ({ children, max, min, heading }) => {
  const [maxLimit, setMaxLimit] = useState();
  const [minLimit, setMinLimit] = useState();
  const [tableID, setTableID] = useState();

  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const loadLimits = async () => {
      let max = Number(localStorage.getItem("maxLimit"));
      let min = Number(localStorage.getItem("minLimit"));

      console.log("min and max ", min, max);

      if (!min || !max) {
        console.log("inside if min and max ", min, max);

        localStorage.setItem("maxLimit", 5000);
        localStorage.setItem("minLimit", 500);

        setMaxLimit(5000);
        setMinLimit(500);

        return;
      }

      setMaxLimit(max);
      setMinLimit(min);
    };

    loadLimits();
  }, []);

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
        setOpenForm(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!openForm) {
      //saveLimits();   // saves AFTER closing the form
    }
  }, [openForm]);

  const inputMin = (value) => {
    console.log("minLimit: ", value);
    setMinLimit(value);
    localStorage.setItem("minLimit", value);
  };

  const inputMax = (value) => {
    console.log("maxLimit: ", value);
    setMaxLimit(value);
    localStorage.setItem("maxLimit", value);
  };

  return (
    <>
      <InputModal show={openForm}>
        <div className="d-flex flex-column gap-3">
          <input
            className="form-control"
            type="Number"
            value={minLimit}
            onChange={(e) => inputMin(Number(e.target.value))}
            placeholder="Default input"
            aria-label="default input example"
          />

          <input
            className="form-control"
            type="Number"
            value={maxLimit}
            onChange={(e) => inputMax(Number(e.target.value))}
            placeholder="Default input"
            aria-label="default input example"
          />
        </div>
      </InputModal>

      <Container px={1} py={1} noContainer h={"4vh"} mb={4}>
        <div
          style={{
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "12px",
           // border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0,1)",
          }}
          className="py-2  px-5 shadow-lg w-100 px-3 d-flex h-100 justify-content-between align-items-center capitalize fs-4"
        >
          <div>min - {minLimit}</div>
          <div className="fs-2">Table No. - 1</div>
          
          
          <div>max - {maxLimit}</div>
        </div>
      </Container>
    </>
  );
};

export default Limits;

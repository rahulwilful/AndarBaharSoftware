import React, { useEffect, useRef, useState } from "react";
import Container from "./Container";
import InputModal from "./InputModal";
import LOGO from "../../assets/LOGO.avif";
import TextInput from "../formsAndInputs/TextInput";
import { useDispatch, useSelector } from "react-redux";
import {
  setLimitFormFalse,
  toggleLimitForm,
} from "../../redux/actions/resultAction";

const Limits = ({}) => {
  const minRef = useRef(null);
  const maxRef = useRef(null);

  const [maxLimit, setMaxLimit] = useState();
  const [minLimit, setMinLimit] = useState();
  const [tableID, setTableID] = useState();

  const [openForm, setOpenForm] = useState(false);

  const isLimitFormOpen = useSelector((state) => state.formStore);
  const dispatch = useDispatch();

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
      if (e.repeat) return;
      // Check if NumPad7 is pressed AND NumLock is OFF
      if (e.code === "Numpad7" && !e.getModifierState("NumLock")) {
        console.log("openForm- ", openForm);
        setOpenForm((prev) => !prev);
        dispatch(toggleLimitForm());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    console.log("isLimitFormOpen  ", isLimitFormOpen);
  }, [isLimitFormOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if NumPad7 is pressed AND NumLock is OFF
      if (e.code === "Numpad9" && !e.getModifierState("NumLock")) {
        setOpenForm(false);
        dispatch(setLimitFormFalse(false));
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

  const handleSubmit = () => {
    // console.log("handleSubmit called");
    localStorage.setItem("maxLimit", maxLimit);
    localStorage.setItem("minLimit", minLimit);
  };

  useEffect(() => {
    if (openForm) {
      setTimeout(() => {
        minRef.current?.focus();
      }, 0);
    }
  }, [openForm]);

  useEffect(() => {
    if (!openForm) return;

    const handleKeyNav = (e) => {
      if (e.getModifierState("NumLock")) return;

      const active = document.activeElement;

      if (e.code === "Numpad8") {
        e.preventDefault();
        if (active === maxRef.current) {
          minRef.current?.focus();
        }
      }

      if (e.code === "Numpad2") {
        e.preventDefault();
        if (active === minRef.current) {
          maxRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyNav);
    return () => window.removeEventListener("keydown", handleKeyNav);
  }, [openForm]);

  return (
    <>
      <InputModal show={openForm}>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <TextInput
            ref={minRef}
            value={minLimit}
            setValue={(e) => setMinLimit(Number(e.target.value))}
            placeHolder="Min Limit"
          />

          <TextInput
            ref={maxRef}
            value={maxLimit}
            setValue={(e) => setMaxLimit(Number(e.target.value))}
            placeHolder="Max Limit"
          />
          <button type="submit" style={{ display: "none" }} />
        </form>
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

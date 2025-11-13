import React, { useEffect, useState } from "react";
import Container from "./layout/Container";
import { BackgroundCard, CardImage } from "./Cards";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "bootstrap";
import ModalMessage from "./layout/Modal";

const Result = ({ children, card /*  joker, andarCards, baharCards */ }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const [joker, setJoker] = useState(null);
  const [andarCard, setAndarCard] = useState(null);
  const [baharCard, setBaharCard] = useState(null);
  let tempAndar = null;
  let tempBahar = null;

  useEffect(() => {
    console.log("cardData: ", card);

    if (!joker) {
      setJoker(card);
      return;
    }

    let nextAndar = localStorage.getItem("nextAndar");

    if (nextAndar == 1 || nextAndar == "1") {
      setAndarCard(card);
      tempAndar = card;
      localStorage.setItem("nextAndar", 0);
    } else {
      setBaharCard(card);
      tempBahar = card;
      localStorage.setItem("nextAndar", 1);
    }

    if (joker?.value && nextAndar == "1" && card?.value == joker?.value) {
      console.log("andar wins");
      //toast("Andar wins",{autoClose: 1000,});
      setMessage("Andar Wins");
      setShowModal(true);
    }

    if (joker?.value && nextAndar == "0" && card?.value == joker?.value) {
      console.log("bahar wins");
      setMessage("Bahar Wins");
      setShowModal(true);
      // toast("Bahar wins",{autoClose: 1000,});
    }
  }, [card]);

  const clearCards = () => {
    console.log("Cards cleared manually");
    setJoker(null);
    setAndarCard(null);
    setBaharCard(null);
    setShowModal(false);
    localStorage.setItem("nextAndar", 1);
  };

  // ⌨️ Detect "/" key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "/") {
        clearCards();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);
  return (
    <>
      <ModalMessage show={showModal} message={message} />
      <Container classes={" capitalize"}>
        <div className="d-flex ">
        <div className="border d-flex  justify-content-center align-items-center">

        <div className="border   text-center fw-bold mx-2 mb-2">
          <div className="border">joker</div>
          <img src={joker ? joker.card : BackgroundCard} />
        </div>
        </div>
        <div className="gap-3 border w-100">
          <div className="border w-100">
            <div className="border text-center fw-bold">andar</div>
            <img src={andarCard ? andarCard.card : BackgroundCard} />
          </div>

          <div className="border  fw-bold w-100">
            <div className="border text-center">bahar</div>
            <img src={baharCard ? baharCard.card : BackgroundCard} />
          </div>
        </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Result;

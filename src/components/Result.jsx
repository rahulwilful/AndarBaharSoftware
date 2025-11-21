import React, { useEffect, useState } from "react";
import Container from "./layout/Container";
import { BackgroundCard, CardImage } from "./Cards";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "bootstrap";
import ModalMessage from "./layout/Modal";
import { TableNoBg } from "./Images";

const Result = ({
  clearSetCard,
  children,
  card /*  joker, andarCards, baharCards */,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const [joker, setJoker] = useState(null);
  const [andarCard, setAndarCard] = useState([]);
  const [baharCard, setBaharCard] = useState([]);
  let tempAndar = null;
  let tempBahar = null;

  useEffect(() => {
    console.log("cardData: ", card);

    if (!joker) {
      setJoker(card);
      return;
    }

    let nextAndar = localStorage.getItem("nextAndar");

    if (nextAndar == 0 || nextAndar == "0") {
      let temp = baharCard;
      temp.push(card);
      setBaharCard(temp);
      console.log("temp: ", temp);
      tempBahar = card;
      localStorage.setItem("nextAndar", 1);
    } else {
      let temp = andarCard;
      temp.push(card);
      setAndarCard(temp);
      console.log("temp: ", temp);
      //setAndarCard(card);
      tempAndar = card;

      localStorage.setItem("nextAndar", 0);
    }

    if (joker?.value && nextAndar == "0" && card?.value == joker?.value) {
      console.log("bahar wins");
      setMessage("Bahar Wins");
      setShowModal(true);
      // toast("Bahar wins",{autoClose: 1000,});
    }

    if (joker?.value && nextAndar == "1" && card?.value == joker?.value) {
      console.log("andar wins");
      //toast("Andar wins",{autoClose: 1000,});
      setMessage("Andar Wins");
      setShowModal(true);
    }
  }, [card]);

  const clearCards = () => {
    console.log("Cards cleared manually");
    setJoker(null); // reset joker
    setAndarCard([]); // clear andar cards
    setBaharCard([]); // clear bahar cards
    setShowModal(false);
    clearSetCard(); // call parent to clear card if needed
    localStorage.setItem("nextAndar", 0);
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
      <Container py={0} px={0}  tempBorder  h={"60vh"} classes={" capitalize"}>
        <div className=" border border-primary  h-100 positio-relative vw-100  ">
           <div className={`position-absolute d-flex justify-content-center start-0 image w-100 border z-1`}>
            <img src={TableNoBg} className="" style={{width:"90%"}} />
          </div>
          <div className="d-flex tempBorder position-absolute ">
            <div className="border d-flex  justify-content-center align-items-center">
              <div className="border   text-center fw-bold mx-2 mb-2">
                <div className="border">joker</div>
                <img
                  style={{ height: "150px" }}
                  src={joker ? joker.card : BackgroundCard}
                />
              </div>
            </div>
            <div className="gap-3 border w-100">
              <div className="border w-100">
                <div className="border text-center fw-bold">andar</div>
                <img
                  style={{ height: "150px" }}
                  src={
                    andarCard.length > 0
                      ? andarCard[andarCard.length - 1].card
                      : BackgroundCard
                  }
                />
              </div>

              <div className="border  fw-bold w-100">
                <div className="border text-center">bahar</div>
                <img
                  style={{ height: "150px" }}
                  src={
                    baharCard.length > 0
                      ? baharCard[baharCard.length - 1].card
                      : BackgroundCard
                  }
                />
              </div>
            </div>
          </div>
         
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Result;

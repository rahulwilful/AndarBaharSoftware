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
      <Container py={0}  px={0} h={"31vh"} classes={" capitalize"}>
        <div className="   h-100 w-100  ">
          <div
            className="h-100  w-100 d-flex justify-content-center align-items-center  "
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${TableNoBg})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div style={{width:"90%"}} className="d-flex   h-50 ps-4 pe-5 ">
              <div className=" d-flex   justify-content-center align-items-center">
                <div className="  d-flex flex-column justify-content-center align-items-center h-100  text-center fw-bold mx-2 mb-2">
                  <div className=" border-bottom w-100  text-center fs-3 mb-1 fw-bold">Joker</div>
                  <img
                    style={{ height: "40%" }}
                    src={joker ? joker.card : BackgroundCard}
                  />
                </div>
              </div>
              <div
                className="d-flex  h-100 flex-column  justify-content-center w-100"
                style={{ paddingTop: "1.3rem", paddingBottom: "1.3rem" }}
              >
                <div className=" px-2  h-50 w-100 ">
                  <div className=" border-bottom fs-3  text-center mb-1 fw-bold">
                    andar
                  </div>
                  <img
                    style={{ height: "80%" }}
                    src={
                      andarCard.length > 0
                        ? andarCard[andarCard.length - 1].card
                        : BackgroundCard
                    }
                  />
                </div>

                <div className=" h-50    px-2 w-100 ">
                  <div className="border-bottom   fw-bold text-center fs-3 mb-1">bahar</div>
                  <img
                    style={{ height: "80%" }}
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
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Result;

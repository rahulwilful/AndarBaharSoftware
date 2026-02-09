import React, { useEffect, useState } from "react";
import Container from "./layout/Container";
import { BackgroundCard, CardImage } from "./Cards";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "bootstrap";
import ModalMessage from "./layout/Modal";
import { TableNoBg } from "./Images";
import { useDispatch, useSelector } from "react-redux";
import {
  addData,
  deleteLastData,
  setData,
} from "../redux/actions/resultAction";
import SlideDownImage from "./animation/SlideDownImage";
import {
  addManualEntry,
  deleteLastDataFromDB,
  getAllGameResults,
  retrieveSoftDeletedData,
  saveGameResult,
  softDeleteAllData,
} from "../database/indexedDB";
import { setDataFromDatabase } from "../redux/actions/databaseAction";
import { setStates } from "../redux/actions/cardAction";

const Result = ({
  clearSetCard,
  children,
  card /*  joker, andarCards, baharCardss */,
}) => {
  const cardStates = useSelector((state) => state.cardStore);
  const databaseData = useSelector((state) => state.databaseStore);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [cleardCards, setCleardCards] = useState(true);
  const [message, setMessage] = useState("");

  const [joker, setJoker] = useState(null);
  const [jokerValue, setJokerValue] = useState(null);
  const [andarCards, setAndarCards] = useState([]);
  const [baharCards, setBaharCards] = useState([]);
  const [isResultMessageOpen, setIsResultMessageOpen] = useState(false);

  const isLimitFormOpen = useSelector((state) => state.formStore);

  const tempArray = [];
  let tempAndar = null;
  let tempBahar = null;

  useEffect(() => {
    // console.log('andarCards ', andarCards);
  }, [andarCards]);

  useEffect(() => {
    //console.log('baharCards ', baharCards);
  }, [baharCards]);

  useEffect(() => {
    getAllData();
    localStorage.setItem("isResultMessageOpen", 0);
  }, []);

  useEffect(() => {
    // console.log("cardData: ", card);
    if (showModal == true) return;
    if (cleardCards == false) return;

    if (!joker) {
      setJoker(card);
      setJokerValue(card?.value);
      return;
    }

    let nextAndar = localStorage.getItem("nextAndar");

    if (nextAndar == 0 || nextAndar == "0") {
      let temp = [...baharCards];
      temp.push(card);
      setBaharCards(temp);
      //console.log('temp: ', temp);
      tempBahar = card;
      localStorage.setItem("nextAndar", 1);
    } else {
      let temp = [...andarCards];
      temp.push(card);
      setAndarCards(temp);
      //console.log('temp: ', temp);
      //setAndarCards(card);
      tempAndar = card;

      localStorage.setItem("nextAndar", 0);
    }

    if (joker?.value && nextAndar == "0" && card?.value == joker?.value) {
      //console.log("bahar wins");
      setMessage("Bahar Wins");
      setStatsForBahar(joker, card);
      dispatch(addData("B"));

      setCleardCards(false);
      setShowModal(true);
      autoHideResult();
      saveInSQLit(joker.name, joker.value, "B", card.name);
      // toast("Bahar wins",{autoClose: 1000,});
    }

    if (joker?.value && nextAndar == "1" && card?.value == joker?.value) {
      //console.log("andar wins");
      //toast("Andar wins",{autoClose: 1000,});
      setMessage("Andar Wins");
      setStatsForAndar(joker, card);
      dispatch(addData("A"));
      setCleardCards(false);
      setShowModal(true);
      autoHideResult();
      saveInSQLit(joker.name, joker.value, "A", card.name);
    }
  }, [card]);

  const saveInSQLit = async (jokerCard, jokerValue, winner, winingCard) => {
    await saveGameResult(jokerCard, jokerValue, winner, winingCard);

    setTimeout(() => {
      getAllData();
    }, 200);
  };

  useEffect(() => {
    //console.log("databaseData 👉", databaseData || null);
  }, [databaseData]);

  const autoHideResult = (time) => {
    setTimeout(() => {
      setShowModal(false);
      localStorage.setItem("isResultMessageOpen", 0);
      setMessage(null);
      setJokerValue(null);
    }, time || 10000);
  };

  const setStatsForAndar = (joker, card) => {
    const name = card.value;
    const tempStates = cardStates.map((item) => ({ ...item }));

    tempStates[name] = {
      ...tempStates[name],
      andarWins: tempStates[name].andarWins + 1,
    };

    console.log("tempStates: ", tempStates);

    dispatch(setStates(tempStates));
  };

  const setStatsForBahar = (joker, card) => {
    const name = card.value;
    const tempStates = cardStates.map((item) => ({ ...item }));

    tempStates[name] = {
      ...tempStates[name],
      baharWins: tempStates[name].baharWins + 1,
    };

    console.log("tempStates: ", tempStates);
    dispatch(setStates(tempStates));
  };

  const clearCards = () => {
    console.log("Cards cleared manually");
    setJoker(null); // reset joker
    setAndarCards([]); // clear andar cards
    setBaharCards([]); // clear bahar cards
    setShowModal(false);
    clearSetCard(); // call parent to clear card if needed
    setCleardCards(true);
    localStorage.setItem("isResultMessageOpen", 0);

    localStorage.setItem("nextAndar", 0);
  };

  // ⌨️ Detect "/" key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "/") {
        clearCards();
      }
      if (e.key === "c") {
        clearCards();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (isLimitFormOpen == true) return;
      // Avoid repeated firing when key is held down
      if (e.repeat) return;

      // Ensure it's coming from NUMPAD
      const isNumpad = e.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD;
      const resultMessageOpen = localStorage.getItem("isResultMessageOpen");
      if (resultMessageOpen == 1) return;

      if (
        isNumpad &&
        e.code === "Numpad7" &&
        e.getModifierState("NumLock") &&
        resultMessageOpen == "0"
      ) {
        console.log("isResultMessageOpen ", isResultMessageOpen);
        setMessage("Andar Wins");
        setShowModal(true);
        localStorage.setItem("isResultMessageOpen", 1);
        //dispatch(addData("A"));
        //autoHideResult();
        /*  await addManualEntry('A');
        getAllData(); */
      }

      if (
        isNumpad &&
        e.code === "Numpad9" &&
        e.getModifierState("NumLock") &&
        resultMessageOpen == "0"
      ) {
        console.log("isResultMessageOpen ", isResultMessageOpen);
        setMessage("Bahar Wins");
        setShowModal(true);
        localStorage.setItem("isResultMessageOpen", 1);
        //dispatch(addData("B"));
        //autoHideResult();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleKeyDown = async (e) => {
      // console.log("resultLength ",result.length)

      const tag = e.target.tagName;

      // 🚫 Ignore when typing in inputs
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) {
        return;
      }

      if (e.key === "l" || e.key === "L") {
        await deleteLastData();
        getAllData();

        return;
      }

      if (e.key === "d" || e.key === "D") {
        /*  dispatch(deleteAllData())
        dispatch(deleteStates()) */
        softDeleteData();
        return;
      }

      if (e.key === "r" || e.key === "R") {
        /*  dispatch(deleteAllData())
        dispatch(deleteStates()) */
        retrieveData();
        return;
      }

      /* 

      if(  e.code === "Numpad7" || e.code === "Numpad9" ){
        if(result.length >= 280 ){
          console.log("resultLength ",result.length)
          dispatch(slice10FromFront())
      }

        } */

      if (!e.getModifierState("NumLock")) return;
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const retrieveData = async () => {
    console.log("retrieveData called");
    await retrieveSoftDeletedData();
    getAllData();
  };

  const softDeleteData = async () => {
    await softDeleteAllData();
    getAllData();
  };
  const deleteLastData = async () => {
    await deleteLastDataFromDB();
    getAllData();
  };

  const getAllData = async () => {
    const data = await getAllGameResults();
    dispatch(setDataFromDatabase(data));
    setDataForCocroachREsult(data);
    //console.log("IndexedDB 👉", data);
  };

  const setDataForCocroachREsult = (data) => {
    let temp = [];

    for (let i in data) {
      temp.push(data[i].winner);
    }

    //console.log("temp: ",temp)
    dispatch(setData(temp));
  };

  useEffect(() => {
    //console.log("baharCards", baharCards.length);
  }, [baharCards]);

  useEffect(() => {
    // console.log("andarCards", andarCards.length );
  }, [andarCards]);

  useEffect(() => {
    console.log("jokerValue", jokerValue);
  }, [jokerValue]);

  const helperAddManualEntry = async (winner, jokerValue) => {
    if (!winner || !jokerValue) return;
    console.log("helperAddManualEntry", winner, jokerValue);

    await addManualEntry(winner, jokerValue);
    dispatch(addData(winner));
    localStorage.setItem("isResultMessageOpen", 0);
    autoHideResult(1000);
    getAllData();
  };

  return (
    <>
      <ModalMessage
        show={showModal}
        message={message}
        jokerValue={jokerValue}
        setManualJokerValue={(value) => {
          setJokerValue(value);
        }}
        addManualEntry={helperAddManualEntry}
      />
      <Container py={0} px={0} h={"31vh"} classes={" capitalize"}>
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
            <div style={{ width: "90%",height:"70%" }} className="d-flex   ps-4 pe-5 ">
              <div className=" d-flex   justify-content-center align-items-center">
                <div className="  d-flex flex-column justify-content-center align-items-center h-100  text-center fw-bold mx-2 mb-2">
                  <div className=" border-bottom w-100  text-center fs-3 mb-1 fw-bold">
                    Joker
                  </div>
                  {joker ? (
                    <SlideDownImage
                      image={joker ? joker.card : BackgroundCard}
                      height={"35%"}
                      position={"static"}
                      alt="Andar Card"
                      animationOrder={"down"}
                    />
                  ) : (
                    <img
                      className={`visually-hiddens`}
                      style={{ height: "40%" }}
                      src={BackgroundCard}
                    />
                  )}
                </div>
              </div>
              <div
                className="d-flex ps-4 h-100 flex-column gap-5  justify-content-center w-100"
                style={{ paddingTop: "1.3rem", paddingBottom: "1.3rem" }}
              >
                <div
                  className=" px-2 w-100 "
                  style={{ position: "relative" , height:"30%" }}
                >
                  <div className=" border-bottom fs-3  text-center mb-1 fw-bold">
                    andar
                  </div>
                  {andarCards.length > 0 ? (
                    andarCards.map((card, i) => (
                      <SlideDownImage
                      height={"75%"}
                        image={card?.card}
                        i={i * 1.2}
                        alt="Andar Card"
                      />
                    ))
                  ) : (
                    <img
                      className={`visually-hiddens`}
                      style={{ height: "80%" }}
                      src={BackgroundCard}
                    />
                  )}
                </div>

                <div
                  className="   px-2 w-100 "
                  style={{ position: "relative" , height:"30%" }}
                >
                  <div className="border-bottom   fw-bold text-center fs-3 mb-1">
                    bahar
                  </div>
                  {baharCards.length > 0 ? (
                    baharCards.map((card, i) => (
                      <SlideDownImage
                      height={"75%"}
                        image={card?.card}
                        i={i * 1.2}
                        alt="Bahar Card"
                      />
                    ))
                  ) : (
                    <img
                      className={`visually-hiddens`}
                      style={{ height: "80%" }}
                      src={BackgroundCard}
                    />
                  )}
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

import { useEffect, useState, useRef, useCallback } from "react";
import axiosClient from "./axiosClient";
import "./App.css";
import { CardImage } from "./components/Cards";
import Result from "./components/Result";
import s from "./pattern.module.css";
import Header from "./components/layout/Header";
import Analysis from "./components/analysis/Analysis";
import Limits from "./components/layout/Limits";
import { useSelector } from "react-redux";
import TempForTest from "./TempForTest";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [maxLimit, setMaxLimit] = useState(null);
  const [minLimit, setMinLimit] = useState(null);

  const [cardCode, setCardCode] = useState(null);
  const [card, setCard] = useState(null);

  const jokerRef = useRef("");
  const [joker, setJoker] = useState("");
  const [andarCards, setAndarCards] = useState([]);
  const [baharCards, setBaharCards] = useState([]);
  const nextIsAndar = useRef(true);

  const [resultData, setResultData] = useState([]);

  const result = useSelector((state) => state.resultStore);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onBeetekData((data) => {
        displayCard(data);
      });
    }

    //onsole.log(CardImage.length);

    localStorage.setItem("nextAndar", 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "g" || e.key === "G") {
        getRandomCardCode();

        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getRandomCardCode = () => {
    const randomIndex = Math.floor(Math.random() * CardImage.length - 1);
    const randomCard = CardImage[randomIndex];
    //console.log(randomCard.cardCode);
    displayCard(randomCard.cardCode);
    return randomCard.cardCode;
  };

  const displayCard = (data) => {
    //onsole.log("displayCard from BeeTek:", data);

    for (let i in CardImage) {
      if (data == CardImage[i].cardCode) {
        setCard(CardImage[i]);
        setCardCode(CardImage[i].card);
       
        //console.log(CardImage[i].card);
        // setCards(CardImage[i].card);
      }
    }
  };

  const clearSetCard = () => {
    setCard(null);
    setCardCode(null);
  };

  



 

  return (
    <div className={`position-relative text-light`} style={{}}>
      <div className={`position-absolute  vh-100 vw-100 ${s.container}`}> </div>

      <div className={`position-absolute w-100 `}>
        <Header max={maxLimit} min={minLimit} />
        <Result
          clearSetCard={clearSetCard}
          card={card}
          joker={joker}
          baharCards={baharCards}
          andarCards={andarCards}
        />
        <Limits />
        {/*
        <TempForTest clearSetCard={clearSetCard} card={card} joker={joker} baharCards={baharCards} andarCards={andarCards} />


*/}
        <Analysis winners={resultData} />
      </div>
        <ToastContainer
  position="top-right"
  autoClose={2000}        // 👈 force auto close (2s)
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss={false}
  draggable
  pauseOnHover={false}
/>
    </div>
  );
}

export default App;

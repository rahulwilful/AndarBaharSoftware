import { useEffect, useState, useRef, useCallback } from "react";
import axiosClient from "./axiosClient";
import "./App.css";
import { CardImage } from "./components/Cards";
import Result from "./components/Result";
import s from "./pattern.module.css"
import Header from "./components/layout/Header";
import Analysis from "./components/analysis/Analysis";
import Limits from "./components/layout/Limits";
import { useSelector } from "react-redux";

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

  const [resultData,setResultData] = useState([])

  const result = useSelector(state=>state.resultStore)

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onBeetekData((data) => {
        displayCard(data);
      });
    }

    //onsole.log(CardImage.length);

    localStorage.setItem("nextAndar",0)
  }, []);

  const displayCard = (data) => {
   //onsole.log("displayCard from BeeTek:", data);

    for (let i in CardImage) {
      if (data == CardImage[i].cardCode) {
        setCard(CardImage[i]);
        setCardCode(CardImage[i].card);
       // setCards(CardImage[i].card);
      }
    }
  };

  const clearSetCard = () => {
    setCard(null)
    setCardCode(null)
  }



const setCards = (data) => {
  console.log("setting setCards");

  if (!jokerRef.current) {
    console.log("setting joker card", data);
    setJoker(data);
    jokerRef.current = data;
    nextIsAndar.current = true; // reset for new round
  } else if ( localStorage.getItem("nextAndar") == true) {
    setAndarCards((prev) => {
      const newArr = [...prev, data];
      console.log("setting andar cards", data, "-", newArr);
      return newArr;
    });
     localStorage.setItem("nextAndar",false)
  } else {
    setBaharCards((prev) => {
      const newArr = [...prev, data];
      console.log("setting bahar cards", data, "-", newArr);
      return newArr;
    });
     localStorage.setItem("nextAndar",true)
  }
};

useEffect(() => {

      

       const max = localStorage.getItem("maxLimit");
    const min = localStorage.getItem("minLimit");

   
    console.log("result", result)
      
}, []);



  return (
    <div className={`position-relative text-light`} style={{ }}>
      <div className={`position-absolute  vh-100 vw-100 ${s.container}`}> </div>

      <div className={`position-absolute w-100`}>
        <Header max={maxLimit} min={minLimit} />
      <Result clearSetCard={clearSetCard} card={card} joker={joker} baharCards={baharCards} andarCards={andarCards} />
<Limits />
      <Analysis winners={resultData} />
      
     
        </div>
    </div>
  );
}

export default App;

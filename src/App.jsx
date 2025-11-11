import { useEffect, useState, useRef, useCallback } from "react";
import axiosClient from "./axiosClient";
import "./App.css";
import { CardImage } from "./components/Cards";
import Result from "./components/Result";

function App() {
  const [cardCode, setCardCode] = useState(null);
  const [card, setCard] = useState(null);
  
  const jokerRef = useRef("");
  const [joker, setJoker] = useState("");
  const [andarCards, setAndarCards] = useState([]);
  const [baharCards, setBaharCards] = useState([]);
  const nextIsAndar = useRef(true);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onBeetekData((data) => {
        displayCard(data);
      });
    }

    //onsole.log(CardImage.length);

    localStorage.setItem("nextAndar",1)
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



  return (
    <div style={{ padding: "20px" }}>
      <Result card={card} joker={joker} baharCards={baharCards} andarCards={andarCards} />
      <h1>Andar Bahar Result Reader</h1>
      <p>Waiting for data from BeeTek shoe...</p>
      <img
        src={card}
        alt="King of Hearts"
        className={`${card ? "d-block" : "d-none"}`}
      />
    </div>
  );
}

export default App;

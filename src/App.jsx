import { useEffect, useState, useRef, useCallback } from "react";
import axiosClient from "./axiosClient";
import "./App.css";
import { CardImage } from "./components/Cards";

function App() {
 
  const [cardCode,setCardCode] = useState(null)
  const [card,setCard] = useState(null)

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onBeetekData((data) => {
      displayCard(data)
      });
    }

    console.log(CardImage.length)

  }, []);

  const displayCard = (data) =>{
     console.log("displayCard from BeeTek:", data);

     for(let i in CardImage){
      if(data == CardImage[i].cardCode) {
        setCard(CardImage[i].card)
        setCardCode(data)
      }
     }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Andar Bahar Result Reader</h1>
      <p>Waiting for data from BeeTek shoe...</p>
      <img src={card} alt="King of Hearts" className={`${card ? 'd-block' : 'd-none'}`}/>
    </div>
  );
}

export default App;

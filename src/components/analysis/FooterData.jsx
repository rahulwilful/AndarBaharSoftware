import React, { useEffect, useState } from "react";
import s from "./FooterData.module.css";
import { useDispatch, useSelector } from "react-redux";
import LiquidGlass from "liquid-glass-react";
import { deleteStates, setStates } from "../../redux/actions/cardAction";


const FooterData = () => {
  const [andarWins,setAndarWins] = useState(0)
  const [baharWins,setBaharWins] = useState(0)
  const [totalGames ,setTotalGames] = useState(0)
  const result = useSelector((state) => state.resultStore);

      useEffect(()=>{
        console.log("result",result)
/* 
        if(result.length ==0){
          setTotalGames(0)
          setAndarWins(0)
          setBaharWins(0)
          return
        } */

        setTotalGames(result.length)
        let tempAndarWins = 0
        let tempBaharWins = 0
        for(let i in result){
          if(result[i] == "A"){
            tempAndarWins++
          }else{
            tempBaharWins++
          }
        }

        setAndarWins(tempAndarWins)
        setBaharWins(tempBaharWins)

      },[result])
  
  return (
    <>
      <div className={`${s.main} py-4`}>
        <div className="container d-flex flex-column gap-2">
          <div className="section row fs-5">
            {" "}
          <div className="col-7 ">   Total Games</div>
            <div className="col-5 "> <button style={{borderRadius:15}} type="button" class="btn w-100  bg-gradient fs-5 shadow-xs btn-primary">{totalGames || '0'}</button></div>
          </div>
          <div className="section row fs-5">
           <div className="col-7 "> {" "}
            Andar Wins </div>
            <div className="col-5 "> <button style={{borderRadius:15}} type="button" class="btn w-100  bg-gradient fs-5 shadow-xs btn-success">{andarWins || '0'}</button></div>
          </div>
          <div className="section row fs-5">
            <div className="col-7 ">{" "}
            Bahar Wins </div>
            <div className="col-5 "> <button style={{borderRadius:15}} type="button" class="btn w-100  bg-gradient fs-5 shadow-xs btn-danger">{baharWins || '0'}</button></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterData;

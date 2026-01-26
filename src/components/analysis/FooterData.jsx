import React from 'react'
import s from "./FooterData.module.css"

const FooterData = () => {
  return (
    <>
    <div className={`${s.main}`}>
        <div className="container">
            <div className="section">Total Games</div>
            <div className="section">Andar Wins </div>
            <div className="section"> Bahar Wins </div>
        </div>
    </div>
    </>
  )
}

export default FooterData
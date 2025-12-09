import React, { useEffect, useState } from "react";
import Container from "./Container";
import InputModal from "./InputModal";
import LOGO from "../../assets/LOGO.avif";

const Header = ({ children, max, min, heading }) => {
  



  return (
    <>


      <Container px={0} py={0} noContainer h={"6vh"}>
        <div className=" py-2 shadow-lg w-100 px-3 d-flex h-100 justify-content-center align-items-center bg-dark">
          <img src={LOGO} style={{ width: "40%" }} />
        </div>
      </Container>
    </>
  );
};

export default Header;

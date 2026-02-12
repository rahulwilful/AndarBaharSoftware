import React from "react";
import s from "./TableCLose.module.css";

const TableCLose = () => {
  return (
    <>
      <div
        className="overflow-hidden vh-100 w-100"
        style={{ position: "relative" }}
      >
        <div className={`${s.container} `}></div>
        <div
          className={`${s.textColor} w-100 h-100 text-shadow  gemeStonesRegular  d-flex justify-content-center align-items-center ${s.gemeStonesRegular} `}
          style={{ position: "absolute", fontSize: "9rem" }}
        >
          Table Closed
        </div>
      </div>
    </>
  );
};

export default TableCLose;

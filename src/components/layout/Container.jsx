import React from "react";

const Container = ({ children, py, px, tempBorder, h,center,classes }) => {
  return (
    <div
      style={h ? { height:h } :  { height:"100%" } }
      className={`container  ${px ? "px-" + px : px == 0 ? "px-0" : "px-5"} ${
        py ? "py-" + py : py == 0 ? "py-0" : "py-5"
      } ${tempBorder ? "border border-danger border-5" : ""}
      ${center ? 'd-flex align-items-center justify-content-center':''} ${classes}`}
    >
      {children}
    </div>
  );
};

export default Container;

import React from "react";

const Container = ({
  children,
  noContainer,
  py,
  px,
  tempBorder,
  h,
  w,
  center,
  classes,
  mt,
  mb,
}) => {
  return (
    <div
      style={{
        height: h ? h : "100%",
        width: w ? w : "100%",
      }}
      className={`${noContainer ? "" : "container"}  ${px ? "px-" + px : px == 0 ? "px-0" : "px-5"} ${
        py ? "py-" + py : py == 0 ? "py-0" : "py-5"
      } ${tempBorder ? "border border-danger border-5" : ""}
      ${center ? "d-flex align-items-center justify-content-center" : ""} ${classes}
      ${mt ? "mt-" + mt : mt == 0 ? "mt-0" : "mt-0"}
      ${mb ? "mb-" + mb : mb == 0 ? "mb-0" : "mb-0"}

      `}
    >
      {children}
    </div>
  );
};

export default Container;

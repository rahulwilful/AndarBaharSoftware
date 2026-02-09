import React, { forwardRef } from "react";
import s from "./SmallTextInput.module.css";

const SmallTextInput = forwardRef(({ value, setValue, placeHolder }, ref) => {
  return (
    <div className={` ${s.input_container}`}>
      <input
        ref={ref}
        type="number"
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        //placeholder={placeHolder || "Enter"}
        className={`${s.input_field}   text-center`}
      />

      <span className={s.input_highlight}></span>
    </div>
  );
});

export default SmallTextInput;

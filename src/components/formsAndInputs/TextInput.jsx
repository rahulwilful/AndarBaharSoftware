import React, { forwardRef } from "react";
import s from "./TextInput.module.css";

const TextInput = forwardRef(({ value, setValue, placeHolder }, ref) => {
  return (
    <div className={s.input_container}>
      <input
        ref={ref}
        type="number"
        value={value ?? ""}
        onChange={setValue}
        placeholder={placeHolder || "Enter"}
        className={`${s.input_field} text-light`}
      />

      <label htmlFor="input_field" className={s.input_label}>
        {placeHolder || "Place Holder"}
      </label>

      <span className={s.input_highlight}></span>
    </div>
  );
});

export default TextInput;

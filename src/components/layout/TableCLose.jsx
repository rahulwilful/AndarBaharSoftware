import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import s from "./TableCLose.module.css";

const TableCLose = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.querySelectorAll(".letter");

    const tl = gsap.timeline({
      repeat: -1, // infinite loop
      repeatDelay: 0.5,
    });

    // 🔹 First Drop In
    tl.fromTo(
      letters,
      {
        y: -200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "bounce.out",
        stagger: 0.08,
      }
    );

    // 🔹 Small pause after landing
    tl.to(letters, { duration: 2.5 });

    // 🔹 Drop Down & Fade Away
    tl.to(
      letters,
      {
        y: 600,
        opacity: 0,
        duration: 0.7,
        ease: "power2.in",
        stagger: 0.1,
      }
    );

  }, []);

  const text = "Table Closed";

  return (
    <div
      className="overflow-hidden vh-100 w-100"
      style={{ position: "relative" }}
    >

      <div className={`${s.container}`}></div>
      <div
        ref={textRef}
        className={`${s.textColor} w-100 h-100 text-shadow gemeStonesRegular d-flex justify-content-center align-items-center ${s.gemeStonesRegular}`}
        style={{
          position: "absolute",
          fontSize: "9rem",
          gap: "5px",
        }}
      >
        {text.split("").map((char, index) => (
          <span
          key={index}
            className={`letter ${s.textColor} gemeStonesRegular`}
            style={{
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : "normal",
            }}
            >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TableCLose;

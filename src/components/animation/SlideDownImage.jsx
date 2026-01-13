import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const SlideDownImage = ({ image, i, alt,animationOrder,height,imageHeight,position }) => {
  const el = useRef(null);

  useLayoutEffect(() => {
    if(animationOrder == 'down'){

      gsap.from(el.current, {
        opacity: 0,
        y: -60,
        duration: 0.6,
        ease: "power3.out",
      });
    }else{
      gsap.from(el.current, {
        opacity: 0,
        x: -60,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <span
      ref={el}
      style={{
        height: height ? height : '80%',
        position:position ? position: "absolute",
        left: `${i ? i : 0}rem`,
      }}
    >
      <img src={image} style={{height:imageHeight?imageHeight : ''}} className="h-100" alt={alt} />
    </span>
  );
};

export default SlideDownImage;

import React, { useContext, useRef, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Context } from "../hooks/context";

function SVGColorBtn({ color }) {
  return (
    <>
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <title>ColorBtn</title>
        <g id="Layer_1">
          <title>Layer 1</title>
          <circle id="svg_1" cx="50" cy="50" r={50} fill={color} />
        </g>
      </svg>
    </>
  );
}

function ColorBtn({ color, isCorrect }) {
  const { startTimer, resetTimer, randomColor, addScore, minusTimer } =
    useContext(Context);
  const svgBtn = encodeURIComponent(
    window.btoa(renderToStaticMarkup(<SVGColorBtn color={color} />))
  );
  const validateColor = () => {
    startTimer();
    if (isCorrect) {
      resetTimer();
      randomColor();
      addScore();
    } else {
      startTimer();
      minusTimer(1);
    }
  };

  return (
    <img onClick={validateColor} src={`data:image/svg+xml;base64,${svgBtn}`} />
  );
}

export default ColorBtn;

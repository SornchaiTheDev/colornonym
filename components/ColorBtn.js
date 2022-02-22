import React, { useContext, useState, useRef, useEffect } from "react";
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
  // Get Context Value
  const { startTimer, resetTimer, randomColor, addScore, minusTimer, timer } =
    useContext(Context);

  // Convert Svg to base64
  const svgBtn = encodeURIComponent(
    window.btoa(renderToStaticMarkup(<SVGColorBtn color={color} />))
  );

  // Validate if user press the right color
  const validateColor = () => {
    if (timer <= 0) return;
    startTimer();
    if (isCorrect) {
      resetTimer();
      randomColor();
      addScore();
    } else {
      startTimer();
      minusTimer(3);
    }
  };

  return (
    <img
      className="place-self-stretch"
      style={{ height: "100%" }}
      onClick={validateColor}
      src={`data:image/svg+xml;base64,${svgBtn}`}
    />
  );
}

export default ColorBtn;
